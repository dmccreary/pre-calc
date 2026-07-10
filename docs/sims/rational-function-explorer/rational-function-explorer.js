// Rational Function Explorer MicroSim
// CANVAS_HEIGHT: 652
// Build a rational function from factored form; toggle each graphical layer
// (asymptotes, holes, zeros, intercept, sign chart) independently.
// Bloom's Level: Apply — connect each layer of the graph to an algebraic feature.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 570;
let controlHeight = 80; // 2 rows: presets, custom inputs + layer toggles
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -8, AXIS_MAX = 8;

// function state: numerator/denominator root lists (with multiplicity via repeats)
// preset 4 has a non-factorable numerator, stored as coefficient array instead
let numRoots = [];         // e.g. [1, -4]
let denRoots = [1, -2];
let numCoeffs = null;      // used only when numRoots is null (x²+1 case)
let label = '1 / x';

let plotLeft, plotTop, plotSize;

let preset1, preset2, preset3, preset4;
let numInput, denInput, applyButton;
let asymptotesCheckbox, pointsCheckbox, signChartCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  preset1 = createButton('1/x');
  preset1.parent(mainElement);
  preset1.position(10, drawHeight + 8);
  preset1.mousePressed(() => setFn([], [0], null, '1 / x'));

  preset2 = createButton('(x−1)/(x²−4)');
  preset2.parent(mainElement);
  preset2.position(60, drawHeight + 8);
  preset2.mousePressed(() => setFn([1], [2, -2], null, '(x−1) / (x²−4)'));

  preset3 = createButton('(x−1)(x+4)/(x−1)(x+2)');
  preset3.parent(mainElement);
  preset3.position(178, drawHeight + 8);
  preset3.mousePressed(() => setFn([1, -4], [1, -2], null, '(x−1)(x+4) / (x−1)(x+2)'));

  preset4 = createButton('(x²+1)/(x−2)');
  preset4.parent(mainElement);
  preset4.position(360, drawHeight + 8);
  preset4.mousePressed(() => setFn(null, [2], [1, 0, 1], '(x²+1) / (x−2)'));

  numInput = createInput('1,-4');
  numInput.parent(mainElement);
  numInput.position(115, drawHeight + 45);
  numInput.size(75);

  denInput = createInput('1,-2');
  denInput.parent(mainElement);
  denInput.position(285, drawHeight + 45);
  denInput.size(75);

  applyButton = createButton('Apply');
  applyButton.parent(mainElement);
  applyButton.position(360, drawHeight + 45);
  applyButton.mousePressed(applyCustom);

  asymptotesCheckbox = createCheckbox('Asymptotes', true);
  asymptotesCheckbox.parent(mainElement);
  asymptotesCheckbox.position(490, drawHeight + 8);

  pointsCheckbox = createCheckbox('Zeros / Holes / Intercept', true);
  pointsCheckbox.parent(mainElement);
  pointsCheckbox.position(610, drawHeight + 8);

  signChartCheckbox = createCheckbox('Sign Chart', false);
  signChartCheckbox.parent(mainElement);
  signChartCheckbox.position(490, drawHeight + 45);

  setFn([], [0], null, '1 / x');
  describe('Rational function grapher with toggleable layers: the curve, dashed asymptotes, hollow dots for holes, filled dots for zeros and the y-intercept, and an optional sign chart strip under the x-axis.', LABEL);
}

function setFn(nr, dr, nc, lbl) {
  numRoots = nr;
  denRoots = dr;
  numCoeffs = nc;
  label = lbl;
}

function applyCustom() {
  let parse = s => s.trim() === '' ? [] :
    s.split(',').map(v => parseFloat(v.trim())).filter(v => isFinite(v));
  let nr = parse(numInput.value());
  let dr = parse(denInput.value());
  if (dr.length === 0 && nr.length === 0) return;
  let lbl = (nr.length ? nr.map(r => '(x' + (r >= 0 ? '−' + r : '+' + (-r)) + ')').join('') : '1') +
            ' / ' +
            (dr.length ? dr.map(r => '(x' + (r >= 0 ? '−' + r : '+' + (-r)) + ')').join('') : '1');
  setFn(nr, dr, null, lbl);
}

