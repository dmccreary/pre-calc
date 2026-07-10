// Sinusoidal Parameter Explorer MicroSim
// CANVAS_HEIGHT: 542
// Four sliders isolate the roles of A, B, C, D in y = A sin(Bθ − C) + D,
// with the reference sine curve, midline, amplitude and period bars shown.
// Bloom's Level: Apply — demonstrate each parameter's independent effect.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 420;
let controlHeight = 120; // 3 rows: A+C sliders, B+D sliders, reset button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const T_MIN = -2 * Math.PI, T_MAX = 2 * Math.PI;
const Y_MIN = -6, Y_MAX = 6;

let aSlider, bSlider, cSlider, dSlider;
let resetButton;
let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aSlider = createSlider(-3, 3, 1, 0.1);
  aSlider.parent(mainElement);
  bSlider = createSlider(0.25, 4, 1, 0.25);
  bSlider.parent(mainElement);
  cSlider = createSlider(-PI, PI, 0, PI / 12);
  cSlider.parent(mainElement);
  dSlider = createSlider(-3, 3, 0, 0.1);
  dSlider.parent(mainElement);

  resetButton = createButton('Reset to y = sin(θ)');
  resetButton.parent(mainElement);
  resetButton.position(10, drawHeight + 82);
  resetButton.mousePressed(() => {
    aSlider.value(1); bSlider.value(1); cSlider.value(0); dSlider.value(0);
  });

  positionSliders();
  describe('The transformed sine curve y equals A sine of B theta minus C plus D in maroon over the plain sine reference in gray, with a gold dashed midline, amplitude and period measurement bars, and the live equation.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(110, half - 180);
  aSlider.position(105, drawHeight + 10);
  aSlider.size(sw);
  bSlider.position(105, drawHeight + 45);
  bSlider.size(sw);
  cSlider.position(half + 105, drawHeight + 10);
  cSlider.size(sw);
  dSlider.position(half + 105, drawHeight + 45);
  dSlider.size(sw);
}

function toSX(t) { return map(t, T_MIN, T_MAX, plotLeft, plotLeft + plotW); }
function toSY(y) { return map(y, Y_MIN, Y_MAX, plotTop + plotH, plotTop); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotLeft = margin + 25;
  plotTop = 46;
  plotW = canvasWidth - plotLeft - margin - 15;
  plotH = drawHeight - 120;

  let A = aSlider.value(), B = bSlider.value(), C = cSlider.value(), D = dSlider.value();
  if (abs(C) < 1e-9) C = 0; // avoid "-0.00" from slider step rounding

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Sinusoidal Parameter Explorer', canvasWidth / 2, 4);

  // grid with π/2 ticks
  stroke(226);
  strokeWeight(1);
  const TICKS = ['−2π', '−3π/2', '−π', '−π/2', '0', 'π/2', 'π', '3π/2', '2π'];
  for (let k = -4; k <= 4; k++) {
    let t = k * PI / 2;
    line(toSX(t), plotTop, toSX(t), plotTop + plotH);
  }
  for (let y = Y_MIN; y <= Y_MAX; y++) line(plotLeft, toSY(y), plotLeft + plotW, toSY(y));
  stroke('black');
  strokeWeight(1.8);
  line(toSX(0), plotTop, toSX(0), plotTop + plotH);
  line(plotLeft, toSY(0), plotLeft + plotW, toSY(0));
  noStroke();
  fill(90);
  textSize(12);
  textAlign(CENTER, TOP);
  for (let k = -4; k <= 4; k++) {
    text(TICKS[k + 4], toSX(k * PI / 2), toSY(0) + 4);
  }

  // reference curve
  stroke(170);
  strokeWeight(1.8);
  noFill();
  beginShape();
  for (let t = T_MIN; t <= T_MAX; t += 0.03) vertex(toSX(t), toSY(sin(t)));
  endShape();

  // midline
  stroke(GOLD);
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(plotLeft, toSY(D), plotLeft + plotW, toSY(D));
  drawingContext.setLineDash([]);
  noStroke();
  fill(GOLD);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('midline y = ' + nf(D, 0, 1), plotLeft + 6, toSY(D) - 4);

  // transformed curve
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let t = T_MIN; t <= T_MAX; t += 0.02) {
    vertex(toSX(t), toSY(constrain(A * sin(B * t - C) + D, Y_MIN, Y_MAX)));
  }
  endShape();
  noStroke();

  // amplitude bar on the right edge
  stroke(MAROON);
  strokeWeight(3);
  let ax = plotLeft + plotW + 8;
  line(ax, toSY(D), ax, toSY(D + A));
  line(ax - 4, toSY(D), ax + 4, toSY(D));
  line(ax - 4, toSY(D + A), ax + 4, toSY(D + A));
  noStroke();

  // period bar across the top
  let period = TWO_PI / abs(B);
  let pStart = C / B; // a peak-aligned reference; use phase start
  stroke(CYAN_COLOR());
  strokeWeight(3);
  let py = plotTop + 10;
  if (pStart + period <= T_MAX) {
    line(toSX(pStart), py, toSX(pStart + period), py);
    line(toSX(pStart), py - 4, toSX(pStart), py + 4);
    line(toSX(pStart + period), py - 4, toSX(pStart + period), py + 4);
    noStroke();
    fill('#0090c0');
    textSize(13);
    textAlign(CENTER, BOTTOM);
    text('period = ' + nf(period, 0, 2), toSX(pStart + period / 2), py - 3);
  }
  noStroke();

  // live equation + computed values
  fill(MAROON);
  textSize(17);
  textAlign(LEFT, TOP);
  text('y = ' + nf(A, 0, 1) + ' sin(' + nf(B, 0, 2) + 'θ − ' + nf(C, 0, 2) + ') + ' + nf(D, 0, 1),
       plotLeft, plotTop + plotH + 8);
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('amplitude |A| = ' + nf(abs(A), 0, 1) + '    period 2π/|B| = ' + nf(period, 0, 2) +
       '    phase shift C/B = ' + nf(C / B, 0, 2) + '    midline y = ' + nf(D, 0, 1),
       plotLeft, plotTop + plotH + 36);

  // slider labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('A = ' + nf(A, 0, 1), 10, drawHeight + 20);
  text('B = ' + nf(B, 0, 2), 10, drawHeight + 55);
  text('C = ' + nf(C, 0, 2), canvasWidth / 2 + 10, drawHeight + 20);
  text('D = ' + nf(D, 0, 1), canvasWidth / 2 + 10, drawHeight + 55);
}

function CYAN_COLOR() { return color(0, 144, 192); }

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
