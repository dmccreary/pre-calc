// Vector Operations MicroSim
// CANVAS_HEIGHT: 582
// Drag the tips of u and v; the sum (tip-to-tail or parallelogram), the
// difference, and a scalar multiple all update in component form.
// Bloom's Level: Apply — connect component arithmetic to geometric construction.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 80; // 2 rows: mode checkbox + reset, c slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

const MAROON = '#800020';
const U_COLOR = '#2b5fc7';   // blue
const V_COLOR = '#e07b20';   // orange
const DIFF_COLOR = '#1e8a3c'; // green
const RANGE = 8;

let u = { x: 3, y: 2 };
let v = { x: 1, y: 3 };
let dragging = null;

let parallelogramCheckbox;
let resetButton;
let cSlider;

let cx, cy, scale;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  parallelogramCheckbox = createCheckbox('Parallelogram mode (vs tip-to-tail)', false);
  parallelogramCheckbox.parent(mainElement);
  parallelogramCheckbox.position(10, drawHeight + 12);

  resetButton = createButton('Reset vectors');
  resetButton.parent(mainElement);
  resetButton.position(300, drawHeight + 10);
  resetButton.mousePressed(() => { u = { x: 3, y: 2 }; v = { x: 1, y: 3 }; cSlider.value(1.5); });

  cSlider = createSlider(-3, 3, 1.5, 0.1);
  cSlider.parent(mainElement);
  cSlider.position(sliderLeftMargin, drawHeight + 45);
  cSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Two draggable vectors u in blue and v in orange from the origin. The maroon sum is built tip-to-tail or as a parallelogram, the green difference and a light-orange scalar multiple update live, and the panel lists all component forms, magnitudes, and direction angles.', LABEL);
}

function toSX(gx) { return cx + gx * scale; }
function toSY(gy) { return cy - gy * scale; }

function drawArrow(x1, y1, x2, y2, col, weight, dashed) {
  stroke(col);
  strokeWeight(weight);
  if (dashed) drawingContext.setLineDash([6, 5]);
  line(toSX(x1), toSY(y1), toSX(x2), toSY(y2));
  drawingContext.setLineDash([]);
  // arrowhead
  let a = atan2(toSY(y2) - toSY(y1), toSX(x2) - toSX(x1));
  noStroke();
  fill(col);
  push();
  translate(toSX(x2), toSY(y2));
  rotate(a);
  triangle(0, 0, -11, -5, -11, 5);
  pop();
}

