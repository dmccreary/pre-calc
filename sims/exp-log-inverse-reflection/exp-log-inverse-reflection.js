// Exponential-Log Inverse Reflection MicroSim
// CANVAS_HEIGHT: 682
// y = bˣ and y = log_b(x) mirrored across y = x, with a draggable point and
// an asymptote trace showing y = 0 becoming x = 0.
// Bloom's Level: Understand — the log is the exponential reflected across y = x.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 80; // 2 rows: base slider, checkbox + button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const CYAN = '#00BFFF';
const AXIS_MIN = -5, AXIS_MAX = 8;

let pointA = 1.2;        // parameter: point on exponential at (a, b^a)
let draggingPoint = false;
let showAsymptotes = false;

let baseSlider;
let diagonalCheckbox;
let asymptoteButton;

let plotLeft, plotTop, plotSize;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  baseSlider = createSlider(1.1, 5, 2, 0.1);
  baseSlider.parent(mainElement);
  baseSlider.position(sliderLeftMargin, drawHeight + 10);
  baseSlider.size(canvasWidth - sliderLeftMargin - margin);

  diagonalCheckbox = createCheckbox('Show y = x', true);
  diagonalCheckbox.parent(mainElement);
  diagonalCheckbox.position(10, drawHeight + 45);

  asymptoteButton = createButton('Trace Asymptotes');
  asymptoteButton.parent(mainElement);
  asymptoteButton.position(135, drawHeight + 43);
  asymptoteButton.mousePressed(() => { showAsymptotes = !showAsymptotes; });

  describe('The exponential y equals b to the x in maroon and its inverse, the logarithm base b, in gold, reflected across the dashed line y equals x. A draggable point on the exponential mirrors onto the logarithm.', LABEL);
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toGX(sx) { return AXIS_MIN + (sx - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }

function plotFn(fn, col) {
  stroke(col);
  strokeWeight(3);
  noFill();
  let inSeg = false;
  beginShape();
  for (let gx = AXIS_MIN; gx <= AXIS_MAX; gx += 0.02) {
    let gy = fn(gx);
    if (isFinite(gy) && gy >= AXIS_MIN - 1 && gy <= AXIS_MAX + 1) {
      vertex(toSX(gx), toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
      inSeg = true;
    } else if (inSeg) { endShape(); beginShape(); inSeg = false; }
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

  plotSize = min(canvasWidth - 2 * margin, drawHeight - 90);
  plotLeft = (canvasWidth - plotSize) / 2;
  plotTop = 50;

  let b = baseSlider.value();

  // grid + axes
  stroke(224);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i++) {
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
  text('Exponential and Logarithm: Inverse Reflection', canvasWidth / 2, 8);

  // asymptote trace
  if (showAsymptotes) {
    stroke(CYAN);
    strokeWeight(4);
    line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));   // y = 0 for exponential
    line(toSX(0), plotTop, toSX(0), plotTop + plotSize);     // x = 0 for logarithm
    noStroke();
    fill(CYAN);
    textSize(14);
    textAlign(LEFT, BOTTOM);
    text('y = 0: horizontal asymptote of bˣ', toSX(2.6), toSY(0) - 6);
    push();
    translate(toSX(0) + 16, toSY(-2.2));
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('x = 0: vertical asymptote of log_b(x)', 0, 0);
    pop();
  }

  // diagonal
  if (diagonalCheckbox.checked()) {
    stroke(120);
    strokeWeight(1.8);
    drawingContext.setLineDash([8, 6]);
    let lo = AXIS_MIN, hi = AXIS_MAX;
    line(toSX(lo), toSY(lo), toSX(hi), toSY(hi));
    drawingContext.setLineDash([]);
    noStroke();
    fill(120);
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text('y = x', toSX(6.4), toSY(7));
  }

  // curves
  plotFn(x => Math.pow(b, x), MAROON);
  plotFn(x => x <= 0 ? NaN : Math.log(x) / Math.log(b), GOLD);

  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('y = ' + nf(b, 0, 1) + 'ˣ', plotLeft + 12, plotTop + 6);
  fill(GOLD);
  text('y = log base ' + nf(b, 0, 1) + ' of x', plotLeft + 12, plotTop + 28);

  // draggable point and mirror
  let a = pointA;
  let ya = Math.pow(b, a);
  if (ya <= AXIS_MAX && ya >= AXIS_MIN) {
    stroke(CYAN);
    strokeWeight(1.8);
    drawingContext.setLineDash([3, 5]);
    line(toSX(a), toSY(ya), toSX(ya), toSY(a));
    drawingContext.setLineDash([]);
    stroke('black');
    strokeWeight(2);
    fill(MAROON);
    circle(toSX(a), toSY(ya), 15);
    fill(GOLD);
    circle(toSX(ya), toSY(a), 15);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, BOTTOM);
    text('(' + nf(a, 0, 1) + ', ' + nf(ya, 0, 1) + ')', toSX(a) + 10, toSY(ya) - 5);
    text('(' + nf(ya, 0, 1) + ', ' + nf(a, 0, 1) + ')', toSX(ya) + 10, toSY(a) - 5);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('base b = ' + nf(baseSlider.value(), 0, 1), 10, drawHeight + 20);
}

function mousePressed() {
  let b = baseSlider.value();
  let ya = Math.pow(b, pointA);
  if (dist(mouseX, mouseY, toSX(pointA), toSY(constrain(ya, AXIS_MIN, AXIS_MAX))) < 16) {
    draggingPoint = true;
  }
}

function mouseDragged() {
  if (draggingPoint) {
    let b = baseSlider.value();
    let gx = constrain(toGX(mouseX), AXIS_MIN, AXIS_MAX);
    // keep b^a within the window
    let maxA = Math.log(AXIS_MAX) / Math.log(b);
    pointA = constrain(gx, AXIS_MIN, maxA);
  }
}

function mouseReleased() {
  draggingPoint = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  baseSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
