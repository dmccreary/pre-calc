// Projectile Motion MicroSim
// CANVAS_HEIGHT: 582
// Parametric projectile motion: x(t) horizontal at constant speed, y(t)
// under gravity — with velocity decomposition and computed flight metrics.
// Bloom's Level: Apply — predict max height, flight time, and range.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 430;
let controlHeight = 150; // 4 rows: three sliders + buttons/toggle row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const G = 9.8;

let t = 0;
let isRunning = false;   // required default: paused
let landed = false;

let speedSlider, angleSlider, heightSlider;
let launchButton, resetButton;
let vectorCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  speedSlider = createSlider(5, 50, 25, 1);
  speedSlider.parent(mainElement);
  speedSlider.position(sliderLeftMargin, drawHeight + 10);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
  speedSlider.input(resetFlight);

  angleSlider = createSlider(0, 90, 45, 1);
  angleSlider.parent(mainElement);
  angleSlider.position(sliderLeftMargin, drawHeight + 45);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);
  angleSlider.input(resetFlight);

  heightSlider = createSlider(0, 10, 0, 0.5);
  heightSlider.parent(mainElement);
  heightSlider.position(sliderLeftMargin, drawHeight + 80);
  heightSlider.size(canvasWidth - sliderLeftMargin - margin);
  heightSlider.input(resetFlight);

  launchButton = createButton('Launch');
  launchButton.parent(mainElement);
  launchButton.position(10, drawHeight + 113);
  launchButton.mousePressed(() => {
    if (landed) resetFlight();
    isRunning = !isRunning;
    launchButton.html(isRunning ? 'Pause' : 'Launch');
  });

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(90, drawHeight + 113);
  resetButton.mousePressed(resetFlight);

  vectorCheckbox = createCheckbox('Show velocity components', true);
  vectorCheckbox.parent(mainElement);
  vectorCheckbox.position(165, drawHeight + 115);

  describe('Side view of projectile motion: the trajectory arcs over a ground line as time advances, with the velocity vector split into a constant horizontal arrow and a changing vertical arrow. A data panel reports maximum height, time of flight, and range.', LABEL);
}

function resetFlight() {
  t = 0;
  isRunning = false;
  landed = false;
  if (launchButton) launchButton.html('Launch');
}

function flightMetrics() {
  let v0 = speedSlider.value();
  let alpha = radians(angleSlider.value());
  let h0 = heightSlider.value();
  let vx = v0 * cos(alpha), vy = v0 * sin(alpha);
  // time of flight: h0 + vy t − 4.9 t² = 0
  let tFlight = (vy + Math.sqrt(vy * vy + 2 * G * h0)) / G;
  let range = vx * tFlight;
  let maxH = h0 + vy * vy / (2 * G);
  return { v0, alpha, h0, vx, vy, tFlight, range, maxH };
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

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Projectile Motion with Parametric Equations', canvasWidth / 2, 6);

  let M = flightMetrics();

  // scale the scene to the full flight
  let sceneW = max(M.range * 1.15, 20);
  let sceneH = max(M.maxH * 1.5, 15);
  let groundY = drawHeight - 60;
  let plotLeft = margin + 30;
  let plotW = canvasWidth * 0.62;
  let sx = x => plotLeft + x / sceneW * plotW;
  let sy = y => groundY - y / sceneH * (groundY - 60);

  // ground
  stroke(90, 70, 40);
  strokeWeight(3);
  line(plotLeft - 10, groundY, plotLeft + plotW + 20, groundY);
  noStroke();

  // advance time
  if (isRunning) {
    t += 0.03;
    if (t >= M.tFlight) { t = M.tFlight; isRunning = false; landed = true; launchButton.html('Launch'); }
  }

  // trajectory so far
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let tt = 0; tt <= t; tt += 0.02) {
    vertex(sx(M.vx * tt), sy(M.h0 + M.vy * tt - 0.5 * G * tt * tt));
  }
  endShape();
  // full predicted path (faint)
  stroke(200);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  beginShape();
  for (let tt = 0; tt <= M.tFlight; tt += 0.05) {
    vertex(sx(M.vx * tt), sy(M.h0 + M.vy * tt - 0.5 * G * tt * tt));
  }
  endShape();
  drawingContext.setLineDash([]);
  noStroke();

  // launcher angle indicator
  stroke(120);
  strokeWeight(3);
  line(sx(0), sy(M.h0), sx(0) + 30 * cos(-M.alpha) * 1, sy(M.h0) + 30 * sin(-M.alpha));
  noStroke();

  // current position + velocity vectors
  let cxp = M.vx * t;
  let cyp = M.h0 + M.vy * t - 0.5 * G * t * t;
  let vyNow = M.vy - G * t;
  if (vectorCheckbox.checked()) {
    let vScale = 2.2;
    stroke(CYAN);
    strokeWeight(3);
    line(sx(cxp), sy(cyp), sx(cxp) + M.vx * vScale, sy(cyp));                // horizontal
    stroke('#1e8a3c');
    line(sx(cxp), sy(cyp), sx(cxp), sy(cyp) - vyNow * vScale);               // vertical
    noStroke();
    fill(CYAN);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('vₓ = ' + nf(M.vx, 0, 1) + ' (constant)', sx(cxp) + M.vx * vScale + 4, sy(cyp));
    fill('#1e8a3c');
    text('v_y = ' + nf(vyNow, 0, 1), sx(cxp) + 4, sy(cyp) - vyNow * vScale - 3);
  }
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(sx(cxp), sy(cyp), 14);
  noStroke();

  // data panel
  let panX = plotLeft + plotW + 25;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 40, panW, drawHeight - 100, 10);
  noStroke();
  fill(MAROON);
  textSize(15);
  textAlign(LEFT, TOP);
  text('Parametric model', panX + 12, 50);
  fill('black');
  textSize(13);
  text('x(t) = ' + nf(M.vx, 0, 1) + ' t', panX + 12, 76);
  text('y(t) = ' + nf(M.h0, 0, 1) + ' + ' + nf(M.vy, 0, 1) + ' t − 4.9 t²', panX + 12, 96);
  fill(90);
  text('t = ' + nf(t, 0, 2) + ' s', panX + 12, 124);
  text('x(t) = ' + nf(cxp, 0, 1) + ' m,  y(t) = ' + nf(max(cyp, 0), 0, 1) + ' m', panX + 12, 144);
  fill(MAROON);
  textSize(14);
  text('Predicted metrics:', panX + 12, 176);
  fill('black');
  textSize(13);
  text('Max height = ' + nf(M.maxH, 0, 1) + ' m', panX + 12, 200);
  text('Time of flight = ' + nf(M.tFlight, 0, 2) + ' s', panX + 12, 220);
  text('Range = ' + nf(M.range, 0, 1) + ' m', panX + 12, 240);
  if (landed) {
    fill('green');
    text('Landed! Metrics confirmed.', panX + 12, 264);
  }
  fill(90);
  textSize(12);
  text('Eliminating t:  y = ' + nf(M.h0, 0, 1) + ' + ' + nf(tan(M.alpha), 0, 2) +
       'x − ' + nf(G / (2 * M.vx * M.vx), 0, 4) + 'x²  (a parabola)',
       panX + 12, 290, panW - 24, 60);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('speed v₀ = ' + speedSlider.value() + ' m/s', 10, drawHeight + 20);
  text('angle α = ' + angleSlider.value() + '°', 10, drawHeight + 55);
  text('height h₀ = ' + nf(heightSlider.value(), 0, 1) + ' m', 10, drawHeight + 90);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);
  heightSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