function magDir(w) {
  let m = Math.sqrt(w.x * w.x + w.y * w.y);
  let a = degrees(Math.atan2(w.y, w.x));
  return '|' + nf(m, 0, 2) + '| at ' + nf(a, 0, 0) + '°';
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
  cy = drawHeight / 2 + 15;
  scale = min(canvasWidth * 0.28, drawHeight * 0.42) / RANGE;

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Vector Operations Sandbox', canvasWidth / 2, 6);

  // grid + axes
  stroke(230);
  strokeWeight(1);
  for (let i = -RANGE; i <= RANGE; i += 2) {
    line(toSX(i), toSY(-RANGE), toSX(i), toSY(RANGE));
    line(toSX(-RANGE), toSY(i), toSX(RANGE), toSY(i));
  }
  stroke('black');
  strokeWeight(1.5);
  line(toSX(-RANGE), cy, toSX(RANGE), cy);
  line(cx, toSY(-RANGE), cx, toSY(RANGE));
  noStroke();

  let c = cSlider.value();
  let sum = { x: u.x + v.x, y: u.y + v.y };
  let diff = { x: u.x - v.x, y: u.y - v.y };
  let cv = { x: c * v.x, y: c * v.y };

  // scalar multiple (light orange, behind)
  drawArrow(0, 0, cv.x, cv.y, color(224, 123, 32, 120), 5, false);

  // sum construction
  if (parallelogramCheckbox.checked()) {
    // dashed parallelogram sides
    stroke(180);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    line(toSX(u.x), toSY(u.y), toSX(sum.x), toSY(sum.y));
    line(toSX(v.x), toSY(v.y), toSX(sum.x), toSY(sum.y));
    drawingContext.setLineDash([]);
    noStroke();
  } else {
    // tip-to-tail: v copied to the tip of u
    drawArrow(u.x, u.y, sum.x, sum.y, color(224, 123, 32, 150), 2.5, true);
  }
  drawArrow(0, 0, sum.x, sum.y, MAROON, 3.5, false);
  // difference
  drawArrow(0, 0, diff.x, diff.y, DIFF_COLOR, 2.5, false);
  // main vectors
  drawArrow(0, 0, u.x, u.y, U_COLOR, 3.5, false);
  drawArrow(0, 0, v.x, v.y, V_COLOR, 3.5, false);

  // draggable tips
  for (let [w, col] of [[u, U_COLOR], [v, V_COLOR]]) {
    stroke('black');
    strokeWeight(2);
    fill(col);
    circle(toSX(w.x), toSY(w.y), 14);
  }
  noStroke();

  // vector labels
  textSize(15);
  fill(U_COLOR);
  textAlign(LEFT, BOTTOM);
  text('u', toSX(u.x) + 8, toSY(u.y) - 6);
  fill(V_COLOR);
  text('v', toSX(v.x) + 8, toSY(v.y) - 6);
  fill(MAROON);
  text('u+v', toSX(sum.x) + 8, toSY(sum.y) - 6);
  fill(DIFF_COLOR);
  text('u−v', toSX(diff.x) + 8, toSY(diff.y) - 6);

  // results panel
  let panX = canvasWidth * 0.62;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 45, panW, drawHeight - 100, 10);
  noStroke();
  textSize(15);
  textAlign(LEFT, TOP);
  fill(U_COLOR);
  text('u = ⟨' + nf(u.x, 0, 1) + ', ' + nf(u.y, 0, 1) + '⟩    ' + magDir(u), panX + 14, 58);
  fill(V_COLOR);
  text('v = ⟨' + nf(v.x, 0, 1) + ', ' + nf(v.y, 0, 1) + '⟩    ' + magDir(v), panX + 14, 88);
  fill(MAROON);
  text('u + v = ⟨' + nf(sum.x, 0, 1) + ', ' + nf(sum.y, 0, 1) + '⟩    ' + magDir(sum), panX + 14, 128);
  fill(DIFF_COLOR);
  text('u − v = ⟨' + nf(diff.x, 0, 1) + ', ' + nf(diff.y, 0, 1) + '⟩    ' + magDir(diff), panX + 14, 158);
  fill(V_COLOR);
  text(nf(c, 0, 1) + 'v = ⟨' + nf(cv.x, 0, 1) + ', ' + nf(cv.y, 0, 1) + '⟩    ' + magDir(cv), panX + 14, 188);
  fill(90);
  textSize(13);
  text('Component rule: add x\'s, add y\'s — exactly what the tip-to-tail picture does. ' +
       'A negative scalar flips the direction.',
       panX + 14, 228, panW - 28, 80);
  fill(100);
  textSize(13);
  text('Drag the blue and orange tips.', panX + 14, 300, panW - 28, 40);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('scalar c = ' + nf(c, 0, 1), 10, drawHeight + 55);
}

function mousePressed() {
  for (let w of [u, v]) {
    if (dist(mouseX, mouseY, toSX(w.x), toSY(w.y)) < 16) {
      dragging = w;
      return;
    }
  }
}

function mouseDragged() {
  if (dragging) {
    dragging.x = constrain(round((mouseX - cx) / scale * 2) / 2, -RANGE, RANGE);
    dragging.y = constrain(round((cy - mouseY) / scale * 2) / 2, -RANGE, RANGE);
  }
}

function mouseReleased() {
  dragging = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  cSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
