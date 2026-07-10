// Even-Odd Explorer MicroSim
// CANVAS_HEIGHT: 532
// Three synchronized panels test the same function for symmetry:
// reflection across the y-axis, 180-degree rotation, and the algebraic test.
// Bloom's Level: Evaluate — determine even/odd/neither and justify with two lines of evidence.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 80; // 2 rows: select+button, checkboxes
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const RANGE = 4; // plot from -4 to 4 in both axes

const FUNCTIONS = [
  { label: 'f(x) = x²',      fn: x => x * x,           fNegX: 'x²',        kind: 'even' },
  { label: 'f(x) = x³',      fn: x => x * x * x,       fNegX: '-x³',       kind: 'odd' },
  { label: 'f(x) = |x|',     fn: x => Math.abs(x),     fNegX: '|x|',       kind: 'even' },
  { label: 'f(x) = x² + x',  fn: x => x * x + x,       fNegX: 'x² - x',    kind: 'neither' },
  { label: 'f(x) = 1/x',     fn: x => 1 / x,           fNegX: '-1/x',      kind: 'odd' },
  { label: 'f(x) = cos(x)',  fn: x => Math.cos(x),     fNegX: 'cos(x)',    kind: 'even' }
];

let funcIndex = 0;
let computeStep = 0;    // 0 = hidden, 1..3 progressive algebra reveal
let funcSelect;
let computeButton;
let reflectCheckbox;
let rotateCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  funcSelect = createSelect();
  funcSelect.parent(mainElement);
  funcSelect.position(90, drawHeight + 8);
  FUNCTIONS.forEach(f => funcSelect.option(f.label));
  funcSelect.changed(() => {
    funcIndex = FUNCTIONS.findIndex(f => f.label === funcSelect.value());
    computeStep = 0;
  });

  computeButton = createButton('Compute f(-x)');
  computeButton.parent(mainElement);
  computeButton.position(255, drawHeight + 8);
  computeButton.mousePressed(() => { computeStep = min(computeStep + 1, 3); });

  reflectCheckbox = createCheckbox('Show y-axis reflection', true);
  reflectCheckbox.parent(mainElement);
  reflectCheckbox.position(10, drawHeight + 45);

  rotateCheckbox = createCheckbox('Show 180° rotation', true);
  rotateCheckbox.parent(mainElement);
  rotateCheckbox.position(210, drawHeight + 45);

  describe('Three panels test one function for symmetry: reflection across the y-axis, rotation 180 degrees about the origin, and step-by-step algebra comparing f of negative x to f of x and negative f of x.', LABEL);
}

// draw a mini coordinate plane and plot fn (and an optional overlay transform)
function drawPanel(px, pw, plotFn, overlayFn, overlayColor, heading, verdictText, verdictOK) {
  let top = 70;
  let ph = 280;
  // panel frame
  stroke(200);
  strokeWeight(1);
  fill('white');
  rect(px + 8, top - 28, pw - 16, ph + 90, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(CENTER, TOP);
  text(heading, px + pw / 2, top - 20);

  let left = px + 20;
  let right = px + pw - 20;
  let bottom = top + ph;
  let toSX = gx => map(gx, -RANGE, RANGE, left, right);
  let toSY = gy => map(gy, -RANGE, RANGE, bottom, top + 10);

  // axes
  stroke(190);
  strokeWeight(1);
  line(toSX(0), top + 10, toSX(0), bottom);
  line(left, toSY(0), right, toSY(0));

  // original function in maroon
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  let prevOK = false;
  for (let gx = -RANGE; gx <= RANGE; gx += 0.04) {
    let gy = plotFn(gx);
    if (isFinite(gy) && abs(gy) <= RANGE * 1.5) {
      vertex(toSX(gx), toSY(constrain(gy, -RANGE, RANGE)));
      prevOK = true;
    } else if (prevOK) {
      endShape();
      beginShape();
      prevOK = false;
    }
  }
  endShape();

  // overlay transform (reflection or rotation)
  if (overlayFn) {
    stroke(overlayColor);
    strokeWeight(2.5);
    noFill();
    beginShape();
    prevOK = false;
    for (let gx = -RANGE; gx <= RANGE; gx += 0.04) {
      let gy = overlayFn(gx);
      if (isFinite(gy) && abs(gy) <= RANGE * 1.5) {
        vertex(toSX(gx), toSY(constrain(gy, -RANGE, RANGE)));
        prevOK = true;
      } else if (prevOK) {
        endShape();
        beginShape();
        prevOK = false;
      }
    }
    endShape();
  }

  // verdict label
  noStroke();
  if (verdictText) {
    fill(verdictOK ? color(0, 130, 0) : color(120));
    textSize(17);
    textAlign(CENTER, TOP);
    text(verdictText, px + pw / 2, bottom + 14);
  }
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

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Even, Odd, or Neither?', canvasWidth / 2, 6);

  let f = FUNCTIONS[funcIndex];
  let pw = canvasWidth / 3;

  // left panel: reflection across y-axis => plot f(-x)
  let isEven = f.kind === 'even';
  drawPanel(0, pw, f.fn,
    reflectCheckbox.checked() ? (x => f.fn(-x)) : null,
    color(0, 191, 255, 180),
    'Reflect across y-axis',
    isEven ? 'Even ✓ — reflection matches' : 'Reflection differs',
    isEven);

  // middle panel: 180° rotation about origin => plot -f(-x)
  let isOdd = f.kind === 'odd';
  drawPanel(pw, pw, f.fn,
    rotateCheckbox.checked() ? (x => -f.fn(-x)) : null,
    color(218, 165, 32, 200),
    'Rotate 180° about origin',
    isOdd ? 'Odd ✓ — rotation matches' : 'Rotation differs',
    isOdd);

  // right panel: algebraic test
  let px = 2 * pw;
  stroke(200);
  strokeWeight(1);
  fill('white');
  rect(px + 8, 42, pw - 16, 370, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(CENTER, TOP);
  text('Algebraic Test', px + pw / 2, 50);

  fill('black');
  textSize(18);
  textAlign(LEFT, TOP);
  let tx = px + 26;
  text(f.label, tx, 90);
  if (computeStep >= 1) {
    text('f(-x) = ' + f.fNegX, tx, 130);
  } else {
    fill(150);
    textSize(15);
    text('Press "Compute f(-x)" to substitute', tx, 130);
  }
  if (computeStep >= 2) {
    fill('black');
    textSize(17);
    let evenMatch = f.kind === 'even';
    let oddMatch = f.kind === 'odd';
    text('Compare to f(x):  ' + (evenMatch ? 'MATCH' : 'no match'), tx, 175);
    text('Compare to -f(x): ' + (oddMatch ? 'MATCH' : 'no match'), tx, 205);
  }
  if (computeStep >= 3) {
    let verdict = f.kind === 'even' ? 'EVEN' : f.kind === 'odd' ? 'ODD' : 'NEITHER';
    fill(f.kind === 'neither' ? color(120) : color(0, 130, 0));
    textSize(24);
    textAlign(CENTER, TOP);
    text('Conclusion: ' + verdict, px + pw / 2, 255);
    fill(90);
    textSize(14);
    let why = f.kind === 'even' ? 'f(-x) = f(x) for every x' :
              f.kind === 'odd' ? 'f(-x) = -f(x) for every x' :
              'f(-x) matches neither f(x) nor -f(x)';
    text(why, px + pw / 2, 290);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Function:', 10, drawHeight + 20);
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
