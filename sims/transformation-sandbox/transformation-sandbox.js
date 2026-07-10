// Transformation Sandbox MicroSim
// CANVAS_HEIGHT: 572
// Parent graph on the left, transformed graph on the right. Four sliders
// control a, b, h, k with the equation readout updating live.
// Bloom's Level: Analyze — distinguish horizontal (inside) from vertical (outside) changes.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 450;
let controlHeight = 120; // 3 rows: buttons row + two rows of paired sliders
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -8, AXIS_MAX = 8;

const PARENTS = [
  { label: 'f(x) = x',   fn: x => x,                keyXs: [0, 2] },
  { label: 'f(x) = x²',  fn: x => x * x,            keyXs: [0, 2] },
  { label: 'f(x) = x³',  fn: x => x * x * x,        keyXs: [0, 1] },
  { label: 'f(x) = √x',  fn: x => x < 0 ? NaN : Math.sqrt(x), keyXs: [0, 4] },
  { label: 'f(x) = |x|', fn: x => Math.abs(x),      keyXs: [0, 2] },
  { label: 'f(x) = 1/x', fn: x => 1 / x,            keyXs: [1, 2] }
];

let parentIndex = 1;
let challenge = null;   // {a,b,h,k} mystery to match

let parentSelect;
let resetButton, challengeButton;
let aSlider, bSlider, hSlider, kSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  parentSelect = createSelect();
  parentSelect.parent(mainElement);
  parentSelect.position(10, drawHeight + 5);
  PARENTS.forEach(p => parentSelect.option(p.label));
  parentSelect.selected('f(x) = x²');
  parentSelect.changed(() => {
    parentIndex = PARENTS.findIndex(p => p.label === parentSelect.value());
    challenge = null;
  });

  resetButton = createButton('Reset');
  resetButton.parent(mainElement);
  resetButton.position(140, drawHeight + 5);
  resetButton.mousePressed(() => {
    aSlider.value(1); bSlider.value(1); hSlider.value(0); kSlider.value(0);
    challenge = null;
  });

  challengeButton = createButton('Challenge Mode');
  challengeButton.parent(mainElement);
  challengeButton.position(205, drawHeight + 5);
  challengeButton.mousePressed(() => {
    const pick = arr => arr[floor(random(arr.length))];
    challenge = {
      a: pick([-2, -1, 0.5, 2]),
      b: pick([0.5, 1, 2]),
      h: pick([-3, -1, 1, 2]),
      k: pick([-3, -1, 1, 3])
    };
  });

  // sliders in two columns
  let colW = () => (canvasWidth - 40) / 2;
  aSlider = createSlider(-3, 3, 1, 0.5);
  aSlider.parent(mainElement);
  aSlider.position(80, drawHeight + 45);
  bSlider = createSlider(-3, 3, 1, 0.5);
  bSlider.parent(mainElement);
  bSlider.position(80, drawHeight + 80);
  hSlider = createSlider(-5, 5, 0, 0.5);
  hSlider.parent(mainElement);
  kSlider = createSlider(-5, 5, 0, 0.5);
  kSlider.parent(mainElement);
  positionSliders();

  describe('Two coordinate planes side by side: the parent function on the left in gray, the transformed function on the right in maroon with the parent faint behind it. Four sliders control vertical stretch, horizontal stretch, horizontal shift, and vertical shift.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(120, half - 160);
  aSlider.position(80, drawHeight + 45);
  aSlider.size(sw);
  bSlider.position(80, drawHeight + 80);
  bSlider.size(sw);
  hSlider.position(half + 80, drawHeight + 45);
  hSlider.size(sw);
  kSlider.position(half + 80, drawHeight + 80);
  kSlider.size(sw);
}

function gValue(x, p) {
  let f = PARENTS[parentIndex].fn;
  return p.a * f(p.b * (x - p.h)) + p.k;
}

