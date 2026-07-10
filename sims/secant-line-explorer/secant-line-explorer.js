// Secant Line Explorer MicroSim
// CANVAS_HEIGHT: 570
// Two points slide along a curve; the secant line through them and the full
// slope computation (Δy, Δx, m) update live.
// Bloom's Level: Understand — interpret average rate of change as secant slope.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 120; // 3 rows: select+button, x1 slider, x2 slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -10, AXIS_MAX = 10;

const CURVES = [
  { label: 'f(x) = x²',   fn: x => x * x },
  { label: 'f(x) = x³',   fn: x => x * x * x },
  { label: 'f(x) = √x',   fn: x => x < 0 ? NaN : Math.sqrt(x) },
  { label: 'f(x) = 2^x',  fn: x => Math.pow(2, x) },
  { label: 'f(x) = sin(x)', fn: x => Math.sin(x) }
];

let curveIndex = 0;
let targetSlope = null;
let plotLeft, plotTop, plotSize;

let curveSelect;
let targetButton;
let x1Slider, x2Slider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  curveSelect = createSelect();
  curveSelect.parent(mainElement);
  curveSelect.position(10, drawHeight + 8);
  CURVES.forEach(c => curveSelect.option(c.label));
  curveSelect.changed(() => {
    curveIndex = CURVES.findIndex(c => c.label === curveSelect.value());
    targetSlope = null;
  });

  targetButton = createButton('Match Target');
  targetButton.parent(mainElement);
  targetButton.position(160, drawHeight + 8);
  targetButton.mousePressed(() => {
    targetSlope = floor(random(-3, 4));
    if (targetSlope === 0) targetSlope = 3;
  });

  x1Slider = createSlider(-10, 10, -2, 0.5);
  x1Slider.parent(mainElement);
  x1Slider.position(sliderLeftMargin, drawHeight + 40);
  x1Slider.size(canvasWidth - sliderLeftMargin - margin);

  x2Slider = createSlider(-10, 10, 3, 0.5);
  x2Slider.parent(mainElement);
  x2Slider.position(sliderLeftMargin, drawHeight + 75);
  x2Slider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A curve with two draggable points and the secant line through them. A readout shows both coordinates, delta y, delta x, and the resulting slope, updating live as the points move.', LABEL);
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }

function fmt(v) { return isFinite(v) ? nf(v, 0, 2) : '—'; }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotSize = min(canvasWidth * 0.55, drawHeight - 70);
  plotLeft = margin;
  plotTop = 50;

  // grid
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

  // title (offset left since readout panel is on the right)
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Secant Line Explorer', canvasWidth * 0.35, 8);

  // curve
  let f = CURVES[curveIndex].fn;
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  let drawing = false;
  beginShape();
  for (let gx = AXIS_MIN; gx <= AXIS_MAX; gx += 0.05) {
    let gy = f(gx);
    if (isFinite(gy) && gy >= AXIS_MIN - 2 && gy <= AXIS_MAX + 2) {
      vertex(toSX(gx), toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
      drawing = true;
    } else if (drawing) {
      endShape();
      beginShape();
      drawing = false;
    }
  }
  endShape();

  let x1 = x1Slider.value(), x2 = x2Slider.value();
  let y1 = f(x1), y2 = f(x2);
  let dy = y2 - y1, dx = x2 - x1;
  let m = dx === 0 ? NaN : dy / dx;

  // secant line extended across the plot, clipped to the plot rectangle
  if (isFinite(y1) && isFinite(y2) && dx !== 0) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(plotLeft, plotTop, plotSize, plotSize);
    drawingContext.clip();
    stroke(CYAN);
    strokeWeight(2.5);
    let yA = y1 + m * (AXIS_MIN - x1);
    let yB = y1 + m * (AXIS_MAX - x1);
    line(toSX(AXIS_MIN), toSY(yA), toSX(AXIS_MAX), toSY(yB));
    drawingContext.restore();
  }

  // the two points
  for (let [px, py, lbl] of [[x1, y1, 'P₁'], [x2, y2, 'P₂']]) {
    if (isFinite(py) && py >= AXIS_MIN && py <= AXIS_MAX) {
      stroke('black');
      strokeWeight(2);
      fill('gold');
      circle(toSX(px), toSY(py), 16);
      noStroke();
      fill('black');
      textSize(15);
      textAlign(LEFT, BOTTOM);
      text(lbl, toSX(px) + 10, toSY(py) - 6);
    }
  }

  // readout panel on the right
  let rpX = plotLeft + plotSize + 20;
  let rpW = canvasWidth - rpX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 230);
  rect(rpX, plotTop, rpW, 240, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Average Rate of Change', rpX + 14, plotTop + 10);
  fill('black');
  textSize(16);
  let ry = plotTop + 42;
  text('P₁ = (' + fmt(x1) + ', ' + fmt(y1) + ')', rpX + 14, ry);
  text('P₂ = (' + fmt(x2) + ', ' + fmt(y2) + ')', rpX + 14, ry + 28);
  text('Δy = y₂ − y₁ = ' + fmt(dy), rpX + 14, ry + 64);
  text('Δx = x₂ − x₁ = ' + fmt(dx), rpX + 14, ry + 92);
  fill(MAROON);
  textSize(19);
  text('m = Δy / Δx = ' + fmt(m), rpX + 14, ry + 130);

  // target challenge
  if (targetSlope !== null) {
    let hit = isFinite(m) && abs(m - targetSlope) < 0.05;
    noStroke();
    fill(hit ? color(210, 240, 210) : color(255, 248, 220));
    rect(rpX, plotTop + 250, rpW, 56, 10);
    fill(hit ? color(0, 120, 0) : color(90));
    textSize(15);
    textAlign(LEFT, TOP);
    text(hit ? 'Target matched! Secant slope = ' + targetSlope :
         'Find two points whose secant\nhas slope ' + targetSlope,
         rpX + 14, plotTop + 260);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('x₁ = ' + fmt(x1), 90, drawHeight + 50);
  text('x₂ = ' + fmt(x2), 90, drawHeight + 85);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  x1Slider.size(canvasWidth - sliderLeftMargin - margin);
  x2Slider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
