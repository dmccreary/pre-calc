// Inverse Trig Graphs MicroSim
// CANVAS_HEIGHT: 562
// The restricted piece of sin, cos, or tan on the left; its inverse on the
// right — with the reflection across y = x made draggable and animatable.
// Bloom's Level: Understand — inverse trig graphs are reflected restrictions.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 480;
let controlHeight = 80; // 2 rows: radio + toggles, input slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const R = Math.PI; // per-panel plot range: -π..π on both axes
const HPI = Math.PI / 2;
const TPI = Math.PI * 2;

const FUNCS = {
  'sine':    { fn: x => Math.sin(x), inv: v => Math.asin(v), domain: [-HPI, HPI],
               vRange: [-1, 1], invName: 'arcsin', full: [-TPI, TPI] },
  'cosine':  { fn: x => Math.cos(x), inv: v => Math.acos(v), domain: [0, Math.PI],
               vRange: [-1, 1], invName: 'arccos', full: [-TPI, TPI] },
  'tangent': { fn: x => Math.tan(x), inv: v => Math.atan(v), domain: [-HPI + 0.06, HPI - 0.06],
               vRange: [-3, 3], invName: 'arctan', full: [-TPI, TPI] }
};

let funcName = 'sine';
let mouseOverCanvas = false;

let funcRadio;
let inputSlider;
let reflectionCheckbox;
let animateCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  funcRadio = createRadio();
  funcRadio.parent(mainElement);
  ['sine', 'cosine', 'tangent'].forEach(f => funcRadio.option(f));
  funcRadio.selected('sine');
  funcRadio.position(10, drawHeight + 10);
  funcRadio.style('font-size', '15px');
  funcRadio.changed(() => { funcName = funcRadio.value(); });

  reflectionCheckbox = createCheckbox('Show y = x', true);
  reflectionCheckbox.parent(mainElement);
  reflectionCheckbox.position(330, drawHeight + 10);

  animateCheckbox = createCheckbox('Animate reflection', false);
  animateCheckbox.parent(mainElement);
  animateCheckbox.position(455, drawHeight + 10);

  inputSlider = createSlider(-1, 1, 0.5, 0.01);
  inputSlider.parent(mainElement);
  inputSlider.position(sliderLeftMargin, drawHeight + 45);
  inputSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Two panels: the restricted piece of a trig function in maroon over its full gray curve on the left, and the inverse trig graph on the right. A slider moves matched points a-b and b-a across the two panels, showing the reflection across y equals x.', LABEL);
}

