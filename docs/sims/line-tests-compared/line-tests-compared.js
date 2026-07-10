// Line Tests Compared MicroSim
// CANVAS_HEIGHT: 702
// Four graphs, each tested against a draggable vertical line (function test)
// and a draggable horizontal line (one-to-one test), with verdict badges.
// Bloom's Level: Analyze — decide function status AND invertibility from both tests.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 650;
let controlHeight = 50; // 1 row: reveal button
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const R = 3.5; // plot range: -R..R per panel

// each curve gives ysAt(x) and xsAt(y) — counts drive the verdicts
const PANELS = [
  {
    label: 'y = x²',
    ysAt: x => [x * x],
    xsAt: y => y < 0 ? [] : (y === 0 ? [0] : [Math.sqrt(y), -Math.sqrt(y)]),
    isFunction: true, oneToOne: false
  },
  {
    label: 'x = y²',
    ysAt: x => x < 0 ? [] : (x === 0 ? [0] : [Math.sqrt(x), -Math.sqrt(x)]),
    xsAt: y => [y * y],
    isFunction: false, oneToOne: true
  },
  {
    label: 'y = x³',
    ysAt: x => [x * x * x * 0.35],
    xsAt: y => [Math.cbrt(y / 0.35)],
    isFunction: true, oneToOne: true
  },
  {
    label: 'x² + y² = 4',
    ysAt: x => abs(x) > 2 ? [] : (abs(x) === 2 ? [0] : [Math.sqrt(4 - x * x), -Math.sqrt(4 - x * x)]),
    xsAt: y => abs(y) > 2 ? [] : (abs(y) === 2 ? [0] : [Math.sqrt(4 - y * y), -Math.sqrt(4 - y * y)]),
    isFunction: false, oneToOne: false
  }
];

// per-panel line positions (plane units)
let vLines = [1, 1, 1, 1];
let hLines = [1, 1, 1, 1];
let dragging = null;    // {panel, which}
let revealed = false;
let sweeping = false;
let sweepT = 0;

let revealButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  revealButton = createButton('Reveal Verdicts');
  revealButton.parent(mainElement);
  revealButton.position(10, drawHeight + 10);
  revealButton.mousePressed(() => { sweeping = true; sweepT = 0; revealed = false; });

  describe('Four graph panels — a parabola, a sideways parabola, a cubic, and a circle — each with a draggable vertical line and a draggable horizontal line. Badges report whether each relation passes the vertical line test (function) and the horizontal line test (one-to-one).', LABEL);
}

function panelRect(i) {
  let gw = (canvasWidth - 3 * margin) / 2;
  let gh = (drawHeight - 70 - 3 * 15) / 2;
  return {
    x: margin + (i % 2) * (gw + margin),
    y: 50 + floor(i / 2) * (gh + 15),
    w: gw, h: gh
  };
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
  text('Vertical vs Horizontal Line Tests', canvasWidth / 2, 8);

  // sweep animation for Reveal Verdicts
  if (sweeping) {
    sweepT += 0.008;
    let pos = lerp(-R + 0.2, R - 0.2, min(sweepT, 1));
    for (let i = 0; i < 4; i++) { vLines[i] = pos; hLines[i] = pos; }
    if (sweepT >= 1) { sweeping = false; revealed = true; }
  }

  for (let i = 0; i < 4; i++) {
    let r = panelRect(i);
    let P = PANELS[i];
    let toSX = gx => map(gx, -R, R, r.x + 8, r.x + r.w - 8);
    let toSY = gy => map(gy, -R, R, r.y + r.h - 26, r.y + 8);

    // frame
    stroke('silver');
    strokeWeight(1);
    fill('white');
    rect(r.x, r.y, r.w, r.h, 10);
    // axes
    stroke(200);
    strokeWeight(1);
    line(toSX(0), r.y + 8, toSX(0), r.y + r.h - 26);
    line(r.x + 8, toSY(0), r.x + r.w - 8, toSY(0));

    // curve as points (handles multi-valued relations)
    stroke(MAROON);
    strokeWeight(2.5);
    for (let sx = r.x + 8; sx <= r.x + r.w - 8; sx += 1.2) {
      let gx = map(sx, r.x + 8, r.x + r.w - 8, -R, R);
      for (let gy of P.ysAt(gx)) {
        if (gy >= -R && gy <= R) point(sx, toSY(gy));
      }
    }

    // test lines
    let vHits = P.ysAt(vLines[i]).filter(y => y >= -R && y <= R);
    let hHits = P.xsAt(hLines[i]).filter(x => x >= -R && x <= R);
    stroke(CYAN);
    strokeWeight(2.5);
    line(toSX(vLines[i]), r.y + 8, toSX(vLines[i]), r.y + r.h - 26);
    stroke('#e6a817');
    line(r.x + 8, toSY(hLines[i]), r.x + r.w - 8, toSY(hLines[i]));
    // intersection markers
    noStroke();
    fill(CYAN);
    for (let y of vHits) circle(toSX(vLines[i]), toSY(y), 10);
    fill('#e6a817');
    for (let x of hHits) circle(toSX(x), toSY(hLines[i]), 10);

    // label + live counts
    noStroke();
    fill('black');
    textSize(16);
    textAlign(LEFT, TOP);
    text(P.label, r.x + 12, r.y + 8);
    fill(90);
    textSize(13);
    textAlign(RIGHT, TOP);
    text('V-hits: ' + vHits.length + '   H-hits: ' + hHits.length, r.x + r.w - 12, r.y + 8);

    // verdict badges
    textAlign(LEFT, CENTER);
    textSize(14);
    let by = r.y + r.h - 13;
    if (revealed) {
      noStroke();
      fill(P.isFunction ? color(206, 238, 206) : color(248, 212, 212));
      rect(r.x + 8, by - 11, 118, 22, 6);
      fill(P.isFunction ? color(0, 110, 0) : color(160, 0, 0));
      text('Function? ' + (P.isFunction ? 'YES' : 'NO'), r.x + 14, by);
      noStroke();
      fill(P.oneToOne ? color(206, 238, 206) : color(248, 212, 212));
      rect(r.x + 136, by - 11, 130, 22, 6);
      fill(P.oneToOne ? color(0, 110, 0) : color(160, 0, 0));
      text('One-to-one? ' + (P.oneToOne ? 'YES' : 'NO'), r.x + 142, by);
    } else {
      fill(150);
      text('Function? ?     One-to-one? ?   (drag lines or press Reveal)', r.x + 12, by);
    }
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Cyan = vertical test (function) • Gold = horizontal test (one-to-one)', 145, drawHeight + 22);
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    let r = panelRect(i);
    if (mouseX < r.x || mouseX > r.x + r.w || mouseY < r.y || mouseY > r.y + r.h) continue;
    let toSX = gx => map(gx, -R, R, r.x + 8, r.x + r.w - 8);
    let toSY = gy => map(gy, -R, R, r.y + r.h - 26, r.y + 8);
    let dV = abs(mouseX - toSX(vLines[i]));
    let dH = abs(mouseY - toSY(hLines[i]));
    dragging = { panel: i, which: dV < dH ? 'v' : 'h' };
    sweeping = false;
    return;
  }
}

function mouseDragged() {
  if (!dragging) return;
  let r = panelRect(dragging.panel);
  if (dragging.which === 'v') {
    vLines[dragging.panel] = constrain(map(mouseX, r.x + 8, r.x + r.w - 8, -R, R), -R, R);
  } else {
    hLines[dragging.panel] = constrain(map(mouseY, r.y + r.h - 26, r.y + 8, -R, R), -R, R);
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
