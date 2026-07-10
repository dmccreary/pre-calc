// Linear Form Translator MicroSim
// CANVAS_HEIGHT: 552
// One draggable line shown simultaneously in slope-intercept, point-slope,
// and standard form. All three update live as the handles move.
// Bloom's Level: Apply — convert a linear equation between the three forms.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 470;
let controlHeight = 80; // 2 rows: presets, checkboxes
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -10, AXIS_MAX = 10;

// line state: y-intercept handle at (0, b); slope handle at (px, py) on the line
let b = 1;
let px = 3, py = 7;   // second anchor (integer coords) — slope = (py - b) / px

let dragging = null;  // 'intercept' | 'slope'
let plotLeft, plotTop, plotSize;

let showWorkCheckbox;
let lockSlopeCheckbox;
let preset1Button, preset2Button, preset3Button;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  preset1Button = createButton('y = 2x + 1');
  preset1Button.parent(mainElement);
  preset1Button.position(10, drawHeight + 8);
  preset1Button.mousePressed(() => { b = 1; px = 3; py = 7; });

  preset2Button = createButton('y = -½x + 4');
  preset2Button.parent(mainElement);
  preset2Button.position(110, drawHeight + 8);
  preset2Button.mousePressed(() => { b = 4; px = 4; py = 2; });

  preset3Button = createButton('5x + 3y = 15');
  preset3Button.parent(mainElement);
  preset3Button.position(225, drawHeight + 8);
  preset3Button.mousePressed(() => { b = 5; px = 3; py = 0; });

  showWorkCheckbox = createCheckbox('Show Work', false);
  showWorkCheckbox.parent(mainElement);
  showWorkCheckbox.position(10, drawHeight + 45);

  lockSlopeCheckbox = createCheckbox('Lock Slope', false);
  lockSlopeCheckbox.parent(mainElement);
  lockSlopeCheckbox.position(135, drawHeight + 45);

  describe('A draggable line on a coordinate plane with side panels showing its equation in slope-intercept, point-slope, and standard form, all updating together as the handles move.', LABEL);
}

function slope() { return px === 0 ? NaN : (py - b) / px; }

function gcd(a, c) { a = abs(a); c = abs(c); while (c) { [a, c] = [c, a % c]; } return a || 1; }

// build the three equation strings from integer anchors (0,b) and (px,py)
function equationStrings() {
  let dy = py - b, dx = px;
  let g = gcd(dy, dx);
  let p = dy / g, q = dx / g;
  if (q < 0) { p = -p; q = -q; }
  let mStr = q === 1 ? '' + p : p + '/' + q;

  let si = 'y = ' + (p === 0 ? '' : (mStr === '1' ? '' : mStr === '-1' ? '-' : mStr) + 'x ') +
           (p === 0 ? b : (b >= 0 ? '+ ' + b : '− ' + abs(b)));
  let ps = 'y − ' + py + ' = ' + mStr + '(x − ' + px + ')';
  ps = ps.replace('− -', '+ ').replace('x − -', 'x + ');

  // standard: p x − q y = −q b  →  Ax + By = C with A ≥ 0
  let A = p, B = -q, C = -q * b;
  if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
  let g2 = gcd(gcd(A, B), C);
  A /= g2; B /= g2; C /= g2;
  let std = (A === 0 ? '' : (A === 1 ? '' : A) + 'x') +
            (B === 0 ? '' : (B > 0 ? (A === 0 ? '' : ' + ') : ' − ') + (abs(B) === 1 ? '' : abs(B)) + 'y') +
            ' = ' + C;
  return { si, ps, std, mStr, p, q };
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toGX(sx) { return AXIS_MIN + (sx - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN); }
function toGY(sy) { return AXIS_MAX - (sy - plotTop) / plotSize * (AXIS_MAX - AXIS_MIN); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotSize = min(canvasWidth * 0.5, drawHeight - 70);
  plotLeft = margin;
  plotTop = 50;

  // grid + axes
  stroke(222);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotSize);
    line(plotLeft, toSY(i), plotLeft + plotSize, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotSize);
  line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));

  // title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Linear Form Translator', canvasWidth * 0.3, 8);

  let m = slope();

  // the line, clipped to the plot rectangle
  if (isFinite(m)) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(plotLeft, plotTop, plotSize, plotSize);
    drawingContext.clip();
    stroke(MAROON);
    strokeWeight(3);
    line(toSX(AXIS_MIN), toSY(m * AXIS_MIN + b),
         toSX(AXIS_MAX), toSY(m * AXIS_MAX + b));
    drawingContext.restore();
  }

  // handles
  stroke('black');
  strokeWeight(2);
  fill(CYAN);
  circle(toSX(0), toSY(b), 18);
  fill('gold');
  circle(toSX(px), toSY(py), 18);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text('b = ' + b, toSX(0) + 12, toSY(b) - 6);
  text('(' + px + ', ' + py + ')', toSX(px) + 12, toSY(py) - 6);

  // equation panels on the right
  let eqs = equationStrings();
  let panX = plotLeft + plotSize + 20;
  let panW = canvasWidth - panX - margin;
  let names = ['Slope-Intercept', 'Point-Slope', 'Standard'];
  let vals = [eqs.si, eqs.ps, eqs.std];
  for (let i = 0; i < 3; i++) {
    let panY = plotTop + i * 92;
    stroke(200);
    strokeWeight(1);
    fill(255, 255, 255, 235);
    rect(panX, panY, panW, 80, 10);
    noStroke();
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text(names[i], panX + 14, panY + 8);
    fill('black');
    textSize(21);
    text(vals[i], panX + 14, panY + 36);
  }

  // show-work steps
  if (showWorkCheckbox.checked()) {
    let wy = plotTop + 3 * 92;
    stroke(200);
    fill(252, 250, 240);
    rect(panX, wy, panW, 118, 10);
    noStroke();
    fill(60);
    textSize(14);
    textAlign(LEFT, TOP);
    let steps =
      '1. Point-slope: start at (' + px + ', ' + py + ') with m = ' + eqs.mStr + '\n' +
      '2. Distribute: y = ' + eqs.mStr + 'x − (' + eqs.mStr + ')(' + px + ') + ' + py + '\n' +
      '3. Simplify to slope-intercept: ' + eqs.si + '\n' +
      '4. Move x-term across, clear fractions → ' + eqs.std;
    text(steps, panX + 14, wy + 10, panW - 28, 104);
  }

  // hint
  noStroke();
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Drag the cyan y-intercept handle or the gold slope handle. Handles snap to integers.',
       plotLeft, plotTop + plotSize + 12);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Presets:', 340, drawHeight + 20);
}

function mousePressed() {
  if (dist(mouseX, mouseY, toSX(0), toSY(b)) < 14) dragging = 'intercept';
  else if (dist(mouseX, mouseY, toSX(px), toSY(py)) < 14) dragging = 'slope';
}

function mouseDragged() {
  if (dragging === 'intercept') {
    let newB = constrain(round(toGY(mouseY)), AXIS_MIN, AXIS_MAX);
    if (lockSlopeCheckbox.checked()) {
      // keep the slope: translate the second anchor with the intercept
      py += newB - b;
    }
    b = newB;
  } else if (dragging === 'slope') {
    let nx = constrain(round(toGX(mouseX)), AXIS_MIN, AXIS_MAX);
    let ny = constrain(round(toGY(mouseY)), AXIS_MIN, AXIS_MAX);
    if (nx !== 0) { px = nx; py = ny; }
  }
}

function mouseReleased() {
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
