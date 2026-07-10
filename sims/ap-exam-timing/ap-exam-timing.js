// AP Exam Timing Planner MicroSim
// CANVAS_HEIGHT: 622
// Budget per-question time across the four AP Precalculus exam sections and
// see the running totals, warnings, and a rough readiness estimate.
// Bloom's Level: Evaluate — prioritize sections and plan a time budget.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 120; // 3 rows: two slider pairs + strategy row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

const MAROON = '#800020';
const CYAN = '#00BFFF';
const GOLD = '#d1a017';

// AP Precalculus exam structure
const SECTIONS = [
  { name: 'I-A: MC no calc', questions: 28, minutes: 80, weight: 43.75, calc: false },
  { name: 'I-B: MC calculator', questions: 12, minutes: 40, weight: 18.75, calc: true },
  { name: 'II-A: FR calculator', questions: 2, minutes: 30, weight: 18.75, calc: true },
  { name: 'II-B: FR no calc', questions: 2, minutes: 30, weight: 18.75, calc: false }
];

let sliders = [];
let skipCheckbox;
let strategySelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  // per-question minute sliders (defaults = even split)
  let defaults = [2.9, 3.3, 15, 15];
  let maxes = [5, 6, 22, 22];
  for (let i = 0; i < 4; i++) {
    let s = createSlider(0.5, maxes[i], defaults[i], 0.1);
    s.parent(mainElement);
    sliders.push(s);
  }
  positionSliders();

  skipCheckbox = createCheckbox('Skip hardest 2 MC questions in I-A', false);
  skipCheckbox.parent(mainElement);
  skipCheckbox.position(10, drawHeight + 82);

  strategySelect = createSelect();
  strategySelect.parent(mainElement);
  strategySelect.position(300, drawHeight + 80);
  ['choose a strategy…', 'conservative', 'balanced', 'aggressive'].forEach(o => strategySelect.option(o));
  strategySelect.changed(() => {
    let v = strategySelect.value();
    if (v === 'conservative') [2.5, 3.0, 13, 13].forEach((m, i) => sliders[i].value(m));
    if (v === 'balanced') [2.9, 3.3, 15, 15].forEach((m, i) => sliders[i].value(m));
    if (v === 'aggressive') [3.3, 3.8, 17, 17].forEach((m, i) => sliders[i].value(m));
  });

  describe('Horizontal timeline of the four AP Precalculus exam sections with bars proportional to their minutes. Sliders set a per-question time budget for each section; the display shows running totals, over-budget warnings, and a rough readiness estimate.', LABEL);
}