function drawPlane(px, pw, title, curves, keyDots) {
  let pt = 45, ph = drawHeight - 110;
  let toSX = gx => map(gx, AXIS_MIN, AXIS_MAX, px + 10, px + pw - 10);
  let toSY = gy => map(gy, AXIS_MIN, AXIS_MAX, pt + ph, pt);

  stroke(226);
  strokeWeight(1);
  for (let i = AXIS_MIN; i <= AXIS_MAX; i += 2) {
    line(toSX(i), pt, toSX(i), pt + ph);
    line(px + 10, toSY(i), px + pw - 10, toSY(i));
  }
  stroke('black');
  strokeWeight(1.5);
  line(toSX(0), pt, toSX(0), pt + ph);
  line(px + 10, toSY(0), px + pw - 10, toSY(0));
  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text(title, px + pw / 2, pt + ph + 8);

  for (let c of curves) {
    stroke(c.col);
    strokeWeight(c.w);
    if (c.dashed) drawingContext.setLineDash([6, 5]);
    noFill();
    let inSeg = false;
    beginShape();
    for (let sx = px + 10; sx <= px + pw - 10; sx += 1.5) {
      let gx = map(sx, px + 10, px + pw - 10, AXIS_MIN, AXIS_MAX);
      let gy = c.fn(gx);
      if (isFinite(gy) && gy > AXIS_MIN - 3 && gy < AXIS_MAX + 3) {
        vertex(sx, toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
        inSeg = true;
      } else if (inSeg) {
        endShape();
        beginShape();
        inSeg = false;
      }
    }
    endShape();
    drawingContext.setLineDash([]);
  }
  noStroke();

  // key-point dots
  const DOT_COLS = ['#e6a817', '#00a0c8'];
  keyDots.forEach((d, i) => {
    if (isFinite(d.y) && abs(d.y) <= AXIS_MAX && abs(d.x) <= AXIS_MAX) {
      stroke('black');
      strokeWeight(1.5);
      fill(DOT_COLS[i % 2]);
      circle(toSX(d.x), toSY(d.y), 12);
    }
  });
  noStroke();
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
  text('Transformation Sandbox', canvasWidth / 2, 6);

  let p = { a: aSlider.value(), b: bSlider.value(), h: hSlider.value(), k: kSlider.value() };
  if (p.b === 0) p.b = 0.5;
  let f = PARENTS[parentIndex].fn;
  let half = canvasWidth / 2;

  // key points: parent (x, f(x)) → transformed (h + x/b, a f(x) + k)
  let keyXs = PARENTS[parentIndex].keyXs;
  let parentDots = keyXs.map(x => ({ x: x, y: f(x) }));
  let transDots = keyXs.map(x => ({ x: p.h + x / p.b, y: p.a * f(x) + p.k }));

  drawPlane(margin, half - margin - 10, 'Parent (gray)',
    [{ fn: f, col: color(120), w: 2.5 }], parentDots);

  let rightCurves = [
    { fn: f, col: color(190, 190, 190, 150), w: 1.5 },
    { fn: x => gValue(x, p), col: MAROON, w: 3 }
  ];
  if (challenge) {
    rightCurves.push({ fn: x => gValue(x, challenge), col: color(80), w: 2, dashed: true });
  }
  drawPlane(half + 10, half - margin - 10, 'Transformed (maroon)' +
    (challenge ? ' — match the dashed mystery!' : ''), rightCurves, transDots);

  // equation readout
  noStroke();
  fill(MAROON);
  textSize(18);
  textAlign(CENTER, TOP);
  text('g(x) = ' + p.a + ' · f( ' + p.b + ' (x − ' + p.h + ') ) + ' + p.k,
       canvasWidth / 2, drawHeight - 34);

  // challenge status
  if (challenge) {
    let match = ['a', 'b', 'h', 'k'].every(key => abs(p[key] - challenge[key]) < 0.01);
    fill(match ? 'green' : color(120));
    textSize(15);
    text(match ? 'Challenge solved! The graphs coincide.' :
         'Adjust the sliders until the maroon curve covers the dashed one.',
         canvasWidth / 2, drawHeight - 58);
  }

  // slider labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('a = ' + p.a, 10, drawHeight + 55);
  text('b = ' + p.b, 10, drawHeight + 90);
  text('h = ' + p.h, canvasWidth / 2 + 10, drawHeight + 55);
  text('k = ' + p.k, canvasWidth / 2 + 10, drawHeight + 90);
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
