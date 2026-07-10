// Six Function Evaluation Wheel MicroSim
// CANVAS_HEIGHT: 612
// Drag the terminal side around the unit circle; all six trig values update
// live — exact form at special angles, decimals elsewhere.
// Bloom's Level: Apply — evaluate all six trig functions from the unit circle.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 560;
let controlHeight = 50; // 1 row: snap + ref checkbox + quiz button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';
const SIN_COLOR = '#1e8a3c';
const COS_COLOR = '#2b5fc7';

const SPECIAL_DEGS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

// exact six-function magnitudes by reference angle: [cos, sin, tan, csc, sec, cot]
const EXACT_MAG = {
  0:  ['1', '0', '0', 'undef', '1', 'undef'],
  30: ['√3/2', '1/2', '√3/3', '2', '2√3/3', '√3'],
  45: ['√2/2', '√2/2', '1', '√2', '√2', '1'],
  60: ['1/2', '√3/2', '√3', '2√3/3', '2', '√3/3'],
  90: ['0', '1', 'undef', '1', 'undef', '0']
};

let angle = Math.PI / 6;
let draggingPoint = false;
let quizMode = false;

let snapButton, refCheckbox, quizButton;
let cx, cy, radius;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  snapButton = createButton('Snap to Special Angles');
  snapButton.parent(mainElement);
  snapButton.position(10, drawHeight + 10);
  snapButton.mousePressed(() => {
    let deg = ((degrees(angle) % 360) + 360) % 360;
    let best = SPECIAL_DEGS.reduce((a, b) =>
      abs(((deg - a) + 540) % 360 - 180) < abs(((deg - b) + 540) % 360 - 180) ? a : b);
    angle = radians(best);
  });

  refCheckbox = createCheckbox('Show reference angle', false);
  refCheckbox.parent(mainElement);
  refCheckbox.position(190, drawHeight + 12);

  quizButton = createButton('Quiz Mode');
  quizButton.parent(mainElement);
  quizButton.position(390, drawHeight + 10);
  quizButton.mousePressed(() => {
    quizMode = !quizMode;
    quizButton.html(quizMode ? 'Show Values' : 'Quiz Mode');
  });

  describe('Unit circle with a draggable terminal side. A green vertical segment shows sine, a blue horizontal segment shows cosine, and a side panel lists exact or decimal values for all six trigonometric functions of the current angle.', LABEL);
}

