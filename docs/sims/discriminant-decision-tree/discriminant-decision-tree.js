// Discriminant Decision Tree MicroSim
// CANVAS_HEIGHT: 602
// Enter a, b, c and watch the discriminant route the quadratic down one of
// three branches: two real zeros, one repeated zero, or complex conjugates.
// Bloom's Level: Analyze — predict the number and nature of zeros from b² − 4ac.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50; // 1 row: a,b,c inputs + buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

const EXAMPLES = [
  { a: 1, b: -5, c: 6 },    // D > 0
  { a: 1, b: -4, c: 4 },    // D = 0
  { a: 1, b: 4, c: 13 }     // D < 0
];
let exampleIndex = 0;
let showZeros = false;

let aInput, bInput, cInput;
let showZerosButton, cycleButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aInput = createInput('1');
  aInput.parent(mainElement);
  aInput.position(35, drawHeight + 10);
  aInput.size(45);

  bInput = createInput('-5');
  bInput.parent(mainElement);
  bInput.position(120, drawHeight + 10);
  bInput.size(45);

  cInput = createInput('6');
  cInput.parent(mainElement);
  cInput.position(205, drawHeight + 10);
  cInput.size(45);

  showZerosButton = createButton('Show Zeros');
  showZerosButton.parent(mainElement);
  showZerosButton.position(270, drawHeight + 10);
  showZerosButton.mousePressed(() => { showZeros = !showZeros; });

  cycleButton = createButton('Cycle Example');
  cycleButton.parent(mainElement);
  cycleButton.position(375, drawHeight + 10);
  cycleButton.mousePressed(() => {
    exampleIndex = (exampleIndex + 1) % EXAMPLES.length;
    let e = EXAMPLES[exampleIndex];
    aInput.value(e.a); bInput.value(e.b); cInput.value(e.c);
  });

  describe('Decision tree for the discriminant of a quadratic. The entered coefficients light up one of three branches: positive discriminant with two real zeros, zero discriminant with one repeated zero, or negative discriminant with complex conjugate zeros.', LABEL);
}

function coeffs() {
  let a = parseFloat(aInput.value());
  let b = parseFloat(bInput.value());
  let c = parseFloat(cInput.value());
  if (isNaN(a) || a === 0) a = NaN;
  return { a, b: isNaN(b) ? NaN : b, c: isNaN(c) ? NaN : c };
}

