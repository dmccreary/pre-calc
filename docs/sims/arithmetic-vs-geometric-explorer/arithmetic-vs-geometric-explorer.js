// Arithmetic vs Geometric Explorer MicroSim
// CANVAS_HEIGHT: 552
// Two sequences side by side: additive growth on the left (straight),
// multiplicative growth on the right (curved), with a live value table.
// Bloom's Level: Analyze — contrast additive and multiplicative growth patterns.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1100;
let drawHeight = 470;
let controlHeight = 80; // 2 rows of two-column controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const N_TERMS = 20;
const Y_MIN = -30, Y_MAX = 40;

let a1Slider, dSlider, rSlider;
let matchButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  a1Slider = createSlider(-20, 20, 2, 1);
  a1Slider.parent(mainElement);
  dSlider = createSlider(-5, 5, 3, 0.5);
  dSlider.parent(mainElement);
  rSlider = createSlider(-2, 2, 1.3, 0.1);
  rSlider.parent(mainElement);

  matchButton = createButton('Match Growth at n = 5');
  matchButton.parent(mainElement);
  matchButton.mousePressed(matchGrowth);

  positionControls();
  describe('Two plots side by side: an arithmetic sequence forming a straight line of points and a geometric sequence forming a curved pattern, with sliders for the first term, common difference, and common ratio, plus a table of the first ten terms.', LABEL);
}

function positionControls() {
  let half = canvasWidth / 2;
  let sw = max(120, half - 200);
  a1Slider.position(115, drawHeight + 10);
  a1Slider.size(sw);
  dSlider.position(115, drawHeight + 45);
  dSlider.size(sw);
  rSlider.position(half + 115, drawHeight + 10);
  rSlider.size(sw);
  matchButton.position(half + 115, drawHeight + 42);
}

function matchGrowth() {
  // choose r, then set d so both sequences agree at n = 5
  let a1 = a1Slider.value();
  if (a1 === 0) { a1Slider.value(2); a1 = 2; }
  let r = 1.5;
  rSlider.value(r);
  let d = (a1 * Math.pow(r, 4) - a1) / 4;
  dSlider.value(constrain(round(d * 2) / 2, -5, 5));
}

function drawPanel(px, pw, title, formula, terms, drawLine, drawExpCurve) {
  let pt = 58, ph = drawHeight - 200;
  let toSX = n => map(n, 0, N_TERMS + 1, px + 34, px + pw - 12);
  let toSY = v => map(v, Y_MIN, Y_MAX, pt + ph, pt);

  // frame + axes
  stroke(226);
  strokeWeight(1);
  for (let v = -20; v <= 40; v += 10) line(px + 34, toSY(v), px + pw - 12, toSY(v));
  stroke('black');
  strokeWeight(1.5);
  line(px + 34, toSY(0), px + pw - 12, toSY(0));
  line(px + 34, pt, px + 34, pt + ph);
  noStroke();
  fill(90);
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let v = -20; v <= 40; v += 20) text(v, px + 30, toSY(v));

  // straight connector for arithmetic
  if (drawLine) {
    stroke(180);
    strokeWeight(1.5);
    let prev = null;
    for (let n = 1; n <= N_TERMS; n++) {
      let v = terms[n - 1];
      if (v >= Y_MIN && v <= Y_MAX) {
        if (prev) line(prev[0], prev[1], toSX(n), toSY(v));
        prev = [toSX(n), toSY(v)];
      } else prev = null;
    }
  }
  // dashed exponential curve through geometric points
  if (drawExpCurve) {
    stroke(180);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 4]);
    let a1 = a1Slider.value(), r = rSlider.value();
    if (r > 0 && a1 !== 0) {
      noFill();
      let inSeg = false;
      beginShape();
      for (let n = 1; n <= N_TERMS; n += 0.1) {
        let v = a1 * Math.pow(r, n - 1);
        if (isFinite(v) && v >= Y_MIN && v <= Y_MAX) {
          vertex(toSX(n), toSY(v));
          inSeg = true;
        } else if (inSeg) { endShape(); beginShape(); inSeg = false; }
      }
      endShape();
    }
    drawingContext.setLineDash([]);
  }

  // points
  noStroke();
  for (let n = 1; n <= N_TERMS; n++) {
    let v = terms[n - 1];
    if (isFinite(v) && v >= Y_MIN && v <= Y_MAX) {
      fill(drawLine ? CYAN : MAROON);
      stroke('black');
      strokeWeight(1);
      circle(toSX(n), toSY(v), 9);
    }
  }
  noStroke();

  // titles
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  text(title, px + pw / 2, pt - 24);
  fill(MAROON);
  textSize(14);
  text(formula, px + pw / 2, pt + ph + 8);
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
  text('Arithmetic vs Geometric Sequences', canvasWidth / 2, 4);

  let a1 = a1Slider.value(), d = dSlider.value(), r = rSlider.value();
  let arith = [], geom = [];
  for (let n = 1; n <= N_TERMS; n++) {
    arith.push(a1 + (n - 1) * d);
    geom.push(a1 * Math.pow(r, n - 1));
  }

  let half = canvasWidth / 2;
  drawPanel(margin, half - margin - 15, 'Arithmetic: add d each step',
    'aₙ = ' + a1 + ' + (n − 1)(' + d + ')', arith, true, false);
  drawPanel(half + 15, half - margin - 15, 'Geometric: multiply by r each step',
    'aₙ = ' + a1 + ' · (' + r + ')ⁿ⁻¹', geom, false, true);

  // value table for a1..a10
  let tY = drawHeight - 96;
  noStroke();
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(margin, tY, canvasWidth - 2 * margin, 84, 8);
  noStroke();
  let colW = (canvasWidth - 2 * margin - 90) / 10;
  textSize(13);
  fill(90);
  textAlign(LEFT, CENTER);
  text('n', margin + 12, tY + 16);
  fill(CYAN);
  text('arith', margin + 12, tY + 42);
  fill(MAROON);
  text('geom', margin + 12, tY + 68);
  textAlign(CENTER, CENTER);
  for (let n = 1; n <= 10; n++) {
    let cx = margin + 80 + (n - 0.5) * colW;
    fill(90);
    text(n, cx, tY + 16);
    fill('black');
    text(nf(arith[n - 1], 0, 1), cx, tY + 42);
    text(abs(geom[n - 1]) > 9999 ? '…' : nf(geom[n - 1], 0, 1), cx, tY + 68);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('a₁ = ' + a1, 10, drawHeight + 20);
  text('d = ' + d, 10, drawHeight + 55);
  text('r = ' + r, canvasWidth / 2 + 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
