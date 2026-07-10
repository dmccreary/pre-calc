// Six Trig Graphs MicroSim
// CANVAS_HEIGHT: 612
// A 2x3 grid of all six trigonometric graphs with reciprocal-pair ghost
// curves, feature highlighting, and click-to-enlarge.
// Bloom's Level: Analyze — compare periods, asymptotes, and reciprocal pairs.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 560;
let controlHeight = 50; // 1 row: ghost checkbox + feature select
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const T_MIN = -2 * Math.PI, T_MAX = 2 * Math.PI;
const Y_CLIP = 4;

const FUNCS = [
  { name: 'sin θ', fn: t => Math.sin(t), partner: t => 1 / Math.sin(t),
    period: '2π', asymptotes: [], zeros: k => k * PI },
  { name: 'cos θ', fn: t => Math.cos(t), partner: t => 1 / Math.cos(t),
    period: '2π', asymptotes: [], zeros: k => PI / 2 + k * PI },
  { name: 'tan θ', fn: t => Math.tan(t), partner: t => 1 / Math.tan(t),
    period: 'π', asymptotes: k => PI / 2 + k * PI, zeros: k => k * PI },
  { name: 'csc θ', fn: t => 1 / Math.sin(t), partner: t => Math.sin(t),
    period: '2π', asymptotes: k => k * PI, zeros: null },
  { name: 'sec θ', fn: t => 1 / Math.cos(t), partner: t => Math.cos(t),
    period: '2π', asymptotes: k => PI / 2 + k * PI, zeros: null },
  { name: 'cot θ', fn: t => 1 / Math.tan(t), partner: t => Math.tan(t),
    period: 'π', asymptotes: k => k * PI, zeros: k => PI / 2 + k * PI }
];

let enlarged = -1;   // index of enlarged panel, or -1
let ghostCheckbox;
let featureSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  ghostCheckbox = createCheckbox('Show reciprocal partner (ghost)', true);
  ghostCheckbox.parent(mainElement);
  ghostCheckbox.position(10, drawHeight + 12);

  featureSelect = createSelect();
  featureSelect.parent(mainElement);
  featureSelect.position(345, drawHeight + 10);
  ['no highlight', 'asymptotes', 'zeros', 'max/min values'].forEach(o => featureSelect.option(o));

  describe('Grid of all six trigonometric graphs over minus two pi to two pi, each with its reciprocal partner as a light ghost curve, red dashed vertical asymptotes, and a selector to highlight zeros, asymptotes, or extreme values across all panels. Click a panel to enlarge it.', LABEL);
}

function panelRect(i) {
  if (enlarged === i) {
    let w = min(canvasWidth - 2 * margin, 640);
    return { x: (canvasWidth - w) / 2, y: 60, w: w, h: drawHeight - 130 };
  }
  let gw = (canvasWidth - 4 * margin) / 3;
  let gh = (drawHeight - 60 - 3 * 12) / 2;
  return {
    x: margin + (i % 3) * (gw + margin),
    y: 48 + floor(i / 3) * (gh + 12),
    w: gw, h: gh
  };
}

function drawPanel(i) {
  let r = panelRect(i);
  let F = FUNCS[i];
  let feature = featureSelect.value();
  let toSX = t => map(t, T_MIN, T_MAX, r.x + 6, r.x + r.w - 6);
  let toSY = y => map(y, -Y_CLIP, Y_CLIP, r.y + r.h - 22, r.y + 6);

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);

  // axes + π/2 ticks
  stroke(228);
  for (let k = -4; k <= 4; k++) {
    line(toSX(k * PI / 2), r.y + 6, toSX(k * PI / 2), r.y + r.h - 22);
  }
  stroke(160);
  strokeWeight(1.2);
  line(r.x + 6, toSY(0), r.x + r.w - 6, toSY(0));
  line(toSX(0), r.y + 6, toSX(0), r.y + r.h - 22);

  // asymptotes (red dashed) — always drawn if the function has them,
  // heavier when highlighted
  if (F.asymptotes && typeof F.asymptotes === 'function') {
    stroke(220, 60, 60);
    strokeWeight(feature === 'asymptotes' ? 2.5 : 1.2);
    drawingContext.setLineDash([5, 4]);
    for (let k = -3; k <= 3; k++) {
      let t = F.asymptotes(k);
      if (t >= T_MIN && t <= T_MAX) line(toSX(t), r.y + 6, toSX(t), r.y + r.h - 22);
    }
    drawingContext.setLineDash([]);
  }

  // ghost partner curve
  if (ghostCheckbox.checked()) {
    stroke(185);
    strokeWeight(1.3);
    drawingContext.setLineDash([4, 4]);
    plotClipped(F.partner, toSX, toSY);
    drawingContext.setLineDash([]);
  }

  // primary curve
  stroke(MAROON);
  strokeWeight(2.2);
  plotClipped(F.fn, toSX, toSY);
  noStroke();

  // zeros highlight
  if (feature === 'zeros' && F.zeros) {
    stroke(MAROON);
    strokeWeight(2);
    fill('white');
    for (let k = -4; k <= 4; k++) {
      let t = F.zeros(k);
      if (t >= T_MIN && t <= T_MAX) circle(toSX(t), toSY(0), 9);
    }
    noStroke();
  }
  // max/min highlight (only bounded functions)
  if (feature === 'max/min values' && (i === 0 || i === 1)) {
    noStroke();
    fill('gold');
    stroke('black');
    strokeWeight(1);
    for (let k = -2; k <= 2; k++) {
      let tMax = i === 0 ? PI / 2 + k * TWO_PI : k * TWO_PI;
      let tMin = i === 0 ? -PI / 2 + k * TWO_PI : PI + k * TWO_PI;
      if (tMax >= T_MIN && tMax <= T_MAX) circle(toSX(tMax), toSY(1), 9);
      if (tMin >= T_MIN && tMin <= T_MAX) circle(toSX(tMin), toSY(-1), 9);
    }
    noStroke();
  }

  // label
  noStroke();
  fill(MAROON);
  textSize(enlarged === i ? 18 : 15);
  textAlign(LEFT, BOTTOM);
  text(F.name + '   (period ' + F.period + ')', r.x + 10, r.y + r.h - 4);
}

function plotClipped(fn, toSX, toSY) {
  noFill();
  let inSeg = false;
  beginShape();
  for (let t = T_MIN; t <= T_MAX; t += 0.02) {
    let y = fn(t);
    if (isFinite(y) && abs(y) <= Y_CLIP) {
      vertex(toSX(t), toSY(y));
      inSeg = true;
    } else if (inSeg) { endShape(); beginShape(); inSeg = false; }
  }
  endShape();
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
  text('The Six Trigonometric Graphs', canvasWidth / 2, 6);

  if (enlarged >= 0) {
    drawPanel(enlarged);
    noStroke();
    fill(100);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Click the panel to return to the grid view', canvasWidth / 2, drawHeight - 50);
  } else {
    for (let i = 0; i < 6; i++) drawPanel(i);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Highlight:', 270, drawHeight + 22);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  if (enlarged >= 0) {
    enlarged = -1;
    return;
  }
  for (let i = 0; i < 6; i++) {
    let r = panelRect(i);
    if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) {
      enlarged = i;
      return;
    }
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