// exact six-value strings if deg is special, else null
function exactSix(deg) {
  deg = ((Math.round(deg) % 360) + 360) % 360;
  if (!SPECIAL_DEGS.includes(deg)) return null;
  let ref = deg <= 90 ? deg : deg <= 180 ? 180 - deg : deg <= 270 ? deg - 180 : 360 - deg;
  let mag = EXACT_MAG[ref];
  // quadrant signs for [cos, sin, tan]
  let cosNeg = deg > 90 && deg < 270;
  let sinNeg = deg > 180 && deg < 360;
  let tanNeg = cosNeg !== sinNeg;
  let signs = [cosNeg, sinNeg, tanNeg, sinNeg, cosNeg, tanNeg];
  return mag.map((m, i) => {
    if (m === 'undef' || m === '0') return m === 'undef' ? 'undefined' : '0';
    return (signs[i] ? '−' : '') + m;
  });
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

  cx = canvasWidth * 0.32;
  cy = drawHeight / 2 + 20;
  radius = min(canvasWidth * 0.26, drawHeight * 0.36);

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('The Six-Function Evaluation Wheel', canvasWidth / 2, 8);

  // axes + circle
  stroke('black');
  strokeWeight(1.5);
  line(cx - radius * 1.35, cy, cx + radius * 1.35, cy);
  line(cx, cy - radius * 1.35, cx, cy + radius * 1.35);
  noFill();
  stroke(MAROON);
  strokeWeight(2.5);
  circle(cx, cy, radius * 2);
  noStroke();

  let c = cos(angle), s = sin(angle);
  let px = cx + radius * c;
  let py = cy - radius * s;

  // reference angle arc
  if (refCheckbox.checked()) {
    let norm = ((angle % TWO_PI) + TWO_PI) % TWO_PI;
    let ref, startA, endA;
    if (norm < HALF_PI) { ref = norm; startA = 0; endA = norm; }
    else if (norm < PI) { ref = PI - norm; startA = norm; endA = PI; }
    else if (norm < 3 * HALF_PI) { ref = norm - PI; startA = PI; endA = norm; }
    else { ref = TWO_PI - norm; startA = norm; endA = TWO_PI; }
    stroke(GOLD);
    strokeWeight(4);
    noFill();
    arc(cx, cy, radius * 0.8, radius * 0.8, -endA, -startA);
    noStroke();
    fill(GOLD);
    textSize(14);
    textAlign(LEFT, TOP);
    text('reference angle = ' + nf(degrees(ref), 0, 1) + '°', margin, 70);
  }

  // sin and cos segments
  stroke(SIN_COLOR);
  strokeWeight(4);
  line(px, cy, px, py);                 // vertical: sin
  stroke(COS_COLOR);
  line(cx, py, px, py);                 // horizontal: cos (at the point's height)
  // terminal side
  stroke(MAROON);
  strokeWeight(3);
  line(cx, cy, px, py);
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(px, py, 16);
  noStroke();

  // segment labels
  fill(SIN_COLOR);
  textSize(14);
  textAlign(LEFT, CENTER);
  text('sin θ', px + 8, (cy + py) / 2);
  fill(COS_COLOR);
  textAlign(CENTER, BOTTOM);
  text('cos θ', (cx + px) / 2, py - 6);

  // angle readout
  let deg = ((degrees(angle) % 360) + 360) % 360;
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  text('θ = ' + nf(deg, 0, 1) + '° = ' + nf(radians(deg), 0, 3) + ' rad', margin, 44);

  // six-function panel
  let panX = canvasWidth * 0.62;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 50, panW, drawHeight - 110, 10);
  noStroke();
  fill(MAROON);
  textSize(17);
  textAlign(LEFT, TOP);
  text('All Six Functions of θ', panX + 16, 62);

  let exact = exactSix(deg);
  let t = abs(c) < 1e-9 ? Infinity : s / c;
  let vals = [
    ['sin θ', s, exact ? exact[1] : null],
    ['cos θ', c, exact ? exact[0] : null],
    ['tan θ', t, exact ? exact[2] : null],
    ['csc θ', abs(s) < 1e-9 ? Infinity : 1 / s, exact ? exact[3] : null],
    ['sec θ', abs(c) < 1e-9 ? Infinity : 1 / c, exact ? exact[4] : null],
    ['cot θ', abs(s) < 1e-9 ? Infinity : c / s, exact ? exact[5] : null]
  ];
  textSize(17);
  vals.forEach((v, i) => {
    let vy = 100 + i * 60;
    fill(i < 2 ? (i === 0 ? SIN_COLOR : COS_COLOR) : 'black');
    text(v[0], panX + 16, vy);
    if (quizMode) {
      fill(150);
      text('= ?', panX + 90, vy);
    } else {
      fill('black');
      let decStr = isFinite(v[1]) ? nf(v[1], 0, 3) : 'undefined';
      let exactStr = v[2] !== null ? v[2] + '   (' + decStr + ')' : decStr;
      text('= ' + exactStr, panX + 90, vy);
    }
  });
  if (quizMode) {
    fill(MAROON);
    textSize(14);
    text('Recall each value, then press "Show Values" to check.', panX + 16, 100 + 6 * 60, panW - 32, 50);
  }

  // hint
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Drag the gold point around the circle', margin, drawHeight - 34);
}

function mousePressed() {
  if (dist(mouseX, mouseY, cx, cy) < radius * 1.15) {
    draggingPoint = true;
    angle = atan2(-(mouseY - cy), mouseX - cx);
  }
}

function mouseDragged() {
  if (draggingPoint) {
    angle = atan2(-(mouseY - cy), mouseX - cx);
  }
}

function mouseReleased() {
  draggingPoint = false;
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