function drawPanelAxes(px, pw, pt, ph) {
  let toSX = x => map(x, -R, R, px + 8, px + pw - 8);
  let toSY = y => map(y, -R, R, pt + ph - 8, pt + 8);
  stroke(228);
  strokeWeight(1);
  const TICKS = [-PI, -HALF_PI, HALF_PI, PI];
  for (let t of TICKS) {
    line(toSX(t), pt + 8, toSX(t), pt + ph - 8);
    line(px + 8, toSY(t), px + pw - 8, toSY(t));
  }
  stroke(150);
  strokeWeight(1.2);
  line(toSX(0), pt + 8, toSX(0), pt + ph - 8);
  line(px + 8, toSY(0), px + pw - 8, toSY(0));
  noStroke();
  fill(120);
  textSize(11);
  textAlign(CENTER, TOP);
  const LBL = ['−π', '−π/2', 'π/2', 'π'];
  TICKS.forEach((t, i) => text(LBL[i], toSX(t), toSY(0) + 3));
  return { toSX, toSY };
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

  let F = FUNCS[funcName];
  // keep slider in the inverse function's domain
  let v = constrain(inputSlider.value() * (funcName === 'tangent' ? 3 : 1),
                    F.vRange[0] + 0.001, F.vRange[1] - 0.001);

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Inverse Trig Graphs: Reflected Restrictions', canvasWidth / 2, 6);

  let half = canvasWidth / 2;
  let pw = half - margin - 15;
  let pt = 44, ph = drawHeight - 110;

  // LEFT: original function
  let L = drawPanelAxes(margin, pw, pt, ph);
  // full curve in gray
  stroke(185);
  strokeWeight(1.5);
  noFill();
  let inSeg = false;
  beginShape();
  for (let x = -R; x <= R; x += 0.02) {
    let y = F.fn(x);
    if (isFinite(y) && abs(y) <= R) { vertex(L.toSX(x), L.toSY(y)); inSeg = true; }
    else if (inSeg) { endShape(); beginShape(); inSeg = false; }
  }
  endShape();
  // restricted piece in maroon
  stroke(MAROON);
  strokeWeight(3);
  beginShape();
  for (let x = F.domain[0]; x <= F.domain[1]; x += 0.02) {
    let y = F.fn(x);
    if (abs(y) <= R) vertex(L.toSX(x), L.toSY(y));
  }
  endShape();
  noStroke();

  // y = x line and animated reflection
  if (reflectionCheckbox.checked()) {
    stroke(120);
    strokeWeight(1.5);
    drawingContext.setLineDash([7, 6]);
    line(L.toSX(-R), L.toSY(-R), L.toSX(R), L.toSY(R));
    drawingContext.setLineDash([]);
    noStroke();
  }
  if (animateCheckbox.checked()) {
    // intermediate curve morphing from restriction to its inverse
    let t = (sin(millis() / 800) + 1) / 2;
    if (!mouseOverCanvas) t = 1;
    stroke(0, 191, 255, 170);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let x = F.domain[0]; x <= F.domain[1]; x += 0.03) {
      let y = F.fn(x);
      if (abs(y) > R) continue;
      vertex(L.toSX(lerp(x, y, t)), L.toSY(lerp(y, x, t)));
    }
    endShape();
    noStroke();
  }

  // RIGHT: inverse function
  let RP = drawPanelAxes(half + 15, pw, pt, ph);
  // arctan horizontal asymptotes
  if (funcName === 'tangent') {
    stroke(220, 60, 60);
    strokeWeight(1.5);
    drawingContext.setLineDash([6, 5]);
    line(RP.toSX(-R), RP.toSY(HALF_PI), RP.toSX(R), RP.toSY(HALF_PI));
    line(RP.toSX(-R), RP.toSY(-HALF_PI), RP.toSX(R), RP.toSY(-HALF_PI));
    drawingContext.setLineDash([]);
    noStroke();
  }
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  beginShape();
  let lo = funcName === 'tangent' ? -R : F.vRange[0];
  let hi = funcName === 'tangent' ? R : F.vRange[1];
  for (let x = lo; x <= hi; x += 0.02) {
    let y = F.inv(x);
    if (isFinite(y)) vertex(RP.toSX(x), RP.toSY(y));
  }
  endShape();
  noStroke();
  if (reflectionCheckbox.checked()) {
    stroke(120);
    strokeWeight(1.5);
    drawingContext.setLineDash([7, 6]);
    line(RP.toSX(-R), RP.toSY(-R), RP.toSX(R), RP.toSY(R));
    drawingContext.setLineDash([]);
    noStroke();
  }

  // matched points: (b, a) on inverse; (a, b) on original where a = inv(v), b = v
  let a = F.inv(v);
  let b = v;
  stroke('black');
  strokeWeight(2);
  fill('gold');
  circle(L.toSX(a), L.toSY(b), 13);
  fill(CYAN);
  circle(RP.toSX(b), RP.toSY(a), 13);
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('(' + nf(a, 0, 2) + ', ' + nf(b, 0, 2) + ')', L.toSX(a) + 9, L.toSY(b) - 4);
  text('(' + nf(b, 0, 2) + ', ' + nf(a, 0, 2) + ')', RP.toSX(b) + 9, RP.toSY(a) - 4);

  // panel titles + readout
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text(funcName + ' (restricted piece in maroon)', margin + pw / 2, pt + ph + 8);
  text(F.invName + '(x)', half + 15 + pw / 2, pt + ph + 8);
  fill(MAROON);
  textAlign(CENTER, TOP);
  text(F.invName + '(' + nf(v, 0, 2) + ') = ' + nf(a, 0, 3) + ' rad = ' + nf(degrees(a), 0, 1) + '°',
       canvasWidth / 2, pt + ph + 30);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('input = ' + nf(v, 0, 2), 90, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  inputSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
