// Residuals Explorer MicroSim
// CANVAS_HEIGHT: 572
// Drag a candidate line over a scatterplot and watch the sum of squared
// residuals respond. Best Fit snaps to the least-squares solution.
// Bloom's Level: Analyze — see how residuals combine into a goodness-of-fit measure.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 50; // 1 row: 2 buttons + checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const X_MIN = 0, X_MAX = 10, Y_MIN = 0, Y_MAX = 10;

let data = [];              // {x, y}
// candidate line defined by two handle points at fixed x positions
const H1X = 1, H2X = 9;
let h1y = 3, h2y = 7;       // draggable handle heights
let dragging = null;
let animTarget = null;      // {h1, h2} when animating to best fit

let bestFitButton;
let newDataButton;
let squaresCheckbox;

let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  bestFitButton = createButton('Best Fit');
  bestFitButton.parent(mainElement);
  bestFitButton.position(10, drawHeight + 10);
  bestFitButton.mousePressed(snapToBestFit);

  newDataButton = createButton('New Data');
  newDataButton.parent(mainElement);
  newDataButton.position(90, drawHeight + 10);
  newDataButton.mousePressed(makeData);

  squaresCheckbox = createCheckbox('Show Squares', false);
  squaresCheckbox.parent(mainElement);
  squaresCheckbox.position(185, drawHeight + 12);

  makeData();
  describe('Scatterplot with a draggable candidate line. Dashed vertical segments show each residual; a readout shows slope, intercept, and the sum of squared residuals. Best Fit animates to the least-squares line.', LABEL);
}

function makeData() {
  data = [];
  let trueM = random(0.4, 0.9);
  let trueB = random(1, 3);
  for (let i = 0; i < 15; i++) {
    let x = random(0.5, 9.5);
    let y = constrain(trueM * x + trueB + randomGaussian(0, 0.9), Y_MIN + 0.2, Y_MAX - 0.2);
    data.push({ x, y });
  }
  animTarget = null;
}

function lineParams() {
  let m = (h2y - h1y) / (H2X - H1X);
  let b = h1y - m * H1X;
  return { m, b };
}

function snapToBestFit() {
  let n = data.length;
  let sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let p of data) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; }
  let m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  let b = (sy - m * sx) / n;
  animTarget = { h1: m * H1X + b, h2: m * H2X + b };
}

function toSX(gx) { return map(gx, X_MIN, X_MAX, plotLeft, plotLeft + plotW); }
function toSY(gy) { return map(gy, Y_MIN, Y_MAX, plotTop + plotH, plotTop); }
function toGY(sy) { return map(sy, plotTop + plotH, plotTop, Y_MIN, Y_MAX); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotLeft = margin + 15;
  plotTop = 55;
  plotW = canvasWidth * 0.62;
  plotH = drawHeight - 110;

  // animate toward best fit if requested
  if (animTarget) {
    h1y = lerp(h1y, animTarget.h1, 0.12);
    h2y = lerp(h2y, animTarget.h2, 0.12);
    if (abs(h1y - animTarget.h1) < 0.01 && abs(h2y - animTarget.h2) < 0.01) {
      h1y = animTarget.h1; h2y = animTarget.h2;
      animTarget = null;
    }
  }

  // grid
  stroke(225);
  strokeWeight(1);
  for (let i = 0; i <= 10; i++) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotH);
    line(plotLeft, toSY(i), plotLeft + plotW, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(plotLeft, plotTop + plotH, plotLeft + plotW, plotTop + plotH);
  line(plotLeft, plotTop, plotLeft, plotTop + plotH);

  // title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Residuals Explorer', canvasWidth * 0.35, 8);

  let { m, b } = lineParams();

  // residual segments or squares
  let ssr = 0, sr = 0;
  for (let p of data) {
    let yHat = m * p.x + b;
    let e = p.y - yHat;
    sr += e;
    ssr += e * e;
    let above = e > 0;
    if (squaresCheckbox.checked()) {
      // literal squared residual: a square of side |e| in plot units
      noStroke();
      fill(above ? color(220, 60, 60, 90) : color(60, 90, 220, 90));
      let sidePx = abs(toSY(0) - toSY(abs(e)));
      let topY = above ? toSY(p.y) : toSY(yHat);
      rect(toSX(p.x), topY, sidePx, sidePx);
    } else {
      stroke(above ? color(220, 60, 60) : color(60, 90, 220));
      strokeWeight(1.5);
      drawingContext.setLineDash([4, 3]);
      line(toSX(p.x), toSY(p.y), toSX(p.x), toSY(yHat));
      drawingContext.setLineDash([]);
    }
  }

  // data points
  for (let p of data) {
    stroke('black');
    strokeWeight(1.5);
    fill(MAROON);
    circle(toSX(p.x), toSY(p.y), 10);
  }

  // candidate line
  stroke(CYAN);
  strokeWeight(3);
  let yL = m * X_MIN + b, yR = m * X_MAX + b;
  line(toSX(X_MIN), toSY(constrain(yL, -10, 20)), toSX(X_MAX), toSY(constrain(yR, -10, 20)));

  // handles
  for (let [hx, hy] of [[H1X, h1y], [H2X, h2y]]) {
    stroke('black');
    strokeWeight(2);
    fill('gold');
    circle(toSX(hx), toSY(hy), 18);
  }
  noStroke();

  // readout panel
  let rpX = plotLeft + plotW + 25;
  let rpW = canvasWidth - rpX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(rpX, plotTop, rpW, 210, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Fit Statistics', rpX + 14, plotTop + 10);
  fill('black');
  textSize(16);
  text('slope m = ' + nf(m, 0, 2), rpX + 14, plotTop + 44);
  text('intercept b = ' + nf(b, 0, 2), rpX + 14, plotTop + 72);
  text('Σ residuals = ' + nf(sr, 0, 2), rpX + 14, plotTop + 108);
  fill(MAROON);
  textSize(19);
  text('SSR = ' + nf(ssr, 0, 2), rpX + 14, plotTop + 144);
  fill(90);
  textSize(13);
  text('Drag the gold handles to\nlower the SSR.', rpX + 14, plotTop + 174);

  // legend
  fill(60);
  textSize(13);
  textAlign(LEFT, TOP);
  text('red = point above line   blue = point below line', plotLeft, plotTop + plotH + 12);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Each residual becomes a literal square', 330, drawHeight + 22);
}

function mousePressed() {
  if (dist(mouseX, mouseY, toSX(H1X), toSY(h1y)) < 14) dragging = 'h1';
  else if (dist(mouseX, mouseY, toSX(H2X), toSY(h2y)) < 14) dragging = 'h2';
  animTarget = null;
}

function mouseDragged() {
  let gy = constrain(toGY(mouseY), Y_MIN, Y_MAX);
  if (dragging === 'h1') h1y = gy;
  else if (dragging === 'h2') h2y = gy;
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
