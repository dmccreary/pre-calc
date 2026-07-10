// Transformation Composer MicroSim
// CANVAS_HEIGHT: 602
// Build g(x) = a·f(b(x−h)) + k one transformation at a time, in the correct
// order, and watch the graph and equation evolve at each step.
// Bloom's Level: Apply — construct a transformed equation with correct ordering.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 520;
let controlHeight = 80; // 2 rows: parent+buttons, four parameter inputs
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -8, AXIS_MAX = 8;

const PARENTS = [
  { label: 'f(x) = x²',  fn: x => x * x },
  { label: 'f(x) = x³',  fn: x => x * x * x },
  { label: 'f(x) = |x|', fn: x => Math.abs(x) },
  { label: 'f(x) = √x',  fn: x => x < 0 ? NaN : Math.sqrt(x) }
];

// entry order: b (horizontal stretch), h (horizontal shift),
//              a (vertical stretch), k (vertical shift)
const ORDER = ['b', 'h', 'a', 'k'];
const STEP_TEXT = {
  b: '1. Horizontal stretch / reflect:  b',
  h: '2. Horizontal shift:  h',
  a: '3. Vertical stretch / reflect:  a',
  k: '4. Vertical shift:  k'
};

let parentIndex = 0;
let params = { a: null, b: null, h: null, k: null };
let challenge = null; // {a,b,h,k}
let plotLeft, plotTop, plotSize;

let parentSelect;
let inputs = {};
let randomizeButton, revealButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  parentSelect = createSelect();
  parentSelect.parent(mainElement);
  parentSelect.position(70, drawHeight + 8);
  PARENTS.forEach(p => parentSelect.option(p.label));
  parentSelect.changed(() => {
    parentIndex = PARENTS.findIndex(p => p.label === parentSelect.value());
    resetParams();
  });

  randomizeButton = createButton('Randomize Challenge');
  randomizeButton.parent(mainElement);
  randomizeButton.position(200, drawHeight + 8);
  randomizeButton.mousePressed(makeChallenge);

  revealButton = createButton('Reveal Answer');
  revealButton.parent(mainElement);
  revealButton.position(365, drawHeight + 8);
  revealButton.mousePressed(() => {
    if (challenge) {
      ORDER.forEach(pKey => {
        params[pKey] = challenge[pKey];
        inputs[pKey].value(challenge[pKey]);
      });
    }
  });

  let xs = [55, 205, 355, 505];
  ORDER.forEach((pKey, i) => {
    let inp = createInput('');
    inp.parent(mainElement);
    inp.position(xs[i], drawHeight + 45);
    inp.size(50);
    inp.input(() => {
      let v = parseFloat(inp.value());
      params[pKey] = isFinite(v) ? v : null;
    });
    inputs[pKey] = inp;
  });

  describe('Left: a coordinate plane with the parent function faint and the transformed function bold. Right: the four transformations listed in the order they must be applied, each with a parameter slot. The composed equation shows at the bottom.', LABEL);
}

function resetParams() {
  params = { a: null, b: null, h: null, k: null };
  ORDER.forEach(pKey => inputs[pKey].value(''));
  challenge = null;
}

function makeChallenge() {
  resetParams();
  const pick = arr => arr[floor(random(arr.length))];
  challenge = {
    a: pick([-2, -1, 0.5, 2, 3]),
    b: pick([0.5, 1, 2]),
    h: pick([-3, -2, -1, 1, 2, 3]),
    k: pick([-4, -2, 2, 3])
  };
}

// how many consecutive steps (in ORDER) are filled
function stepsFilled() {
  let n = 0;
  for (let pKey of ORDER) {
    if (params[pKey] === null) break;
    n++;
  }
  return n;
}

// transformed value using only the first nSteps transformations
function gValue(x, p) {
  let f = PARENTS[parentIndex].fn;
  let a = p.a === null ? 1 : p.a;
  let b = p.b === null ? 1 : p.b;
  let h = p.h === null ? 0 : p.h;
  let k = p.k === null ? 0 : p.k;
  return a * f(b * (x - h)) + k;
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }

