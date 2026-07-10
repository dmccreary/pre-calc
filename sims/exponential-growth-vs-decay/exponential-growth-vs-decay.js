// Exponential Growth vs Decay MicroSim
// CANVAS_HEIGHT: 602
// Sweep the base b across 1 and watch f(x) = a·bˣ flip between decay and
// growth while the asymptote at y = 0 never moves.
// Bloom's Level: Analyze — the base b alone decides growth, decay, or constant.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 120; // 3 rows: a slider, b slider, checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const X_MIN = -5, X_MAX = 5, Y_MIN = 0, Y_MAX = 30;

let aSlider, bSlider;
let interceptCheckbox;
let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aSlider = createSlider(0.1, 10, 3, 0.1);
  aSlider.parent(mainElement);
  aSlider.position(sliderLeftMargin, drawHeight + 10);
  aSlider.size(canvasWidth - sliderLeftMargin - margin);

  bSlider = createSlider(0.1, 5, 1.6, 0.05);
  bSlider.parent(mainElement);
  bSlider.position(sliderLeftMargin, drawHeight + 45);
  bSlider.size(canvasWidth - sliderLeftMargin - margin);

  interceptCheckbox = createCheckbox('Show y-intercept (0, a)', true);
  interceptCheckbox.parent(mainElement);
  interceptCheckbox.position(10, drawHeight + 82);

  describe('The graph of f of x equals a times b to the x. Sliding the base b across one flips the curve between decay and growth while the horizontal asymptote at y equals zero stays fixed.', LABEL);
}

function toSX(gx) { return map(gx, X_MIN, X_MAX, plotLeft, plotLeft + plotW); }
function toSY(gy) { return map(gy, Y_MIN, Y_MAX, plotTop + plotH, plotTop); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotLeft = margin + 20;
  plotTop = 55;
  plotW = canvasWidth - 2 * margin - 40;
  plotH = drawHeight - 130;

  let a = aSlider.value();
  let b = bSlider.value();

  // grid + axes
  stroke(226);
  strokeWeight(1);
  for (let i = X_MIN; i <= X_MAX; i++) line(toSX(i), plotTop, toSX(i), plotTop + plotH);
  for (let v = 0; v <= Y_MAX; v += 5) line(plotLeft, toSY(v), plotLeft + plotW, toSY(v));
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotH);
  noStroke();

  // asymptote y = 0 emphasized
  stroke(CYAN);
  strokeWeight(3);
  line(plotLeft, toSY(0), plotLeft + plotW, toSY(0));
  noStroke();
  fill(CYAN);
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text('asymptote y = 0', plotLeft + plotW, toSY(0) - 5);

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Exponential Growth vs Decay', canvasWidth / 2, 8);

  // curve
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let gx = X_MIN; gx <= X_MAX; gx += 0.03) {
    let gy = a * Math.pow(b, gx);
    if (gy <= Y_MAX * 1.05) vertex(toSX(gx), toSY(min(gy, Y_MAX)));
  }
  endShape();
  noStroke();

  // y-intercept marker
  if (interceptCheckbox.checked() && a <= Y_MAX) {
    stroke('black');
    strokeWeight(2);
    fill('gold');
    circle(toSX(0), toSY(a), 14);
    noStroke();
    fill('black');
    textSize(15);
    textAlign(LEFT, CENTER);
    text('(0, ' + nf(a, 0, 1) + ')', toSX(0) + 12, toSY(a));
  }

  // verdict label
  let verdict, vColor;
  if (b > 1) { verdict = 'GROWTH — b > 1'; vColor = color(0, 130, 0); }
  else if (b < 1) { verdict = 'DECAY — 0 < b < 1'; vColor = color(200, 150, 0); }
  else { verdict = 'CONSTANT — b = 1'; vColor = color(120); }
  noStroke();
  fill(vColor);
  textSize(20);
  textAlign(LEFT, TOP);
  text('f(x) = ' + nf(a, 0, 1) + ' · ' + nf(b, 0, 2) + 'ˣ    ' + verdict,
       plotLeft + 10, plotTop + 4);

  // b = 1 boundary marker note
  fill(100);
  textSize(14);
  text('Watch what happens as b crosses 1', plotLeft + 10, plotTop + 32);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('a (start) = ' + nf(a, 0, 1), 10, drawHeight + 20);
  text('b (base) = ' + nf(b, 0, 2), 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  aSlider.size(canvasWidth - sliderLeftMargin - margin);
  bSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
