// Trig Equation Unit Circle Solver MicroSim
// CANVAS_HEIGHT: 602
// A dashed line slices the unit circle at the equation's value; the
// intersection rays are the solutions, listed exactly and decimally.
// Bloom's Level: Apply — find all solutions of a trig equation in an interval.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 520;
let controlHeight = 80; // 2 rows: selects + interval radio, c slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

let fnSelect, kSelect, intervalRadio;
let cSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  fnSelect = createSelect();
  fnSelect.parent(mainElement);
  fnSelect.position(10, drawHeight + 8);
  ['sin', 'cos', 'tan'].forEach(f => fnSelect.option(f));

  kSelect = createSelect();
  kSelect.parent(mainElement);
  kSelect.position(80, drawHeight + 8);
  ['k = 1', 'k = 2', 'k = 3'].forEach(o => kSelect.option(o));

  intervalRadio = createRadio();
  intervalRadio.parent(mainElement);
  intervalRadio.option('2pi', '[0, 2π)');
  intervalRadio.option('4pi', '[0, 4π)');
  intervalRadio.selected('2pi');
  intervalRadio.position(160, drawHeight + 10);
  intervalRadio.style('font-size', '15px');

  cSlider = createSlider(-1.5, 1.5, 0.5, 0.05);
  cSlider.parent(mainElement);
  cSlider.position(sliderLeftMargin, drawHeight + 45);
  cSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Unit circle with a dashed line at the equation\'s value. Gold dots mark where the line meets the circle; rays from the origin show the base solutions, and a side panel lists every solution in the chosen interval in exact and decimal form.', LABEL);
}

// exact string if t (radians) is a multiple of π/12, else null
function exactRad(t) {
  let k = Math.round(t / (PI / 12));
  if (abs(t - k * PI / 12) > 0.015) return null;
  if (k === 0) return '0';
  let num = k, den = 12;
  let g = (a, b) => b ? g(b, a % b) : a;
  let d = g(abs(num), den);
  num /= d; den /= d;
  let s = (abs(num) === 1 ? '' : abs(num)) + 'π' + (den === 1 ? '' : '/' + den);
  return (num < 0 ? '−' : '') + s;
}

