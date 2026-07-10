// Function Behavior Labeler MicroSim
// CANVAS_HEIGHT: 552
// Students place vertical dividers at turning points, then label each
// interval increasing, decreasing, or constant, and check their answer.
// Bloom's Level: Analyze — partition a domain into intervals of uniform behavior.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50; // 1 row: select + 2 buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const X_MIN = -6, X_MAX = 6, Y_MIN = -6, Y_MAX = 6;

// each curve: fn, true divider x-positions, true labels (one more than dividers)
const CURVES = [
  {
    label: 'Cubic',
    fn: x => (x * x * x - 12 * x) / 10,
    dividers: [-2, 2],
    labels: ['increasing', 'decreasing', 'increasing']
  },
  {
    label: 'Absolute value',
    fn: x => Math.abs(x) - 2,
    dividers: [0],
    labels: ['decreasing', 'increasing']
  },
  {
    label: 'Piecewise',
    fn: x => x < -3 ? -3 : (x < 2 ? x : 2 - (x - 2)),
    dividers: [-3, 2],
    labels: ['constant', 'increasing', 'decreasing']
  },
  {
    label: 'Sinusoidal fragment',
    fn: x => 4 * Math.sin(x),
    dividers: [-4.712, -1.571, 1.571, 4.712],
    labels: ['decreasing', 'increasing', 'decreasing', 'increasing', 'decreasing']
  }
];

const LABEL_CYCLE = ['increasing', 'decreasing', 'constant'];
const LABEL_COLORS = {
  increasing: [70, 130, 220],   // blue
  decreasing: [235, 140, 40],   // orange
  constant:   [150, 150, 150]   // gray
};

let curveIndex = 0;
let userDividers = [];      // x positions placed by the student
let bandLabels = [];        // one label per interval
let dragIndex = -1;
let gradeResult = null;     // null or array of booleans per band, or 'divider-count'

let curveSelect;
let addDividerButton;
let checkButton;

let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  curveSelect = createSelect();
  curveSelect.parent(mainElement);
  curveSelect.position(10, drawHeight + 10);
  CURVES.forEach(c => curveSelect.option(c.label));
  curveSelect.changed(() => {
    curveIndex = CURVES.findIndex(c => c.label === curveSelect.value());
    resetWork();
  });

  addDividerButton = createButton('Add Divider');
  addDividerButton.parent(mainElement);
  addDividerButton.position(200, drawHeight + 10);
  addDividerButton.mousePressed(addDivider);

  checkButton = createButton('Check');
  checkButton.parent(mainElement);
  checkButton.position(310, drawHeight + 10);
  checkButton.mousePressed(gradeWork);

  resetWork();
  describe('A curve on a coordinate plane. Students drag vertical dividers to the turning points, click the colored band above each interval to label it increasing, decreasing, or constant, then press Check to grade the labeling.', LABEL);
}

function resetWork() {
  userDividers = [];
  bandLabels = ['increasing'];
  gradeResult = null;
}

function addDivider() {
  userDividers.push(0);
  userDividers.sort((a, b) => a - b);
  bandLabels = new Array(userDividers.length + 1).fill('increasing');
  gradeResult = null;
}

function gradeWork() {
  let truth = CURVES[curveIndex];
  if (userDividers.length !== truth.dividers.length) {
    gradeResult = 'divider-count';
    return;
  }
  let sorted = [...userDividers].sort((a, b) => a - b);
  gradeResult = [];
  let dividersOK = sorted.every((d, i) => abs(d - truth.dividers[i]) < 0.5);
  for (let i = 0; i < bandLabels.length; i++) {
    gradeResult.push(dividersOK && bandLabels[i] === truth.labels[i]);
  }
}

