// Coordinate Plane Explorer MicroSim
// CANVAS_HEIGHT: 630
// Students locate ordered pairs on the coordinate plane and name quadrants.
// Bloom's Level: Apply — locate and identify ordered pairs on the plane.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 600;
let drawHeight = 550;
let controlHeight = 80; // 2 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// plot geometry (recomputed each frame for responsiveness)
let plotSize, plotLeft, plotTop;
const AXIS_MIN = -10;
const AXIS_MAX = 10;

// game state
let mysteryPoints = [];   // remaining points this round
let currentPoint = null;  // the point the student is hunting
let feedback = null;      // {x, y, correct, actual:[gx,gy], t}
let score = 0;
let totalThisRound = 5;

// controls
let newRoundButton;
let hoverCheckbox;
let quadrantSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  newRoundButton = createButton('New Round');
  newRoundButton.parent(mainElement);
  newRoundButton.position(10, drawHeight + 8);
  newRoundButton.mousePressed(startNewRound);

  quadrantSelect = createSelect();
  quadrantSelect.parent(mainElement);
  quadrantSelect.position(120, drawHeight + 8);
  quadrantSelect.option('All Quadrants');
  quadrantSelect.option('Quadrant I only');
  quadrantSelect.option('Quadrants I and II');
  quadrantSelect.option('Quadrants I, II and III');
  quadrantSelect.changed(startNewRound);

  hoverCheckbox = createCheckbox('Show coordinates on hover', false);
  hoverCheckbox.parent(mainElement);
  hoverCheckbox.position(10, drawHeight + 45);

  startNewRound();
  describe('Coordinate plane with four tinted quadrants. A mystery ordered pair is shown; click its location on the plane. Correct clicks flash gold.', LABEL);
}

function startNewRound() {
  mysteryPoints = [];
  score = 0;
  feedback = null;
  let mode = quadrantSelect ? quadrantSelect.value() : 'All Quadrants';
  let quads;
  if (mode === 'Quadrant I only') quads = [1];
  else if (mode === 'Quadrants I and II') quads = [1, 2];
  else if (mode === 'Quadrants I, II and III') quads = [1, 2, 3];
  else quads = [1, 2, 3, 4];
  while (mysteryPoints.length < totalThisRound) {
    let q = random(quads);
    let sx = (q === 1 || q === 4) ? 1 : -1;
    let sy = (q === 1 || q === 2) ? 1 : -1;
    let px = sx * floor(random(1, 10));
    let py = sy * floor(random(1, 10));
    // avoid duplicates
    if (!mysteryPoints.some(p => p[0] === px && p[1] === py)) {
      mysteryPoints.push([px, py]);
    }
  }
  currentPoint = mysteryPoints[0];
}

