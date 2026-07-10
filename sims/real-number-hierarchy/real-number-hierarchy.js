// Real Number Hierarchy MicroSim
// CANVAS_HEIGHT: 552
// Nested Venn-style view of number sets: Naturals ⊂ Wholes ⊂ Integers ⊂ Rationals,
// with Irrationals disjoint from Rationals, all inside the Reals.
// Students click tray numbers to classify them into the most restrictive region.
// Bloom's Level: Understand — classify a real number into its most restrictive category.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50; // 1 row: reset button + difficulty select
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

// tray numbers per difficulty; category is the MOST restrictive set
const TRAYS = {
  easy: [
    { label: '3',    cat: 'natural' },
    { label: '0',    cat: 'whole' },
    { label: '-5',   cat: 'integer' },
    { label: '1/2',  cat: 'rational' },
    { label: '1.7',  cat: 'rational' },
    { label: 'π',    cat: 'irrational' }
  ],
  medium: [
    { label: '√9',   cat: 'natural' },   // √9 = 3
    { label: '0',    cat: 'whole' },
    { label: '-3/1', cat: 'integer' },   // -3
    { label: '2/3',  cat: 'rational' },
    { label: '√2',   cat: 'irrational' },
    { label: 'e',    cat: 'irrational' }
  ],
  hard: [
    { label: '√16',    cat: 'natural' },   // 4
    { label: '5 - 5',  cat: 'whole' },     // 0
    { label: '-√4',    cat: 'integer' },   // -2
    { label: '0.333…', cat: 'rational' },
    { label: '22/7',   cat: 'rational' },
    { label: 'π',      cat: 'irrational' }
  ]
};

let tray = [];          // {label, cat, placed, anim:{x,y,tx,ty,t}}
let placedCount = 0;
let highlight = null;   // {cat, t}
let resetButton;
let difficultySelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(10, drawHeight + 10);
  resetButton.mousePressed(loadTray);

  difficultySelect = createSelect();
  difficultySelect.parent(mainElement);
  difficultySelect.position(165, drawHeight + 10);
  difficultySelect.option('easy');
  difficultySelect.option('medium');
  difficultySelect.option('hard');
  difficultySelect.changed(loadTray);

  loadTray();
  describe('Nested diagram of real number sets. Natural numbers inside whole numbers inside integers inside rationals; irrationals separate. Click a number in the tray to send it to its most restrictive category.', LABEL);
}

function loadTray() {
  let level = difficultySelect ? difficultySelect.value() : 'easy';
  tray = TRAYS[level].map(n => ({ label: n.label, cat: n.cat, placed: false, anim: null }));
  placedCount = 0;
  highlight = null;
}

// region geometry, recomputed each frame from canvasWidth
let regions = {};
function computeRegions() {
  let w = canvasWidth;
  // outer real-number rectangle
  regions.real = { x: margin, y: 55, w: w - 2 * margin, h: 330 };
  // rationals: large circle on the left
  let rx = margin + (w - 2 * margin) * 0.32;
  let ry = 55 + 175;
  let rr = min((w - 2 * margin) * 0.30, 155);
  regions.rational = { cx: rx, cy: ry, r: rr };
  regions.integer  = { cx: rx, cy: ry + rr * 0.18, r: rr * 0.68 };
  regions.whole    = { cx: rx, cy: ry + rr * 0.32, r: rr * 0.46 };
  regions.natural  = { cx: rx, cy: ry + rr * 0.44, r: rr * 0.27 };
  // irrationals: circle on the right, disjoint
  regions.irrational = { cx: margin + (w - 2 * margin) * 0.78, cy: ry, r: rr * 0.62 };
}

// target position for a placed number by category
function targetFor(cat, index) {
  computeRegions();
  let r = regions[cat];
  if (cat === 'natural')  return { x: r.cx, y: r.cy + 8 };
  if (cat === 'whole')    return { x: r.cx - r.r * 0.45, y: r.cy - r.r * 0.5 };
  if (cat === 'integer')  return { x: r.cx - r.r * 0.5, y: r.cy - r.r * 0.62 };
  if (cat === 'rational') return { x: r.cx + r.r * 0.45, y: r.cy - r.r * 0.65 };
  // irrational: spread horizontally
  return { x: r.cx - r.r * 0.4 + (index % 3) * r.r * 0.4, y: r.cy + (index % 2 === 0 ? -10 : 25) };
}