function toSX(gx) { return map(gx, X_MIN, X_MAX, plotLeft, plotLeft + plotW); }
function toSY(gy) { return map(gy, Y_MIN, Y_MAX, plotTop + plotH, plotTop); }
function toGX(px) { return map(px, plotLeft, plotLeft + plotW, X_MIN, X_MAX); }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  plotLeft = margin + 15;
  plotTop = 90;
  plotW = canvasWidth - 2 * (margin + 15);
  plotH = drawHeight - 160;

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Function Behavior Labeler', canvasWidth / 2, 8);
  fill(100);
  textSize(14);
  text('Drag dividers to turning points • Click a band to change its label • Press Check',
       canvasWidth / 2, 38);

  // axes + grid
  stroke(220);
  strokeWeight(1);
  for (let i = X_MIN; i <= X_MAX; i++) {
    line(toSX(i), plotTop, toSX(i), plotTop + plotH);
  }
  for (let i = Y_MIN; i <= Y_MAX; i++) {
    line(plotLeft, toSY(i), plotLeft + plotW, toSY(i));
  }
  stroke('black');
  strokeWeight(2);
  line(toSX(0), plotTop, toSX(0), plotTop + plotH);
  line(plotLeft, toSY(0), plotLeft + plotW, toSY(0));

  // colored bands along the top per interval
  let edges = [X_MIN, ...[...userDividers].sort((a, b) => a - b), X_MAX];
  for (let i = 0; i < edges.length - 1; i++) {
    let lbl = bandLabels[i] || 'increasing';
    let c = LABEL_COLORS[lbl];
    noStroke();
    fill(c[0], c[1], c[2], 170);
    rect(toSX(edges[i]), plotTop - 24, toSX(edges[i + 1]) - toSX(edges[i]), 20);
    fill('black');
    textSize(13);
    textAlign(CENTER, CENTER);
    let midX = (toSX(edges[i]) + toSX(edges[i + 1])) / 2;
    text(lbl, midX, plotTop - 14);
    // grade marks
    if (Array.isArray(gradeResult)) {
      if (gradeResult[i]) {
        fill('green'); text('✓', midX, plotTop - 34);
      } else {
        // red highlight on incorrect band
        noFill();
        stroke('red');
        strokeWeight(2);
        rect(toSX(edges[i]), plotTop - 24, toSX(edges[i + 1]) - toSX(edges[i]), 20);
        noStroke();
        fill('red');
        text('✗', midX, plotTop - 34);
      }
    }
  }

  // curve
  let f = CURVES[curveIndex].fn;
  stroke(MAROON);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let gx = X_MIN; gx <= X_MAX; gx += 0.03) {
    vertex(toSX(gx), toSY(constrain(f(gx), Y_MIN, Y_MAX)));
  }
  endShape();

  // dividers
  userDividers.forEach((d, i) => {
    stroke(80);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(toSX(d), plotTop, toSX(d), plotTop + plotH);
    drawingContext.setLineDash([]);
    fill('white');
    stroke(80);
    circle(toSX(d), plotTop + plotH + 12, 16);
    noStroke();
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text(nf(d, 0, 1), toSX(d), plotTop + plotH + 24);
  });

  // hover tooltip on curve
  if (mouseX > plotLeft && mouseX < plotLeft + plotW && mouseY > plotTop && mouseY < plotTop + plotH) {
    let gx = toGX(mouseX);
    let gy = f(gx);
    if (abs(toSY(gy) - mouseY) < 20) {
      noStroke();
      fill(0, 0, 0, 190);
      rect(mouseX + 10, mouseY - 28, 110, 22, 5);
      fill('white');
      textSize(13);
      textAlign(LEFT, CENTER);
      text('(' + nf(gx, 0, 1) + ', ' + nf(gy, 0, 1) + ')', mouseX + 16, mouseY - 17);
    }
  }

  // grade feedback message
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(15);
  if (gradeResult === 'divider-count') {
    fill('red');
    text('Divider count is off — this curve needs ' + CURVES[curveIndex].dividers.length +
         ' divider(s).', plotLeft, drawHeight - 22);
  } else if (Array.isArray(gradeResult)) {
    let allOK = gradeResult.every(g => g);
    fill(allOK ? 'green' : MAROON);
    text(allOK ? 'Perfect! Every interval is labeled correctly.' :
         'Some bands are wrong — check the red ones and try again.', plotLeft, drawHeight - 22);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Bands: click to cycle label', 380, drawHeight + 22);
}

function mousePressed() {
  // start dragging a divider handle?
  for (let i = 0; i < userDividers.length; i++) {
    if (dist(mouseX, mouseY, toSX(userDividers[i]), plotTop + plotH + 12) < 12 ||
        (abs(mouseX - toSX(userDividers[i])) < 8 && mouseY > plotTop && mouseY < plotTop + plotH)) {
      dragIndex = i;
      return;
    }
  }
  // click a band to cycle its label
  if (mouseY > plotTop - 24 && mouseY < plotTop - 4) {
    let edges = [X_MIN, ...[...userDividers].sort((a, b) => a - b), X_MAX];
    for (let i = 0; i < edges.length - 1; i++) {
      if (mouseX > toSX(edges[i]) && mouseX < toSX(edges[i + 1])) {
        let cur = LABEL_CYCLE.indexOf(bandLabels[i]);
        bandLabels[i] = LABEL_CYCLE[(cur + 1) % LABEL_CYCLE.length];
        gradeResult = null;
      }
    }
  }
}

function mouseDragged() {
  if (dragIndex >= 0) {
    userDividers[dragIndex] = constrain(toGX(mouseX), X_MIN + 0.2, X_MAX - 0.2);
    gradeResult = null;
  }
}

function mouseReleased() {
  dragIndex = -1;
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
