// Synthetic Division Animator MicroSim
// CANVAS_HEIGHT: 502
// Walks synthetic division one operation at a time, highlighting the active
// cell and showing every multiply and add explicitly.
// Bloom's Level: Apply — execute synthetic division and verify with the Remainder Theorem.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 420;
let controlHeight = 80; // 2 rows: inputs, buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

let coeffs = [1, -4, 1, 6];   // dividend coefficients
let r = 2;                     // divide by (x - r)
let mid = [];                  // products row
let bot = [];                  // result row
let step = 0;                  // 0 = nothing; 1 = bring down; 2k = product k; 2k+1 = sum k
let maxStep = 0;
let autoPlay = false;
let lastAuto = 0;
let checkMsg = '';

let coeffInput, rInput, applyButton;
let prevButton, nextButton, autoButton, checkButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  coeffInput = createInput('1, -4, 1, 6');
  coeffInput.parent(mainElement);
  coeffInput.position(115, drawHeight + 8);
  coeffInput.size(150);

  rInput = createInput('2');
  rInput.parent(mainElement);
  rInput.position(310, drawHeight + 8);
  rInput.size(40);

  applyButton = createButton('Apply');
  applyButton.parent(mainElement);
  applyButton.position(365, drawHeight + 8);
  applyButton.mousePressed(applyInputs);

  prevButton = createButton('◀ Previous');
  prevButton.parent(mainElement);
  prevButton.position(10, drawHeight + 45);
  prevButton.mousePressed(() => { step = max(0, step - 1); autoPlay = false; checkMsg = ''; });

  nextButton = createButton('Next Step ▶');
  nextButton.parent(mainElement);
  nextButton.position(105, drawHeight + 45);
  nextButton.mousePressed(() => { step = min(maxStep, step + 1); autoPlay = false; });

  autoButton = createButton('Auto Play');
  autoButton.parent(mainElement);
  autoButton.position(210, drawHeight + 45);
  autoButton.mousePressed(() => { autoPlay = !autoPlay; if (step >= maxStep) step = 0; });

  checkButton = createButton('Check with Remainder Theorem');
  checkButton.parent(mainElement);
  checkButton.position(300, drawHeight + 45);
  checkButton.mousePressed(checkRemainder);

  computeTable();
  describe('Synthetic division grid with three rows: dividend coefficients, products, and results. Step buttons walk through each bring-down, multiply, and add with the active cell highlighted.', LABEL);
}

function applyInputs() {
  let parts = coeffInput.value().split(',').map(s => parseFloat(s.trim()));
  if (parts.length >= 2 && parts.every(v => isFinite(v))) coeffs = parts;
  let rv = parseFloat(rInput.value());
  if (isFinite(rv)) r = rv;
  computeTable();
}

function computeTable() {
  let n = coeffs.length;
  mid = new Array(n).fill(null);
  bot = new Array(n).fill(null);
  bot[0] = coeffs[0];
  for (let i = 1; i < n; i++) {
    mid[i] = bot[i - 1] * r;
    bot[i] = coeffs[i] + mid[i];
  }
  step = 0;
  maxStep = 2 * (n - 1) + 1;
  autoPlay = false;
  checkMsg = '';
}

// visibility helpers: which cells show at the current step
function botVisible(i) { return i === 0 ? step >= 1 : step >= 2 * i + 1; }
function midVisible(i) { return step >= 2 * i; }

function evalPoly(x) {
  return coeffs.reduce((acc, c) => acc * x + c, 0);
}