function plotCurve(fn, col, weight, dashed) {
  stroke(col);
  strokeWeight(weight);
  if (dashed) drawingContext.setLineDash([6, 5]);
  noFill();
  let inSeg = false;
  beginShape();
  for (let px = plotLeft; px <= plotLeft + plotSize; px += 1.5) {
    let gx = AXIS_MIN + (px - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN);
    let gy = fn(gx);
    if (isFinite(gy) && gy > AXIS_MIN - 3 && gy < AXIS_MAX + 3) {
      vertex(px, toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
      inSeg = true;
    } else if (inSeg) {
      endShape();
      beginShape();
      inSeg = false;
    }
  }
  endShape();
  drawingContext.setLineDash([]);
  noStroke();
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

  plotSize = min(canvasWidth * 0.5, drawHeight - 130);
  plotLeft = margin;
  plotTop = 50;

  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Transformation Composer', canvasWidth * 0.3, 8);

  // grid + axes
  stroke(224);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotSize);
    line(plotLeft, toSY(i), plotLeft + plotSize, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotSize);
  line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));
  noStroke();

  // parent faint
  plotCurve(PARENTS[parentIndex].fn, color(150, 150, 150, 160), 2, false);
  // challenge target (dashed gray)
  if (challenge) {
    plotCurve(x => gValue(x, challenge), color(90, 90, 90), 2, true);
  }
  // current transformed graph
  plotCurve(x => gValue(x, params), MAROON, 3, false);

  // challenge match check
  if (challenge && stepsFilled() === 4) {
    let match = ORDER.every(pKey => abs(params[pKey] - challenge[pKey]) < 0.01);
    noStroke();
    fill(match ? color(210, 240, 210) : color(255, 244, 214));
    rect(plotLeft, plotTop + plotSize + 10, plotSize, 30, 8);
    fill(match ? color(0, 120, 0) : color(120, 90, 0));
    textSize(15);
    textAlign(CENTER, CENTER);
    text(match ? 'Matched the mystery graph!' : 'Not a match yet — compare the curves.',
         plotLeft + plotSize / 2, plotTop + plotSize + 25);
  }

  // step panel on the right
  let panX = plotLeft + plotSize + 30;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill('white');
  rect(panX, plotTop, panW, 230, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Apply in this order:', panX + 14, plotTop + 10);
  let filled = stepsFilled();
  ORDER.forEach((pKey, i) => {
    let stepY = plotTop + 44 + i * 44;
    let active = i === filled;
    let done = i < filled;
    fill(done ? color(0, 120, 0) : active ? MAROON : color(170));
    textSize(15);
    text((done ? '✓ ' : active ? '➤ ' : '· ') + STEP_TEXT[pKey] +
         (done ? ' = ' + params[pKey] : ''), panX + 14, stepY, panW - 28, 40);
  });

  // live equation display at the bottom
  let a = params.a, b = params.b, h = params.h, k = params.k;
  let show = v => v === null ? '□' : v;
  let eq = 'g(x) = ' + show(a) + ' · f( ' + show(b) + ' (x − ' + show(h) + ') ) + ' + show(k);
  noStroke();
  stroke(MAROON);
  strokeWeight(1.5);
  fill(255, 252, 244);
  rect(panX, plotTop + 245, panW, 60, 10);
  noStroke();
  fill('black');
  textSize(19);
  textAlign(CENTER, CENTER);
  text(eq, panX + panW / 2, plotTop + 275);

  // hint
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Fill the parameters in order below — each box unlocks the next. □ means "not yet applied" (defaults: a=1, b=1, h=0, k=0).',
       panX, plotTop + 320, panW, 60);

  // control labels: gray out labels for locked steps
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  let labels = ['b =', 'h =', 'a =', 'k ='];
  let xs = [20, 170, 320, 470];
  ORDER.forEach((pKey, i) => {
    fill(i <= filled ? 'black' : color(180));
    text(labels[i], xs[i], drawHeight + 57);
  });
  fill('black');
  text('Parent:', 10, drawHeight + 20);
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