// polynomial helpers -------------------------------------------------------
function rootsToCoeffs(roots) {
  let c = [1];
  for (let r of roots) {
    let next = new Array(c.length + 1).fill(0);
    for (let i = 0; i < c.length; i++) {
      next[i] += c[i];            // x * c[i]
      next[i + 1] += -r * c[i];   // -r * c[i]
    }
    c = next;
  }
  return c; // highest degree first
}

function polyEval(c, x) {
  return c.reduce((acc, v) => acc * x + v, 0);
}

function features() {
  let nC = numCoeffs || rootsToCoeffs(numRoots);
  let dC = rootsToCoeffs(denRoots);
  // holes: roots common to both lists (only detectable in root form)
  let holes = [];
  let effNum = numRoots ? [...numRoots] : null;
  let effDen = [...denRoots];
  if (effNum) {
    for (let i = effNum.length - 1; i >= 0; i--) {
      let j = effDen.indexOf(effNum[i]);
      if (j >= 0) {
        holes.push(effNum[i]);
        effNum.splice(i, 1);
        effDen.splice(j, 1);
      }
    }
  }
  let zeros = effNum ? effNum.filter(r => !effDen.includes(r)) : [];
  let vAsymptotes = [...new Set(effDen)];
  // horizontal / slant asymptote
  let degN = nC.length - 1, degD = dC.length - 1;
  let hAsym = null, slant = null;
  if (degN < degD) hAsym = 0;
  else if (degN === degD) hAsym = nC[0] / dC[0];
  else if (degN === degD + 1) {
    // one step of long division for the linear quotient
    let m = nC[0] / dC[0];
    let rem1 = nC[1] - m * dC[1];
    slant = { m: m, b: rem1 / dC[0] };
  }
  let yInt = polyEval(dC, 0) !== 0 ? polyEval(nC, 0) / polyEval(dC, 0) : null;
  return { nC, dC, holes, zeros, vAsymptotes, hAsym, slant, yInt, degN, degD };
}

function rValue(x, F) {
  let d = polyEval(F.dC, x);
  if (abs(d) < 1e-9) return NaN;
  return polyEval(F.nC, x) / d;
}

