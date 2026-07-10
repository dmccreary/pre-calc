// Leading Term Test Sandbox MicroSim
// CANVAS_HEIGHT: 602
// Pick a degree and leading-coefficient sign; shuffle the lower-order terms
// and watch the two ends of the graph stay put.
// Bloom's Level: Analyze — isolate the leading term as the sole cause of end behavior.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50; // 1 row: degree select + 3 buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const AXIS_MIN = -6, AXIS_MAX = 6;

let degree = 3;
let leadingSign = 1;
let lowerCoeffs = [];  // coefficients for x^(degree-1) … x^0
let showFourCases = false;

let degreeSelect;
let signButton;
let shuffleButton;
let gridButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  degreeSelect = createSelect();
  degreeSelect.parent(mainElement);
  degreeSelect.position(75, drawHeight + 10);
  for (let d = 1; d <= 6; d++) degreeSelect.option('degree ' + d);
  degreeSelect.selected('degree 3');
  degreeSelect.changed(() => {
    degree = parseInt(degreeSelect.value().replace('degree ', ''));
    shuffleLower();
  });

  signButton = createButton('Sign: +');
  signButton.parent(mainElement);
  signButton.position(185, drawHeight + 10);
  signButton.mousePressed(() => {
    leadingSign = -leadingSign;
    signButton.html('Sign: ' + (leadingSign > 0 ? '+' : '−'));
  });

  shuffleButton = createButton('Shuffle Lower Terms');
  shuffleButton.parent(mainElement);
  shuffleButton.position(270, drawHeight + 10);
  shuffleButton.mousePressed(shuffleLower);

  gridButton = createButton('Grid of Four Cases');
  gridButton.parent(mainElement);
  gridButton.position(435, drawHeight + 10);
  gridButton.mousePressed(() => {
    showFourCases = !showFourCases;
    gridButton.html(showFourCases ? 'Back to Sandbox' : 'Grid of Four Cases');
  });

  shuffleLower();
  describe('Polynomial sandbox: choose a degree and leading-coefficient sign, shuffle the lower-order terms, and observe that the two ends of the graph never change direction.', LABEL);
}

function shuffleLower() {
  lowerCoeffs = [];
  for (let i = 0; i < degree; i++) {
    lowerCoeffs.push(random(-2.5, 2.5));
  }
}

function polyValue(x) {
  // scale x so high-degree curves fit the window better
  let xs = x / 2;
  let v = leadingSign * Math.pow(xs, degree) * 3;
  for (let i = 0; i < degree; i++) {
    v += lowerCoeffs[i] * Math.pow(xs, degree - 1 - i) * 0.6;
  }
  return v;
}

function polyString() {
  let s = (leadingSign > 0 ? '' : '−') + 'x^' + degree;
  for (let i = 0; i < degree; i++) {
    let c = lowerCoeffs[i];
    if (abs(c) < 0.15) continue;
    let p = degree - 1 - i;
    s += (c >= 0 ? ' + ' : ' − ') + nf(abs(c), 0, 1) + (p > 1 ? 'x^' + p : p === 1 ? 'x' : '');
  }
  return 'P(x) = ' + s;
}

function endBehavior() {
  let rightUp = leadingSign > 0;
  let leftUp = degree % 2 === 0 ? rightUp : !rightUp;
  return { leftUp, rightUp };
}

