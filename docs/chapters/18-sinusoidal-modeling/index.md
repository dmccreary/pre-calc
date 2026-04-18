---
title: Sinusoidal Modeling
description: Applying sinusoidal functions to model real-world periodic phenomena including tides, temperatures, and daylight hours, with sinusoidal regression and techniques for extracting period and amplitude from data.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 21:20:00
version: 0.07
---

# Sinusoidal Modeling

## Summary

This chapter applies sinusoidal functions to model real-world periodic phenomena. Students learn to graph trigonometric transformations, build sinusoidal models from data, and analyze periodic data. The chapter features real-world applications including tidal models, temperature models, and daylight hour models. Students also learn sinusoidal regression techniques and how to extract period and amplitude from data sets.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Graphing Trig Transformations
2. Sinusoidal Modeling
3. Periodic Data Analysis
4. Tidal Models
5. Temperature Models
6. Daylight Hour Models
7. Sinusoidal Regression
8. Period from Data
9. Amplitude from Data

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Function Transformations](../09-function-transformations/index.md)
- [Chapter 10: Data Modeling and Regression](../10-data-modeling-and-regression/index.md)
- [Chapter 17: Trigonometric Graphs](../17-trigonometric-graphs/index.md)

---

!!! mascot-welcome "Math That Matches the World"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Tides rise and fall twice a day. Temperatures peak in summer and bottom out in winter. Daylight hours grow and shrink on a yearly cycle. These rhythms look like the sine graphs we just studied — and that's no coincidence. In this chapter we turn periodic real-world data into sinusoidal equations.

## Why Sinusoidal Models Matter

Many natural processes oscillate smoothly between a high and low value on a fixed schedule. Whenever that schedule is predictable and the transition between extremes is smooth rather than jagged, a **sinusoidal model** — a function of the form \( y = A\sin(B(t - C)) + D \) or \( y = A\cos(B(t - C)) + D \) — captures the pattern remarkably well.

Here are some phenomena that sinusoidal models describe accurately:

- **Ocean tides** rising and falling about every 12 hours.
- **Daily and yearly temperatures** cycling between cold and hot.
- **Hours of daylight** lengthening and shortening with the seasons.
- **Blood pressure** oscillating with the heartbeat.
- **Mechanical vibrations**, such as a mass on a spring or a pendulum swinging.
- **Sound waves**, which add together into the tones we hear.
- **Alternating-current voltage** in a household outlet.

In every case, a student with the right modeling skills can look at a data set, extract the four parameters of a sinusoidal function, and write down an equation that predicts future values.

## Graphing Trig Transformations

Before we can fit models to data, we need fluency with the four transformations from Chapter 17. The general form of a sinusoidal function is:

\[ y = A\sin(B(t - C)) + D \]

Each parameter controls one feature of the graph:

| Parameter | Role | Effect |
|---|---|---|
| \( A \) | Amplitude | Vertical stretch; \( |A| \) is half the distance from max to min |
| \( B \) | Angular frequency | Horizontal compression; period is \( 2\pi/|B| \) |
| \( C \) | Phase shift | Horizontal translation; shifts graph right by \( C \) |
| \( D \) | Vertical shift | Vertical translation; midline is \( y = D \) |

**Graphing procedure for \( y = A\sin(B(t - C)) + D \):**

1. Draw the midline \( y = D \) as a horizontal reference line.
2. Mark the maximum at \( y = D + |A| \) and minimum at \( y = D - |A| \).
3. Compute the period \( T = 2\pi/|B| \).
4. Starting at \( t = C \), place five key points spaced one-quarter period apart: zero, max, zero, min, zero.
5. Connect the five points with a smooth sine curve and extend as needed.

For a cosine function, the five key points at \( t = C, C + T/4, C + T/2, C + 3T/4, C + T \) are max, zero, min, zero, max instead.

## Sinusoidal Modeling

**Sinusoidal modeling** is the process of finding the four parameters \( A, B, C, D \) that make the model match a given data set or scenario. The procedure follows the same four quantities in a specific order:

