// Circle to Sine Graph MicroSim
// CANVAS_HEIGHT: 502
// A point moves around the unit circle while its y-coordinate sweeps out the
// sine curve on the right, connected by a dashed tracking line.
// Bloom's Level: Understand — the sine graph is the circle's y-coordinate unrolled.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 420;
let controlHeight = 80; // 2 rows: theta slider, buttons + checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 170;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

let isRunning = false;   // required default: paused
let thetaSlider;
let startButton, resetButton;
let showValueCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  thetaSlider = createSlider(0, 4 * PI, PI / 3, 0.01);
  thetaSlider.parent(mainElement);
  thetaSlider.position(sliderLeftMargin, drawHeight + 10);
  thetaSlider.size(canvasWidth - sliderLeftMargin - margin);

  startButton = createButton('Start');
  startButton.parent(mainElement);
  startButton.position(10, drawHeight + 43);
  startButton.mousePressed(toggleSimulation);

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(80, drawHeight + 43);
  resetButton.mousePressed(() => {
    thetaSlider.value(0);
    isRunning = false;
    startButton.html('Start');
  });

  showValueCheckbox = createCheckbox('Show y-coordinate value', true);
  showValueCheckbox.parent(mainElement);
  showValueCheckbox.position(155, drawHeight + 45);

  describe('Left: a unit circle with a point moving counterclockwise. Right: the sine curve being traced as the angle advances, with a dashed line linking the circle point\'s height to the graph point.', LABEL);
}

function toggleSimulation() {
  isRunning = !isRunning;
  startButton.html(isRunning ? 'Pause' : 'Start');
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

  if (isRunning) {
    let t = thetaSlider.value() + 0.02;
    if (t >= 4 * PI) { t = 4 * PI; isRunning = false; startButton.html('Start'); }
    thetaSlider.value(t);
  }
  let theta = thetaSlider.value();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('From the Unit Circle to the Sine Graph', canvasWidth / 2, 6);

  // circle on the left
  let ccx = canvasWidth * 0.17;
  let ccy = drawHeight / 2 + 20;
  let r = min(canvasWidth * 0.13, drawHeight * 0.3);

  stroke('black');
  strokeWeight(1.5);
  line(ccx - r - 20, ccy, ccx + r + 20, ccy);
  line(ccx, ccy - r - 20, ccx, ccy + r + 20);
  noFill();
  stroke(MAROON);
  strokeWeight(2);
  circle(ccx, ccy, r * 2);
  // tick marks at multiples of π/6 and π/4
  stroke(180);
  strokeWeight(1);
  for (let k = 0; k < 24; k++) {
    let a = k * PI / 12;
    line(ccx + r * 0.94 * cos(a), ccy - r * 0.94 * sin(a),
         ccx + r * cos(a), ccy - r * sin(a));
  }
  noStroke();

  // point P on circle
  let pxc = ccx + r * cos(theta);
  let pyc = ccy - r * sin(theta);
  stroke(MAROON);
  strokeWeight(2.5);
  line(ccx, ccy, pxc, pyc);
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(pxc, pyc, 13);
  noStroke();

  // graph on the right
  let gx0 = canvasWidth * 0.36;
  let gx1 = canvasWidth - margin;
  let gy0 = ccy;
  let gAmp = r;
  let toGX = t => map(t, 0, 4 * PI, gx0, gx1);

  stroke('black');
  strokeWeight(1.5);
  line(gx0, gy0, gx1, gy0);
  line(gx0, gy0 - gAmp - 15, gx0, gy0 + gAmp + 15);
  // key point labels every π/2
  noStroke();
  fill(90);
  textSize(13);
  textAlign(CENTER, TOP);
  const KEY_LABELS = ['0', 'π/2', 'π', '3π/2', '2π', '5π/2', '3π', '7π/2', '4π'];
  for (let k = 0; k <= 8; k++) {
    let t = k * PI / 2;
    stroke(220);
    strokeWeight(1);
    line(toGX(t), gy0 - gAmp, toGX(t), gy0 + gAmp);
    noStroke();
    fill(90);
    text(KEY_LABELS[k], toGX(t), gy0 + gAmp + 18);
  }
  // y gridlines at ±1
  stroke(220);
  line(gx0, gy0 - gAmp, gx1, gy0 - gAmp);
  line(gx0, gy0 + gAmp, gx1, gy0 + gAmp);
  noStroke();
  fill(90);
  textAlign(RIGHT, CENTER);
  text('1', gx0 - 5, gy0 - gAmp);
  text('−1', gx0 - 5, gy0 + gAmp);

  // trailing sine wave up to current theta
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let t = 0; t <= theta; t += 0.02) {
    vertex(toGX(t), gy0 - gAmp * sin(t));
  }
  endShape();
  noStroke();

  // current position markers
  let gpx = toGX(theta);
  let gpy = gy0 - gAmp * sin(theta);
  // gold vertical line at current angle
  stroke(GOLD);
  strokeWeight(2);
  line(gpx, gy0 - gAmp - 10, gpx, gy0 + gAmp + 10);
  // dashed connector from circle point to graph point
  stroke(CYAN);
  strokeWeight(1.8);
  drawingContext.setLineDash([5, 5]);
  line(pxc, pyc, gpx, gpy);
  drawingContext.setLineDash([]);
  stroke('black');
  strokeWeight(2);
  fill(CYAN);
  circle(gpx, gpy, 11);
  noStroke();

  // data readouts
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  text('θ = ' + nf(theta, 0, 2) + ' rad = ' + nf(degrees(theta), 0, 0) + '°', margin, 40);
  text('P = (cos θ, sin θ) = (' + nf(cos(theta), 0, 2) + ', ' + nf(sin(theta), 0, 2) + ')', margin, 64);
  if (showValueCheckbox.checked()) {
    fill(MAROON);
    text('sin θ = ' + nf(sin(theta), 0, 3) + '  ← height of the gold point AND the graph point', margin, 88);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('θ = ' + nf(theta, 0, 2), 10, drawHeight + 20);
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
