// Vertical Line Test MicroSim
// CANVAS_HEIGHT: 632
// Drag a vertical line across a curve and count intersections in real time
// to decide whether the graph is a function.
// Bloom's Level: Analyze — classify graphs as functions or non-functions.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 650;
let drawHeight = 580;
let controlHeight = 50; // 1 row: select + 2 buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -10;
const AXIS_MAX = 10;

let plotSize, plotLeft, plotTop;

// each curve returns the array of y-values at a given x (empty if out of domain)
const CURVES = [
  { label: 'Parabola  y = x²',        ys: x => [x * x] },
  { label: 'Sideways parabola  x = y²', ys: x => x < 0 ? [] : (x === 0 ? [0] : [Math.sqrt(x), -Math.sqrt(x)]) },
  { label: 'Circle  x² + y² = 16',    ys: x => abs(x) > 4 ? [] : (abs(x) === 4 ? [0] : [Math.sqrt(16 - x * x), -Math.sqrt(16 - x * x)]) },
  { label: 'Line  y = 2x - 1',        ys: x => [2 * x - 1] },
  { label: 'Absolute value  y = |x|', ys: x => [Math.abs(x)] },
  { label: 'Square root  y = √x',     ys: x => x < 0 ? [] : [Math.sqrt(x)] }
];

let curveIndex = 0;
let lineX = 2;             // vertical test line position in plane units
let draggingLine = false;
let failedAt = null;       // x where 2+ intersections were first observed
let sweeping = false;

let curveSelect;
let sweepButton;
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  curveSelect = createSelect();
  curveSelect.parent(mainElement);
  curveSelect.position(10, drawHeight + 10);
  CURVES.forEach(c => curveSelect.option(c.label));
  curveSelect.changed(() => {
    curveIndex = CURVES.findIndex(c => c.label === curveSelect.value());
    resetTest();
  });

  sweepButton = createButton('Auto-sweep');
  sweepButton.parent(mainElement);
  sweepButton.position(250, drawHeight + 10);
  sweepButton.mousePressed(() => { resetTest(); sweeping = true; lineX = AXIS_MIN; });

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(355, drawHeight + 10);
  resetButton.mousePressed(resetTest);

  describe('Coordinate plane with a curve and a draggable vertical line. A live counter shows how many times the line crosses the curve; more than one crossing means the graph is not a function.', LABEL);
}

function resetTest() {
  failedAt = null;
  sweeping = false;
  lineX = 2;
}

function toScreenX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toScreenY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toPlaneX(px) { return AXIS_MIN + (px - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotSize = min(canvasWidth - 2 * margin, drawHeight - 130);
  plotLeft = (canvasWidth - plotSize) / 2;
  plotTop = 55;

  // gridlines
  stroke(215);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toScreenX(i), plotTop, toScreenX(i), plotTop + plotSize);
    line(plotLeft, toScreenY(i), plotLeft + plotSize, toScreenY(i));
  }
  // axes
  stroke('black');
  strokeWeight(2);
  line(toScreenX(0), plotTop, toScreenX(0), plotTop + plotSize);
  line(plotLeft, toScreenY(0), plotLeft + plotSize, toScreenY(0));
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 5) {
    if (i !== 0) text(i, toScreenX(i), toScreenY(0) + 4);
  }

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Vertical Line Test', canvasWidth / 2, 8);

  // curve in maroon: sample x finely, plot each y branch
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  let curve = CURVES[curveIndex];
  // draw as points to handle multi-valued curves cleanly
  for (let px = plotLeft; px <= plotLeft + plotSize; px += 1.5) {
    let gx = toPlaneX(px);
    for (let gy of curve.ys(gx)) {
      if (gy >= AXIS_MIN && gy <= AXIS_MAX) {
        point(px, toScreenY(gy));
      }
    }
  }

  // auto-sweep animation
  if (sweeping) {
    lineX += 0.06;
    if (lineX >= AXIS_MAX) { lineX = AXIS_MAX; sweeping = false; }
  }

  // count intersections at the test line
  let hits = curve.ys(lineX).filter(y => y >= AXIS_MIN && y <= AXIS_MAX);
  if (hits.length >= 2 && failedAt === null) {
    failedAt = Math.round(lineX * 10) / 10;
  }

  // vertical test line in cyan
  stroke(CYAN);
  strokeWeight(3);
  let lx = toScreenX(lineX);
  line(lx, plotTop, lx, plotTop + plotSize);
  // drag handle
  fill(CYAN);
  noStroke();
  circle(lx, plotTop + plotSize + 12, 18);
  // intersection markers
  for (let gy of hits) {
    stroke('black');
    strokeWeight(2);
    fill('gold');
    circle(lx, toScreenY(gy), 14);
  }
  noStroke();

  // intersection counter, top right
  fill('black');
  textSize(18);
  textAlign(RIGHT, TOP);
  text('Intersections: ' + hits.length, canvasWidth - margin, 40);

  // banner at the bottom
  let bannerY = plotTop + plotSize + 28;
  let ok = failedAt === null;
  noStroke();
  fill(ok ? color(210, 240, 210) : color(250, 215, 215));
  rect(margin, bannerY, canvasWidth - 2 * margin, 34, 8);
  fill(ok ? color(0, 110, 0) : color(160, 0, 0));
  textSize(17);
  textAlign(CENTER, CENTER);
  text(ok ? 'Function so far — every tested line crosses at most once'
          : 'Not a function — more than one output at x = ' + failedAt,
       canvasWidth / 2, bannerY + 17);

  // control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Drag the cyan line or use Auto-sweep', 425, drawHeight + 22);
}

function mousePressed() {
  if (abs(mouseX - toScreenX(lineX)) < 15 &&
      mouseY > plotTop && mouseY < plotTop + plotSize + 25) {
    draggingLine = true;
    sweeping = false;
  }
}

function mouseDragged() {
  if (draggingLine) {
    lineX = constrain(toPlaneX(mouseX), AXIS_MIN, AXIS_MAX);
  }
}

function mouseReleased() {
  draggingLine = false;
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