function trayPositions() {
  let n = tray.length;
  let spacing = min(100, (canvasWidth - 2 * margin) / n);
  let x0 = canvasWidth / 2 - spacing * (n - 1) / 2;
  return tray.map((t, i) => ({ x: x0 + i * spacing, y: 440 }));
}

function drawCircleRegion(r, labelText, labelDy, tint) {
  stroke(MAROON);
  strokeWeight(1.5);
  fill(tint);
  circle(r.cx, r.cy, r.r * 2);
  noStroke();
  fill(MAROON);
  textSize(15);
  textAlign(CENTER, TOP);
  text(labelText, r.cx, r.cy - r.r + labelDy);
}

function draw() {
  updateCanvasSize();
  computeRegions();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('The Real Number Hierarchy', canvasWidth / 2, 8);

  // outer real rectangle
  let R = regions.real;
  stroke(MAROON);
  strokeWeight(2.5);
  fill(255, 255, 255, 140);
  rect(R.x, R.y, R.w, R.h, 12);
  noStroke();
  fill(MAROON);
  textSize(17);
  textAlign(LEFT, TOP);
  text('Real Numbers (ℝ)', R.x + 12, R.y + 8);

  // nested circles (draw largest first)
  drawCircleRegion(regions.rational, 'Rational (ℚ)', 8, color(235, 243, 255));
  drawCircleRegion(regions.integer, 'Integers (ℤ)', 6, color(222, 235, 250));
  drawCircleRegion(regions.whole, 'Whole', 5, color(208, 228, 246));
  drawCircleRegion(regions.natural, 'Natural (ℕ)', 4, color(190, 218, 242));
  drawCircleRegion(regions.irrational, 'Irrational', 8, color(255, 240, 225));

  // gold highlight on recently targeted region
  if (highlight && millis() - highlight.t < 900) {
    let r = regions[highlight.cat];
    noFill();
    stroke(255, 200, 0, map(millis() - highlight.t, 0, 900, 255, 0));
    strokeWeight(5);
    if (highlight.cat === 'real') rect(r.x, r.y, r.w, r.h, 12);
    else circle(r.cx, r.cy, r.r * 2 + 8);
    noStroke();
  }

  // placed + animating numbers
  let pos = trayPositions();
  tray.forEach((t, i) => {
    let x, y;
    if (t.placed && t.anim) {
      // ease toward target
      t.anim.x = lerp(t.anim.x, t.anim.tx, 0.12);
      t.anim.y = lerp(t.anim.y, t.anim.ty, 0.12);
      x = t.anim.x; y = t.anim.y;
    } else {
      x = pos[i].x; y = pos[i].y;
    }
    // chip
    stroke(t.placed ? CYAN : MAROON);
    strokeWeight(2);
    fill(t.placed ? color(224, 248, 255) : 'white');
    rectMode(CENTER);
    rect(x, y, max(52, textWidth(t.label) + 24), 32, 8);
    rectMode(CORNER);
    noStroke();
    fill('black');
    textSize(16);
    textAlign(CENTER, CENTER);
    text(t.label, x, y - 1);
  });

  // tray label + counter
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Click a number to classify it:', margin, 405);
  textAlign(RIGHT, CENTER);
  fill(MAROON);
  text('Correctly placed: ' + placedCount + ' of ' + tray.length, canvasWidth - margin, 405);

  // control labels
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Difficulty:', 85, drawHeight + 22);
}

function mousePressed() {
  let pos = trayPositions();
  tray.forEach((t, i) => {
    if (t.placed) return;
    if (abs(mouseX - pos[i].x) < 40 && abs(mouseY - pos[i].y) < 18) {
      let target = targetFor(t.cat, i);
      t.placed = true;
      t.anim = { x: pos[i].x, y: pos[i].y, tx: target.x, ty: target.y };
      placedCount++;
      highlight = { cat: t.cat, t: millis() };
    }
  });
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
