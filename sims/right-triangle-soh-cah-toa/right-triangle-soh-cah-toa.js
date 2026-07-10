// Right Triangle SOH-CAH-TOA MicroSim
// CANVAS_HEIGHT: 602
// A right triangle whose acute angle and scale are slider-controlled; the
// three ratios stay fixed when only the scale changes.
// Bloom's Level: Understand — trig ratios depend on the angle, not the size.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 480;
let controlHeight = 120; // 3 rows: angle slider, scale slider, checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 170;
let defaultTextSize = 16;

const MAROON = '#800020';
const OPP_COLOR = '#1e8a3c';   // green
const ADJ_COLOR = '#2b5fc7';   // blue

let angleSlider, scaleSlider;
let similarCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  angleSlider = createSlider(5, 85, 35, 1);
  angleSlider.parent(mainElement);
  angleSlider.position(sliderLeftMargin, drawHeight + 10);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);

  scaleSlider = createSlider(0.5, 1.4, 1, 0.05);
  scaleSlider.parent(mainElement);
  scaleSlider.position(sliderLeftMargin, drawHeight + 45);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);

  similarCheckbox = createCheckbox('Show similar triangle (same angle, bigger size)', false);
  similarCheckbox.parent(mainElement);
  similarCheckbox.position(10, drawHeight + 82);

  describe('A right triangle with a slider-controlled acute angle. Sides are colored: opposite green, adjacent blue, hypotenuse maroon. A panel shows the SOH-CAH-TOA ratios; an optional larger similar triangle demonstrates the ratios do not change with size.', LABEL);
}

function drawTriangle(x0, y0, hyp, thetaDeg, showLabels) {
  let theta = radians(thetaDeg);
  let adj = hyp * cos(theta);
  let opp = hyp * sin(theta);
  // vertices: A at angle (left), B at right angle (bottom right), C at top
  let ax = x0, ay = y0;
  let bx = x0 + adj, by = y0;
  let tx = bx, ty = y0 - opp;

  // sides
  strokeWeight(4);
  stroke(ADJ_COLOR);
  line(ax, ay, bx, by);          // adjacent
  stroke(OPP_COLOR);
  line(bx, by, tx, ty);          // opposite
  stroke(MAROON);
  line(ax, ay, tx, ty);          // hypotenuse

  // right-angle square
  stroke('black');
  strokeWeight(1.5);
  noFill();
  rect(bx - 16, by - 16, 16, 16);

  // angle arc at A
  stroke(MAROON);
  strokeWeight(2);
  arc(ax, ay, 70, 70, -theta, 0);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('θ = ' + thetaDeg + '°', ax + 44, ay - 18);

  if (showLabels) {
    noStroke();
    textSize(15);
    fill(ADJ_COLOR);
    textAlign(CENTER, TOP);
    text('adjacent = ' + nf(adj / 2, 0, 0), (ax + bx) / 2, ay + 8);
    fill(OPP_COLOR);
    textAlign(LEFT, CENTER);
    text('opposite = ' + nf(opp / 2, 0, 0), bx + 8, (by + ty) / 2);
    fill(MAROON);
    push();
    translate((ax + tx) / 2 - 12, (ay + ty) / 2 - 12);
    rotate(-theta);
    textAlign(CENTER, BOTTOM);
    text('hypotenuse = ' + nf(hyp / 2, 0, 0), 0, 0);
    pop();
  }
  return { opp, adj, hyp };
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
  textSize(24);
  text('SOH-CAH-TOA: Ratios Depend Only on the Angle', canvasWidth / 2, 8);

  let thetaDeg = angleSlider.value();
  let scale = scaleSlider.value();
  let baseHyp = min(canvasWidth * 0.3, 320) * scale;

  // main triangle in the lower-left
  let baseY = drawHeight - 60;
  drawTriangle(margin + 30, baseY, baseHyp, thetaDeg, true);

  // similar triangle
  if (similarCheckbox.checked()) {
    let x2 = margin + 30 + baseHyp * cos(radians(thetaDeg)) + 90;
    drawTriangle(x2, baseY, baseHyp * 1.5, thetaDeg, false);
    noStroke();
    fill(90);
    textSize(14);
    textAlign(LEFT, TOP);
    text('1.5× larger — same angle,\nsame ratios!', x2 + 20, baseY - 20);
  }

  // ratio panel on the right
  let theta = radians(thetaDeg);
  let panX = canvasWidth - min(320, canvasWidth * 0.32) - margin;
  let panW = min(320, canvasWidth * 0.32);
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 55, panW, 235, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('SOH  CAH  TOA', panX + 14, 67);
  textSize(15);
  fill(OPP_COLOR);
  text('SOH:  sin θ = opp / hyp = ' + nf(sin(theta), 0, 3), panX + 14, 100);
  fill(ADJ_COLOR);
  text('CAH:  cos θ = adj / hyp = ' + nf(cos(theta), 0, 3), panX + 14, 132);
  fill(MAROON);
  text('TOA:  tan θ = opp / adj = ' + nf(tan(theta), 0, 3), panX + 14, 164);
  fill(90);
  textSize(13);
  text('Move the SCALE slider: the side lengths change but all three ratios stay exactly the same. Only the ANGLE slider changes the ratios.',
       panX + 14, 200, panW - 28, 90);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('angle θ = ' + thetaDeg + '°', 10, drawHeight + 20);
  text('scale = ' + nf(scaleSlider.value(), 0, 2), 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