1. **Find the midline \( D \)** — average of the maximum and minimum values.
2. **Find the amplitude \( A \)** — half of the max-minus-min distance.
3. **Find the period \( T \)** — time from one peak to the next peak — then compute \( B = 2\pi/T \).
4. **Find the phase shift \( C \)** — choose \( C \) so the model matches the data at a reference time, typically by aligning a peak or a midline crossing.

We will walk through this procedure concretely in each of the three application sections below.

#### Diagram: Sinusoidal Model Builder

<iframe src="../../sims/sinusoidal-model-builder/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sinusoidal Model Builder</summary>
Type: microsim
**sim-id:** sinusoidal-model-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, construct): Construct a sinusoidal function that fits a given set of data points by adjusting the four parameters \( A, B, C, D \).

Canvas layout:
- Top (70%): scatter plot of data points overlaid with the student's current sinusoidal curve
- Bottom (30%): four sliders for A, B, C, D and a computed equation display

Visual elements:
- Scattered data points as blue circles
- Current model curve drawn in maroon
- Horizontal gold dashed midline at \( y = D \)
- Vertical dashed lines at peaks and troughs of the current model
- Sum-of-squared-errors number displayed as feedback

Interactive controls:
- Slider A: amplitude, range 0 to 20, step 0.1
- Slider B: angular frequency, range 0.1 to 3, step 0.05
- Slider C: phase shift, range 0 to 24, step 0.25
- Slider D: vertical shift, range 0 to 100, step 0.5
- Dropdown: choose a preset data set (tide, temperature, daylight)
- Button: "Show best fit" to reveal the regression answer

Data Visibility Requirements:
- Stage 1: Show current A, B, C, D values
- Stage 2: Show computed period \( T = 2\pi/B \) and the equation in full
- Stage 3: Show sum-of-squared-errors updating in real time
- Stage 4: On "Show best fit," show the target parameters and the error they achieve

Instructional Rationale: Manually adjusting parameters builds intuition about what each one controls before a regression tool hides that reasoning behind a button. The real-time error readout gives immediate feedback without showing the answer prematurely.

Implementation: p5.js with responsive canvas.
</details>

## Periodic Data Analysis

Before you fit a sinusoidal model, check that your data actually behaves periodically. **Periodic data analysis** is the first-pass inspection that asks three questions:

- **Does the data oscillate?** Plot it. If it trends steadily up or down without returning to prior values, it is not periodic.
- **Is the oscillation regular?** Identify successive peaks. If the gaps between peaks are roughly equal, the data has a consistent period.
- **Are the peaks and troughs roughly level?** Consecutive peaks should reach similar heights, and consecutive troughs should reach similar depths. If the swings grow or shrink over time, a pure sinusoidal model will not fit well.

If the data passes all three checks, we can move on to extracting numerical values for \( A, B, C, D \).

## Amplitude from Data

Extracting the **amplitude from data** is a two-step calculation once you have identified the maximum and minimum observed values:

\[ A = \frac{y_{\max} - y_{\min}}{2} \]

For example, suppose a tide gauge records a maximum height of 9.4 feet and a minimum of 1.6 feet. Then:

\[ A = \frac{9.4 - 1.6}{2} = \frac{7.8}{2} = 3.9 \text{ feet} \]

The midline follows from the same two numbers:

\[ D = \frac{y_{\max} + y_{\min}}{2} = \frac{9.4 + 1.6}{2} = 5.5 \text{ feet} \]

So tides swing 3.9 feet above and below an average level of 5.5 feet.

## Period from Data

The **period from data** is the elapsed time between corresponding features that repeat — for example, between two consecutive high tides or between two consecutive summer solstices. Once you have the period \( T \), the angular frequency follows:

\[ B = \frac{2\pi}{T} \]

Some rules of thumb help extract a reliable period:

- Measure peak-to-peak or trough-to-trough, not peak-to-trough (that gives half the period).
- Average several cycles if the data is noisy — one cycle alone may be off by a small amount that compounds when you extrapolate.
- Match the units: if \( t \) is measured in hours, then \( T \) is in hours and \( B \) is in radians per hour.

