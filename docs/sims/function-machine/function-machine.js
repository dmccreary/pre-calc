// Function Machine MicroSim
// CANVAS_HEIGHT: 482
// A function machine evaluates f(x) at typed inputs. Students predict the
// output, then reveal the substitution and simplified result step by step.
// Bloom's Level: Apply — evaluate a function at specific inputs and predict outputs.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80; // 2 rows: input+buttons, rule select
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';

// the five pre-loaded rules
const RULES = [
  { label: 'f(x) = 2x + 1',        fn: x => 2 * x + 1,          sub: x => '2(' + x + ') + 1' },
  { label: 'f(x) = x²',            fn: x => x * x,              sub: x => '(' + x + ')²' },
  { label: 'f(x) = x² - 2x + 5',   fn: x => x * x - 2 * x + 5,  sub: x => '(' + x + ')² - 2(' + x + ') + 5' },
  { label: 'f(x) = √x',            fn: x => Math.sqrt(x),       sub: x => '√(' + x + ')' },
  { label: 'f(x) = 1/x',           fn: x => 1 / x,              sub: x => '1/(' + x + ')' }
];

// preset challenge inputs per rule (all in-domain)
const CHALLENGES = [
  [3, -2, 0, 5, -4],
  [3, -3, 2, -1, 10],
  [3, 0, 1, -2, 4],
  [4, 9, 25, 1, 16],
  [2, 4, -2, 5, 10]
];

let ruleIndex = 0;
let challengeIndex = 0;
let prediction = null;   // locked prediction value (number) or null
let revealed = false;
let animT = 0;           // 0..1 travel animation
let predictionCorrect = false;
let revealTime = 0;

let inputBox;
let ruleSelect;
let predictButton;
let revealButton;
let nextButton;
let statusMsg = 'Type your predicted output, then press Predict.';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  inputBox = createInput('');
  inputBox.parent(mainElement);
  inputBox.position(105, drawHeight + 8);
  inputBox.size(90);

  predictButton = createButton('Predict');
  predictButton.parent(mainElement);
  predictButton.position(210, drawHeight + 8);
  predictButton.mousePressed(lockPrediction);

  revealButton = createButton('Reveal');
  revealButton.parent(mainElement);
  revealButton.position(285, drawHeight + 8);
  revealButton.mousePressed(startReveal);

  nextButton = createButton('Next');
  nextButton.parent(mainElement);
  nextButton.position(357, drawHeight + 8);
  nextButton.mousePressed(nextChallenge);

  ruleSelect = createSelect();
  ruleSelect.parent(mainElement);
  ruleSelect.position(60, drawHeight + 45);
  RULES.forEach(r => ruleSelect.option(r.label));
  ruleSelect.changed(() => {
    ruleIndex = RULES.findIndex(r => r.label === ruleSelect.value());
    challengeIndex = 0;
    resetRound();
  });

  describe('A function machine with an input chute, a rule displayed on the box, and an output chute. Students type a predicted output, lock it in, and reveal the substitution and simplified result.', LABEL);
}

function currentInput() { return CHALLENGES[ruleIndex][challengeIndex]; }
function currentRule() { return RULES[ruleIndex]; }

function resetRound() {
  prediction = null;
  revealed = false;
  animT = 0;
  predictionCorrect = false;
  inputBox.value('');
  statusMsg = 'Type your predicted output, then press Predict.';
}

function lockPrediction() {
  let v = parseFloat(inputBox.value());
  if (isNaN(v)) {
    statusMsg = 'Enter a number first (e.g. 7 or -0.5).';
    return;
  }
  prediction = v;
  statusMsg = 'Prediction locked: ' + v + '. Press Reveal to run the machine.';
}

function startReveal() {
  if (prediction === null) {
    statusMsg = 'Lock a prediction first!';
    return;
  }
  revealed = true;
  animT = 0;
  revealTime = millis();
  let actual = currentRule().fn(currentInput());
  predictionCorrect = abs(actual - prediction) < 0.01;
}

function nextChallenge() {
  challengeIndex = (challengeIndex + 1) % CHALLENGES[ruleIndex].length;
  resetRound();
}

function fmt(v) {
  return (Math.round(v * 1000) / 1000).toString();
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

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Function Machine', canvasWidth / 2, 10);

  let boxW = min(260, canvasWidth * 0.36);
  let boxH = 130;
  let boxX = canvasWidth / 2 - boxW / 2;
  let boxY = 130;
  let chuteY = boxY + boxH / 2;

  // input chute (left) and output chute (right), cyan-blue
  stroke(CYAN);
  strokeWeight(14);
  line(margin + 20, chuteY, boxX, chuteY);
  line(boxX + boxW, chuteY, canvasWidth - margin - 20, chuteY);
  noStroke();
  fill('black');
  textSize(20);
  textAlign(CENTER, BOTTOM);
  text('x', margin + 45, chuteY - 14);
  text('f(x)', canvasWidth - margin - 55, chuteY - 14);

  // machine body, maroon
  stroke('black');
  strokeWeight(2);
  fill(MAROON);
  rect(boxX, boxY, boxW, boxH, 14);
  noStroke();
  fill('white');
  textSize(21);
  textAlign(CENTER, CENTER);
  text(currentRule().label, boxX + boxW / 2, boxY + boxH / 2);

  // current input chip on left chute
  let inputVal = currentInput();
  let chipX = margin + 45;
  if (revealed) {
    // animate chip traveling to the machine
    if (animT < 1) animT += 0.02;
    chipX = lerp(margin + 45, boxX + boxW / 2, min(animT * 2, 1));
  }
  if (!revealed || animT < 0.5) {
    stroke(MAROON);
    strokeWeight(2);
    fill('white');
    circle(chipX, chuteY, 40);
    noStroke();
    fill('black');
    textSize(18);
    textAlign(CENTER, CENTER);
    text(inputVal, chipX, chuteY - 1);
  }

  // three-stage display: raw input, substituted expression, simplified output
  let stageY = 300;
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  let thirdW = canvasWidth / 3;
  fill(100);
  text('Input', thirdW * 0.5, stageY);
  text('Substituted', thirdW * 1.5, stageY);
  text('Output', thirdW * 2.5, stageY);

  textSize(22);
  fill('black');
  text(inputVal, thirdW * 0.5, stageY + 25);
  if (revealed && animT > 0.4) {
    text(currentRule().sub(inputVal), thirdW * 1.5, stageY + 25);
  } else {
    fill(180);
    text('?', thirdW * 1.5, stageY + 25);
  }
  if (revealed && animT > 0.8) {
    let actual = currentRule().fn(inputVal);
    if (predictionCorrect) {
      // gold flash for a correct prediction
      let alpha = 150 + 105 * sin((millis() - revealTime) / 120);
      fill(255, 200, 0, alpha);
      circle(thirdW * 2.5, stageY + 38, 60);
    }
    fill(predictionCorrect ? MAROON : 'black');
    text(fmt(actual), thirdW * 2.5, stageY + 25);
    // verdict
    textSize(17);
    fill(predictionCorrect ? 'green' : MAROON);
    text(predictionCorrect ? 'Correct prediction!' :
         'Your prediction: ' + prediction, canvasWidth / 2, stageY + 62);
  } else {
    fill(180);
    text('?', thirdW * 2.5, stageY + 25);
  }

  // status line
  noStroke();
  fill(80);
  textSize(15);
  textAlign(CENTER, TOP);
  text(statusMsg, canvasWidth / 2, 62);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Prediction:', 10, drawHeight + 20);
  text('Rule:', 10, drawHeight + 57);
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
