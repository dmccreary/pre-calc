// Four Shapes of Change MicroSim
// CANVAS_HEIGHT: 652
// A 2x2 grid of behavior-and-concavity combinations. Hovering a cell enlarges
// it and shows the chord test; Quiz Me shows a mystery curve to classify.
// Bloom's Level: Analyze — classify graphs by combined behavior and concavity.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 600;
let controlHeight = 50; // 1 row: quiz button + score
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

// the four categories; curve maps t in [0,1] to y in [0,1] (0 = bottom)
const CELLS = [
  {
    behavior: 'Increasing', concavity: 'Concave up', rateArrow: '↑ rate increasing',
    curve: t => t * t,
    example: 'A savings account earning compound interest — growing and accelerating.'
  },
  {
    behavior: 'Increasing', concavity: 'Concave down', rateArrow: '↓ rate decreasing',
    curve: t => Math.sqrt(t),
    example: 'A coffee cup filling at a tapering rate — growing but slowing.'
  },
  {
    behavior: 'Decreasing', concavity: 'Concave up', rateArrow: '↓ fall slowing',
    curve: t => 0.25 / (t + 0.25) - 0.2,
    example: 'A hot object cooling toward room temperature — falling but at a slowing rate.'
  },
  {
    behavior: 'Decreasing', concavity: 'Concave down', rateArrow: '↑ fall accelerating',
    curve: t => 1 - t * t,
    example: 'A thrown ball slowing near apex then falling faster.'
  }
];

let quizMode = false;
let quizAnswer = 0;   // index of correct cell
let quizScore = 0;
let quizFeedback = '';
let quizButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  quizButton = createButton('Quiz Me');
  quizButton.parent(mainElement);
  quizButton.position(10, drawHeight + 10);
  quizButton.mousePressed(toggleQuiz);

  describe('Two-by-two grid of the four combinations of increasing or decreasing behavior with concave up or concave down. Hover a cell to enlarge it and see the chord test. Quiz mode shows a mystery curve to classify.', LABEL);
}

function toggleQuiz() {
  quizMode = !quizMode;
  quizButton.html(quizMode ? 'Exit Quiz' : 'Quiz Me');
  quizFeedback = '';
  if (quizMode) newQuizQuestion();
}

function newQuizQuestion() {
  quizAnswer = floor(random(4));
}

function cellRect(i) {
  let gw = (canvasWidth - 3 * margin) / 2;
  let gh = (drawHeight - 70 - 3 * 15) / 2;
  let col = i % 2, row = floor(i / 2);
  return {
    x: margin + col * (gw + margin),
    y: 55 + row * (gh + 15),
    w: gw, h: gh
  };
}

function drawCurveInBox(curveFn, bx, by, bw, bh, col, weight) {
  stroke(col);
  strokeWeight(weight);
  noFill();
  beginShape();
  for (let t = 0; t <= 1.001; t += 0.02) {
    let y = constrain(curveFn(t), 0, 1);
    vertex(bx + t * bw, by + bh - y * bh);
  }
  endShape();
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
  text('The Four Shapes of Change', canvasWidth / 2, 8);

  let hovered = -1;
  for (let i = 0; i < 4; i++) {
    let r = cellRect(i);
    if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) hovered = i;
  }

  for (let i = 0; i < 4; i++) {
    let r = cellRect(i);
    let cell = CELLS[i];
    let isHover = (hovered === i) && !quizMode;
    let grow = isHover ? 8 : 0;

    // cell background
    stroke(isHover ? MAROON : 'silver');
    strokeWeight(isHover ? 2.5 : 1);
    fill('white');
    rect(r.x - grow, r.y - grow, r.w + 2 * grow, r.h + 2 * grow, 12);

    // labels
    noStroke();
    fill(MAROON);
    textSize(isHover ? 19 : 17);
    textAlign(LEFT, TOP);
    text(cell.behavior + ' • ' + cell.concavity, r.x + 14, r.y + 10 - grow);
    fill(80);
    textSize(14);
    text(cell.rateArrow, r.x + 14, r.y + 34 - grow);

    // curve sketch box
    let cx = r.x + 20, cy = r.y + 60, cw = r.w * 0.45, ch = r.h - 105;
    stroke(230);
    strokeWeight(1);
    line(cx, cy + ch, cx + cw, cy + ch);
    line(cx, cy, cx, cy + ch);
    drawCurveInBox(cell.curve, cx, cy, cw, ch, MAROON, 3);

    // chord test on hover: chord above curve = concave up, below = concave down
    if (isHover) {
      let t1 = 0.12, t2 = 0.88;
      let y1 = constrain(cell.curve(t1), 0, 1);
      let y2 = constrain(cell.curve(t2), 0, 1);
      stroke(CYAN);
      strokeWeight(2.5);
      line(cx + t1 * cw, cy + ch - y1 * ch, cx + t2 * cw, cy + ch - y2 * ch);
      noStroke();
      fill(CYAN);
      textSize(13);
      textAlign(LEFT, TOP);
      let chordNote = (i === 0 || i === 2) ? 'Chord sits ABOVE the curve → concave up'
                                           : 'Chord sits BELOW the curve → concave down';
      text(chordNote, cx, cy + ch + 8);
    }

    // real-world example text, wrapped
    noStroke();
    fill(60);
    textSize(14);
    textAlign(LEFT, TOP);
    text(cell.example, r.x + r.w * 0.52, r.y + 60, r.w * 0.44, r.h - 80);
  }

  // quiz overlay
  if (quizMode) {
    // dim the grid
    noStroke();
    fill(255, 255, 255, 120);
    rect(0, 40, canvasWidth, drawHeight - 40);

    // mystery curve in center
    let mw = 220, mh = 170;
    let mx = canvasWidth / 2 - mw / 2, my = drawHeight / 2 - mh / 2 - 20;
    stroke(MAROON);
    strokeWeight(3);
    fill('white');
    rect(mx - 20, my - 45, mw + 40, mh + 85, 14);
    noStroke();
    fill('black');
    textSize(17);
    textAlign(CENTER, TOP);
    text('Mystery graph — click the matching cell', canvasWidth / 2, my - 36);
    stroke(230);
    strokeWeight(1);
    line(mx, my + mh, mx + mw, my + mh);
    line(mx, my, mx, my + mh);
    drawCurveInBox(CELLS[quizAnswer].curve, mx, my, mw, mh, MAROON, 4);

    noStroke();
    fill(quizFeedback.startsWith('Correct') ? 'green' : MAROON);
    textSize(16);
    textAlign(CENTER, TOP);
    text(quizFeedback, canvasWidth / 2, my + mh + 12);
  }

  // control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Score: ' + quizScore, 110, drawHeight + 22);
  fill(100);
  text(quizMode ? 'Click the cell that matches the mystery curve.' :
       'Hover a cell to see the chord test.', 190, drawHeight + 22);
}

function mousePressed() {
  if (!quizMode) return;
  for (let i = 0; i < 4; i++) {
    let r = cellRect(i);
    if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) {
      if (i === quizAnswer) {
        quizScore++;
        quizFeedback = 'Correct! ' + CELLS[i].behavior + ', ' + CELLS[i].concavity.toLowerCase() + '.';
        newQuizQuestion();
      } else {
        quizFeedback = 'Not quite — compare the direction AND the bend, then try again.';
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
