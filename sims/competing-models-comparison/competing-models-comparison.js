// Competing Models Comparison MicroSim
// CANVAS_HEIGHT: 652
// One data set, three fitted curves (linear, quadratic, exponential), three
// residual plots, and a comparison table of R², RMSE, and residual quality.
// Bloom's Level: Evaluate — justify a model choice using multiple criteria.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 570;
let controlHeight = 80; // 2 rows: select+button, noise slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

const MAROON = '#800020';
const X_MIN = 0, X_MAX = 10;

let data = [];
let truth = 'quadratic';
let revealed = false;

let truthSelect;
let revealButton;
let noiseSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  truthSelect = createSelect();
  truthSelect.parent(mainElement);
  truthSelect.position(200, drawHeight + 8);
  ['linear', 'quadratic', 'exponential'].forEach(t => truthSelect.option(t));
  truthSelect.selected('quadratic');
  truthSelect.changed(() => { truth = truthSelect.value(); makeData(); });

  revealButton = createButton('Reveal Winner');
  revealButton.parent(mainElement);
  revealButton.position(340, drawHeight + 8);
  revealButton.mousePressed(() => { revealed = !revealed; });

  noiseSlider = createSlider(0.1, 3, 0.8, 0.1);
  noiseSlider.parent(mainElement);
  noiseSlider.position(sliderLeftMargin, drawHeight + 45);
  noiseSlider.size(canvasWidth - sliderLeftMargin - margin);
  noiseSlider.input(makeData);

  makeData();
  describe('A scatterplot with three fitted curves — linear in blue, quadratic in green, exponential in red — plus three residual plots and a table comparing R squared, RMSE, and residual quality across the models.', LABEL);
}

function trueValue(x) {
  if (truth === 'linear') return 2 + 1.4 * x;
  if (truth === 'quadratic') return 2 + 0.16 * (x - 2) * (x - 2) + 0.4 * x;
  return 1.8 * Math.pow(1.28, x);
}

function makeData() {
  data = [];
  let s = noiseSlider ? noiseSlider.value() : 0.8;
  for (let i = 0; i < 30; i++) {
    let x = random(0.3, 9.7);
    let y = max(0.2, trueValue(x) + randomGaussian(0, s));
    data.push({ x, y });
  }
  revealed = false;
}

// least-squares fits ------------------------------------------------------
function fitLinear(pts) {
  let n = pts.length, sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let p of pts) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; }
  let m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  let b = (sy - m * sx) / n;
  return { fn: x => m * x + b, eq: 'y = ' + nf(m, 0, 2) + 'x + ' + nf(b, 0, 2) };
}

function fitQuadratic(pts) {
  // normal equations for y = a x² + b x + c, solved with Cramer's rule
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
  return { fn: x => a * x * x + b * x + c,
           eq: 'y = ' + nf(a, 0, 2) + 'x² + ' + nf(b, 0, 2) + 'x + ' + nf(c, 0, 2) };
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
  // linear regression on ln(y): y = A * B^x
  let logPts = pts.filter(p => p.y > 0).map(p => ({ x: p.x, y: Math.log(p.y) }));
  let lin = fitLinear(logPts);
  // recover A and B from ln y = ln A + x ln B
  let lnB = (lin.fn(1) - lin.fn(0));
  let lnA = lin.fn(0);
  let A = Math.exp(lnA), B = Math.exp(lnB);
  return { fn: x => A * Math.pow(B, x),
           eq: 'y = ' + nf(A, 0, 2) + ' · ' + nf(B, 0, 2) + '^x' };
}