// base solutions of fn(u) = c for u in [0, 2π)
function baseSolutions(fn, c) {
  if (fn === 'sin') {
    if (abs(c) > 1) return [];
    let r = Math.asin(c);
    let s1 = ((r % TWO_PI) + TWO_PI) % TWO_PI;
    let s2 = ((PI - r) % TWO_PI + TWO_PI) % TWO_PI;
    return abs(s1 - s2) < 1e-9 ? [s1] : [s1, s2];
  }
  if (fn === 'cos') {
    if (abs(c) > 1) return [];
    let r = Math.acos(c);
    return r === 0 || abs(r - PI) < 1e-9 ? [r] : [r, TWO_PI - r];
  }
  // tan: solutions r + kπ
  let r = Math.atan(c);
  let s1 = ((r % TWO_PI) + TWO_PI) % TWO_PI;
  return [s1 % PI, s1 % PI + PI];
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

  let fn = fnSelect.value();
  let k = parseInt(kSelect.value().replace('k = ', ''));
  let c = cSlider.value();
  if (fn !== 'tan') c = constrain(c, -1.5, 1.5);
  let intervalEnd = intervalRadio.value() === '2pi' ? TWO_PI : 2 * TWO_PI;

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Solving Trig Equations on the Unit Circle', canvasWidth / 2, 6);

  // equation display
  let eqStr = fn + '(' + (k === 1 ? 'θ' : k + 'θ') + ') = ' + nf(c, 0, 2);
  fill(MAROON);
  textSize(19);
  text(eqStr + '   on   ' + (intervalRadio.value() === '2pi' ? '[0, 2π)' : '[0, 4π)'),
       canvasWidth * 0.28, 36);

  // unit circle
  let cx = canvasWidth * 0.26;
  let cy = drawHeight / 2 + 40;
  let r = min(canvasWidth * 0.19, drawHeight * 0.32);

  stroke('black');
  strokeWeight(1.5);
  line(cx - r - 25, cy, cx + r + 25, cy);
  line(cx, cy - r - 25, cx, cy + r + 25);
  noFill();
  stroke(150);
  strokeWeight(2);
  circle(cx, cy, r * 2);
  // special-angle tick marks
  stroke(200);
  strokeWeight(1);
  for (let i = 0; i < 24; i++) {
    let a = i * PI / 12;
    line(cx + r * 0.95 * cos(a), cy - r * 0.95 * sin(a), cx + r * cos(a), cy - r * sin(a));
  }
  noStroke();

  // dashed slicing line for the BASE equation fn(u) = c
  stroke(CYAN);
  strokeWeight(2);
  drawingContext.setLineDash([7, 5]);
  if (fn === 'sin') {
    if (abs(c) <= 1) line(cx - r - 20, cy - c * r, cx + r + 20, cy - c * r);
  } else if (fn === 'cos') {
    if (abs(c) <= 1) line(cx + c * r, cy - r - 20, cx + c * r, cy + r + 20);
  } else {
    // tan: the tangent line x = 1, marked at height c
    line(cx + r, cy - r - 20, cx + r, cy + r + 20);
  }
  drawingContext.setLineDash([]);
  noStroke();

  // base solutions u (angles on the circle) + rays
  let bases = baseSolutions(fn, c);
  for (let u of bases) {
    stroke(MAROON);
    strokeWeight(2.5);
    line(cx, cy, cx + r * cos(u), cy - r * sin(u));
    stroke('black');
    strokeWeight(2);
    fill(GOLD);
    circle(cx + r * cos(u), cy - r * sin(u), 12);
    noStroke();
    fill(MAROON);
    textSize(13);
    textAlign(LEFT, BOTTOM);
    let ex = exactRad(u);
    text(ex ? ex : nf(u, 0, 2), cx + (r + 14) * cos(u), cy - (r + 14) * sin(u));
  }
  if (fn === 'tan') {
    // mark point (1, c) on the tangent line
    noStroke();
    fill(CYAN);
    circle(cx + r, cy - c * r, 9);
  }

  // solutions panel: θ = (u + 2πn)/k within interval
  let panX = canvasWidth * 0.52;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, 70, panW, drawHeight - 130, 10);
  noStroke();
  fill(MAROON);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Solutions for θ', panX + 14, 82);

  let sols = [];
  let periodU = fn === 'tan' ? PI : TWO_PI;
  for (let u of (fn === 'tan' ? [bases[0]] : bases)) {
    for (let n = 0; n < 40; n++) {
      let theta = (u + n * periodU) / k;
      if (theta >= intervalEnd) break;
      sols.push(theta);
    }
  }
  sols.sort((a, b) => a - b);
  // dedupe
  sols = sols.filter((s, i) => i === 0 || s - sols[i - 1] > 1e-6);

  fill('black');
  textSize(15);
  if (bases.length === 0) {
    fill(MAROON);
    text('No solutions — |c| > 1 is outside the range of ' + fn + '.', panX + 14, 116, panW - 28, 60);
  } else {
    let refU = fn === 'sin' ? Math.asin(abs(c)) : fn === 'cos' ? Math.acos(abs(c)) : Math.atan(abs(c));
    fill(90);
    textSize(13);
    text('Reference angle: ' + nf(refU, 0, 3) + ' rad = ' + nf(degrees(refU), 0, 1) + '°',
         panX + 14, 110);
    fill('black');
    textSize(15);
    let colW = panW / 2 - 10;
    sols.slice(0, 16).forEach((s, i) => {
      let colX = panX + 14 + (i % 2) * colW;
      let rowY = 140 + floor(i / 2) * 30;
      let ex = exactRad(s);
      text('θ = ' + (ex ? ex + '  (' + nf(s, 0, 2) + ')' : nf(s, 0, 3)), colX, rowY);
    });
    fill(90);
    textSize(13);
    text(sols.length + ' solution(s) in the interval. Higher k → more solutions per period.',
         panX + 14, drawHeight - 90, panW - 28, 40);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('c = ' + nf(c, 0, 2), 55, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  cSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
