// Daylight Hours by Latitude MicroSim
// CANVAS_HEIGHT: 522
// A sinusoidal daylight model whose amplitude grows with latitude while the
// midline stays pinned at 12 hours.
// Bloom's Level: Analyze — amplitude and midline are independent parameters.
// MicroSim template version 2026.03

let containerWidth;
let canvasWidth = 1000;
let drawHeight = 440;
let controlHeight = 80; // 2 rows: latitude slider, compare button + preset checkbox
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

const MAROON = '#800020';
const GOLD = '#d1a017';
const TILT = 23.44 * Math.PI / 180;

let latSlider;
let compareButton;
let threeCurvesCheckbox;
let compareLat = null;

let plotLeft, plotTop, plotW, plotH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  latSlider = createSlider(-66, 66, 45, 1);
  latSlider.parent(mainElement);
  latSlider.position(sliderLeftMargin, drawHeight + 10);
  latSlider.size(canvasWidth - sliderLeftMargin - margin);

  compareButton = createButton('Compare two latitudes');
  compareButton.parent(mainElement);
  compareButton.position(10, drawHeight + 43);
  compareButton.mousePressed(() => {
    compareLat = compareLat === null ? latSlider.value() : null;
    compareButton.html(compareLat === null ? 'Compare two latitudes' : 'Clear comparison');
  });

  threeCurvesCheckbox = createCheckbox('Show equator, 45°, and 66° together', false);
  threeCurvesCheckbox.parent(mainElement);
  threeCurvesCheckbox.position(200, drawHeight + 45);

  describe('Plot of daylight hours across the year for a chosen latitude. The gold midline stays at twelve hours while the amplitude of the maroon sinusoid grows from zero at the equator to over ten hours near the polar circles.', LABEL);
}

// sinusoidal daylight model: 12 + amp(lat) * sin(2π(day − 80)/365)
function amplitude(latDeg) {
  let phi = latDeg * Math.PI / 180;
  let x = Math.tan(phi) * Math.tan(TILT);
  x = constrain(x, -0.999, 0.999);
  return (24 / Math.PI) * Math.asin(x) / 2; // half peak-to-peak swing about 12h
}

function daylight(latDeg, day) {
  return 12 + amplitude(latDeg) * Math.sin(TWO_PI * (day - 80) / 365);
}

function toSX(day) { return map(day, 0, 365, plotLeft, plotLeft + plotW); }
function toSY(hrs) { return map(hrs, 0, 24, plotTop + plotH, plotTop); }

function plotLatCurve(latDeg, col, weight) {
  stroke(col);
  strokeWeight(weight);
  noFill();
  beginShape();
  for (let d = 0; d <= 365; d += 2) {
    vertex(toSX(d), toSY(daylight(latDeg, d)));
  }
  endShape();
  noStroke();
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

  plotLeft = margin + 30;
  plotTop = 48;
  plotW = canvasWidth - plotLeft - margin - 190;
  plotH = drawHeight - 120;

  let lat = latSlider.value();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Daylight Hours Across the Year', canvasWidth / 2, 4);

  // grid + axes
  stroke(226);
  strokeWeight(1);
  for (let h = 0; h <= 24; h += 6) line(plotLeft, toSY(h), plotLeft + plotW, toSY(h));
  stroke('black');
  strokeWeight(1.5);
  line(plotLeft, plotTop + plotH, plotLeft + plotW, plotTop + plotH);
  line(plotLeft, plotTop, plotLeft, plotTop + plotH);
  noStroke();
  fill(90);
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let h = 0; h <= 24; h += 6) text(h + 'h', plotLeft - 4, toSY(h));

  // key date labels
  const DATES = [[80, 'Mar equinox'], [172, 'Jun solstice'], [266, 'Sep equinox'], [355, 'Dec solstice']];
  textAlign(CENTER, TOP);
  for (let [d, lbl] of DATES) {
    stroke(210);
    strokeWeight(1);
    line(toSX(d), plotTop, toSX(d), plotTop + plotH);
    noStroke();
    fill(90);
    text(lbl, toSX(d), plotTop + plotH + 6);
  }

  // midline at 12 hours
  stroke(GOLD);
  strokeWeight(2.5);
  drawingContext.setLineDash([8, 6]);
  line(plotLeft, toSY(12), plotLeft + plotW, toSY(12));
  drawingContext.setLineDash([]);
  noStroke();
  fill(GOLD);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('midline: 12 hours (never moves!)', plotLeft + 6, toSY(12) - 4);

  // curves
  if (threeCurvesCheckbox.checked()) {
    plotLatCurve(0, color(120, 160, 120), 2);
    plotLatCurve(45, color(90, 120, 200), 2);
    plotLatCurve(66, color(200, 120, 60), 2);
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    fill(120, 160, 120); text('equator (0°): flat', plotLeft + plotW - 150, plotTop + 6);
    fill(90, 120, 200); text('45°: moderate swing', plotLeft + plotW - 150, plotTop + 24);
    fill(200, 120, 60); text('66°: extreme swing', plotLeft + plotW - 150, plotTop + 42);
  }
  if (compareLat !== null && compareLat !== lat) {
    plotLatCurve(compareLat, color(90, 90, 90), 2);
    noStroke();
    fill(90);
    textSize(13);
    textAlign(LEFT, TOP);
    text('gray: ' + compareLat + '°', plotLeft + 8, plotTop + 6);
  }
  plotLatCurve(lat, MAROON, 3);

  // readout panel
  let amp = amplitude(lat);
  let panX = plotLeft + plotW + 20;
  let panW = canvasWidth - panX - margin;
  stroke(200);
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(panX, plotTop, panW, 210, 10);
  noStroke();
  fill(MAROON);
  textSize(15);
  textAlign(LEFT, TOP);
  text('Latitude: ' + lat + '°', panX + 12, plotTop + 10);
  fill('black');
  textSize(14);
  text('Amplitude = ' + nf(abs(amp), 0, 1) + ' h', panX + 12, plotTop + 38);
  text('Peak daylight = ' + nf(12 + abs(amp), 0, 1) + ' h', panX + 12, plotTop + 62);
  text('Min daylight = ' + nf(12 - abs(amp), 0, 1) + ' h', panX + 12, plotTop + 86);
  fill(MAROON);
  textSize(13);
  text('Model:\nD(t) = 12 + ' + nf(amp, 0, 1) + ' sin(2π(t − 80)/365)',
       panX + 12, plotTop + 116, panW - 24, 80);

  // control labels
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Latitude: ' + lat + '°', 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  latSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
