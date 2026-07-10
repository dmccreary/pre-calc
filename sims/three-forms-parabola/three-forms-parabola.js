// Three Forms of a Parabola MicroSim
// CANVAS_HEIGHT: 572
// Drag the vertex and a curve anchor; standard, vertex, and factored forms
// all update live and always describe the same parabola.
// Bloom's Level: Apply — convert a quadratic between standard, vertex, and factored forms.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 50; // 1 row: 3 presets + checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -10, AXIS_MAX = 10;

// parabola: y = a(x-h)² + k, defined by vertex (h,k) and anchor point (ax, ay)
let h = 0, k = -4;
let anchorX = 2, anchorY = 0;

let dragging = null;
let plotLeft, plotTop, plotSize;

let preset1, preset2, preset3;
let hideFactoredCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  preset1 = createButton('x² − 4');
  preset1.parent(mainElement);
  preset1.position(10, drawHeight + 10);
  preset1.mousePressed(() => { h = 0; k = -4; anchorX = 2; anchorY = 0; });

  preset2 = createButton('−(x+1)² + 9');
  preset2.parent(mainElement);
  preset2.position(85, drawHeight + 10);
  preset2.mousePressed(() => { h = -1; k = 9; anchorX = 2; anchorY = 0; });

  preset3 = createButton('2(x−1)(x−3)');
  preset3.parent(mainElement);
  preset3.position(195, drawHeight + 10);
  preset3.mousePressed(() => { h = 2; k = -2; anchorX = 1; anchorY = 0; });

  hideFactoredCheckbox = createCheckbox('Hide factored form when no real zeros', true);
  hideFactoredCheckbox.parent(mainElement);
  hideFactoredCheckbox.position(310, drawHeight + 12);

  describe('A parabola with a draggable vertex handle and a draggable anchor point. Side panels show the standard, vertex, and factored forms of the same quadratic, all updating live.', LABEL);
}

function aValue() {
  let dx = anchorX - h;
  if (dx === 0) return 1;
  return (anchorY - k) / (dx * dx);
}