// map plane coordinates to screen pixels
function toScreenX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toScreenY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toPlaneX(px) { return AXIS_MIN + (px - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }
function toPlaneY(py) { return AXIS_MAX - (py - plotTop) / plotSize * (AXIS_MAX - AXIS_MIN); }

function draw() {
  updateCanvasSize();

  // drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  // compute square plot area centered horizontally
  plotSize = min(canvasWidth - 2 * margin, drawHeight - 90);
  plotLeft = (canvasWidth - plotSize) / 2;
  plotTop = 70;

  // quadrant tints
  noStroke();
  let cx = toScreenX(0), cy = toScreenY(0);
  fill(220, 235, 255); rect(cx, plotTop, plotLeft + plotSize - cx, cy - plotTop);            // Q1 light blue
  fill(220, 245, 220); rect(plotLeft, plotTop, cx - plotLeft, cy - plotTop);                 // Q2 light green
  fill(250, 250, 210); rect(plotLeft, cy, cx - plotLeft, plotTop + plotSize - cy);           // Q3 light yellow
  fill(255, 228, 235); rect(cx, cy, plotLeft + plotSize - cx, plotTop + plotSize - cy);      // Q4 light pink

  // gridlines
  stroke(200);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i++) {
    line(toScreenX(i), plotTop, toScreenX(i), plotTop + plotSize);
    line(plotLeft, toScreenY(i), plotLeft + plotSize, toScreenY(i));
  }
  // axes
  stroke('black');
  strokeWeight(2);
  line(toScreenX(0), plotTop, toScreenX(0), plotTop + plotSize);
  line(plotLeft, toScreenY(0), plotLeft + plotSize, toScreenY(0));

  // axis labels every 5
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 5) {
    if (i !== 0) text(i, toScreenX(i), toScreenY(0) + 4);
  }
  textAlign(RIGHT, CENTER);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 5) {
    if (i !== 0) text(i, toScreenX(0) - 4, toScreenY(i));
  }

  // quadrant roman numerals
  textSize(22);
  fill(120);
  textAlign(CENTER, CENTER);
  text('I', toScreenX(8.5), toScreenY(8.5));
  text('II', toScreenX(-8.5), toScreenY(8.5));
  text('III', toScreenX(-8.5), toScreenY(-8.5));
  text('IV', toScreenX(8.5), toScreenY(-8.5));

  // title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Coordinate Plane Explorer', canvasWidth / 2, 8);

  // mystery point prompt
  textSize(18);
  textAlign(LEFT, TOP);
  if (currentPoint) {
    fill('#800020');
    text('Mystery Point: (' + currentPoint[0] + ', ' + currentPoint[1] + ')', 10, 40);
  } else {
    fill('green');
    text('Round complete! Press New Round to play again.', 10, 40);
  }
  fill('black');
  textAlign(RIGHT, TOP);
  text('Points remaining: ' + mysteryPoints.length, canvasWidth - 10, 40);

  // click feedback
  if (feedback) {
    if (feedback.correct) {
      // gold flash on the point
      let alpha = map(millis() - feedback.t, 0, 900, 255, 0);
      if (alpha > 0) {
        noStroke();
        fill(255, 200, 0, alpha);
        circle(toScreenX(feedback.actual[0]), toScreenY(feedback.actual[1]), 36);
      }
    } else {
      // show actual coordinates near the wrong click
      stroke('#800020');
      strokeWeight(2);
      noFill();
      circle(feedback.x, feedback.y, 14);
      noStroke();
      fill('#800020');
      textSize(15);
      textAlign(LEFT, BOTTOM);
      let gx = round(toPlaneX(feedback.x) * 2) / 2;
      let gy = round(toPlaneY(feedback.y) * 2) / 2;
      text('(' + gx + ', ' + gy + ')', feedback.x + 10, feedback.y - 4);
    }
  }

  // hover coordinates
  if (hoverCheckbox.checked() && mouseInPlot()) {
    let gx = round(toPlaneX(mouseX) * 2) / 2;
    let gy = round(toPlaneY(mouseY) * 2) / 2;
    noStroke();
    fill(0, 0, 0, 190);
    rect(mouseX + 10, mouseY - 26, 84, 22, 5);
    fill('white');
    textSize(14);
    textAlign(LEFT, CENTER);
    text('(' + gx + ', ' + gy + ')', mouseX + 16, mouseY - 15);
  }

  // control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Score: ' + score + ' of ' + totalThisRound, 240, drawHeight + 58);
}

function mouseInPlot() {
  return mouseX >= plotLeft && mouseX <= plotLeft + plotSize &&
         mouseY >= plotTop && mouseY <= plotTop + plotSize;
}

function mousePressed() {
  if (!currentPoint || !mouseInPlot()) return;
  let gx = toPlaneX(mouseX);
  let gy = toPlaneY(mouseY);
  let d = dist(gx, gy, currentPoint[0], currentPoint[1]);
  if (d <= 0.5) {
    feedback = { x: mouseX, y: mouseY, correct: true, actual: currentPoint, t: millis() };
    score++;
    mysteryPoints.shift();
    currentPoint = mysteryPoints.length > 0 ? mysteryPoints[0] : null;
  } else {
    feedback = { x: mouseX, y: mouseY, correct: false, actual: currentPoint, t: millis() };
  }
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
