// Standard Position & Reference Angles MicroSim
// CANVAS_HEIGHT: 642
// Rotate a terminal side through -2π to 4π; the shaded sector, reference
// angle, quadrant, and degree/radian readouts update live.
// Bloom's Level: Apply — compute the reference angle for any angle.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 560;
let controlHeight = 80; // 2 rows: theta slider, snap button + coterminal checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 170;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

let thetaSlider;
let snapButton;
let coterminalCheckbox;

let cx, cy, radius;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  thetaSlider = createSlider(-TWO_PI, 4 * PI, PI / 3, 0.01);
  thetaSlider.parent(mainElement);
  thetaSlider.position(sliderLeftMargin, drawHeight + 10);
  thetaSlider.size(canvasWidth - sliderLeftMargin - margin);

  snapButton = createButton('Snap to Special Angles');
  snapButton.parent(mainElement);
  snapButton.position(10, drawHeight + 43);
  snapButton.mousePressed(snapToSpecial);

  coterminalCheckbox = createCheckbox('Show coterminal angles (θ ± 2π)', false);
  coterminalCheckbox.parent(mainElement);
  coterminalCheckbox.position(195, drawHeight + 45);

  describe('An angle in standard position with its terminal side, shaded rotation sector, and the reference angle to the x-axis highlighted, along with a panel showing the angle in degrees and radians, the quadrant, and the reference angle.', LABEL);
}

function snapToSpecial() {
  let t = thetaSlider.value();
  // nearest multiple of π/6 and of π/4, pick the closer
  let m6 = Math.round(t / (PI / 6)) * (PI / 6);
  let m4 = Math.round(t / (PI / 4)) * (PI / 4);
  thetaSlider.value(abs(t - m6) < abs(t - m4) ? m6 : m4);
}

// normalized angle in [0, 2π), quadrant, and reference angle
function analyze(theta) {
  let norm = ((theta % TWO_PI) + TWO_PI) % TWO_PI;
  let quadrant, ref;
  if (norm < HALF_PI) { quadrant = 'I'; ref = norm; }
  else if (norm < PI) { quadrant = 'II'; ref = PI - norm; }
  else if (norm < 3 * HALF_PI) { quadrant = 'III'; ref = norm - PI; }
  else { quadrant = 'IV'; ref = TWO_PI - norm; }
  if (norm === 0 || norm === PI || norm === HALF_PI || norm === 3 * HALF_PI) quadrant = 'axis';
  return { norm, quadrant, ref };
}

function radStr(t) {
  // show as multiple of π when close to a nice fraction
  let k = t / PI;
  for (let den of [1, 2, 3, 4, 6, 12]) {
    let num = Math.round(k * den);
    if (abs(k * den - num) < 0.01) {
      if (num === 0) return '0';
      let frac = den === 1 ? num + 'π' : (abs(num) === 1 ? (num < 0 ? '−' : '') + 'π/' + den : num + 'π/' + den);
      return frac;
    }
  }
  return nf(t, 0, 2) + ' rad';
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

  cx = canvasWidth * 0.38;
  cy = drawHeight / 2 + 20;
  radius = min(canvasWidth * 0.3, drawHeight * 0.36);

  let theta = thetaSlider.value();
  let A = analyze(theta);

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Standard Position & Reference Angles', canvasWidth / 2, 8);

  // axes
  stroke('black');
  strokeWeight(2);
  line(cx - radius - 30, cy, cx + radius + 30, cy);
  line(cx, cy - radius - 30, cx, cy + radius + 30);
  noStroke();

  // quadrant labels
  fill(150);
  textSize(18);
  textAlign(CENTER, CENTER);
  text('QI', cx + radius * 0.75, cy - radius * 0.75);
  text('QII', cx - radius * 0.75, cy - radius * 0.75);
  text('QIII', cx - radius * 0.75, cy + radius * 0.75);
  text('QIV', cx + radius * 0.75, cy + radius * 0.75);

  // rotation sector (shaded) — supports |θ| > 2π by winding
  noStroke();
  fill(128, 0, 32, 45);
  let steps = ceil(abs(theta) / 0.05);
  beginShape();
  vertex(cx, cy);
  for (let i = 0; i <= steps; i++) {
    let t = theta * i / max(steps, 1);
    let r = radius * (0.35 + 0.1 * abs(t) / TWO_PI);   // spiral so windings are visible
    vertex(cx + r * cos(-t), cy + r * sin(-t));
  }
  endShape(CLOSE);

  // coterminal terminal sides
  if (coterminalCheckbox.checked()) {
    stroke(150);
    strokeWeight(2);
    drawingContext.setLineDash([6, 6]);
    for (let dt of [TWO_PI, -TWO_PI]) {
      let t = theta + dt;
      line(cx, cy, cx + radius * cos(-t), cy + radius * sin(-t));
    }
    drawingContext.setLineDash([]);
    noStroke();
  }

  // reference angle arc (gold), from terminal side to nearest x-axis side
  if (A.quadrant !== 'axis' && A.ref > 0.01) {
    let startA, endA;
    if (A.quadrant === 'I') { startA = 0; endA = A.norm; }
    else if (A.quadrant === 'II') { startA = A.norm; endA = PI; }
    else if (A.quadrant === 'III') { startA = PI; endA = A.norm; }
    else { startA = A.norm; endA = TWO_PI; }
    noFill();
    stroke(GOLD);
    strokeWeight(5);
    arc(cx, cy, radius * 1.15, radius * 1.15, -endA, -startA);
    noStroke();
    // label at arc midpoint
    let midA = (startA + endA) / 2;
    fill(GOLD);
    textSize(15);
    textAlign(CENTER, CENTER);
    text('ref', cx + radius * 0.68 * cos(-midA), cy + radius * 0.68 * sin(-midA));
  }

  // terminal side
  stroke(MAROON);
  strokeWeight(4);
  line(cx, cy, cx + radius * cos(-theta), cy + radius * sin(-theta));
  noStroke();
  fill(MAROON);
  circle(cx + radius * cos(-theta), cy + radius * sin(-theta), 13);

  // initial side marker
  stroke(CYAN);
  strokeWeight(4);
  line(cx, cy, cx + radius, cy);
  noStroke();

  // status panel
  let panX = canvasWidth * 0.68;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(panX, 70, panW, 200, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Angle Status', panX + 14, 82);
  fill('black');
  textSize(15);
  text('θ = ' + nf(degrees(theta), 0, 1) + '°', panX + 14, 112);
  text('θ = ' + radStr(theta), panX + 14, 138);
  text('Quadrant: ' + (A.quadrant === 'axis' ? 'on an axis' : A.quadrant), panX + 14, 170);
  fill(GOLD);
  text('Reference angle:', panX + 14, 202);
  text(nf(degrees(A.ref), 0, 1) + '° = ' + radStr(A.ref), panX + 14, 226);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('θ = ' + nf(degrees(theta), 0, 0) + '°', 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  thetaSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
