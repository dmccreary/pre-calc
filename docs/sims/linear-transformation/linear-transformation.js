// Linear Transformation MicroSim
// CANVAS_HEIGHT: 552
// A 2x2 matrix transforms the unit square: the matrix columns are exactly
// where the basis vectors i and j land. Determinant = signed area ratio.
// Bloom's Level: Analyze — connect matrix entries to the geometric action.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 470;
let controlHeight = 80; // 2 rows: matrix entries + preset, rotation slider + animate
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const I_COLOR = '#2b5fc7';   // i-hat blue
const J_COLOR = '#e07b20';   // j-hat orange
const RANGE = 3;

let M = [[0, -1], [1, 0]];   // [[a, b], [c, d]] — columns are images of i and j
let animT = 1;               // 0 = identity, 1 = full transform
let animating = false;

let entryInputs = [];        // a, b, c, d
let presetSelect;
let rotSlider;
let animateButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  let defaults = ['0', '-1', '1', '0'];
  let xs = [55, 110, 55, 110];
  let ys = [8, 8, 43, 43];
  for (let i = 0; i < 4; i++) {
    let inp = createInput(defaults[i]);
    inp.parent(mainElement);
    inp.position(xs[i], drawHeight + ys[i]);
    inp.size(42);
    inp.input(() => {
      let vals = entryInputs.map(e => parseFloat(e.value()));
      if (vals.every(v => isFinite(v))) {
        M = [[vals[0], vals[1]], [vals[2], vals[3]]];
      }
    });
    entryInputs.push(inp);
  }

  presetSelect = createSelect();
  presetSelect.parent(mainElement);
  presetSelect.position(180, drawHeight + 8);
  ['rotation', 'reflection across x-axis', 'shear', 'scaling'].forEach(o => presetSelect.option(o));
  presetSelect.changed(applyPreset);

  rotSlider = createSlider(0, 360, 90, 5);
  rotSlider.parent(mainElement);
  rotSlider.position(300, drawHeight + 45);
  rotSlider.size(180);
  rotSlider.input(() => {
    if (presetSelect.value() === 'rotation') applyPreset();
  });

  animateButton = createButton('Animate morph');
  animateButton.parent(mainElement);
  animateButton.position(510, drawHeight + 43);
  animateButton.mousePressed(() => { animT = 0; animating = true; });

  describe('Left panel: the unit square with blue and orange basis vectors. Right panel: the square and basis vectors after the two-by-two matrix is applied, with the dashed original for comparison, and the determinant shown as a signed area ratio.', LABEL);
}

function applyPreset() {
  let p = presetSelect.value();
  if (p === 'rotation') {
    let a = radians(rotSlider.value());
    M = [[cos(a), -sin(a)], [sin(a), cos(a)]];
  } else if (p === 'reflection across x-axis') M = [[1, 0], [0, -1]];
  else if (p === 'shear') M = [[1, 1], [0, 1]];
  else M = [[2, 0], [0, 0.5]];
  syncInputs();
}

function syncInputs() {
  [M[0][0], M[0][1], M[1][0], M[1][1]].forEach((v, i) =>
    entryInputs[i].value(nf(v, 0, 2).replace(/\.?0+$/, '')));
}

// interpolated matrix between identity and M
function currentMatrix() {
  return [
    [lerp(1, M[0][0], animT), lerp(0, M[0][1], animT)],
    [lerp(0, M[1][0], animT), lerp(1, M[1][1], animT)]
  ];
}

function apply(mat, p) {
  return [mat[0][0] * p[0] + mat[0][1] * p[1], mat[1][0] * p[0] + mat[1][1] * p[1]];
}

function drawPlane(px, pw, title, mat, showOriginalGhost) {
  let pt = 50, ph = drawHeight - 130;
  let toSX = gx => map(gx, -RANGE, RANGE, px + 8, px + pw - 8);
  let toSY = gy => map(gy, -RANGE, RANGE, pt + ph, pt);

  stroke(228);
  strokeWeight(1);
  for (let i = -RANGE; i <= RANGE; i++) {
    line(toSX(i), pt, toSX(i), pt + ph);
    line(px + 8, toSY(i), px + pw - 8, toSY(i));
  }
  stroke(150);
  strokeWeight(1.3);
  line(toSX(0), pt, toSX(0), pt + ph);
  line(px + 8, toSY(0), px + pw - 8, toSY(0));
  noStroke();

  // dashed original square (ghost)
  if (showOriginalGhost) {
    stroke(150);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    noFill();
    beginShape();
    [[0, 0], [1, 0], [1, 1], [0, 1]].forEach(p => vertex(toSX(p[0]), toSY(p[1])));
    endShape(CLOSE);
    drawingContext.setLineDash([]);
    noStroke();
  }

  // transformed unit square
  let corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(p => apply(mat, p));
  noStroke();
  fill(128, 0, 32, 60);
  beginShape();
  corners.forEach(p => vertex(toSX(p[0]), toSY(p[1])));
  endShape(CLOSE);
  stroke(MAROON);
  strokeWeight(2);
  noFill();
  beginShape();
  corners.forEach(p => vertex(toSX(p[0]), toSY(p[1])));
  endShape(CLOSE);
  noStroke();

  // basis vectors
  let iHat = apply(mat, [1, 0]);
  let jHat = apply(mat, [0, 1]);
  for (let [w, col, lbl] of [[iHat, I_COLOR, 'i'], [jHat, J_COLOR, 'j']]) {
    stroke(col);
    strokeWeight(3.5);
    line(toSX(0), toSY(0), toSX(w[0]), toSY(w[1]));
    noStroke();
    fill(col);
    let a = atan2(toSY(w[1]) - toSY(0), toSX(w[0]) - toSX(0));
    push();
    translate(toSX(w[0]), toSY(w[1]));
    rotate(a);
    triangle(0, 0, -10, -5, -10, 5);
    pop();
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text(lbl + ' → (' + nf(w[0], 0, 1) + ', ' + nf(w[1], 0, 1) + ')',
         toSX(w[0]) + 8, toSY(w[1]) - 4);
  }

  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, TOP);
  text(title, px + pw / 2, pt + ph + 10);
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

  if (animating) {
    animT = min(1, animT + 0.02);
    if (animT >= 1) animating = false;
  }

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Linear Transformations of the Plane', canvasWidth / 2, 4);

  let half = canvasWidth / 2;
  let identity = [[1, 0], [0, 1]];
  drawPlane(margin, half - margin - 15, 'Before: unit square with basis vectors', identity, false);
  drawPlane(half + 15, half - margin - 15, 'After: transformed by M', currentMatrix(), true);

  // matrix + determinant readout
  let det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  noStroke();
  fill(MAROON);
  textSize(17);
  textAlign(CENTER, TOP);
  text('M = [ ' + nf(M[0][0], 0, 1) + '  ' + nf(M[0][1], 0, 1) + ' ; ' +
       nf(M[1][0], 0, 1) + '  ' + nf(M[1][1], 0, 1) + ' ]    ' +
       'det M = ' + nf(det, 0, 2) + '  (area ×' + nf(abs(det), 0, 2) + ', orientation ' +
       (det > 0 ? 'preserved' : det < 0 ? 'REVERSED' : 'collapsed!') + ')',
       canvasWidth / 2, drawHeight - 40);
  fill(90);
  textSize(14);
  text('The columns of M are exactly where i and j land.', canvasWidth / 2, drawHeight - 18);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('M =', 10, drawHeight + 38);
  text('rotation°: ' + rotSlider.value(), 195, drawHeight + 57);
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