function fmtNum(v) {
  let r = Math.round(v * 100) / 100;
  return (r === Math.round(r)) ? '' + Math.round(r) : nf(r, 0, 2);
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toGX(sx) { return AXIS_MIN + (sx - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }
function toGY(sy) { return AXIS_MAX - (sy - plotTop) / plotSize * (AXIS_MAX - AXIS_MIN); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotSize = min(canvasWidth * 0.52, drawHeight - 60);
  plotLeft = margin;
  plotTop = 45;

  // grid + axes
  stroke(222);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotSize);
    line(plotLeft, toSY(i), plotLeft + plotSize, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotSize);
  line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));

  // title, offset left of the panels
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Three Forms of a Parabola', canvasWidth * 0.3, 6);

  let a = aValue();

  // parabola
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let gx = AXIS_MIN; gx <= AXIS_MAX; gx += 0.05) {
    let gy = a * (gx - h) * (gx - h) + k;
    if (gy >= AXIS_MIN - 4 && gy <= AXIS_MAX + 4) {
      vertex(toSX(gx), toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
    }
  }
  endShape();

  // axis feature markers: zeros, y-intercept, vertex x
  let cVal = a * h * h + k;             // y-intercept value
  let disc = -k / a;                     // (x-h)² = -k/a at zeros
  noStroke();
  if (disc >= 0) {
    let s = Math.sqrt(disc);
    for (let r of [h - s, h + s]) {
      if (r >= AXIS_MIN && r <= AXIS_MAX) {
        fill(CYAN);
        circle(toSX(r), toSY(0), 11);
        fill('black');
        textSize(13);
        textAlign(CENTER, TOP);
        text('x=' + fmtNum(r), toSX(r), toSY(0) + 8);
      }
    }
  }
  // skip the y-intercept marker when it coincides with the vertex (labels would collide)
  if (cVal >= AXIS_MIN && cVal <= AXIS_MAX && (abs(h) > 0.4 || abs(cVal - k) > 0.4)) {
    fill('green');
    circle(toSX(0), toSY(cVal), 11);
    textSize(13);
    textAlign(RIGHT, CENTER);
    fill('black');
    text('y=' + fmtNum(cVal) + ' ', toSX(0) - 8, toSY(cVal));
  }

  // handles: vertex solid, anchor hollow
  stroke('black');
  strokeWeight(2);
  fill(MAROON);
  circle(toSX(h), toSY(k), 18);
  fill('white');
  circle(toSX(anchorX), toSY(anchorY), 16);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text('vertex (' + fmtNum(h) + ', ' + fmtNum(k) + ')', toSX(h) + 12, toSY(k) - 4);

  // form panels on the right
  let bStd = -2 * a * h;
  let panX = plotLeft + plotSize + 20;
  let panW = canvasWidth - panX - margin;

  let vertexForm = 'y = ' + (a === 1 ? '' : a === -1 ? '−' : fmtNum(a)) +
    '(x ' + (h >= 0 ? '− ' + fmtNum(h) : '+ ' + fmtNum(-h)) + ')² ' +
    (k >= 0 ? '+ ' + fmtNum(k) : '− ' + fmtNum(-k));
  let stdForm = 'y = ' + (a === 1 ? '' : a === -1 ? '−' : fmtNum(a)) + 'x² ' +
    (bStd >= 0 ? '+ ' + fmtNum(bStd) : '− ' + fmtNum(-bStd)) + 'x ' +
    (cVal >= 0 ? '+ ' + fmtNum(cVal) : '− ' + fmtNum(-cVal));
  let factForm;
  let hasRealZeros = disc >= 0;
  if (hasRealZeros) {
    let s = Math.sqrt(disc);
    let r1 = h - s, r2 = h + s;
    factForm = 'y = ' + (a === 1 ? '' : a === -1 ? '−' : fmtNum(a)) +
      '(x ' + (r1 >= 0 ? '− ' + fmtNum(r1) : '+ ' + fmtNum(-r1)) + ')' +
      '(x ' + (r2 >= 0 ? '− ' + fmtNum(r2) : '+ ' + fmtNum(-r2)) + ')';
  } else {
    factForm = 'No real zeros — cannot factor over ℝ';
  }

  let panels = [
    ['Standard Form', stdForm],
    ['Vertex Form', vertexForm]
  ];
  if (hasRealZeros || !hideFactoredCheckbox.checked()) {
    panels.push(['Factored Form', factForm]);
  }

  panels.forEach((p, i) => {
    let panY = 50 + i * 95;
    stroke(200);
    strokeWeight(1);
    fill(255, 255, 255, 235);
    rect(panX, panY, panW, 82, 10);
    noStroke();
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text(p[0], panX + 14, panY + 8);
    fill('black');
    textSize(p[1].length > 26 ? 16 : 20);
    text(p[1], panX + 14, panY + 38);
  });

  // hint
  noStroke();
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Drag the solid vertex handle to translate; drag the hollow anchor to change the width (a). Handles snap to 0.5.',
       plotLeft, plotTop + plotSize + 10, canvasWidth - 2 * margin, 40);
}

function mousePressed() {
  if (dist(mouseX, mouseY, toSX(h), toSY(k)) < 14) dragging = 'vertex';
  else if (dist(mouseX, mouseY, toSX(anchorX), toSY(anchorY)) < 14) dragging = 'anchor';
}

function mouseDragged() {
  let gx = constrain(round(toGX(mouseX) * 2) / 2, AXIS_MIN, AXIS_MAX);
  let gy = constrain(round(toGY(mouseY) * 2) / 2, AXIS_MIN, AXIS_MAX);
  if (dragging === 'vertex') {
    h = gx; k = gy;
    if (anchorX === h) anchorX = h + 1; // keep anchor off the axis of symmetry
  } else if (dragging === 'anchor') {
    if (gx !== h) { anchorX = gx; anchorY = gy; }
  }
}

function mouseReleased() {
  dragging = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
