// Polar Curve Gallery MicroSim
// CANVAS_HEIGHT: 622
// Morph circles, cardioids, limaçons, and roses by dragging parameter
// sliders; the category readout classifies the shape live.
// Bloom's Level: Analyze — connect a polar equation's parameters to its shape.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 120; // 3 rows: type+reset+trace, a+b sliders, n slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

let mouseOverCanvas = false;
let traceTheta = 0;

let typeSelect;
let resetButton;
let traceCheckbox;
let aSlider, bSlider, nSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  typeSelect = createSelect();
  typeSelect.parent(mainElement);
  typeSelect.position(10, drawHeight + 8);
  ['circle', 'cardioid', 'limaçon', 'rose'].forEach(t => typeSelect.option(t));
  typeSelect.selected('cardioid');

  resetButton = createButton('Reset to classic example');
  resetButton.parent(mainElement);
  resetButton.position(120, drawHeight + 8);
  resetButton.mousePressed(() => {
    aSlider.value(2); bSlider.value(2); nSlider.value(3);
  });

  traceCheckbox = createCheckbox('Trace angle marker', true);
  traceCheckbox.parent(mainElement);
  traceCheckbox.position(300, drawHeight + 10);

  aSlider = createSlider(0.5, 4, 2, 0.1);
  aSlider.parent(mainElement);
  bSlider = createSlider(0.5, 4, 2, 0.1);
  bSlider.parent(mainElement);
  nSlider = createSlider(1, 8, 3, 1);
  nSlider.parent(mainElement);
  positionSliders();

  describe('Polar grid with a maroon curve — circle, cardioid, limaçon, or rose — that morphs as the a, b, and n sliders move. A readout names the current shape category, petal count, and symmetry.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(110, half - 180);
  aSlider.position(90, drawHeight + 45);
  aSlider.size(sw);
  bSlider.position(half + 90, drawHeight + 45);
  bSlider.size(sw);
  nSlider.position(90, drawHeight + 80);
  nSlider.size(sw);
}

function rOf(theta) {
  let a = aSlider.value(), b = bSlider.value(), n = nSlider.value();
  let type = typeSelect.value();
  if (type === 'circle') return a;
  if (type === 'cardioid') return a * (1 + cos(theta));
  if (type === 'limaçon') return a + b * cos(theta);
  return a * cos(n * theta); // rose
}

function classify() {
  let a = aSlider.value(), b = bSlider.value(), n = nSlider.value();
  let type = typeSelect.value();
  if (type === 'circle') return { eq: 'r = ' + nf(a, 0, 1), cat: 'circle of radius ' + nf(a, 0, 1), sym: 'all axes' };
  if (type === 'cardioid') return { eq: 'r = ' + nf(a, 0, 1) + '(1 + cos θ)', cat: 'cardioid (heart shape)', sym: 'x-axis' };
  if (type === 'limaçon') {
    let ratio = a / b;
    let cat = ratio < 1 ? 'limaçon with inner loop' :
              ratio === 1 ? 'cardioid (a = b)' :
              ratio < 2 ? 'dimpled limaçon' : 'convex limaçon';
    return { eq: 'r = ' + nf(a, 0, 1) + ' + ' + nf(b, 0, 1) + ' cos θ',
             cat: cat + '  (a/b = ' + nf(ratio, 0, 2) + ')', sym: 'x-axis' };
  }
  let petals = n % 2 === 1 ? n : 2 * n;
  return { eq: 'r = ' + nf(a, 0, 1) + ' cos(' + n + 'θ)',
           cat: 'rose with ' + petals + ' petals (n ' + (n % 2 ? 'odd → n' : 'even → 2n') + ')',
           sym: n % 2 === 1 ? 'x-axis' : 'x-axis and y-axis' };
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Polar Curve Gallery', canvasWidth / 2, 6);

  let cx = canvasWidth * 0.38;
  let cy = drawHeight / 2 + 15;
  let maxR = 8.5;
  let scale = min(canvasWidth * 0.3, drawHeight * 0.42) / maxR * 2;

  // polar grid: concentric circles + radial lines
  noFill();
  stroke(225);
  strokeWeight(1);
  for (let rr = 1; rr <= 8; rr++) circle(cx, cy, rr * scale);
  for (let i = 0; i < 12; i++) {
    let a = i * PI / 6;
    line(cx, cy, cx + 8 * scale / 2 * cos(a), cy - 8 * scale / 2 * sin(a));
  }
  stroke(170);
  strokeWeight(1.3);
  line(cx - 4.2 * scale, cy, cx + 4.2 * scale, cy);
  line(cx, cy - 4.2 * scale, cx, cy + 4.2 * scale);
  noStroke();
  fill(140);
  textSize(11);
  textAlign(CENTER, TOP);
  for (let rr = 2; rr <= 8; rr += 2) text(rr, cx + rr * scale / 2, cy + 3);

  let C = classify();

  // symmetry axes (dotted)
  stroke(180);
  strokeWeight(1.5);
  drawingContext.setLineDash([3, 5]);
  line(cx - 4.2 * scale, cy, cx + 4.2 * scale, cy);   // x-axis symmetry (all current types)
  if (typeSelect.value() === 'rose' && nSlider.value() % 2 === 0) {
    line(cx, cy - 4.2 * scale, cx, cy + 4.2 * scale);
  }
  drawingContext.setLineDash([]);
  noStroke();

  // the curve
  stroke(MAROON);
  strokeWeight(2.8);
  noFill();
  beginShape();
  for (let t = 0; t <= TWO_PI + 0.02; t += 0.01) {
    let r = rOf(t);
    vertex(cx + r * scale / 2 * cos(t), cy - r * scale / 2 * sin(t));
  }
  endShape();
  noStroke();

  // origin dot
  fill(CYAN);
  circle(cx, cy, 8);

  // trace marker
  if (traceCheckbox.checked()) {
    if (mouseOverCanvas) traceTheta = (traceTheta + 0.015) % TWO_PI;
    let r = rOf(traceTheta);
    stroke(CYAN);
    strokeWeight(1.5);
    line(cx, cy, cx + r * scale / 2 * cos(traceTheta), cy - r * scale / 2 * sin(traceTheta));
    stroke('black');
    strokeWeight(1.5);
    fill('gold');
    circle(cx + r * scale / 2 * cos(traceTheta), cy - r * scale / 2 * sin(traceTheta), 12);
    noStroke();
    fill(90);
    textSize(13);
    textAlign(LEFT, TOP);
    text('θ = ' + nf(traceTheta, 0, 2) + ',  r = ' + nf(r, 0, 2), margin, drawHeight - 28);
  }

  // readout panel
  let panX = canvasWidth * 0.68;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 60, panW, 200, 10);
  noStroke();
  fill(MAROON);
  textSize(17);
  textAlign(LEFT, TOP);
  text(C.eq, panX + 14, 72);
  fill('black');
  textSize(14);
  text('Shape: ' + C.cat, panX + 14, 106, panW - 28, 60);
  text('Symmetry: ' + C.sym, panX + 14, 160, panW - 28, 40);
  fill(90);
  textSize(13);
  text('Hover the canvas to run the trace.', panX + 14, 210, panW - 28, 40);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('a = ' + nf(aSlider.value(), 0, 1), 10, drawHeight + 55);
  text('b = ' + nf(bSlider.value(), 0, 1), canvasWidth / 2 + 10, drawHeight + 55);
  text('n = ' + nSlider.value(), 10, drawHeight + 90);
  fill(100);
  text('(b used by limaçon; n used by rose)', canvasWidth / 2 + 10, drawHeight + 90);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
