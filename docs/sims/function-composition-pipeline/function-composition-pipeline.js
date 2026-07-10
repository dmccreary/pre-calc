// Function Composition Pipeline MicroSim
// CANVAS_HEIGHT: 482
// A value flows left-to-right through two function boxes. Swap the order to
// see that f(g(x)) and g(f(x)) usually differ.
// Bloom's Level: Understand — the inner function runs first, its output feeds the outer.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 80; // 2 rows: x slider, swap button + pair select
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 240;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

const PAIRS = [
  { label: 'f(x) = x²,  g(x) = x + 3',
    f: x => x * x, g: x => x + 3, fStr: 'x²', gStr: 'x + 3' },
  { label: 'f(x) = √x,  g(x) = 2x',
    f: x => x < 0 ? NaN : Math.sqrt(x), g: x => 2 * x, fStr: '√x', gStr: '2x' },
  { label: 'f(x) = 1/x,  g(x) = x − 1',
    f: x => 1 / x, g: x => x - 1, fStr: '1/x', gStr: 'x − 1' }
];

let pairIndex = 0;
let swapped = false;   // false: f(g(x));  true: g(f(x))

let xSlider;
let swapButton;
let pairSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  swapButton = createButton('Swap Order');
  swapButton.parent(mainElement);
  swapButton.position(10, drawHeight + 8);
  swapButton.mousePressed(() => { swapped = !swapped; });

  pairSelect = createSelect();
  pairSelect.parent(mainElement);
  pairSelect.position(115, drawHeight + 8);
  PAIRS.forEach(p => pairSelect.option(p.label));
  pairSelect.changed(() => {
    pairIndex = PAIRS.findIndex(p => p.label === pairSelect.value());
  });

  xSlider = createSlider(-5, 5, 2, 0.1);
  xSlider.parent(mainElement);
  xSlider.position(sliderLeftMargin, drawHeight + 45);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Pipeline diagram: an input value enters the inner function box, its output feeds the outer function box, and the final composed value appears on the right. A swap button reverses the order of the two functions.', LABEL);
}

function fmt(v) {
  if (!isFinite(v)) return 'undefined';
  return '' + (Math.round(v * 1000) / 1000);
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
  textSize(24);
  text('Function Composition Pipeline', canvasWidth / 2, 10);

  let P = PAIRS[pairIndex];
  let x = xSlider.value();

  // pipeline: inner runs first
  let innerName = swapped ? 'f' : 'g';
  let outerName = swapped ? 'g' : 'f';
  let innerStr = swapped ? P.fStr : P.gStr;
  let outerStr = swapped ? P.gStr : P.fStr;
  let innerFn = swapped ? P.f : P.g;
  let outerFn = swapped ? P.g : P.f;
  let mid = innerFn(x);
  let out = outerFn(mid);

  let compLabel = outerName + '(' + innerName + '(x))';
  noStroke();
  fill(MAROON);
  textSize(19);
  textAlign(CENTER, TOP);
  text('Current composition:  ' + compLabel, canvasWidth / 2, 48);

  // layout: input chip, box1, box2, output chip on one row
  let rowY = 170;
  let boxW = min(190, canvasWidth * 0.22);
  let boxH = 95;
  let gap = (canvasWidth - 2 * margin - 2 * boxW - 140) / 3;
  let xIn = margin + 35;
  let b1x = xIn + 35 + gap;
  let b2x = b1x + boxW + gap;
  let xOut = b2x + boxW + gap + 35;

  // arrows
  stroke(CYAN);
  strokeWeight(6);
  line(xIn + 30, rowY, b1x, rowY);
  line(b1x + boxW, rowY, b2x, rowY);
  line(b2x + boxW, rowY, xOut - 32, rowY);
  // arrowheads
  noStroke();
  fill(CYAN);
  triangle(b1x, rowY - 8, b1x, rowY + 8, b1x + 12, rowY);
  triangle(b2x, rowY - 8, b2x, rowY + 8, b2x + 12, rowY);
  triangle(xOut - 32, rowY - 8, xOut - 32, rowY + 8, xOut - 20, rowY);

  // input chip
  stroke(MAROON);
  strokeWeight(2);
  fill('white');
  circle(xIn, rowY, 56);
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  text(fmt(x), xIn, rowY - 2);
  textSize(14);
  fill(90);
  text('input x', xIn, rowY + 42);

  // inner box (runs FIRST)
  stroke('black');
  strokeWeight(2);
  fill(MAROON);
  rect(b1x, rowY - boxH / 2, boxW, boxH, 12);
  noStroke();
  fill('white');
  textSize(18);
  text(innerName + '(x) = ' + innerStr, b1x + boxW / 2, rowY - 16);
  fill(255, 220, 130);
  textSize(16);
  text(innerName + '(' + fmt(x) + ') = ' + fmt(mid), b1x + boxW / 2, rowY + 16);
  fill(90);
  textSize(14);
  text('runs FIRST (inner)', b1x + boxW / 2, rowY + boxH / 2 + 14);

  // outer box
  stroke('black');
  strokeWeight(2);
  fill('#004b6b');
  rect(b2x, rowY - boxH / 2, boxW, boxH, 12);
  noStroke();
  fill('white');
  textSize(18);
  text(outerName + '(x) = ' + outerStr, b2x + boxW / 2, rowY - 16);
  fill(255, 220, 130);
  textSize(16);
  text(outerName + '(' + fmt(mid) + ') = ' + fmt(out), b2x + boxW / 2, rowY + 16);
  fill(90);
  textSize(14);
  text('runs SECOND (outer)', b2x + boxW / 2, rowY + boxH / 2 + 14);

  // output chip
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(xOut, rowY, 60);
  noStroke();
  fill('black');
  textSize(18);
  text(fmt(out), xOut, rowY - 2);
  textSize(14);
  fill(90);
  text(compLabel, xOut, rowY + 44);

  // comparison note: what would the other order give?
  let otherInner = swapped ? P.g : P.f;
  let otherOuter = swapped ? P.f : P.g;
  let otherOut = otherOuter(otherInner(x));
  let otherLabel = (swapped ? 'f(g(x))' : 'g(f(x))');
  noStroke();
  fill(80);
  textSize(16);
  textAlign(CENTER, TOP);
  text('For comparison, the other order ' + otherLabel + ' = ' + fmt(otherOut) +
       (fmt(otherOut) === fmt(out) ? '  — the same here!' : '  — a different answer!'),
       canvasWidth / 2, 300);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('x = ' + fmt(x), 165, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
