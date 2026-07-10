// Residual Plot Validator MicroSim
// CANVAS_HEIGHT: 492
// Scatterplot with a fitted model on the left; its residual plot on the
// right. A wrong model family shows up as a visible pattern in the residuals.
// Bloom's Level: Analyze — distinguish random scatter from systematic residual patterns.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 440;
let controlHeight = 50; // 1 row: two selects + button + checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const X_MIN = 0, X_MAX = 10;

let data = [];
let truth = 'quadratic';
let family = 'linear';
let showIdeal = false;

let familySelect, truthSelect, swapButton, idealCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  familySelect = createSelect();
  familySelect.parent(mainElement);
  familySelect.position(85, drawHeight + 10);
  ['linear', 'quadratic', 'exponential'].forEach(t => familySelect.option(t));
  familySelect.selected('linear');
  familySelect.changed(() => { family = familySelect.value(); });

  truthSelect = createSelect();
  truthSelect.parent(mainElement);
  truthSelect.position(320, drawHeight + 10);
  ['linear', 'quadratic', 'exponential'].forEach(t => truthSelect.option(t));
  truthSelect.selected('quadratic');
  truthSelect.changed(() => { truth = truthSelect.value(); makeData(); });

  swapButton = createButton('Swap Fit');
  swapButton.parent(mainElement);
  swapButton.position(460, drawHeight + 10);
  swapButton.mousePressed(() => {
    let fams = ['linear', 'quadratic', 'exponential'];
    family = fams[(fams.indexOf(family) + 1) % 3];
    familySelect.selected(family);
  });

  idealCheckbox = createCheckbox('Show Ideal', false);
  idealCheckbox.parent(mainElement);
  idealCheckbox.position(550, drawHeight + 12);

  makeData();
  describe('Left: a scatterplot with a fitted model curve. Right: the residual plot for that fit. Random scatter means a good model family; a visible curve in the residuals means the wrong family was chosen.', LABEL);
}

function trueValue(x) {
  if (truth === 'linear') return 2 + 0.8 * x;
  if (truth === 'quadratic') return 2 + 0.15 * (x - 3) * (x - 3);
  return 1.5 * Math.pow(1.25, x);
}

function makeData() {
  data = [];
  for (let i = 0; i < 20; i++) {
    let x = 0.3 + i * 0.485 + random(-0.15, 0.15);
    let y = max(0.2, trueValue(x) + randomGaussian(0, 0.35));
    data.push({ x, y });
  }
}

// fits ---------------------------------------------------------------------
function fitLinear(pts) {
  let n = pts.length, sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let p of pts) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; }
  let m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  let b = (sy - m * sx) / n;
  return x => m * x + b;
}

function fitQuadratic(pts) {
  let S = { x0: pts.length, x1: 0, x2: 0, x3: 0, x4: 0, y: 0, xy: 0, x2y: 0 };
  for (let p of pts) {
    S.x1 += p.x; S.x2 += p.x ** 2; S.x3 += p.x ** 3; S.x4 += p.x ** 4;
    S.y += p.y; S.xy += p.x * p.y; S.x2y += p.x * p.x * p.y;
  }
  let M = [[S.x4, S.x3, S.x2], [S.x3, S.x2, S.x1], [S.x2, S.x1, S.x0]];
  let V = [S.x2y, S.xy, S.y];
  let det = m3det(M);
  let a = m3det(replaceCol(M, 0, V)) / det;
  let b = m3det(replaceCol(M, 1, V)) / det;
  let c = m3det(replaceCol(M, 2, V)) / det;
  return x => a * x * x + b * x + c;
}

function m3det(m) {
  return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
       - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
       + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
}
function replaceCol(m, col, v) {
  return m.map((row, i) => row.map((val, j) => j === col ? v[i] : val));
}

function fitExponential(pts) {
  let logPts = pts.filter(p => p.y > 0).map(p => ({ x: p.x, y: Math.log(p.y) }));
  let lin = fitLinear(logPts);
  let A = Math.exp(lin(0)), lnB = lin(1) - lin(0);
  return x => A * Math.exp(lnB * x);
}

