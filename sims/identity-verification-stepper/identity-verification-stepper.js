// Identity Verification Stepper MicroSim
// CANVAS_HEIGHT: 512
// Verify trig identities by choosing the next algebraic move at each stage;
// wrong moves give feedback, undo is free, and the full proof can be shown.
// Bloom's Level: Apply — treat identity verification as choosing good moves.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 900;
let drawHeight = 430;
let controlHeight = 80; // 2 rows: identity select + undo + solution, move buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

const MOVES = ['Convert to sin/cos', 'Apply Pythagorean identity', 'Combine fractions', 'Simplify / cancel'];

// each identity: goal string + ordered steps {expr, move (index into MOVES)}
const IDENTITIES = [
  {
    goal: 'tan θ · cos θ = sin θ',
    start: 'tan θ · cos θ',
    steps: [
      { move: 0, expr: '(sin θ / cos θ) · cos θ' },
      { move: 3, expr: 'sin θ   ✓' }
    ]
  },
  {
    goal: '1 + tan²θ = sec²θ',
    start: '1 + tan²θ',
    steps: [
      { move: 0, expr: '1 + sin²θ / cos²θ' },
      { move: 2, expr: '(cos²θ + sin²θ) / cos²θ' },
      { move: 1, expr: '1 / cos²θ' },
      { move: 3, expr: 'sec²θ   ✓' }
    ]
  },
  {
    goal: 'sec θ − cos θ = sin θ · tan θ',
    start: 'sec θ − cos θ',
    steps: [
      { move: 0, expr: '1/cos θ − cos θ' },
      { move: 2, expr: '(1 − cos²θ) / cos θ' },
      { move: 1, expr: 'sin²θ / cos θ' },
      { move: 3, expr: 'sin θ · (sin θ / cos θ) = sin θ · tan θ   ✓' }
    ]
  },
  {
    goal: 'csc θ · tan θ = sec θ',
    start: 'csc θ · tan θ',
    steps: [
      { move: 0, expr: '(1 / sin θ) · (sin θ / cos θ)' },
      { move: 3, expr: '1 / cos θ = sec θ   ✓' }
    ]
  },
  {
    goal: '(1 − cos²θ) / sin θ = sin θ',
    start: '(1 − cos²θ) / sin θ',
    steps: [
      { move: 1, expr: 'sin²θ / sin θ' },
      { move: 3, expr: 'sin θ   ✓' }
    ]
  },
  {
    goal: 'cos²θ − sin²θ = 1 − 2sin²θ',
    start: 'cos²θ − sin²θ',
    steps: [
      { move: 1, expr: '(1 − sin²θ) − sin²θ' },
      { move: 3, expr: '1 − 2sin²θ   ✓' }
    ]
  }
];

let identityIndex = 0;
let progress = 0;        // how many steps completed
let feedback = 'Pick the move that transforms the left side.';
let showSolution = false;

let identitySelect;
let undoButton, solutionButton;
let moveButtons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  identitySelect = createSelect();
  identitySelect.parent(mainElement);
  identitySelect.position(10, drawHeight + 8);
  IDENTITIES.forEach(idn => identitySelect.option(idn.goal));
  identitySelect.changed(() => {
    identityIndex = IDENTITIES.findIndex(idn => idn.goal === identitySelect.value());
    resetProof();
  });

  undoButton = createButton('Undo');
  undoButton.parent(mainElement);
  undoButton.position(330, drawHeight + 8);
  undoButton.mousePressed(() => {
    if (progress > 0) progress--;
    feedback = 'Undone. Try a different move.';
    showSolution = false;
  });

  solutionButton = createButton('Show Full Solution');
  solutionButton.parent(mainElement);
  solutionButton.position(395, drawHeight + 8);
  solutionButton.mousePressed(() => { showSolution = !showSolution; });

  let bx = 10;
  MOVES.forEach((mv, i) => {
    let btn = createButton(mv);
    btn.parent(mainElement);
    btn.position(bx, drawHeight + 45);
    btn.mousePressed(() => tryMove(i));
    moveButtons.push(btn);
    bx += mv.length * 8 + 40;
  });

  describe('Trig identity verification as a guided game: the current expression is shown, four move buttons offer algebraic transformations, and choosing the correct move advances the proof one step. Undo and a full-solution view are available.', LABEL);
}

function resetProof() {
  progress = 0;
  feedback = 'Pick the move that transforms the left side.';
  showSolution = false;
}

function tryMove(moveIndex) {
  let idn = IDENTITIES[identityIndex];
  if (progress >= idn.steps.length) {
    feedback = 'Already verified! Choose another identity.';
    return;
  }
  if (idn.steps[progress].move === moveIndex) {
    progress++;
    feedback = progress >= idn.steps.length ?
      'Verified! Both sides match. 🎉' :
      'Good move — "' + MOVES[moveIndex] + '" worked. Keep going.';
  } else {
    feedback = '"' + MOVES[moveIndex] + '" doesn\'t help here. Look at the expression\'s form and try again.';
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
  text('Identity Verification Stepper', canvasWidth / 2, 6);

  let idn = IDENTITIES[identityIndex];

  // goal banner
  noStroke();
  fill(MAROON);
  textSize(19);
  textAlign(CENTER, TOP);
  text('Verify:   ' + idn.goal, canvasWidth / 2, 40);

  // current expression (large)
  let currentExpr = progress === 0 ? idn.start : idn.steps[progress - 1].expr;
  stroke(MAROON);
  strokeWeight(2);
  fill(255, 252, 244);
  let exprW = min(canvasWidth - 2 * margin, 560);
  rect((canvasWidth - exprW) / 2, 80, exprW, 62, 12);
  noStroke();
  fill('black');
  textSize(24);
  textAlign(CENTER, CENTER);
  text(currentExpr, canvasWidth / 2, 111);

  // progress indicator
  fill(90);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Step ' + progress + ' of ' + idn.steps.length, canvasWidth / 2, 150);

  // feedback area
  let done = progress >= idn.steps.length;
  fill(done ? 'green' : feedback.startsWith('Good') ? color(0, 120, 0) :
       feedback.startsWith('"') ? MAROON : color(90));
  textSize(16);
  text(feedback, margin, 176, canvasWidth - 2 * margin, 40);

  // move-history stack on the right
  let panX = canvasWidth - 290 - margin;
  stroke(200);
  strokeWeight(1);
  fill('white');
  rect(panX, 215, 290, 190, 10);
  noStroke();
  fill(MAROON);
  textSize(15);
  textAlign(LEFT, TOP);
  text('Move history', panX + 12, 224);
  fill('black');
  textSize(13);
  for (let i = 0; i < progress; i++) {
    text((i + 1) + '. ' + MOVES[idn.steps[i].move] + ' → ' + idn.steps[i].expr,
         panX + 12, 248 + i * 36, 266, 36);
  }

  // full solution
  if (showSolution) {
    stroke(CYAN);
    strokeWeight(1.5);
    fill(240, 250, 255);
    rect(margin, 215, panX - margin - 15, 190, 10);
    noStroke();
    fill('#006080');
    textSize(14);
    textAlign(LEFT, TOP);
    let sol = idn.start;
    idn.steps.forEach((s, i) => {
      sol += '\n  —' + MOVES[s.move] + '→  ' + s.expr;
    });
    text(sol, margin + 12, 226, panX - margin - 40, 175);
  }

  // control labels — buttons carry their own labels
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