## Tidal Models

Tides are the most classic sinusoidal model because the moon's gravitational pull is extremely regular. A typical coastal location experiences two high tides and two low tides per day — a semi-diurnal pattern with a period of roughly 12.4 hours.

Let's build a tidal model for a harbor with the following measurements:

- High tide of 9.4 feet at 3:00 AM (\( t = 3 \))
- Low tide of 1.6 feet at 9:12 AM (\( t \approx 9.2 \))
- Period of about 12.4 hours

Applying the four-step procedure:

1. **Midline:** \( D = (9.4 + 1.6)/2 = 5.5 \) feet
2. **Amplitude:** \( A = (9.4 - 1.6)/2 = 3.9 \) feet
3. **Period:** \( T = 12.4 \) hours, so \( B = 2\pi/12.4 \approx 0.507 \) rad/hr
4. **Phase shift:** high tide at \( t = 3 \), so a cosine model (which peaks at \( t = C \)) gives \( C = 3 \) hours

The resulting tidal model is:

\[ h(t) = 3.9 \cos\left(\frac{2\pi}{12.4}(t - 3)\right) + 5.5 \]

This predicts the water height \( h(t) \) in feet at time \( t \) hours after midnight. You can read off the model's prediction for any time — say, 6 AM — by substituting \( t = 6 \).

!!! mascot-tip "Sine or Cosine — Which to Pick?"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema offering a tip">
    Use **cosine** when you know a peak time — set \( C \) equal to that time. Use **sine** when you know a midline-crossing time where the curve is going up. Either choice leads to the same model, just with different bookkeeping.

## Temperature Models

Temperature data comes in two flavors: daily temperatures (peaking in mid-afternoon, bottoming before dawn, period of 24 hours) and yearly temperatures (peaking in summer, bottoming in winter, period of 365 days). Both are modeled with the same four-step procedure.

**Yearly temperature example.** Consider a city with an average daily high that peaks at 88°F in late July (day 208 of the year) and bottoms at 28°F in late January (day 26). The period is 365 days.

Here are the parameter calculations organized in a table:

| Step | Quantity | Calculation | Value |
|---|---|---|---|
| 1 | Midline \( D \) | \( (88 + 28)/2 \) | 58°F |
| 2 | Amplitude \( A \) | \( (88 - 28)/2 \) | 30°F |
| 3 | Period \( T \), then \( B \) | \( T = 365 \), \( B = 2\pi/365 \) | \( B \approx 0.0172 \) rad/day |
| 4 | Phase shift \( C \) | Peak at day 208 → use cosine with \( C = 208 \) | 208 days |

The resulting temperature model is:

\[ T(d) = 30 \cos\left(\frac{2\pi}{365}(d - 208)\right) + 58 \]

where \( T(d) \) is the average daily high temperature in degrees Fahrenheit on day \( d \) of the year.

!!! mascot-warning "Average Highs vs. Actual Highs"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    A sinusoidal temperature model predicts the **average** daily high for a given day of the year, not the actual high for any specific year. Real weather adds noise and anomalies on top of the seasonal cycle.

## Daylight Hour Models

The number of daylight hours at a given latitude varies sinusoidally with the time of year, peaking on the summer solstice (around day 172) and bottoming on the winter solstice (around day 355).

For a location at about 45° north latitude, the daylight pattern might be:

- Maximum daylight on day 172: 15.4 hours
- Minimum daylight on day 355 (or day -10, equivalently): 8.6 hours
- Period: 365 days

Applying the procedure:

1. \( D = (15.4 + 8.6)/2 = 12.0 \) hours
2. \( A = (15.4 - 8.6)/2 = 3.4 \) hours
3. \( B = 2\pi/365 \approx 0.0172 \) rad/day
4. Peak at day 172 → \( C = 172 \)

The daylight model is:

\[ L(d) = 3.4 \cos\left(\frac{2\pi}{365}(d - 172)\right) + 12.0 \]

Notice the midline of exactly 12 hours. Over an entire year, the average daylight is always 12 hours at every latitude — what changes with latitude is the amplitude (large at the poles, zero at the equator).

