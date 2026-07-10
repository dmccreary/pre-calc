// Polynomial Graph Builder MicroSim
// CANVAS_HEIGHT: 602
// Reveals the six-step graphing procedure one layer at a time: end behavior,
// zeros, y-intercept, turning bound, the curve, and a verification checklist.
// Bloom's Level: Apply — sketch a polynomial from factored form, step by step.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 520;
let controlHeight = 80; // 2 rows: preset select + step buttons, custom input
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -5, AXIS_MAX = 5;

// polynomial presets in factored form: a * Π (x - root)^mult
const PRESETS = [
  { label: '(x+2)(x−1)²(x−3)', a: 1, roots: [[-2, 1], [1, 2], [3, 1]] },
  { label: '−x³ + 4x', a: -1, roots: [[0, 1], [2, 1], [-2, 1]] },
  { label: '(x+1)³(x−2)', a: 1, roots: [[-1, 3], [2, 1]] },
  { label: 'x⁴ − 5x² + 4', a: 1, roots: [[1, 1], [-1, 1], [2, 1], [-2, 1]] }
];

let a = 1;
let roots = PRESETS[0].roots;
let stepsRevealed = 0;   // 0..6

const STEP_NAMES = [
  '1. End behavior from the leading term',
  '2. Mark each zero (cross or bounce)',
  '3. Plot the y-intercept',
  '4. Bound the turning points',
  '5. Draw the curve through the features',
  '6. Verify the finished sketch'
];

let presetSelect;
let nextStepButton, prevStepButton, resetButton;
let customInput, applyButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  presetSelect = createSelect();
  presetSelect.parent(mainElement);
  presetSelect.position(10, drawHeight + 8);
  PRESETS.forEach(p => presetSelect.option(p.label));
  presetSelect.changed(() => {
    let p = PRESETS.find(q => q.label === presetSelect.value());
    a = p.a; roots = p.roots; stepsRevealed = 0;
  });

  nextStepButton = createButton('Reveal Next Step');
  nextStepButton.parent(mainElement);
  nextStepButton.position(190, drawHeight + 8);
  nextStepButton.mousePressed(() => { stepsRevealed = min(6, stepsRevealed + 1); });

  prevStepButton = createButton('Hide Last');
  prevStepButton.parent(mainElement);
  prevStepButton.position(330, drawHeight + 8);
  prevStepButton.mousePressed(() => { stepsRevealed = max(0, stepsRevealed - 1); });

  resetButton = createButton('Reset Steps');
  resetButton.parent(mainElement);
  resetButton.position(425, drawHeight + 8);
  resetButton.mousePressed(() => { stepsRevealed = 0; });

  customInput = createInput('-2, 1(2), 3');
  customInput.parent(mainElement);
  customInput.position(155, drawHeight + 45);
  customInput.size(170);

  applyButton = createButton('Apply Custom');
  applyButton.parent(mainElement);
  applyButton.position(340, drawHeight + 45);
  applyButton.mousePressed(applyCustom);

  describe('Coordinate plane where the six-step polynomial graphing procedure is revealed one layer at a time: end-behavior arrows, zeros with cross or bounce labels, the y-intercept, the turning-point bound, the curve itself, and a verification checklist.', LABEL);
}

function applyCustom() {
  // format: "-2, 1(2), 3" → roots -2 mult 1, 1 mult 2, 3 mult 1
  let parts = customInput.value().split(',');
  let parsed = [];
  for (let p of parts) {
    let m = p.trim().match(/^(-?\d+(?:\.\d+)?)(?:\((\d)\))?$/);
    if (!m) return;
    parsed.push([parseFloat(m[1]), m[2] ? parseInt(m[2]) : 1]);
  }
  if (parsed.length >= 1 && parsed.length <= 4) {
    roots = parsed;
    a = 1;
    stepsRevealed = 0;
  }
}

function degreeOf() { return roots.reduce((s, r) => s + r[1], 0); }
function polyValue(x) {
  let v = a;
  for (let [r, m] of roots) v *= Math.pow(x - r, m);
  return v;
}

function toSX(gx) { return map(gx, AXIS_MIN, AXIS_MAX, plotLeft, plotLeft + plotW); }
function toSY(gy) { return map(gy, yMin, yMax, plotTop + plotH, plotTop); }

