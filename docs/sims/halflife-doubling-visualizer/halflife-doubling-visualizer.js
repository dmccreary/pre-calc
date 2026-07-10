// Half-Life and Doubling Visualizer MicroSim
// CANVAS_HEIGHT: 502
// Step through half-life or doubling-time cycles one at a time; bars show
// the value at each completed cycle with the continuous curve overlaid.
// Bloom's Level: Apply — compute remaining or accumulated amounts after n cycles.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 380;
let controlHeight = 120; // 3 rows: mode radio + step button, two sliders
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const MAX_CYCLES = 8;

let cycles = 1;   // how many cycles are currently shown

let modeRadio;
let stepButton, resetButton;
let initSlider, tSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  modeRadio = createRadio();
  modeRadio.parent(mainElement);
  modeRadio.option('half-life', 'Half-Life');
  modeRadio.option('doubling', 'Doubling Time');
  modeRadio.selected('half-life');
  modeRadio.position(10, drawHeight + 10);
  modeRadio.style('font-size', '15px');
  modeRadio.changed(() => { cycles = 1; });

  stepButton = createButton('Step Forward');
  stepButton.parent(mainElement);
  stepButton.position(300, drawHeight + 8);
  stepButton.mousePressed(() => { cycles = min(MAX_CYCLES, cycles + 1); });

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(415, drawHeight + 8);
  resetButton.mousePressed(() => { cycles = 1; });

  initSlider = createSlider(1, 100, 80, 1);
  initSlider.parent(mainElement);
  initSlider.position(sliderLeftMargin, drawHeight + 45);
  initSlider.size(canvasWidth - sliderLeftMargin - margin);

  tSlider = createSlider(1, 10, 3, 1);
  tSlider.parent(mainElement);
  tSlider.position(sliderLeftMargin, drawHeight + 80);
  tSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Bar chart of an exponential process at each completed half-life or doubling time, with the continuous exponential curve drawn through the bar tops and a status line giving the fraction remaining or growth factor.', LABEL);
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

  let isHalf = modeRadio.value() === 'half-life';
  let a0 = initSlider.value();
  let T = tSlider.value();
  let factor = isHalf ? 0.5 : 2;

  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text(isHalf ? 'Half-Life: cut in half every T' : 'Doubling Time: double every T',
       canvasWidth / 2, 8);

  // value at cycle n
  let valAt = n => a0 * Math.pow(factor, n);
  let maxVal = isHalf ? a0 : valAt(cycles);
  let yTop = maxVal * 1.15;

  let plotLeft = margin + 45;
  let plotTop = 60;
  let plotW = canvasWidth - plotLeft - margin - 15;
  let plotH = drawHeight - 150;
  let toSX = n => map(n, -0.5, MAX_CYCLES + 0.5, plotLeft, plotLeft + plotW);
  let toSY = v => map(v, 0, yTop, plotTop + plotH, plotTop);

  // axes
  stroke('black');
  strokeWeight(1.5);
  line(plotLeft, plotTop + plotH, plotLeft + plotW, plotTop + plotH);
  line(plotLeft, plotTop, plotLeft, plotTop + plotH);
  noStroke();
  fill(90);
  textSize(13);
  textAlign(CENTER, TOP);
  for (let n = 0; n <= MAX_CYCLES; n++) {
    text(n === 0 ? 'start' : n + 'T', toSX(n), plotTop + plotH + 6);
  }
  textAlign(CENTER, TOP);
  text('elapsed time (T = ' + T + ' time units per cycle)', plotLeft + plotW / 2, plotTop + plotH + 26);

  // bars for completed cycles
  let barW = plotW / (MAX_CYCLES + 1) * 0.55;
  for (let n = 0; n <= cycles; n++) {
    let v = valAt(n);
    if (v > yTop) continue;
    stroke('black');
    strokeWeight(1);
    fill(n === cycles ? MAROON : color(178, 132, 145));
    rect(toSX(n) - barW / 2, toSY(v), barW, toSY(0) - toSY(v));
    noStroke();
    fill('black');
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text(nf(v, 0, v < 1 ? 2 : 1), toSX(n), toSY(v) - 3);
  }

  // continuous exponential curve through the bar tops
  stroke(CYAN);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let n = 0; n <= cycles; n += 0.05) {
    let v = valAt(n);
    if (v <= yTop) vertex(toSX(n), toSY(v));
  }
  endShape();
  noStroke();

  // status line
  let frac = Math.pow(factor, cycles);
  let fracStr = isHalf ?
    '(1/2)^' + cycles + ' = ' + (cycles <= 6 ? '1/' + Math.pow(2, cycles) : nf(frac, 0, 4)) :
    '2^' + cycles + ' = ' + Math.pow(2, cycles);
  fill(MAROON);
  textSize(17);
  textAlign(CENTER, TOP);
  text('After ' + cycles + (isHalf ? ' half-lives' : ' doublings') +
       ' (' + cycles * T + ' time units): ' +
       (isHalf ? 'fraction remaining = ' : 'growth factor = ') + fracStr +
       '  →  value = ' + nf(valAt(cycles), 0, valAt(cycles) < 1 ? 2 : 1),
       canvasWidth / 2, plotTop + plotH + 48);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Initial value = ' + a0, 10, drawHeight + 55);
  text('Cycle length T = ' + T, 10, drawHeight + 90);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  initSlider.size(canvasWidth - sliderLeftMargin - margin);
  tSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
