// Unit Circle Special Angles MicroSim
// CANVAS_HEIGHT: 672
// All 16 special-angle points with exact coordinates, ASTC quadrant labels,
// a draggable point, and a quiz mode that hides the labels.
// Bloom's Level: Remember — recall unit-circle coordinates and quadrant signs.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 620;
let controlHeight = 50; // 1 row: snap button + ASTC checkbox + quiz button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

const SPECIAL_DEGS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

// exact coordinate strings by reference angle
const EXACT_XY = {
  0:  ['1', '0'],
  30: ['√3/2', '1/2'],
  45: ['√2/2', '√2/2'],
  60: ['1/2', '√3/2'],
  90: ['0', '1']
};

let angle = Math.PI / 4;      // current angle in radians
let draggingPoint = false;
let quizMode = false;

let snapButton, astcCheckbox, quizButton;
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
    let deg = degrees(angle);
    let best = SPECIAL_DEGS.reduce((a, b) =>
      abs(((deg - a) + 540) % 360 - 180) < abs(((deg - b) + 540) % 360 - 180) ? a : b);
    angle = radians(best);
  });

  astcCheckbox = createCheckbox('Show ASTC labels', true);
  astcCheckbox.parent(mainElement);
  astcCheckbox.position(190, drawHeight + 12);

  quizButton = createButton('Quiz Me');
  quizButton.parent(mainElement);
  quizButton.position(360, drawHeight + 10);
  quizButton.mousePressed(() => {
    quizMode = !quizMode;
    quizButton.html(quizMode ? 'Show Answers' : 'Quiz Me');
  });

  describe('Unit circle with all sixteen special angles marked with exact coordinates, ASTC labels naming the positive functions in each quadrant, and a draggable point showing the current angle. Quiz mode hides the coordinates for recall practice.', LABEL);
}

// exact coordinate strings for a special angle in degrees
function exactCoords(deg) {
  deg = ((deg % 360) + 360) % 360;
  let ref = deg <= 90 ? deg : deg <= 180 ? 180 - deg : deg <= 270 ? deg - 180 : 360 - deg;
  let base = EXACT_XY[ref];
  if (!base) return null;
  let xSign = (deg > 90 && deg < 270) ? '−' : '';
  let ySign = (deg > 180 && deg < 360) ? '−' : '';
  let xs = base[0] === '0' ? '0' : xSign + base[0];
  let ys = base[1] === '0' ? '0' : ySign + base[1];
  return '(' + xs + ', ' + ys + ')';
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

  cx = canvasWidth / 2;
  cy = drawHeight / 2 + 15;
  radius = min(canvasWidth, drawHeight) * 0.33;

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('The Unit Circle: Special Angles', canvasWidth / 2, 8);

  // axes
  stroke('black');
  strokeWeight(1.5);
  line(cx - radius * 1.45, cy, cx + radius * 1.45, cy);
  line(cx, cy - radius * 1.45, cx, cy + radius * 1.45);
  // circle
  noFill();
  stroke(MAROON);
  strokeWeight(2.5);
  circle(cx, cy, radius * 2);
  noStroke();

  // ASTC labels
  if (astcCheckbox.checked()) {
    fill(0, 130, 0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('A: all positive', cx + radius * 0.5, cy - radius * 0.5);
    text('S: sin, csc > 0', cx - radius * 0.5, cy - radius * 0.5);
    text('T: tan, cot > 0', cx - radius * 0.5, cy + radius * 0.5);
    text('C: cos, sec > 0', cx + radius * 0.5, cy + radius * 0.5);
  }

  // special angle points + labels
  for (let deg of SPECIAL_DEGS) {
    let t = radians(deg);
    let px = cx + radius * cos(-t);
    let py = cy + radius * sin(-t);
    stroke('black');
    strokeWeight(1);
    fill(CYAN);
    circle(px, py, 8);
    noStroke();
    if (!quizMode) {
      // coordinate label placed radially outward
      let lx = cx + radius * 1.22 * cos(-t);
      let ly = cy + radius * 1.22 * sin(-t);
      fill(60);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(exactCoords(deg), lx, ly - 7);
      fill(MAROON);
      text(deg + '°', lx, ly + 8);
    }
  }

  // terminal side + draggable point
  let px = cx + radius * cos(-angle);
  let py = cy + radius * sin(-angle);
  stroke(MAROON);
  strokeWeight(3);
  line(cx, cy, px, py);
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(px, py, 16);
  noStroke();

  // current angle readout
  let deg = ((degrees(angle) % 360) + 360) % 360;
  let isSpecial = SPECIAL_DEGS.some(d => abs(d - deg) < 0.5);
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  let coordStr = isSpecial ? exactCoords(Math.round(deg)) :
    '(' + nf(cos(angle), 0, 3) + ', ' + nf(sin(angle), 0, 3) + ')';
  text('θ = ' + nf(deg, 0, 1) + '° = ' + nf(radians(deg), 0, 2) + ' rad', margin, 40);
  fill(MAROON);
  text(quizMode ? '(cos θ, sin θ) = ?  — recall, then press Show Answers'
                : '(cos θ, sin θ) = ' + coordStr, margin, 64);

  // control labels — none beyond the buttons
}

function mousePressed() {
  let px = cx + radius * cos(-angle);
  let py = cy + radius * sin(-angle);
  if (dist(mouseX, mouseY, px, py) < 20 ||
      dist(mouseX, mouseY, cx, cy) < radius * 1.1) {
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
