// Matrix Multiplication MicroSim
// CANVAS_HEIGHT: 522
// Click any empty cell of AB: the matching row of A and column of B light
// up and the dot product is written out with the actual numbers.
// Bloom's Level: Apply — each product entry is a row-column dot product.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 470;
let controlHeight = 50; // 1 row: dimension selects + fill/randomize buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const ROW_COLOR = [214, 232, 248];   // blue tint for the active row of A
const COL_COLOR = [248, 232, 214];   // orange tint for the active column of B

let A = [], B = [];
let computed = [];       // which result cells are filled
let active = null;       // {r, c} currently explained
let fillAll = false;
let fillTimer = 0;

let aRowsSelect, innerSelect, bColsSelect;
let fillButton, randomButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  aRowsSelect = makeDimSelect(68, 2);
  innerSelect = makeDimSelect(168, 3);
  bColsSelect = makeDimSelect(285, 2);

  fillButton = createButton('Fill All');
  fillButton.parent(mainElement);
  fillButton.position(350, drawHeight + 10);
  fillButton.mousePressed(() => { fillAll = true; fillTimer = 0; });

  randomButton = createButton('New Matrices');
  randomButton.parent(mainElement);
  randomButton.position(420, drawHeight + 10);
  randomButton.mousePressed(makeMatrices);

  makeMatrices();
  describe('Matrices A and B with an empty product grid. Clicking an empty product cell highlights the matching row of A and column of B and writes out the dot product with real numbers, filling the cell.', LABEL);
}

function makeDimSelect(x, def) {
  let s = createSelect();
  s.parent(document.querySelector('main'));
  s.position(x, drawHeight + 10);
  [1, 2, 3].forEach(v => s.option(v));
  s.selected('' + def);
  s.changed(makeMatrices);
  return s;
}

function makeMatrices() {
  let m = parseInt(aRowsSelect.value());
  let n = parseInt(innerSelect.value());
  let p = parseInt(bColsSelect.value());
  A = []; B = [];
  for (let i = 0; i < m; i++) A.push(Array.from({ length: n }, () => floor(random(-4, 6))));
  for (let i = 0; i < n; i++) B.push(Array.from({ length: p }, () => floor(random(-4, 6))));
  computed = Array.from({ length: m }, () => new Array(p).fill(false));
  active = null;
  fillAll = false;
}

function productEntry(r, c) {
  return A[r].reduce((s, v, k) => s + v * B[k][c], 0);
}

// matrix drawing helper — returns cell geometry for hit-testing
function drawMatrix(mat, x, y, cellW, cellH, label, highlightRow, highlightCol, showFn) {
  let rows = mat.length, cols = mat[0].length;
  noStroke();
  fill(90);
  textSize(15);
  textAlign(CENTER, BOTTOM);
  text(label, x + cols * cellW / 2, y - 8);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let hl = (highlightRow === i) || (highlightCol === j);
      stroke(hl ? MAROON : 'silver');
      strokeWeight(hl ? 2.5 : 1);
      if (highlightRow === i) fill(ROW_COLOR[0], ROW_COLOR[1], ROW_COLOR[2]);
      else if (highlightCol === j) fill(COL_COLOR[0], COL_COLOR[1], COL_COLOR[2]);
      else fill('white');
      rect(x + j * cellW, y + i * cellH, cellW - 4, cellH - 4, 5);
      noStroke();
      fill('black');
      textSize(17);
      textAlign(CENTER, CENTER);
      let v = showFn ? showFn(i, j) : mat[i][j];
      if (v !== null) text(v, x + j * cellW + cellW / 2 - 2, y + i * cellH + cellH / 2 - 2);
    }
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
  textSize(22);
  text('Matrix Multiplication, One Dot Product at a Time', canvasWidth / 2, 6);

  let m = A.length, n = A[0].length, p = B[0].length;

  // fill-all animation: compute one new cell every 40 frames
  if (fillAll) {
    fillTimer++;
    if (fillTimer % 35 === 1) {
      let found = false;
      for (let r = 0; r < m && !found; r++) {
        for (let c = 0; c < p && !found; c++) {
          if (!computed[r][c]) {
            computed[r][c] = true;
            active = { r, c };
            found = true;
          }
        }
      }
      if (!found) fillAll = false;
    }
  }

  let cell = 54;
  let ay = 110;
  let ax = margin + 20;
  let bx = ax + n * cell + 70;
  let cx = bx + p * cell + 90;

  drawMatrix(A, ax, ay, cell, cell, 'A  (' + m + '×' + n + ')',
             active ? active.r : -1, -1, null);
  drawMatrix(B, bx, ay, cell, cell, 'B  (' + n + '×' + p + ')',
             -1, active ? active.c : -1, null);
  // multiplication and equals signs
  noStroke();
  fill('black');
  textSize(26);
  textAlign(CENTER, CENTER);
  text('×', (ax + n * cell + bx) / 2 - 2, ay + m * cell / 2);
  text('=', (bx + p * cell + cx) / 2 - 2, ay + m * cell / 2);

  // result matrix — clickable
  let resultShow = (i, j) => computed[i][j] ? productEntry(i, j) : null;
  drawMatrix(computed.map(row => row.map(() => 0)), cx, ay, cell, cell,
             'AB  (' + m + '×' + p + ')', active ? active.r : -1, active ? active.c : -1, resultShow);

  // dimension check line
  fill(90);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Dimension check: (' + m + '×' + n + ')(' + n + '×' + p + ') — inner numbers match (' +
       n + ' = ' + n + '), so the product is ' + m + '×' + p + '.',
       margin, ay + max(m, n) * cell + 40);

  // dot product explanation for the active cell
  if (active) {
    let terms = A[active.r].map((v, k) => '(' + v + ')(' + B[k][active.c] + ')');
    noStroke();
    stroke(MAROON);
    strokeWeight(1.5);
    fill(255, 252, 244);
    rect(margin, ay + max(m, n) * cell + 70, canvasWidth - 2 * margin, 66, 10);
    noStroke();
    fill(MAROON);
    textSize(16);
    textAlign(LEFT, TOP);
    text('Entry (' + (active.r + 1) + ', ' + (active.c + 1) + '):  row ' + (active.r + 1) +
         ' of A  ·  column ' + (active.c + 1) + ' of B', margin + 14, ay + max(m, n) * cell + 80);
    fill('black');
    text('= ' + terms.join(' + ') + ' = ' + productEntry(active.r, active.c),
         margin + 14, ay + max(m, n) * cell + 106);
  } else {
    noStroke();
    fill(100);
    textSize(15);
    textAlign(LEFT, TOP);
    text('Click any empty cell of AB to compute it.', margin, ay + max(m, n) * cell + 80);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('A rows:', 10, drawHeight + 22);
  text('inner:', 125, drawHeight + 22);
  text('B cols:', 228, drawHeight + 22);
}

function mousePressed() {
  let m = A.length, n = A[0].length, p = B[0].length;
  let cell = 54;
  let ay = 110;
  let ax = margin + 20;
  let bx = ax + n * cell + 70;
  let cx = bx + p * cell + 90;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < p; c++) {
      let x = cx + c * cell, y = ay + r * cell;
      if (mouseX > x && mouseX < x + cell - 4 && mouseY > y && mouseY < y + cell - 4) {
        computed[r][c] = true;
        active = { r, c };
        fillAll = false;
      }
    }
  }
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