function checkRemainder() {
  let pr = evalPoly(r);
  let rem = bot[bot.length - 1];
  checkMsg = 'P(' + r + ') = ' + pr + '  vs  remainder = ' + rem +
             (pr === rem ? '  — they match! ✓' : '  — mismatch?');
  step = maxStep;
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
  text('Synthetic Division, Step by Step', canvasWidth / 2, 8);

  // auto play pacing
  if (autoPlay && millis() - lastAuto > 900) {
    lastAuto = millis();
    step++;
    if (step >= maxStep) { step = maxStep; autoPlay = false; }
  }

  let n = coeffs.length;
  let cellW = min(90, (canvasWidth * 0.55) / n);
  let gridX = 110;
  let gridY = 90;
  let rowH = 52;

  // r box
  stroke(MAROON);
  strokeWeight(2);
  fill('white');
  rect(gridX - 70, gridY, 50, rowH, 8);
  noStroke();
  fill(MAROON);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(r, gridX - 45, gridY + rowH / 2);
  textSize(13);
  fill(100);
  text('r', gridX - 45, gridY - 12);

  // active position for highlight: which cell is being produced at this step
  let activeRow = -1, activeCol = -1;
  if (step >= 1 && step <= maxStep) {
    if (step === 1) { activeRow = 2; activeCol = 0; }
    else if (step % 2 === 0) { activeRow = 1; activeCol = step / 2; }
    else { activeRow = 2; activeCol = (step - 1) / 2; }
  }

  // grid rows: 0 = coefficients, 1 = products, 2 = results
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < n; i++) {
      let x = gridX + i * cellW;
      let y = gridY + row * rowH;
      let isActive = row === activeRow && i === activeCol;
      stroke(isActive ? MAROON : 'silver');
      strokeWeight(isActive ? 3 : 1);
      fill(isActive ? color(255, 245, 235) : 'white');
      rect(x, y, cellW - 4, rowH - 6, 6);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(19);
      let val = null;
      if (row === 0) val = coeffs[i];
      else if (row === 1 && i > 0 && midVisible(i)) val = mid[i];
      else if (row === 2 && botVisible(i)) val = bot[i];
      if (val !== null) {
        fill(row === 2 ? MAROON : 'black');
        text(val, x + cellW / 2 - 2, y + rowH / 2 - 3);
      }
    }
  }
  // horizontal rule above result row
  stroke('black');
  strokeWeight(2);
  line(gridX - 70, gridY + 2 * rowH - 4, gridX + n * cellW - 4, gridY + 2 * rowH - 4);
  noStroke();

  // arrows + operation annotation for the current step
  fill(60);
  textSize(15);
  textAlign(LEFT, TOP);
  let opText = '';
  if (step === 0) opText = 'Press "Next Step" to bring down the leading coefficient.';
  else if (step === 1) opText = 'Bring down the ' + coeffs[0] + '.';
  else if (step <= maxStep) {
    let col = step % 2 === 0 ? step / 2 : (step - 1) / 2;
    if (step % 2 === 0) {
      opText = 'Multiply: ' + bot[col - 1] + ' × ' + r + ' = ' + mid[col];
      // arrow from bottom cell (col-1) diagonally up to mid cell col
      stroke(CYAN);
      strokeWeight(2.5);
      let x1 = gridX + (col - 1) * cellW + cellW / 2;
      let x2 = gridX + col * cellW + cellW / 2;
      line(x1, gridY + 2 * rowH + rowH / 2 - 10, x2 - 10, gridY + rowH + rowH / 2 + 10);
      noStroke();
    } else {
      opText = 'Add: ' + coeffs[col] + ' + ' + mid[col] + ' = ' + bot[col];
      stroke(CYAN);
      strokeWeight(2.5);
      let x = gridX + col * cellW + cellW / 2;
      line(x, gridY + rowH + 8, x, gridY + 2 * rowH + 4);
      noStroke();
    }
  }
  if (step >= maxStep) {
    opText = 'Done! The last number in the result row is the remainder.';
  }
  fill(60);
  text('Current operation: ' + opText, gridX - 70, gridY + 3 * rowH + 20);

  // status panel on the right: quotient + remainder as they build
  let panX = gridX + n * cellW + 30;
  let panW = canvasWidth - panX - margin;
  if (panW > 160) {
    stroke(200);
    strokeWeight(1);
    fill(255, 255, 255, 235);
    rect(panX, gridY, panW, 3 * rowH - 6, 10);
    noStroke();
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text('Quotient so far', panX + 12, gridY + 8);
    fill('black');
    textSize(17);
    let deg = n - 2;
    let parts = [];
    for (let i = 0; i < n - 1; i++) {
      if (botVisible(i)) {
        let p = deg - i;
        let term = bot[i] + (p > 1 ? 'x^' + p : p === 1 ? 'x' : '');
        parts.push(term);
      }
    }
    text(parts.length ? parts.join(' + ').replace(/\+ -/g, '− ') : '…', panX + 12, gridY + 32, panW - 24, 60);
    fill(MAROON);
    textSize(15);
    text('Remainder', panX + 12, gridY + 92);
    fill('black');
    textSize(17);
    text(botVisible(n - 1) ? '' + bot[n - 1] : '…', panX + 12, gridY + 114);
  }

  // remainder-theorem check message
  if (checkMsg) {
    noStroke();
    fill('green');
    textSize(16);
    textAlign(LEFT, TOP);
    text(checkMsg, gridX - 70, gridY + 3 * rowH + 55);
  }

  // control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Coefficients:', 10, drawHeight + 20);
  text('r =', 280, drawHeight + 20);
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