// draw a mini parabola inside a box showing the given zero configuration
function miniParabola(bx, by, bw, bh, mode) {
  // axis
  stroke(150);
  strokeWeight(1.5);
  let axisY = by + bh * 0.62;
  line(bx + 8, axisY, bx + bw - 8, axisY);
  // parabola: vertex position depends on mode
  let vy = mode === 'two' ? axisY + bh * 0.22 : mode === 'one' ? axisY : axisY - bh * 0.22;
  stroke(MAROON);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let t = -1; t <= 1.001; t += 0.05) {
    let x = bx + bw / 2 + t * bw * 0.4;
    let y = vy + t * t * (by + 14 - vy);
    vertex(x, y);
  }
  endShape();
  // zero markers
  noStroke();
  fill(CYAN);
  if (mode === 'two') {
    // solve vy + t²(by+14-vy) = axisY for the crossing parameter
    let t0 = Math.sqrt((axisY - vy) / (by + 14 - vy));
    circle(bx + bw / 2 - t0 * bw * 0.4, axisY, 9);
    circle(bx + bw / 2 + t0 * bw * 0.4, axisY, 9);
  } else if (mode === 'one') {
    circle(bx + bw / 2, axisY, 9);
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
  text('The Discriminant Decision Tree', canvasWidth / 2, 8);

  let { a, b, c } = coeffs();
  let valid = isFinite(a) && isFinite(b) && isFinite(c);
  let D = valid ? b * b - 4 * a * c : NaN;
  let branch = !valid ? -1 : D > 0 ? 0 : D === 0 ? 1 : 2;

  // top node
  let topW = min(420, canvasWidth - 2 * margin);
  let topX = canvasWidth / 2 - topW / 2;
  stroke(MAROON);
  strokeWeight(2);
  fill('white');
  rect(topX, 45, topW, 74, 12);
  noStroke();
  fill('black');
  textSize(19);
  textAlign(CENTER, TOP);
  if (valid) {
    let aStr = a === 1 ? '' : a === -1 ? '−' : a;
    text('f(x) = ' + aStr + 'x² ' + (b >= 0 ? '+ ' + b : '− ' + abs(b)) + 'x ' +
         (c >= 0 ? '+ ' + c : '− ' + abs(c)), canvasWidth / 2, 54);
    fill(MAROON);
    text('D = b² − 4ac = ' + b + '² − 4(' + a + ')(' + c + ') = ' + D, canvasWidth / 2, 86);
  } else {
    text('Enter numeric a, b, c below (a ≠ 0)', canvasWidth / 2, 68);
  }

  // three branch boxes
  let boxW = (canvasWidth - 4 * margin) / 3;
  let boxY = 190;
  let boxH = 270;
  const BRANCHES = [
    { cond: 'b² − 4ac > 0', caption: 'Two distinct real zeros', mode: 'two',
      example: 'x² − 5x + 6 = 0\nzeros: x = 2 and x = 3' },
    { cond: 'b² − 4ac = 0', caption: 'One repeated real zero', mode: 'one',
      example: 'x² − 4x + 4 = 0\nzero: x = 2 (double)' },
    { cond: 'b² − 4ac < 0', caption: 'Two complex conjugate zeros', mode: 'none',
      example: 'x² + 4x + 13 = 0\nzeros: x = −2 ± 3i' }
  ];

  for (let i = 0; i < 3; i++) {
    let bx = margin + i * (boxW + margin);
    let active = branch === i;
    // connector line
    stroke(active ? MAROON : 180);
    strokeWeight(active ? 3 : 1.5);
    line(canvasWidth / 2, 119, bx + boxW / 2, boxY);
    // box
    stroke(active ? MAROON : 'silver');
    strokeWeight(active ? 3 : 1);
    fill(active ? color(255, 248, 240) : 'white');
    rect(bx, boxY, boxW, boxH, 12);
    noStroke();
    fill(active ? MAROON : color(90));
    textSize(17);
    textAlign(CENTER, TOP);
    text(BRANCHES[i].cond, bx + boxW / 2, boxY + 10);
    miniParabola(bx + boxW * 0.15, boxY + 40, boxW * 0.7, 110, BRANCHES[i].mode);
    fill('black');
    textSize(15);
    text(BRANCHES[i].caption, bx + boxW / 2, boxY + 165);
    fill(100);
    textSize(14);
    text(BRANCHES[i].example, bx + boxW / 2, boxY + 195);
  }

  // computed zeros readout
  if (showZeros && valid) {
    noStroke();
    fill(255, 255, 255, 240);
    stroke(MAROON);
    strokeWeight(1.5);
    rect(canvasWidth / 2 - 220, boxY + boxH + 15, 440, 52, 10);
    noStroke();
    fill(MAROON);
    textSize(17);
    textAlign(CENTER, CENTER);
    let msg;
    if (D > 0) {
      let r1 = (-b + Math.sqrt(D)) / (2 * a);
      let r2 = (-b - Math.sqrt(D)) / (2 * a);
      msg = 'x = ' + nf(r1, 0, 2) + '   or   x = ' + nf(r2, 0, 2);
    } else if (D === 0) {
      msg = 'x = ' + nf(-b / (2 * a), 0, 2) + '  (repeated)';
    } else {
      let re = -b / (2 * a);
      let im = Math.sqrt(-D) / (2 * a);
      msg = 'x = ' + nf(re, 0, 2) + ' ± ' + nf(abs(im), 0, 2) + 'i';
    }
    text('Zeros: ' + msg, canvasWidth / 2, boxY + boxH + 41);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('a =', 10, drawHeight + 22);
  text('b =', 95, drawHeight + 22);
  text('c =', 180, drawHeight + 22);
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
