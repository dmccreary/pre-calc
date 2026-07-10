// Polar-Rectangular Converter MicroSim
// CANVAS_HEIGHT: 602
// Drag one point over an overlaid rectangular + polar grid and watch both
// coordinate readouts update; enter either form directly.
// Bloom's Level: Apply — convert between (x, y) and (r, θ).
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 520;
let controlHeight = 80; // 2 rows: rect inputs + polar inputs, alternatives button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';
const RANGE = 5;

let px = 3, py = 2;   // current point (rectangular)
let draggingPoint = false;
let showAlternatives = false;

let xInput, yInput, setRectButton;
let rInput, thetaInput, setPolarButton;
let altButton;

let cx, cy, scale;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  xInput = createInput('3');
  xInput.parent(mainElement);
  xInput.position(40, drawHeight + 8);
  xInput.size(42);
  yInput = createInput('2');
  yInput.parent(mainElement);
  yInput.position(140, drawHeight + 8);
  yInput.size(42);
  setRectButton = createButton('Set (x, y)');
  setRectButton.parent(mainElement);
  setRectButton.position(200, drawHeight + 8);
  setRectButton.mousePressed(() => {
    let x = parseFloat(xInput.value()), y = parseFloat(yInput.value());
    if (isFinite(x) && isFinite(y)) { px = constrain(x, -RANGE, RANGE); py = constrain(y, -RANGE, RANGE); }
  });

  rInput = createInput('3.6');
  rInput.parent(mainElement);
  rInput.position(345, drawHeight + 8);
  rInput.size(42);
  thetaInput = createInput('33.7');
  thetaInput.parent(mainElement);
  thetaInput.position(445, drawHeight + 8);
  thetaInput.size(48);
  setPolarButton = createButton('Set (r, θ°)');
  setPolarButton.parent(mainElement);
  setPolarButton.position(505, drawHeight + 8);
  setPolarButton.mousePressed(() => {
    let r = parseFloat(rInput.value()), t = radians(parseFloat(thetaInput.value()));
    if (isFinite(r) && isFinite(t)) {
      px = constrain(r * cos(t), -RANGE, RANGE);
      py = constrain(r * sin(t), -RANGE, RANGE);
    }
  });

  altButton = createButton('Show alternative polar forms');
  altButton.parent(mainElement);
  altButton.position(10, drawHeight + 45);
  altButton.mousePressed(() => { showAlternatives = !showAlternatives; });

  describe('A draggable gold point over combined rectangular and polar grids. A blue segment from the origin shows r, an arc shows theta, and dashed lines show the x and y components. Side panel lists both coordinate forms and the conversion formulas with live numbers.', LABEL);
}

function toSX(gx) { return cx + gx * scale; }
function toSY(gy) { return cy - gy * scale; }

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
  text('Polar ↔ Rectangular Converter', canvasWidth / 2, 6);

  // rectangular grid
  stroke(230);
  strokeWeight(1);
  for (let i = -RANGE; i <= RANGE; i++) {
    line(toSX(i), toSY(-RANGE), toSX(i), toSY(RANGE));
    line(toSX(-RANGE), toSY(i), toSX(RANGE), toSY(i));
  }
  // polar grid: circles
  noFill();
  stroke(210, 225, 240);
  for (let rr = 1; rr <= RANGE; rr++) circle(cx, cy, rr * 2 * scale);
  // axes
  stroke('black');
  strokeWeight(1.8);
  line(toSX(-RANGE), cy, toSX(RANGE), cy);
  line(cx, toSY(-RANGE), cx, toSY(RANGE));
  noStroke();

  let r = Math.sqrt(px * px + py * py);
  let theta = Math.atan2(py, px);

  // r segment
  stroke('#2b5fc7');
  strokeWeight(3);
  line(cx, cy, toSX(px), toSY(py));
  // θ arc
  noFill();
  stroke(MAROON);
  strokeWeight(2.5);
  if (theta >= 0) arc(cx, cy, 60, 60, -theta, 0);
  else arc(cx, cy, 60, 60, 0, -theta);
  // component dashed lines
  stroke(120);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  line(toSX(px), toSY(py), toSX(px), cy);
  line(toSX(px), toSY(py), cx, toSY(py));
  drawingContext.setLineDash([]);
  // point
  stroke('black');
  strokeWeight(2);
  fill(GOLD);
  circle(toSX(px), toSY(py), 16);
  noStroke();

  // labels near figure
  fill('#2b5fc7');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text('r = ' + nf(r, 0, 2), (cx + toSX(px)) / 2 + 6, (cy + toSY(py)) / 2 - 4);
  fill(MAROON);
  text('θ', cx + 38 * cos(-theta / 2), cy + 38 * sin(-theta / 2));

  // readout panel
  let panX = canvasWidth * 0.6;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 50, panW, drawHeight - 110, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Two names for one point', panX + 14, 62);
  fill('black');
  textSize(16);
  text('Rectangular: (x, y) = (' + nf(px, 0, 2) + ', ' + nf(py, 0, 2) + ')', panX + 14, 96);
  text('Polar: (r, θ) = (' + nf(r, 0, 2) + ', ' + nf(degrees(theta), 0, 1) + '°)', panX + 14, 126);
  fill(90);
  textSize(14);
  text('Conversions with these numbers:', panX + 14, 166);
  fill('black');
  text('r = √(x² + y²) = √(' + nf(px * px, 0, 1) + ' + ' + nf(py * py, 0, 1) + ') = ' + nf(r, 0, 2),
       panX + 14, 192, panW - 28, 40);
  text('θ = atan2(y, x) = ' + nf(degrees(theta), 0, 1) + '°', panX + 14, 226);
  text('x = r cos θ = ' + nf(r, 0, 2) + ' · ' + nf(cos(theta), 0, 2) + ' = ' + nf(px, 0, 2),
       panX + 14, 256, panW - 28, 40);
  text('y = r sin θ = ' + nf(r, 0, 2) + ' · ' + nf(sin(theta), 0, 2) + ' = ' + nf(py, 0, 2),
       panX + 14, 288, panW - 28, 40);

  if (showAlternatives) {
    fill(MAROON);
    textSize(14);
    let deg = degrees(theta);
    text('Equivalent polar names:', panX + 14, 326);
    fill('black');
    text('(' + nf(r, 0, 2) + ', ' + nf(deg + 360, 0, 1) + '°)   — add a full turn', panX + 14, 350);
    text('(' + nf(r, 0, 2) + ', ' + nf(deg - 360, 0, 1) + '°)   — subtract a full turn', panX + 14, 374);
    text('(−' + nf(r, 0, 2) + ', ' + nf(deg + 180, 0, 1) + '°)  — negative r, opposite ray', panX + 14, 398);
  }

  // hint
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Drag the gold point, or type either form below.', margin, drawHeight - 30);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('x =', 10, drawHeight + 20);
  text('y =', 112, drawHeight + 20);
  text('r =', 318, drawHeight + 20);
  text('θ° =', 405, drawHeight + 20);
}

function mousePressed() {
  if (dist(mouseX, mouseY, toSX(px), toSY(py)) < 18) draggingPoint = true;
}

function mouseDragged() {
  if (draggingPoint) {
    px = constrain((mouseX - cx) / scale, -RANGE, RANGE);
    py = constrain((cy - mouseY) / scale, -RANGE, RANGE);
    // snap to quarter units for readable numbers
    px = round(px * 4) / 4;
    py = round(py * 4) / 4;
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
