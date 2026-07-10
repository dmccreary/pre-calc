// Sinusoidal Model Builder MicroSim
// CANVAS_HEIGHT: 552
// Fit y = A sin(B(x − C)) + D to real-world data by hand; the SSE readout
// scores the fit, and Show Best Fit reveals the target parameters.
// Bloom's Level: Apply — construct a sinusoidal model matching data.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 430;
let controlHeight = 120; // 3 rows: A+C sliders, B+D sliders, preset select + button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const DATA_COLOR = '#2b5fc7';
const X_MAX = 24;

// preset data-generating models: y = A sin(B(x − C)) + D
const PRESETS = [
  { label: 'Tide height (ft)', A: 6, B: 2 * Math.PI / 12.4, C: 2, D: 50, noise: 1.2 },
  { label: 'Temperature (°F)', A: 12, B: 2 * Math.PI / 24, C: 9, D: 65, noise: 1.5 },
  { label: 'Daylight (h ×4)', A: 16, B: 2 * Math.PI / 24, C: 4, D: 48, noise: 1.0 }
];

let presetIndex = 0;
let data = [];
let showBest = false;

let aSlider, bSlider, cSlider, dSlider;
let presetSelect, bestFitButton;
let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aSlider = createSlider(0, 20, 4, 0.1);
  aSlider.parent(mainElement);
  bSlider = createSlider(0.1, 3, 0.4, 0.05);
  bSlider.parent(mainElement);
  cSlider = createSlider(0, 24, 0, 0.25);
  cSlider.parent(mainElement);
  dSlider = createSlider(0, 100, 50, 0.5);
  dSlider.parent(mainElement);

  presetSelect = createSelect();
  presetSelect.parent(mainElement);
  presetSelect.position(10, drawHeight + 82);
  PRESETS.forEach(p => presetSelect.option(p.label));
  presetSelect.changed(() => {
    presetIndex = PRESETS.findIndex(p => p.label === presetSelect.value());
    makeData();
  });

  bestFitButton = createButton('Show Best Fit');
  bestFitButton.parent(mainElement);
  bestFitButton.position(200, drawHeight + 80);
  bestFitButton.mousePressed(() => {
    let P = PRESETS[presetIndex];
    aSlider.value(P.A); bSlider.value(P.B); cSlider.value(P.C); dSlider.value(P.D);
    showBest = true;
  });

  positionSliders();
  makeData();
  describe('Scatterplot of periodic data with a student-controlled sinusoid. Four sliders set amplitude, frequency, phase, and vertical shift; a live sum-of-squared-errors readout scores the fit and a button reveals the best-fit parameters.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(110, half - 190);
  aSlider.position(110, drawHeight + 10);
  aSlider.size(sw);
  bSlider.position(110, drawHeight + 45);
  bSlider.size(sw);
  cSlider.position(half + 110, drawHeight + 10);
  cSlider.size(sw);
  dSlider.position(half + 110, drawHeight + 45);
  dSlider.size(sw);
}

function makeData() {
  let P = PRESETS[presetIndex];
  data = [];
  for (let i = 0; i <= 16; i++) {
    let x = i * 1.5;
    let y = P.A * Math.sin(P.B * (x - P.C)) + P.D + randomGaussian(0, P.noise);
    data.push({ x, y });
  }
  showBest = false;
}

function modelValue(x) {
  return aSlider.value() * Math.sin(bSlider.value() * (x - cSlider.value())) + dSlider.value();
}

function toSX(x) { return map(x, 0, X_MAX, plotLeft, plotLeft + plotW); }
function toSY(y) { return map(y, 0, 100, plotTop + plotH, plotTop); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotLeft = margin + 30;
  plotTop = 46;
  plotW = canvasWidth - plotLeft - margin - 15;
  plotH = drawHeight - 130;

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Sinusoidal Model Builder', canvasWidth / 2, 4);

  // grid + axes
  stroke(226);
  strokeWeight(1);
  for (let y = 0; y <= 100; y += 20) line(plotLeft, toSY(y), plotLeft + plotW, toSY(y));
  for (let x = 0; x <= X_MAX; x += 4) line(toSX(x), plotTop, toSX(x), plotTop + plotH);
  stroke('black');
  strokeWeight(1.5);
  line(plotLeft, plotTop + plotH, plotLeft + plotW, plotTop + plotH);
  line(plotLeft, plotTop, plotLeft, plotTop + plotH);
  noStroke();
  fill(90);
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let y = 0; y <= 100; y += 20) text(y, plotLeft - 4, toSY(y));
  textAlign(CENTER, TOP);
  for (let x = 0; x <= X_MAX; x += 4) text(x, toSX(x), plotTop + plotH + 5);

  let A = aSlider.value(), B = bSlider.value(), C = cSlider.value(), D = dSlider.value();

  // midline
  stroke(GOLD);
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(plotLeft, toSY(D), plotLeft + plotW, toSY(D));
  drawingContext.setLineDash([]);
  noStroke();

  // model curve
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let x = 0; x <= X_MAX; x += 0.1) {
    vertex(toSX(x), toSY(constrain(modelValue(x), 0, 100)));
  }
  endShape();
  noStroke();

  // peak/trough markers of the model
  if (B > 0 && A > 0) {
    stroke(160);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    let peakX = C + (PI / 2) / B;
    while (peakX < 0) peakX += TWO_PI / B;
    for (let x = peakX; x <= X_MAX; x += TWO_PI / B) {
      line(toSX(x), plotTop, toSX(x), plotTop + plotH);
    }
    drawingContext.setLineDash([]);
    noStroke();
  }

  // data points
  for (let p of data) {
    stroke('black');
    strokeWeight(1);
    fill(DATA_COLOR);
    circle(toSX(p.x), toSY(constrain(p.y, 0, 100)), 9);
  }
  noStroke();

  // SSE readout
  let sse = data.reduce((s, p) => s + (p.y - modelValue(p.x)) ** 2, 0);
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('y = ' + nf(A, 0, 1) + ' sin(' + nf(B, 0, 2) + '(x − ' + nf(C, 0, 1) + ')) + ' + nf(D, 0, 1) +
       '     period = ' + nf(TWO_PI / B, 0, 1), plotLeft, drawHeight - 54);
  fill(sse < data.length * 4 ? 'green' : 'black');
  text('Sum of squared errors: ' + nf(sse, 0, 1) +
       (sse < data.length * 4 ? '  — excellent fit!' : ''), plotLeft, drawHeight - 30);
  if (showBest) {
    let P = PRESETS[presetIndex];
    fill(90);
    textSize(14);
    textAlign(RIGHT, TOP);
    text('best fit: A=' + P.A + ', B=' + nf(P.B, 0, 2) + ', C=' + P.C + ', D=' + P.D,
         plotLeft + plotW, drawHeight - 30);
  }

  // slider labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('A = ' + nf(A, 0, 1), 10, drawHeight + 20);
  text('B = ' + nf(B, 0, 2), 10, drawHeight + 55);
  text('C = ' + nf(C, 0, 1), canvasWidth / 2 + 10, drawHeight + 20);
  text('D = ' + nf(D, 0, 1), canvasWidth / 2 + 10, drawHeight + 55);
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