#### Diagram: Daylight Hours by Latitude

<iframe src="../../sims/daylight-hours-by-latitude/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Daylight Hours by Latitude</summary>
Type: microsim
**sim-id:** daylight-hours-by-latitude<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Analyze, L4, examine): Examine how the amplitude of a sinusoidal daylight model changes with latitude while the midline stays constant at 12 hours.

Canvas layout:
- Top (70%): plot of daylight hours vs. day of year with the curve for the current latitude
- Bottom (30%): latitude slider and a compass / globe icon

Visual elements:
- Sinusoidal curve drawn in maroon
- Horizontal gold line at \( y = 12 \) hours (midline)
- Labels at key dates: March equinox, June solstice, September equinox, December solstice
- Numeric readout of current amplitude and peak daylight hours

Interactive controls:
- Slider: latitude, range -66° to +66° (south to north, excluding polar circle extremes)
- Button: "Compare two latitudes" to overlay a second curve
- Toggle: show equator (amplitude 0), a mid-latitude, and arctic circle simultaneously

Data Visibility Requirements:
- Stage 1: Show current latitude in degrees
- Stage 2: Show computed amplitude (function of latitude)
- Stage 3: Show peak daylight and minimum daylight values
- Stage 4: Show the model equation for the current latitude

Instructional Rationale: Sweeping the latitude slider lets the learner watch amplitude grow from zero at the equator to very large values near the polar circles while the midline never moves. This isolates the pedagogical point that amplitude and midline are independent parameters.

Implementation: p5.js with responsive canvas.
</details>

## Sinusoidal Regression

When data is noisy or when no single pair of extremes is obvious, **sinusoidal regression** finds the best-fit sinusoidal function by minimizing the sum of squared residuals — the same least-squares idea from Chapter 10. Most graphing calculators provide a built-in `SinReg` command, and Desmos offers sinusoidal regression with a one-line expression like `y_1 ~ A sin(B x_1 - C) + D`.

Before we run a regression, we need to give the tool reasonable starting values for the parameters. The calculator cannot reliably find the answer from nothing — it searches nearby the initial guess. Here are good starting guesses you can always use:

- Start with \( D \) equal to the average of all \( y \)-values.
- Start with \( A \) equal to half the range of \( y \)-values.
- Start with \( B = 2\pi/T_{\text{estimated}} \) from visual inspection of the peaks.
- Start with \( C \) equal to the \( t \)-value of the first peak in the data.

The regression then refines all four parameters to minimize error across every data point simultaneously.

Here is the comparison of manual modeling vs. regression:

| Approach | Strengths | Weaknesses |
|---|---|---|
| Manual four-step | Easy to explain; works with limited data | Sensitive to the single max/min values you choose |
| Sinusoidal regression | Uses all data points; minimizes total error | Requires good starting parameters; may fail on noisy data |

In AP Pre-Calculus, you will often do both: use manual methods to find starting parameters, then run sinusoidal regression to refine them.

!!! mascot-encourage "Models Are Approximations, Not Truth"
    <img src="../../img/mascot/encourage.png" class="mascot-admonition-img" alt="Prema encouraging">
    No sinusoidal model matches real data exactly — real tides, temperatures, and daylight hours all have irregularities. The goal is not a perfect fit but a model accurate enough to make useful predictions. When your model and the data agree within a few percent, that is a win.

## Key Takeaways

- Sinusoidal models \( y = A\sin(B(t - C)) + D \) describe any smooth oscillation between fixed high and low values with a fixed period.
- The four-step modeling procedure finds \( D \) (midline), \( A \) (amplitude), \( B \) (from period), and \( C \) (phase shift) in that order.
- Tides, daily and yearly temperatures, and daylight hours all fit the sinusoidal framework.
- Amplitude from data: \( A = (y_{\max} - y_{\min})/2 \). Midline: \( D = (y_{\max} + y_{\min})/2 \).
- Period from data: peak-to-peak distance. Then \( B = 2\pi/T \).
- Sinusoidal regression refines a manually-found model by minimizing squared error across all data points.