function positionSliders() {
  let half = canvasWidth / 2;
  let sw = max(100, half - 210);
  sliders[0].position(130, drawHeight + 10);
  sliders[0].size(sw);
  sliders[1].position(130, drawHeight + 45);
  sliders[1].size(sw);
  sliders[2].position(half + 130, drawHeight + 10);
  sliders[2].size(sw);
  sliders[3].position(half + 130, drawHeight + 45);
  sliders[3].size(sw);
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
  text('AP Precalculus Exam: Time-Budget Planner', canvasWidth / 2, 6);

  let totalMinutes = SECTIONS.reduce((s, x) => s + x.minutes, 0);
  let barY = 70;
  let barH = 90;
  let barX = margin;
  let barW = canvasWidth - 2 * margin;

  // timeline bars
  let x = barX;
  for (let i = 0; i < 4; i++) {
    let S = SECTIONS[i];
    let w = S.minutes / totalMinutes * barW;
    stroke('black');
    strokeWeight(1.5);
    fill(S.calc ? color(214, 232, 248) : color(248, 232, 214));
    rect(x, barY, w, barH, 6);
    // per-question ticks
    stroke(160);
    strokeWeight(1);
    let qs = skipCheckbox.checked() && i === 0 ? S.questions - 2 : S.questions;
    for (let q = 1; q < min(qs, 30); q++) {
      let tx = x + q * w / qs;
      line(tx, barY + barH - 14, tx, barY + barH);
    }
    noStroke();
    fill('black');
    textSize(13);
    textAlign(CENTER, TOP);
    text(S.name, x + w / 2, barY + 8);
    textSize(11);
    text(S.questions + ' Qs • ' + S.minutes + ' min', x + w / 2, barY + 28);
    text(S.weight + '% of score', x + w / 2, barY + 44);
    fill(S.calc ? color(30, 90, 160) : color(160, 90, 30));
    text(S.calc ? 'calculator' : 'NO calculator', x + w / 2, barY + 60);
    x += w;
  }

  // legend
  noStroke();
  fill(214, 232, 248);
  stroke(150);
  rect(barX, barY + barH + 12, 16, 14, 3);
  fill(248, 232, 214);
  rect(barX + 130, barY + barH + 12, 16, 14, 3);
  noStroke();
  fill(80);
  textSize(13);
  textAlign(LEFT, CENTER);
  text('calculator allowed', barX + 22, barY + barH + 19);
  text('no calculator', barX + 152, barY + barH + 19);

  // budget analysis per section
  let anaY = barY + barH + 48;
  let readiness = 0;
  for (let i = 0; i < 4; i++) {
    let S = SECTIONS[i];
    let perQ = sliders[i].value();
    let qs = skipCheckbox.checked() && i === 0 ? S.questions - 2 : S.questions;
    let effMinutes = S.minutes;
    let used = perQ * qs;
    let over = used > effMinutes;
    let rowY = anaY + i * 32;
    noStroke();
    fill(over ? color(250, 220, 220) : color(222, 242, 222));
    rect(margin, rowY, canvasWidth - 2 * margin, 26, 6);
    fill(over ? color(150, 0, 0) : color(0, 110, 0));
    textSize(14);
    textAlign(LEFT, CENTER);
    text(S.name + ':  ' + nf(perQ, 0, 1) + ' min/question × ' + qs + ' = ' +
         nf(used, 0, 0) + ' of ' + effMinutes + ' min' +
         (over ? '  — OVER BUDGET by ' + nf(used - effMinutes, 0, 0) + ' min!' :
          '  (' + nf(effMinutes - used, 0, 0) + ' min spare for review)'),
         margin + 12, rowY + 13);
    // crude readiness: full credit when time fits and perQ is at least the even split
    let evenSplit = S.minutes / S.questions;
    let quality = constrain(perQ / evenSplit, 0.4, 1.05);
    if (over) quality *= 0.75;
    readiness += S.weight * quality * 0.75; // assume ~75% accuracy with adequate time
  }

  // warnings + estimate
  let warnY = anaY + 4 * 32 + 10;
  let mcPerQ = sliders[0].value();
  noStroke();
  if (mcPerQ < 1) {
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text('⚠ Under one minute per multiple-choice question in Section I-A — that pace makes careless errors almost certain.',
         margin, warnY, canvasWidth - 2 * margin, 40);
  } else {
    fill(MAROON);
    textSize(15);
    textAlign(LEFT, TOP);
    text('Rough readiness estimate: ' + nf(readiness, 0, 0) +
         ' / 100 weighted points. (Rule-of-thumb only — adequate time per question × section weight.)',
         margin, warnY, canvasWidth - 2 * margin, 40);
  }

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('I-A: ' + nf(sliders[0].value(), 0, 1) + ' m/Q', 10, drawHeight + 20);
  text('I-B: ' + nf(sliders[1].value(), 0, 1) + ' m/Q', 10, drawHeight + 55);
  text('II-A: ' + nf(sliders[2].value(), 0, 1) + ' m/Q', canvasWidth / 2 + 10, drawHeight + 20);
  text('II-B: ' + nf(sliders[3].value(), 0, 1) + ' m/Q', canvasWidth / 2 + 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