function currentFit() {
  if (family === 'linear') return fitLinear(data);
  if (family === 'quadratic') return fitQuadratic(data);
  return fitExponential(data);
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
  text('Residual Plot Validator', canvasWidth / 2, 6);

  let fit = currentFit();
  let residuals = data.map(p => ({ x: p.x, e: p.y - fit(p.x) }));

  // pattern heuristic: quadratic fit to residuals
  let q = fitQuadratic(residuals.map(r => ({ x: r.x, y: r.e })));
  let meanE = residuals.reduce((s, r) => s + r.e, 0) / residuals.length;
  let ssrQ = 0, sstR = 0;
  for (let r of residuals) {
    ssrQ += (r.e - q(r.x)) ** 2;
    sstR += (r.e - meanE) ** 2;
  }
  let patternR2 = sstR > 0 ? 1 - ssrQ / sstR : 0;
  let looksRandom = patternR2 < 0.25;

  let half = canvasWidth / 2;
  let pt = 48, ph = drawHeight - 140;

  // LEFT: scatterplot + fit ------------------------------------------------
  let lX = margin, lW = half - margin - 20;
  let yMax = max(10, ...data.map(p => p.y)) * 1.15;
  let toLX = gx => map(gx, X_MIN, X_MAX, lX + 10, lX + lW);
  let toLY = gy => map(gy, 0, yMax, pt + ph, pt);

  stroke(226);
  strokeWeight(1);
  for (let i = 0; i <= 10; i += 2) line(toLX(i), pt, toLX(i), pt + ph);
  stroke('black');
  strokeWeight(1.5);
  line(lX + 10, pt + ph, lX + lW, pt + ph);
  line(lX + 10, pt, lX + 10, pt + ph);
  noStroke();

  if (idealCheckbox.checked()) {
    stroke(CYAN);
    strokeWeight(2);
    drawingContext.setLineDash([6, 5]);
    noFill();
    beginShape();
    for (let gx = X_MIN; gx <= X_MAX; gx += 0.1) {
      let gy = trueValue(gx);
      if (gy <= yMax) vertex(toLX(gx), toLY(gy));
    }
    endShape();
    drawingContext.setLineDash([]);
  }

  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let gx = X_MIN; gx <= X_MAX; gx += 0.1) {
    let gy = fit(gx);
    if (isFinite(gy) && gy >= 0 && gy <= yMax) vertex(toLX(gx), toLY(gy));
  }
  endShape();
  noStroke();

  for (let p of data) {
    stroke('black');
    strokeWeight(1);
    fill(70, 70, 70);
    circle(toLX(p.x), toLY(p.y), 8);
  }
  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Data + fitted ' + family + ' model', lX + lW / 2, pt + ph + 10);

  // RIGHT: residual plot ----------------------------------------------------
  let rX = half + 20, rW = half - margin - 20;
  let maxE = max(0.8, ...residuals.map(r => abs(r.e))) * 1.2;
  let toRX = gx => map(gx, X_MIN, X_MAX, rX + 10, rX + rW);
  let toRY = e => map(e, -maxE, maxE, pt + ph, pt);

  stroke(226);
  strokeWeight(1);
  for (let i = 0; i <= 10; i += 2) line(toRX(i), pt, toRX(i), pt + ph);
  stroke('black');
  strokeWeight(1.5);
  line(rX + 10, toRY(0), rX + rW, toRY(0));
  line(rX + 10, pt, rX + 10, pt + ph);
  noStroke();

  for (let r of residuals) {
    stroke('black');
    strokeWeight(1);
    fill(looksRandom ? color(30, 140, 60) : color(200, 40, 40));
    circle(toRX(r.x), toRY(r.e), 8);
  }
  noStroke();

  // verdict banner
  fill(looksRandom ? color(212, 240, 212) : color(250, 216, 216));
  rect(rX + 10, pt + ph + 8, rW - 10, 30, 8);
  fill(looksRandom ? color(0, 110, 0) : color(160, 0, 0));
  textSize(13);
  textAlign(CENTER, CENTER);
  text(looksRandom ? 'Looks random — the ' + family + ' family fits this data' :
       'Visible pattern — the ' + family + ' family misses the real shape',
       rX + 10 + (rW - 10) / 2, pt + ph + 23);

  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text('Residuals (data − model)', rX + rW / 2, pt + ph + 44);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Fit family:', 10, drawHeight + 22);
  text('True pattern:', 225, drawHeight + 22);
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