let plotLeft, plotTop, plotW, plotH, yMin = -10, yMax = 10;

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
  text('Polynomial Graph Builder', canvasWidth * 0.62, 8);

  // steps panel on the left
  let panW = min(300, canvasWidth * 0.32);
  stroke(200);
  strokeWeight(1);
  fill('white');
  rect(margin, 45, panW, 250, 10);
  noStroke();
  for (let i = 0; i < 6; i++) {
    let done = i < stepsRevealed;
    fill(done ? MAROON : color(150));
    textSize(14);
    textAlign(LEFT, TOP);
    text((done ? '☑ ' : '☐ ') + STEP_NAMES[i], margin + 12, 58 + i * 38, panW - 24, 36);
  }

  // plot area on the right
  plotLeft = margin + panW + 25;
  plotTop = 45;
  plotW = canvasWidth - plotLeft - margin;
  plotH = drawHeight - 110;

  let deg = degreeOf();
  let { leftUp, rightUp } = (() => {
    let rightUp = a > 0;
    let leftUp = deg % 2 === 0 ? rightUp : !rightUp;
    return { leftUp, rightUp };
  })();

  // grid + axes
  stroke(224);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i++) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotH);
  }
  for (let i = yMin; i <= yMax; i += 2) {
    line(plotLeft, toSY(i), plotLeft + plotW, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotH);
  line(plotLeft, toSY(0), plotLeft + plotW, toSY(0));
  noStroke();

  // Step 1: end-behavior arrows
  if (stepsRevealed >= 1) {
    stroke(CYAN);
    strokeWeight(3.5);
    let ly = leftUp ? plotTop + 16 : plotTop + plotH - 16;
    line(plotLeft + 14, ly + (leftUp ? 16 : -16), plotLeft + 14, ly);
    line(plotLeft + 14, ly, plotLeft + 8, ly + (leftUp ? 7 : -7));
    line(plotLeft + 14, ly, plotLeft + 20, ly + (leftUp ? 7 : -7));
    let ry = rightUp ? plotTop + 16 : plotTop + plotH - 16;
    line(plotLeft + plotW - 14, ry + (rightUp ? 16 : -16), plotLeft + plotW - 14, ry);
    line(plotLeft + plotW - 14, ry, plotLeft + plotW - 20, ry + (rightUp ? 7 : -7));
    line(plotLeft + plotW - 14, ry, plotLeft + plotW - 8, ry + (rightUp ? 7 : -7));
    noStroke();
  }

  // Step 2: zeros with cross/bounce labels
  if (stepsRevealed >= 2) {
    for (let [r, m] of roots) {
      stroke('black');
      strokeWeight(2);
      fill('gold');
      circle(toSX(r), toSY(0), 13);
      noStroke();
      fill('black');
      textSize(13);
      textAlign(CENTER, TOP);
      text(m % 2 === 1 ? 'cross' : 'bounce', toSX(r), toSY(0) + 10);
    }
  }

  // Step 3: y-intercept
  if (stepsRevealed >= 3) {
    let c = polyValue(0);
    let cc = constrain(c, yMin, yMax);
    stroke('black');
    strokeWeight(2);
    fill('green');
    circle(toSX(0), toSY(cc), 13);
    noStroke();
    fill('green');
    textSize(13);
    textAlign(LEFT, CENTER);
    text('(0, ' + c + ')', toSX(0) + 10, toSY(cc));
  }

  // Step 4: turning-point bound text
  if (stepsRevealed >= 4) {
    noStroke();
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text('Degree ' + deg + ' → at most ' + (deg - 1) + ' turning points',
         plotLeft + 12, plotTop + plotH + 12);
  }

  // Step 5: the curve
  if (stepsRevealed >= 5) {
    stroke(MAROON);
    strokeWeight(3);
    noFill();
    let inView = false;
    beginShape();
    for (let gx = AXIS_MIN; gx <= AXIS_MAX; gx += 0.02) {
      let gy = polyValue(gx);
      if (gy >= yMin - 4 && gy <= yMax + 4) {
        vertex(toSX(gx), toSY(constrain(gy, yMin, yMax)));
        inView = true;
      } else if (inView) {
        endShape();
        beginShape();
        inView = false;
      }
    }
    endShape();
    noStroke();
  }

  // Step 6: verification checklist
  if (stepsRevealed >= 6) {
    stroke(MAROON);
    strokeWeight(1.5);
    fill(255, 252, 240);
    rect(margin, 310, panW, 150, 10);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    let checks =
      '✓ Degree = ' + deg + ' (sum of multiplicities)\n' +
      '✓ Ends: ' + (leftUp ? '↑' : '↓') + ' left, ' + (rightUp ? '↑' : '↓') + ' right\n' +
      '✓ ' + roots.length + ' distinct zero(s) marked\n' +
      '✓ y-intercept = ' + polyValue(0) + '\n' +
      '✓ Turning points ≤ ' + (deg - 1);
    text(checks, margin + 14, 322, panW - 28, 130);
  }

  // current polynomial label
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  let expr = (a === 1 ? '' : a === -1 ? '−' : a) +
    roots.map(([r, m]) => '(x ' + (r >= 0 ? '− ' + r : '+ ' + (-r)) + ')' +
    (m > 1 ? '^' + m : '')).join('');
  text('P(x) = ' + expr, plotLeft + 12, plotTop + plotH + 36);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Custom roots:', 10, drawHeight + 57);
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
