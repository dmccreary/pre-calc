// Semilog Linearization MicroSim
// CANVAS_HEIGHT: 502
// The same exponential data on linear axes (curved) and on a semi-log plot
// (straight), with slope and intercept recovering log b and log a.
// Bloom's Level: Analyze — a log axis turns exponential growth into a line.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 380;
let controlHeight = 120; // 3 rows: a slider, b slider, noise checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 220;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const X_MAX = 20;

let aSlider, bSlider;
let noiseCheckbox;
let noiseFactors = [];   // fixed multiplicative noise per point

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aSlider = createSlider(1, 50, 5, 1);
  aSlider.parent(mainElement);
  aSlider.position(sliderLeftMargin, drawHeight + 10);
  aSlider.size(canvasWidth - sliderLeftMargin - margin);

  bSlider = createSlider(1.05, 1.5, 1.3, 0.01);
  bSlider.parent(mainElement);
  bSlider.position(sliderLeftMargin, drawHeight + 45);
  bSlider.size(canvasWidth - sliderLeftMargin - margin);

  noiseCheckbox = createCheckbox('Add noise to the data', false);
  noiseCheckbox.parent(mainElement);
  noiseCheckbox.position(10, drawHeight + 82);
  noiseCheckbox.changed(regenNoise);

  regenNoise();
  describe('Two plots of the same exponential data: on the left with linear axes the points bend upward; on the right with a logarithmic vertical axis the same points form a straight gold line whose slope is log b and intercept is log a.', LABEL);
}

function regenNoise() {
  noiseFactors = [];
  for (let i = 0; i <= 10; i++) {
    noiseFactors.push(Math.exp(randomGaussian(0, 0.12)));
  }
}

function dataPoints() {
  let a = aSlider.value(), b = bSlider.value();
  let useNoise = noiseCheckbox.checked();
  let pts = [];
  for (let i = 0; i <= 10; i++) {
    let x = i * 2;
    let y = a * Math.pow(b, x) * (useNoise ? noiseFactors[i] : 1);
    pts.push({ x, y });
  }
  return pts;
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
  text('Semi-log Linearization: Same Data, Two Views', canvasWidth / 2, 4);

  let a = aSlider.value(), b = bSlider.value();
  let pts = dataPoints();
  let half = canvasWidth / 2;
  let pt = 55, ph = drawHeight - 130;

  // LEFT: linear axes ------------------------------------------------------
  let lX = margin + 20, lW = half - margin - 50;
  let toLX = x => map(x, 0, X_MAX, lX, lX + lW);
  let toLY = y => map(y, 0, 1000, pt + ph, pt);

  stroke(226);
  strokeWeight(1);
  for (let v = 0; v <= 1000; v += 250) line(lX, toLY(v), lX + lW, toLY(v));
  stroke('black');
  strokeWeight(1.5);
  line(lX, pt + ph, lX + lW, pt + ph);
  line(lX, pt, lX, pt + ph);
  noStroke();
  fill(90);
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let v = 0; v <= 1000; v += 250) text(v, lX - 4, toLY(v));

  // curve + points
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let x = 0; x <= X_MAX; x += 0.2) {
    let y = a * Math.pow(b, x);
    if (y <= 1000) vertex(toLX(x), toLY(y));
  }
  endShape();
  noStroke();
  for (let p of pts) {
    if (p.y <= 1000) {
      stroke('black');
      strokeWeight(1);
      fill(MAROON);
      circle(toLX(p.x), toLY(p.y), 8);
    }
  }
  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Linear axes: the curve bends', lX + lW / 2, pt + ph + 10);

  // RIGHT: semi-log axes ---------------------------------------------------
  let rX = half + 45, rW = half - margin - 60;
  let toRX = x => map(x, 0, X_MAX, rX, rX + rW);
  let toRY = logy => map(logy, 0, 3, pt + ph, pt);   // log10 y from 0 (=1) to 3 (=1000)

  stroke(226);
  strokeWeight(1);
  for (let d = 0; d <= 3; d++) line(rX, toRY(d), rX + rW, toRY(d));
  stroke('black');
  strokeWeight(1.5);
  line(rX, pt + ph, rX + rW, pt + ph);
  line(rX, pt, rX, pt + ph);
  noStroke();
  fill(90);
  textSize(12);
  textAlign(RIGHT, CENTER);
  ['1', '10', '100', '1000'].forEach((lbl, d) => text(lbl, rX - 4, toRY(d)));

  // straight line through the log-transformed model
  stroke(GOLD);
  strokeWeight(2.5);
  let ly0 = Math.log10(a);
  let ly1 = Math.log10(a) + X_MAX * Math.log10(b);
  line(toRX(0), toRY(constrain(ly0, 0, 3)), toRX(X_MAX), toRY(constrain(ly1, 0, 3)));
  noStroke();
  for (let p of pts) {
    let ly = Math.log10(max(p.y, 1));
    if (ly <= 3) {
      stroke('black');
      strokeWeight(1);
      fill(GOLD);
      circle(toRX(p.x), toRY(ly), 8);
    }
  }
  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Log vertical axis: the same data straightens', rX + rW / 2, pt + ph + 10);

  // annotations: slope and intercept
  fill(GOLD);
  textSize(14);
  textAlign(LEFT, TOP);
  text('slope = log b = ' + nf(Math.log10(b), 0, 3), rX + 12, pt + 6);
  text('intercept = log a = ' + nf(Math.log10(a), 0, 2), rX + 12, pt + 26);
  fill(MAROON);
  text('recovered: y = ' + a + ' · ' + nf(b, 0, 2) + 'ˣ', rX + 12, pt + 46);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('initial value a = ' + a, 10, drawHeight + 20);
  text('growth factor b = ' + nf(b, 0, 2), 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  aSlider.size(canvasWidth - sliderLeftMargin - margin);
  bSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