function toSX(gx) { return plotLeft + (gx - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * plotSize; }
function toSY(gy) { return plotTop + (AXIS_MAX - gy) / (AXIS_MAX - AXIS_MIN) * plotSize; }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotSize = min(canvasWidth * 0.55, drawHeight - 90);
  plotLeft = margin;
  plotTop = 50;

  let F = features();

  // grid + axes
  stroke(224);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotSize);
    line(plotLeft, toSY(i), plotLeft + plotSize, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotSize);
  line(plotLeft, toSY(0), plotLeft + plotSize, toSY(0));
  noStroke();

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Rational Function Explorer', canvasWidth * 0.32, 8);

  // asymptote layer (dashed cyan)
  if (asymptotesCheckbox.checked()) {
    stroke(CYAN);
    strokeWeight(2);
    drawingContext.setLineDash([7, 5]);
    for (let va of F.vAsymptotes) {
      if (va >= AXIS_MIN && va <= AXIS_MAX) {
        line(toSX(va), plotTop, toSX(va), plotTop + plotSize);
      }
    }
    if (F.hAsym !== null && F.hAsym >= AXIS_MIN && F.hAsym <= AXIS_MAX) {
      line(plotLeft, toSY(F.hAsym), plotLeft + plotSize, toSY(F.hAsym));
    }
    if (F.slant) {
      let y1 = F.slant.m * AXIS_MIN + F.slant.b;
      let y2 = F.slant.m * AXIS_MAX + F.slant.b;
      line(toSX(AXIS_MIN), toSY(constrain(y1, AXIS_MIN, AXIS_MAX)),
           toSX(AXIS_MAX), toSY(constrain(y2, AXIS_MIN, AXIS_MAX)));
    }
    drawingContext.setLineDash([]);
    noStroke();
  }

  // curve (piecewise across vertical asymptotes)
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  let inSeg = false;
  beginShape();
  for (let px = plotLeft; px <= plotLeft + plotSize; px += 1) {
    let gx = AXIS_MIN + (px - plotLeft) / plotSize * (AXIS_MAX - AXIS_MIN);
    let gy = rValue(gx, F);
    if (isFinite(gy) && gy > AXIS_MIN - 6 && gy < AXIS_MAX + 6) {
      vertex(px, toSY(constrain(gy, AXIS_MIN - 0.5, AXIS_MAX + 0.5)));
      inSeg = true;
    } else if (inSeg) {
      endShape();
      beginShape();
      inSeg = false;
    }
  }
  endShape();
  noStroke();

  // point layer: holes (hollow cyan), zeros + y-intercept (filled)
  if (pointsCheckbox.checked()) {
    for (let h of F.holes) {
      // hole y-value: limit — evaluate reduced function near the hole
      let gy = rValue(h + 1e-4, F);
      if (isFinite(gy) && abs(gy) <= AXIS_MAX) {
        stroke(CYAN);
        strokeWeight(2.5);
        fill('white');
        circle(toSX(h), toSY(gy), 12);
      }
    }
    noStroke();
    fill('black');
    for (let z of F.zeros) {
      if (z >= AXIS_MIN && z <= AXIS_MAX) circle(toSX(z), toSY(0), 10);
    }
    if (F.yInt !== null && abs(F.yInt) <= AXIS_MAX) {
      fill('green');
      circle(toSX(0), toSY(F.yInt), 10);
    }
  }

  // sign chart strip below the x-axis
  if (signChartCheckbox.checked()) {
    let critical = [...F.vAsymptotes, ...F.zeros, ...F.holes]
      .filter(v => v > AXIS_MIN && v < AXIS_MAX).sort((a, b) => a - b);
    let edges = [AXIS_MIN, ...critical, AXIS_MAX];
    let stripY = plotTop + plotSize + 10;
    for (let i = 0; i < edges.length - 1; i++) {
      let mid = (edges[i] + edges[i + 1]) / 2;
      let v = rValue(mid, F);
      noStroke();
      fill(v > 0 ? color(120, 190, 120) : color(230, 130, 130));
      rect(toSX(edges[i]), stripY, toSX(edges[i + 1]) - toSX(edges[i]), 16);
      fill('white');
      textSize(13);
      textAlign(CENTER, CENTER);
      text(v > 0 ? '+' : '−', toSX(mid), stripY + 8);
    }
  }

  // feature summary panel on the right
  let panX = plotLeft + plotSize + 25;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(panX, plotTop, panW, 330, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('R(x) = ' + label, panX + 14, plotTop + 10, panW - 28, 50);
  fill('black');
  textSize(15);
  let fy = plotTop + 60;
  const lineH = 26;
  let items = [
    'Zeros: ' + (F.zeros.length ? F.zeros.join(', ') : 'none'),
    'Holes: ' + (F.holes.length ? 'x = ' + F.holes.join(', ') : 'none'),
    'Vertical asymptotes: ' + (F.vAsymptotes.length ? 'x = ' + F.vAsymptotes.join(', ') : 'none'),
    'Horizontal asymptote: ' + (F.hAsym !== null ? 'y = ' + nf(F.hAsym, 0, 2) : 'none'),
    'Slant asymptote: ' + (F.slant ? 'y = ' + nf(F.slant.m, 0, 1) + 'x + ' + nf(F.slant.b, 0, 1) : 'none'),
    'y-intercept: ' + (F.yInt !== null ? '(0, ' + nf(F.yInt, 0, 2) + ')' : 'undefined'),
    'Degrees: numerator ' + F.degN + ', denominator ' + F.degD,
    'End behavior: follows the ' + (F.slant ? 'slant line' :
       F.hAsym !== null ? 'horizontal asymptote' : 'polynomial quotient')
  ];
  items.forEach((s, i) => text(s, panX + 14, fy + i * lineH, panW - 28, lineH));

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Num roots:', 10, drawHeight + 57);
  text('Den roots:', 200, drawHeight + 57);
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
