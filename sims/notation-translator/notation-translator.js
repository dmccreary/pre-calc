// Notation Translator MicroSim
// CANVAS_HEIGHT: 452
// Three synchronized views of the same set: number line, interval notation,
// and set-builder notation. Drag endpoints; click endpoints to toggle inclusion.
// Bloom's Level: Apply — translate between inequality, interval, and set-builder notation.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 50; // 1 row of buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const AXIS_MIN = -10;
const AXIS_MAX = 10;
let lineY = 120; // y position of the number line

// primary region [a, b]; values in plane units
let region1 = { lo: -2, hi: 5, loClosed: true, hiClosed: false };
// optional union region
let region2 = { lo: 7, hi: 9, loClosed: true, hiClosed: true };
let unionOn = false;

let dragging = null; // {region, end}
let challenge = null; // {lo, hi, loClosed, hiClosed}
let points = 0;

let challengeButton;
let unionButton;
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  challengeButton = createButton('Challenge Mode');
  challengeButton.parent(mainElement);
  challengeButton.position(10, drawHeight + 10);
  challengeButton.mousePressed(startChallenge);

  unionButton = createButton('Union');
  unionButton.parent(mainElement);
  unionButton.position(140, drawHeight + 10);
  unionButton.mousePressed(toggleUnion);

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(210, drawHeight + 10);
  resetButton.mousePressed(resetAll);

  describe('Number line with draggable endpoints. Interval notation and set-builder notation panels update in real time as endpoints move or toggle between open and closed.', LABEL);
}

function resetAll() {
  region1 = { lo: -2, hi: 5, loClosed: true, hiClosed: false };
  region2 = { lo: 7, hi: 9, loClosed: true, hiClosed: true };
  unionOn = false;
  challenge = null;
  points = 0;
}

function toggleUnion() {
  unionOn = !unionOn;
  unionButton.html(unionOn ? 'Remove Union' : 'Union');
}

function startChallenge() {
  let lo = floor(random(-9, 4));
  let hi = lo + floor(random(2, 7));
  challenge = {
    lo: lo, hi: hi,
    loClosed: random() < 0.5,
    hiClosed: random() < 0.5
  };
  unionOn = false;
  unionButton.html('Union');
}

function toScreenX(gx) {
  return margin + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * (canvasWidth - 2 * margin);
}
function toPlaneX(px) {
  return AXIS_MIN + (px - margin) / (canvasWidth - 2 * margin) * (AXIS_MAX - AXIS_MIN);
}

function intervalText(r) {
  return (r.loClosed ? '[' : '(') + r.lo + ', ' + r.hi + (r.hiClosed ? ']' : ')');
}
function setBuilderText(r) {
  return r.lo + ' ' + (r.loClosed ? '≤' : '<') + ' x ' + (r.hiClosed ? '≤' : '<') + ' ' + r.hi;
}

function drawRegion(r, highlight) {
  let x1 = toScreenX(r.lo), x2 = toScreenX(r.hi);
  // shaded band
  noStroke();
  fill(128, 0, 32, 100); // maroon, 40% opacity
  rect(x1, lineY - 12, x2 - x1, 24);
  // endpoint circles
  stroke('#800020');
  strokeWeight(3);
  if (r.loClosed) fill('#800020'); else fill('white');
  circle(x1, lineY, 18);
  if (r.hiClosed) fill('#800020'); else fill('white');
  circle(x2, lineY, 18);
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
  text('Notation Translator', canvasWidth / 2, 10);

  // number line
  stroke('black');
  strokeWeight(2);
  line(margin, lineY, canvasWidth - margin, lineY);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i++) {
    let x = toScreenX(i);
    line(x, lineY - 6, x, lineY + 6);
  }
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    text(i, toScreenX(i), lineY + 12);
  }

  // shaded regions with endpoint handles
  drawRegion(region1);
  if (unionOn) drawRegion(region2);

  // hint above line
  noStroke();
  fill(100);
  textSize(15);
  textAlign(CENTER, BOTTOM);
  text('Drag the handles • Click a handle to toggle open/closed', canvasWidth / 2, lineY - 24);

  // notation panels
  let panelY = 190;
  let panelW = (canvasWidth - 3 * margin) / 2;
  // interval panel
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 230);
  rect(margin, panelY, panelW, 90, 10);
  rect(margin * 2 + panelW, panelY, panelW, 90, 10);
  noStroke();
  fill('#800020');
  textSize(16);
  textAlign(LEFT, TOP);
  text('Interval Notation', margin + 14, panelY + 10);
  text('Set-Builder Notation', margin * 2 + panelW + 14, panelY + 10);
  fill('black');
  textSize(24);
  let iText = intervalText(region1) + (unionOn ? '  ∪  ' + intervalText(region2) : '');
  let sText = '{ x | ' + setBuilderText(region1) + (unionOn ? '  or  ' + setBuilderText(region2) : '') + ' }';
  text(iText, margin + 14, panelY + 44);
  textSize(unionOn ? 18 : 24);
  text(sText, margin * 2 + panelW + 14, panelY + 44);

  // challenge panel
  if (challenge) {
    stroke(200);
    fill(255, 250, 230);
    rect(margin, panelY + 105, canvasWidth - 2 * margin, 70, 10);
    noStroke();
    fill('black');
    textSize(17);
    textAlign(LEFT, TOP);
    text('Challenge: move the handles to match  ' + intervalText(challenge), margin + 14, panelY + 117);
    // check match
    if (!unionOn &&
        region1.lo === challenge.lo && region1.hi === challenge.hi &&
        region1.loClosed === challenge.loClosed && region1.hiClosed === challenge.hiClosed) {
      fill('green');
      text('Correct! +1 point — next challenge loading…', margin + 14, panelY + 142);
      points++;
      startChallenge();
    } else {
      fill(100);
      text('Match the endpoints and the open/closed style.', margin + 14, panelY + 142);
    }
  }

  // control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Points: ' + points, 290, drawHeight + 22);
}

function nearestHandle(px, py) {
  let regions = unionOn ? [region1, region2] : [region1];
  for (let r of regions) {
    for (let end of ['lo', 'hi']) {
      if (dist(px, py, toScreenX(r[end]), lineY) < 14) {
        return { region: r, end: end };
      }
    }
  }
  return null;
}

function mousePressed() {
  let h = nearestHandle(mouseX, mouseY);
  if (h) {
    dragging = h;
    dragging.moved = false;
  }
}

function mouseDragged() {
  if (!dragging) return;
  dragging.moved = true;
  let r = dragging.region;
  let v = constrain(round(toPlaneX(mouseX)), AXIS_MIN, AXIS_MAX);
  if (dragging.end === 'lo') r.lo = min(v, r.hi - 1);
  else r.hi = max(v, r.lo + 1);
}

function mouseReleased() {
  if (dragging && !dragging.moved) {
    // click without drag toggles inclusion
    let r = dragging.region;
    if (dragging.end === 'lo') r.loClosed = !r.loClosed;
    else r.hiClosed = !r.hiClosed;
  }
  dragging = null;
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