function drawPlot(px, py, pw, ph, fn, leftUp, rightUp, small) {
  // frame + axes
  stroke(small ? 200 : 222);
  strokeWeight(1);
  let toSX = gx => map(gx, AXIS_MIN, AXIS_MAX, px, px + pw);
  let toSY = gy => map(gy, AXIS_MIN, AXIS_MAX, py + ph, py);
  if (!small) {
    for (let i = AXIS_MIN; i <= AXIS_MAX; i++) {
      line(toSX(i), py, toSX(i), py + ph);
      line(px, toSY(i), px + pw, toSY(i));
    }
  }
  stroke('black');
  strokeWeight(small ? 1 : 2);
  line(toSX(0), py, toSX(0), py + ph);
  line(px, toSY(0), px + pw, toSY(0));

  // curve
  stroke(MAROON);
  strokeWeight(small ? 2 : 3);
  noFill();
  let inView = false;
  beginShape();
  for (let gx = AXIS_MIN; gx <= AXIS_MAX; gx += 0.03) {
    let gy = fn(gx);
    if (gy >= AXIS_MIN - 2 && gy <= AXIS_MAX + 2) {
      vertex(toSX(gx), toSY(constrain(gy, AXIS_MIN, AXIS_MAX)));
      inView = true;
    } else if (inView) {
      vertex(toSX(gx), toSY(gy > 0 ? AXIS_MAX : AXIS_MIN));
      endShape();
      beginShape();
      inView = false;
    }
  }
  endShape();

  // end-behavior arrows
  stroke(CYAN);
  strokeWeight(small ? 2 : 3.5);
  let ah = small ? 8 : 14;
  // left end
  let ly = leftUp ? py + 14 : py + ph - 14;
  line(px + 12, leftUp ? ly + ah : ly - ah, px + 12, ly);
  line(px + 12, ly, px + 7, ly + (leftUp ? 6 : -6));
  line(px + 12, ly, px + 17, ly + (leftUp ? 6 : -6));
  // right end
  let ry = rightUp ? py + 14 : py + ph - 14;
  line(px + pw - 12, rightUp ? ry + ah : ry - ah, px + pw - 12, ry);
  line(px + pw - 12, ry, px + pw - 17, ry + (rightUp ? 6 : -6));
  line(px + pw - 12, ry, px + pw - 7, ry + (rightUp ? 6 : -6));
  noStroke();

  if (!small) {
    fill(CYAN);
    textSize(15);
    textAlign(LEFT, TOP);
    text('x → −∞ : P(x) → ' + (leftUp ? '+∞' : '−∞'), px + 26, leftUp ? py + 8 : py + ph - 28);
    textAlign(RIGHT, TOP);
    text('x → +∞ : P(x) → ' + (rightUp ? '+∞' : '−∞'), px + pw - 26, rightUp ? py + 8 : py + ph - 28);
  }
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
  text('Leading Term Test Sandbox', canvasWidth / 2, 8);

  if (!showFourCases) {
    let { leftUp, rightUp } = endBehavior();
    let pw = min(canvasWidth - 2 * margin, 640);
    let px = (canvasWidth - pw) / 2;
    drawPlot(px, 75, pw, drawHeight - 170, polyValue, leftUp, rightUp, false);

    // readout
    noStroke();
    fill('black');
    textSize(17);
    textAlign(CENTER, TOP);
    text(polyString(), canvasWidth / 2, drawHeight - 80);
    fill(MAROON);
    textSize(15);
    text('Leading term: ' + (leadingSign > 0 ? '+' : '−') + 'x^' + degree +
         '   (degree ' + (degree % 2 === 0 ? 'even' : 'odd') + ', coefficient ' +
         (leadingSign > 0 ? 'positive' : 'negative') + ')',
         canvasWidth / 2, drawHeight - 52);
  } else {
    // 2x2 grid of the four parity-sign cases
    const cases = [
      { deg: 2, sign: 1, label: 'Even degree, + leading: both ends UP' },
      { deg: 2, sign: -1, label: 'Even degree, − leading: both ends DOWN' },
      { deg: 3, sign: 1, label: 'Odd degree, + leading: falls left, rises right' },
      { deg: 3, sign: -1, label: 'Odd degree, − leading: rises left, falls right' }
    ];
    let gw = (canvasWidth - 3 * margin) / 2;
    let gh = (drawHeight - 130) / 2;
    cases.forEach((c, i) => {
      let cx = margin + (i % 2) * (gw + margin);
      let cy = 60 + floor(i / 2) * (gh + 40);
      let fn = x => c.sign * Math.pow(x / 2, c.deg) * 3;
      let rightUp = c.sign > 0;
      let leftUp = c.deg % 2 === 0 ? rightUp : !rightUp;
      drawPlot(cx, cy, gw, gh, fn, leftUp, rightUp, true);
      noStroke();
      fill('black');
      textSize(14);
      textAlign(CENTER, TOP);
      text(c.label, cx + gw / 2, cy + gh + 6);
    });
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Degree:', 10, drawHeight + 22);
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
