// Sum Formula Proof MicroSim
// CANVAS_HEIGHT: 602
// Walk the classic chord-rotation proof of cos(α+β) = cosα cosβ − sinα sinβ
// step by step with live numeric values.
// Bloom's Level: Understand — interpret the geometric origin of the sum formula.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 520;
let controlHeight = 80; // 2 rows: alpha+beta sliders, next/prev buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

let stage = 1;   // 1..5
let alphaSlider, betaSlider;
let prevButton, nextButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  alphaSlider = createSlider(0.2, PI - 0.2, PI / 4, 0.01);
  alphaSlider.parent(mainElement);
  betaSlider = createSlider(0.2, PI - 0.2, PI / 6, 0.01);
  betaSlider.parent(mainElement);
  positionSliders();

  prevButton = createButton('◀ Previous');
  prevButton.parent(mainElement);
  prevButton.position(10, drawHeight + 43);
  prevButton.mousePressed(() => { stage = max(1, stage - 1); });

  nextButton = createButton('Next ▶');
  nextButton.parent(mainElement);
  nextButton.position(105, drawHeight + 43);
  nextButton.mousePressed(() => { stage = min(5, stage + 1); });

  describe('Unit circle showing points at angles alpha and negative beta joined by a chord, then the same chord rotated so one end sits at one-zero. Equating the two distance computations yields the cosine sum formula, walked through in five numeric stages.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(110, half - 190);
  alphaSlider.position(90, drawHeight + 10);
  alphaSlider.size(sw);
  betaSlider.position(half + 90, drawHeight + 10);
  betaSlider.size(sw);
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

  let alpha = alphaSlider.value();
  let beta = betaSlider.value();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Why cos(α + β) = cos α cos β − sin α sin β', canvasWidth / 2, 6);

  // unit circle on the left
  let cx = canvasWidth * 0.24;
  let cy = drawHeight / 2 + 30;
  let r = min(canvasWidth * 0.18, drawHeight * 0.32);

  stroke('black');
  strokeWeight(1.5);
  line(cx - r - 25, cy, cx + r + 25, cy);
  line(cx, cy - r - 25, cx, cy + r + 25);
  noFill();
  stroke(150);
  strokeWeight(2);
  circle(cx, cy, r * 2);
  noStroke();

  // P1 at angle α, P2 at angle −β (the classic configuration)
  let p1 = [cx + r * cos(alpha), cy - r * sin(alpha)];
  let p2 = [cx + r * cos(-beta), cy - r * sin(-beta)];
  // rotated: Q1 at angle α+β, Q2 at (1, 0)
  let q1 = [cx + r * cos(alpha + beta), cy - r * sin(alpha + beta)];
  let q2 = [cx + r, cy];

  // angle arcs
  noFill();
  stroke(MAROON);
  strokeWeight(3);
  arc(cx, cy, r * 0.7, r * 0.7, -alpha, 0);
  stroke(CYAN);
  arc(cx, cy, r * 0.55, r * 0.55, 0, beta);
  noStroke();
  fill(MAROON);
  textSize(14);
  textAlign(CENTER, CENTER);
  text('α', cx + r * 0.45 * cos(-alpha / 2), cy + r * 0.45 * sin(-alpha / 2));
  fill('#0090c0');
  text('β', cx + r * 0.38 * cos(beta / 2), cy + r * 0.38 * sin(beta / 2));

  // chord P1P2
  stroke(GOLD);
  strokeWeight(3);
  line(p1[0], p1[1], p2[0], p2[1]);
  // rotated chord (stage ≥ 4)
  if (stage >= 4) {
    stroke(120);
    strokeWeight(3);
    drawingContext.setLineDash([7, 5]);
    line(q1[0], q1[1], q2[0], q2[1]);
    drawingContext.setLineDash([]);
  }
  noStroke();

  // points
  for (let [pt, lbl, col] of [[p1, 'P₁ (angle α)', MAROON], [p2, 'P₂ (angle −β)', '#0090c0']]) {
    stroke('black');
    strokeWeight(2);
    fill(col);
    circle(pt[0], pt[1], 13);
    noStroke();
    fill(col);
    textSize(13);
    textAlign(LEFT, BOTTOM);
    text(lbl, pt[0] + 10, pt[1] - 4);
  }
  if (stage >= 4) {
    for (let [pt, lbl] of [[q1, 'Q₁ (angle α+β)'], [q2, 'Q₂ (1, 0)']]) {
      stroke('black');
      strokeWeight(2);
      fill(150);
      circle(pt[0], pt[1], 11);
      noStroke();
      fill(110);
      textSize(13);
      textAlign(LEFT, TOP);
      text(lbl, pt[0] + 9, pt[1] + 4);
    }
  }

  // proof panel on the right
  let panX = canvasWidth * 0.48;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 45, panW, drawHeight - 100, 10);
  noStroke();

  let ca = cos(alpha), sa = sin(alpha), cb = cos(beta), sb = sin(beta);
  let d2chord = (ca - cb) ** 2 + (sa + sb) ** 2;
  let d2rot = (cos(alpha + beta) - 1) ** 2 + sin(alpha + beta) ** 2;

  const STAGES = [
    'Stage 1 — Two angles on the unit circle:\n' +
    'α = ' + nf(degrees(alpha), 0, 1) + '°,  β = ' + nf(degrees(beta), 0, 1) + '°\n' +
    'P₁ sits at angle α; P₂ sits at angle −β,\nso the arc between them is α + β.',

    'Stage 2 — Coordinates of the points:\n' +
    'P₁ = (cos α, sin α) = (' + nf(ca, 0, 3) + ', ' + nf(sa, 0, 3) + ')\n' +
    'P₂ = (cos β, −sin β) = (' + nf(cb, 0, 3) + ', ' + nf(-sb, 0, 3) + ')',

    'Stage 3 — Distance formula on the chord:\n' +
    'd² = (cos α − cos β)² + (sin α + sin β)²\n' +
    'd² = ' + nf(d2chord, 0, 4) + '\n' +
    'Expanding: d² = 2 − 2(cos α cos β − sin α sin β)',

    'Stage 4 — Rotate the picture by β:\n' +
    'The chord now joins Q₁ = (cos(α+β), sin(α+β))\nand Q₂ = (1, 0). Rotation preserves distance:\n' +
    'd² = (cos(α+β) − 1)² + sin²(α+β)\n' +
    'd² = ' + nf(d2rot, 0, 4) + '  — the same number!\n' +
    'Expanding: d² = 2 − 2cos(α+β)',

    'Stage 5 — Equate and simplify:\n' +
    '2 − 2cos(α+β) = 2 − 2(cos α cos β − sin α sin β)\n' +
    '∴ cos(α+β) = cos α cos β − sin α sin β\n\n' +
    'Numeric check:\ncos(α+β) = ' + nf(cos(alpha + beta), 0, 4) + '\n' +
    'cosα cosβ − sinα sinβ = ' + nf(ca * cb - sa * sb, 0, 4) + '  ✓'
  ];

  fill(MAROON);
  textSize(15);
  textAlign(LEFT, TOP);
  text('Step-through proof  (stage ' + stage + ' of 5)', panX + 14, 56);
  fill('black');
  textSize(15);
  let ty = 84;
  for (let s = 0; s < stage; s++) {
    fill(s === stage - 1 ? 'black' : color(150));
    let lines = STAGES[s].split('\n').length;
    text(STAGES[s], panX + 14, ty, panW - 28, lines * 22 + 8);
    ty += lines * 20 + 14;
    if (ty > drawHeight - 80) break;
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('α = ' + nf(degrees(alpha), 0, 0) + '°', 10, drawHeight + 20);
  text('β = ' + nf(degrees(beta), 0, 0) + '°', canvasWidth / 2 + 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
