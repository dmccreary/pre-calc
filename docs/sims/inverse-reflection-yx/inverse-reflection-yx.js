// Inverse Reflection Across y = x MicroSim
// CANVAS_HEIGHT: 672
// Drag a point along a function; its mirror image on the inverse moves in
// sync, connected by a dotted segment through the line y = x.
// Bloom's Level: Understand — a function and its inverse reflect across y = x.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 620;
let controlHeight = 50; // 1 row: select + checkbox + button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const CYAN = '#00BFFF';
const AXIS_MIN = -10, AXIS_MAX = 10;

const FUNCTIONS = [
  { label: 'f(x) = 2x + 1', fn: x => 2 * x + 1, inv: y => (y - 1) / 2, domain: [-10, 10] },
  { label: 'f(x) = x³',     fn: x => x * x * x, inv: y => Math.cbrt(y), domain: [-2.15, 2.15] },
  { label: 'f(x) = 2^x',    fn: x => Math.pow(2, x), inv: y => Math.log2(y), domain: [-10, 3.3] },
  { label: 'f(x) = √x',     fn: x => x < 0 ? NaN : Math.sqrt(x), inv: y => y < 0 ? NaN : y * y, domain: [0, 10] }
];

let funcIndex = 0;
let pointX = 1.5;       // x-coordinate of the draggable point on f
let draggingPoint = false;
let tracing = false;
let traceT = 0;

let funcSelect;
let diagonalCheckbox;
let traceButton;

let plotLeft, plotTop, plotSize;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  funcSelect = createSelect();
  funcSelect.parent(mainElement);
  funcSelect.position(10, drawHeight + 10);
  FUNCTIONS.forEach(f => funcSelect.option(f.label));
  funcSelect.changed(() => {
    funcIndex = FUNCTIONS.findIndex(f => f.label === funcSelect.value());
    let d = FUNCTIONS[funcIndex].domain;
    pointX = constrain(pointX, d[0], d[1]);
  });

  diagonalCheckbox = createCheckbox('Show y = x', true);
  diagonalCheckbox.parent(mainElement);
  diagonalCheckbox.position(160, drawHeight + 12);

  traceButton = createButton('Trace Reflection');
  traceButton.parent(mainElement);
  traceButton.position(290, drawHeight + 10);
  traceButton.mousePressed(() => { tracing = true; traceT = 0; });

  describe('A function in maroon and its inverse in gold on one coordinate plane, with the dashed line y equals x between them. Dragging a point on the function moves its mirror image on the inverse simultaneously.', LABEL);
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toGX(sx) { return AXIS_MIN + (sx - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }

function plotCurve(fn, domain, col) {
  stroke(col);
  strokeWeight(3);
  noFill();
  let inSeg = false;
  beginShape();
  for (let gx = max(AXIS_MIN, domain[0]); gx <= min(AXIS_MAX, domain[1]); gx += 0.03) {
    let gy = fn(gx);
    if (isFinite(gy) && gy >= AXIS_MIN - 2 && gy <= AXIS_MAX + 2) {
      vertex(toSX(gx), toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
      inSeg = true;
    } else if (inSeg) {
      endShape();
      beginShape();
      inSeg = false;
    }
  }
  endShape();
  noStroke();
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

  plotSize = min(canvasWidth - 2 * margin, drawHeight - 100);
  plotLeft = (canvasWidth - plotSize) / 2;
  plotTop = 55;

  // grid + axes
  stroke(224);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotSize);
    line(plotLeft, toSY(i), plotLeft + plotSize, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotSize);
  line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));
  noStroke();

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('A Function and Its Inverse: Mirrors Across y = x', canvasWidth / 2, 8);

  // diagonal y = x
  if (diagonalCheckbox.checked()) {
    stroke(120);
    strokeWeight(1.8);
    drawingContext.setLineDash([8, 6]);
    line(toSX(AXIS_MIN), toSY(AXIS_MIN), toSX(AXIS_MAX), toSY(AXIS_MAX));
    drawingContext.setLineDash([]);
    noStroke();
    fill(120);
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text('y = x', toSX(7.6), toSY(8.2));
  }

  let F = FUNCTIONS[funcIndex];
  // f in maroon; inverse in gold (inverse = reflected curve)
  plotCurve(F.fn, F.domain, MAROON);
  // inverse: plot x = f(y) → for each gx, y = inv(gx)
  plotCurve(x => F.inv(x), [F.fn(F.domain[0]), F.fn(F.domain[1])].sort((a, b) => a - b), GOLD);

  // curve labels
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('f(x)', plotLeft + 12, plotTop + 8);
  fill(GOLD);
  text('f⁻¹(x)', plotLeft + 60, plotTop + 8);

  // trace animation: many points reflecting across the diagonal
  if (tracing) {
    traceT += 0.008;
    if (traceT >= 1) { tracing = false; traceT = 0; }
    let d = F.domain;
    for (let i = 0; i <= 10; i++) {
      let gx = lerp(max(AXIS_MIN, d[0]), min(AXIS_MAX, d[1]), i / 10);
      let gy = F.fn(gx);
      if (!isFinite(gy) || abs(gy) > AXIS_MAX) continue;
      // interpolate from (gx,gy) to (gy,gx)
      let t = constrain(traceT * 1.4 - i * 0.04, 0, 1);
      let cx = lerp(gx, gy, t);
      let cy = lerp(gy, gx, t);
      noStroke();
      fill(0, 191, 255, 200);
      circle(toSX(cx), toSY(cy), 9);
    }
  }

  // draggable point on f and its mirror
  let a = pointX;
  let b = F.fn(a);
  if (isFinite(b)) {
    // dotted connector through y = x
    stroke(CYAN);
    strokeWeight(1.8);
    drawingContext.setLineDash([3, 5]);
    line(toSX(a), toSY(b), toSX(b), toSY(a));
    drawingContext.setLineDash([]);
    // point on f
    stroke('black');
    strokeWeight(2);
    fill(MAROON);
    circle(toSX(a), toSY(constrain(b, AXIS_MIN, AXIS_MAX)), 16);
    // mirrored point on inverse
    fill(GOLD);
    circle(toSX(constrain(b, AXIS_MIN, AXIS_MAX)), toSY(a), 16);
    noStroke();
    fill('black');
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text('(' + nf(a, 0, 1) + ', ' + nf(b, 0, 1) + ')', toSX(a) + 11, toSY(constrain(b, AXIS_MIN, AXIS_MAX)) - 5);
    text('(' + nf(b, 0, 1) + ', ' + nf(a, 0, 1) + ')', toSX(constrain(b, AXIS_MIN, AXIS_MAX)) + 11, toSY(a) - 5);
  }

  // hint
  noStroke();
  fill(100);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Drag the maroon point along f — the gold point mirrors it on f⁻¹',
       canvasWidth / 2, plotTop + plotSize + 10);
}

function mousePressed() {
  let F = FUNCTIONS[funcIndex];
  let b = F.fn(pointX);
  if (isFinite(b) && dist(mouseX, mouseY, toSX(pointX), toSY(constrain(b, AXIS_MIN, AXIS_MAX))) < 16) {
    draggingPoint = true;
  }
}

function mouseDragged() {
  if (draggingPoint) {
    let F = FUNCTIONS[funcIndex];
    pointX = constrain(toGX(mouseX), F.domain[0], F.domain[1]);
  }
}

function mouseReleased() {
  draggingPoint = false;
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