function fitStats(fit) {
  let meanY = data.reduce((s, p) => s + p.y, 0) / data.length;
  let ssr = 0, sst = 0;
  let residuals = [];
  for (let p of data) {
    let e = p.y - fit.fn(p.x);
    residuals.push({ x: p.x, e });
    ssr += e * e;
    sst += (p.y - meanY) * (p.y - meanY);
  }
  let r2 = 1 - ssr / sst;
  let rmse = Math.sqrt(ssr / data.length);
  // residual-pattern heuristic: how well does a quadratic fit the residuals?
  let q = fitQuadratic(residuals.map(r => ({ x: r.x, y: r.e })));
  let ssrQ = 0, sstR = 0;
  let meanE = residuals.reduce((s, r) => s + r.e, 0) / residuals.length;
  for (let r of residuals) {
    ssrQ += (r.e - q.fn(r.x)) ** 2;
    sstR += (r.e - meanE) ** 2;
  }
  let patternR2 = sstR > 0 ? 1 - ssrQ / sstR : 0;
  let quality = patternR2 > 0.45 ? 'strong curve' : patternR2 > 0.18 ? 'slight curve' : 'random';
  return { r2, rmse, residuals, quality };
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
  text('Competing Models: Which Family Fits?', canvasWidth / 2, 6);

  let fits = [
    { name: 'Linear', col: color(60, 90, 220), fit: fitLinear(data) },
    { name: 'Quadratic', col: color(30, 150, 60), fit: fitQuadratic(data) },
    { name: 'Exponential', col: color(210, 50, 50), fit: fitExponential(data) }
  ];
  fits.forEach(f => f.stats = fitStats(f.fit));

  // main scatterplot (left half)
  let mainW = canvasWidth * 0.46;
  let mainH = 280;
  let mainX = margin, mainY = 45;
  let yMax = max(12, ...data.map(p => p.y)) * 1.1;
  let toSX = gx => map(gx, X_MIN, X_MAX, mainX + 10, mainX + mainW);
  let toSY = gy => map(gy, 0, yMax, mainY + mainH, mainY);

  stroke(226);
  strokeWeight(1);
  for (let i = 0; i <= 10; i += 2) line(toSX(i), mainY, toSX(i), mainY + mainH);
  stroke('black');
  strokeWeight(1.5);
  line(mainX + 10, mainY + mainH, mainX + mainW, mainY + mainH);
  line(mainX + 10, mainY, mainX + 10, mainY + mainH);
  noStroke();

  // fitted curves
  for (let f of fits) {
    stroke(f.col);
    strokeWeight(2.2);
    noFill();
    beginShape();
    for (let gx = X_MIN; gx <= X_MAX; gx += 0.1) {
      let gy = f.fit.fn(gx);
      if (isFinite(gy) && gy >= 0 && gy <= yMax) vertex(toSX(gx), toSY(gy));
    }
    endShape();
  }
  noStroke();
  // data points
  for (let p of data) {
    stroke('black');
    strokeWeight(1);
    fill(MAROON);
    circle(toSX(p.x), toSY(p.y), 8);
  }
  noStroke();

  // three residual mini-plots below
  let rpW = (mainW - 20) / 3;
  let rpH = 120;
  let rpY = mainY + mainH + 45;
  let maxE = max(1, ...fits.flatMap(f => f.stats.residuals.map(r => abs(r.e)))) * 1.15;
  fits.forEach((f, i) => {
    let rx = mainX + i * (rpW + 10);
    stroke(200);
    strokeWeight(1);
    fill('white');
    rect(rx, rpY, rpW, rpH, 6);
    // zero line
    stroke(150);
    line(rx + 4, rpY + rpH / 2, rx + rpW - 4, rpY + rpH / 2);
    noStroke();
    for (let r of f.stats.residuals) {
      fill(f.col);
      let sx = map(r.x, X_MIN, X_MAX, rx + 6, rx + rpW - 6);
      let sy = map(r.e, -maxE, maxE, rpY + rpH - 6, rpY + 6);
      circle(sx, sy, 5);
    }
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text(f.name + ' residuals', rx + rpW / 2, rpY + rpH + 4);
  });

  // comparison table on the right
  let tX = mainX + mainW + 30;
  let tW = canvasWidth - tX - margin;
  let rowH = 92;
  // winner by RMSE
  let winner = fits.reduce((a, b) => a.stats.rmse < b.stats.rmse ? a : b);
  fits.forEach((f, i) => {
    let ty = 55 + i * (rowH + 12);
    let isWin = revealed && f === winner;
    stroke(isWin ? MAROON : 200);
    strokeWeight(isWin ? 3 : 1);
    fill(isWin ? color(255, 248, 240) : 'white');
    rect(tX, ty, tW, rowH, 10);
    noStroke();
    fill(f.col);
    textSize(16);
    textAlign(LEFT, TOP);
    text(f.name + (isWin ? '  ★ best model' : ''), tX + 14, ty + 8);
    fill('black');
    textSize(14);
    text(f.fit.eq, tX + 14, ty + 30);
    text('R² = ' + nf(f.stats.r2, 0, 3) + '    RMSE = ' + nf(f.stats.rmse, 0, 2) +
         '    residuals: ' + f.stats.quality, tX + 14, ty + 52, tW - 28, 40);
  });

  if (revealed) {
    noStroke();
    fill(MAROON);
    textSize(14);
    textAlign(LEFT, TOP);
    text('Criteria: lowest RMSE, highest R², AND pattern-free residuals. ' +
         'True process: ' + truth + '.', tX, 55 + 3 * (rowH + 12), tW, 60);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('True underlying process:', 10, drawHeight + 20);
  text('Noise: ' + nf(noiseSlider.value(), 0, 1), 60, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  noiseSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
