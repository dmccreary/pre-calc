// Force, Displacement, and Work MicroSim
// CANVAS_HEIGHT: 582
// W = F · d picks out only the force component along the displacement;
// at 90° the work drops to exactly zero.
// Bloom's Level: Understand — the dot product measures alignment.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 430;
let controlHeight = 150; // 4 rows: three sliders + compute button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 230;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

let angleSlider, forceSlider, dispSlider;
let computeButton;
let computeStep = 0;   // 0 hidden, 1..3 staged formula reveal

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  angleSlider = createSlider(0, 180, 40, 1);
  angleSlider.parent(mainElement);
  angleSlider.position(sliderLeftMargin, drawHeight + 10);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);
  angleSlider.input(() => computeStep = 0);

  forceSlider = createSlider(0, 100, 60, 1);
  forceSlider.parent(mainElement);
  forceSlider.position(sliderLeftMargin, drawHeight + 45);
  forceSlider.size(canvasWidth - sliderLeftMargin - margin);
  forceSlider.input(() => computeStep = 0);

  dispSlider = createSlider(0, 20, 10, 0.5);
  dispSlider.parent(mainElement);
  dispSlider.position(sliderLeftMargin, drawHeight + 80);
  dispSlider.size(canvasWidth - sliderLeftMargin - margin);
  dispSlider.input(() => computeStep = 0);

  computeButton = createButton('Compute Work (step through)');
  computeButton.parent(mainElement);
  computeButton.position(10, drawHeight + 113);
  computeButton.mousePressed(() => { computeStep = min(3, computeStep + 1); });

  describe('A block on a surface with a blue displacement arrow and a maroon force arrow at an adjustable angle. The gold dashed projection shows the force component doing work; the panel steps through W equals F d cosine theta with live numbers.', LABEL);
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
  text('Work = Force · Displacement', canvasWidth / 2, 6);

  let angDeg = angleSlider.value();
  let ang = radians(angDeg);
  let F = forceSlider.value();
  let d = dispSlider.value();
  let W = F * d * cos(ang);

  // scene: block + surface
  let groundY = drawHeight - 90;
  let blockX = canvasWidth * 0.18;
  let blockSize = 56;
  stroke(90, 70, 40);
  strokeWeight(3);
  line(margin, groundY, canvasWidth * 0.62, groundY);
  noStroke();
  stroke('black');
  strokeWeight(1.5);
  fill(170);
  rect(blockX - blockSize / 2, groundY - blockSize, blockSize, blockSize, 6);
  noStroke();

  let ox = blockX, oy = groundY - blockSize / 2;
  let dScale = 14, fScale = 2.2;

  // displacement vector (blue, horizontal, dashed)
  stroke('#2b5fc7');
  strokeWeight(3.5);
  drawingContext.setLineDash([8, 6]);
  line(ox, oy, ox + d * dScale, oy);
  drawingContext.setLineDash([]);
  noStroke();
  fill('#2b5fc7');
  triangle(ox + d * dScale, oy - 7, ox + d * dScale, oy + 7, ox + d * dScale + 12, oy);
  textSize(14);
  textAlign(LEFT, TOP);
  text('d = ' + nf(d, 0, 1) + ' m', ox + d * dScale / 2, oy + 12);

  // force vector (maroon at angle)
  let fx = ox + F * fScale * cos(ang);
  let fy = oy - F * fScale * sin(ang);
  stroke(MAROON);
  strokeWeight(3.5);
  line(ox, oy, fx, fy);
  noStroke();
  fill(MAROON);
  push();
  translate(fx, fy);
  rotate(-ang);
  triangle(0, -7, 0, 7, 12, 0);
  pop();
  textAlign(LEFT, BOTTOM);
  text('F = ' + F + ' N', fx + 8, fy);

  // projection of F onto d (gold dashed)
  let projLen = F * fScale * cos(ang);
  stroke(GOLD);
  strokeWeight(4);
  drawingContext.setLineDash([6, 5]);
  line(ox, oy + 24, ox + projLen, oy + 24);
  // dotted drop from force tip to projection
  stroke(180);
  strokeWeight(1.2);
  drawingContext.setLineDash([3, 4]);
  line(fx, fy, ox + projLen, oy + 24);
  drawingContext.setLineDash([]);
  noStroke();
  fill(GOLD);
  textSize(13);
  textAlign(LEFT, TOP);
  text('F cos θ = ' + nf(F * cos(ang), 0, 1) + ' N (the part that does work)',
       ox + 4, oy + 32);

  // angle arc
  noFill();
  stroke(120);
  strokeWeight(2);
  arc(ox, oy, 56, 56, -ang, 0);
  noStroke();
  fill(120);
  textSize(14);
  textAlign(CENTER, CENTER);
  text('θ=' + angDeg + '°', ox + 44 * cos(-ang / 2), oy + 44 * sin(-ang / 2) - 2);

  // computation panel
  let panX = canvasWidth * 0.66;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 45, panW, drawHeight - 100, 10);
  noStroke();
  fill(MAROON);
  textSize(15);
  textAlign(LEFT, TOP);
  text('Dot product breakdown', panX + 14, 56);
  fill('black');
  textSize(14);
  text('F = ' + F + ' N at ' + angDeg + '°\n= ⟨' + nf(F * cos(ang), 0, 1) + ', ' +
       nf(F * sin(ang), 0, 1) + '⟩ N', panX + 14, 86);
  text('d = ⟨' + nf(d, 0, 1) + ', 0⟩ m', panX + 14, 138);

  if (computeStep >= 1) {
    fill(MAROON);
    text('W = |F||d| cos θ', panX + 14, 172);
  }
  if (computeStep >= 2) {
    fill('black');
    text('W = (' + F + ')(' + nf(d, 0, 1) + ') cos(' + angDeg + '°)\n' +
         'W = (' + F + ')(' + nf(d, 0, 1) + ')(' + nf(cos(ang), 0, 3) + ')', panX + 14, 200);
  }
  if (computeStep >= 3) {
    fill(abs(W) < 0.5 ? color(200, 120, 0) : color(0, 120, 0));
    textSize(18);
    text('W = ' + nf(W, 0, 1) + ' J', panX + 14, 256);
    if (angDeg === 90) {
      fill(MAROON);
      textSize(14);
      text('Perpendicular force → zero work!\nAll push, no progress.', panX + 14, 288);
    } else if (W < 0) {
      fill(MAROON);
      textSize(13);
      text('θ > 90° → negative work: the force\nopposes the motion.', panX + 14, 288);
    }
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('angle θ = ' + angDeg + '°', 10, drawHeight + 20);
  text('force |F| = ' + F + ' N', 10, drawHeight + 55);
  text('displacement |d| = ' + nf(d, 0, 1) + ' m', 10, drawHeight + 90);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);
  forceSlider.size(canvasWidth - sliderLeftMargin - margin);
  dispSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
