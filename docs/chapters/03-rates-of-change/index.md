---
title: Rates of Change
description: How quantities change together — average rate of change, slope, secant lines, units, linear vs. nonlinear rates, and concavity inferred from rate behavior.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:32:00
version: 0.07
---

# Rates of Change

## Summary

This chapter explores how two quantities change together, a foundational idea for understanding all function types. Students learn about average rate of change, slope, the slope formula, secant lines, and rate of change units. The chapter distinguishes between linear and nonlinear rates of change, introduces concavity from rates, and examines increasing and decreasing rates of change. These concepts prepare students to analyze and compare function behaviors throughout the course.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Change in Tandem
2. Average Rate of Change
3. Slope
4. Slope Formula
5. Rate of Change Units
6. Secant Line
7. Linear Rate of Change
8. Nonlinear Rate of Change
9. Concavity from Rates
10. Increasing Rate of Change
11. Decreasing Rate of Change

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)

---

!!! mascot-welcome "Functions in Motion"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Chapter 2 gave us the vocabulary for describing a single function; this chapter watches functions *move*. Every real-world model — speed, growth, decay, interest — is really a story about how fast an output changes when the input changes. Let's learn to measure that rate.

## Change in Tandem

Whenever two quantities are linked by a function, they **change in tandem**. The independent variable changes, and the dependent variable responds. A car travels farther as time passes; a balloon's volume grows as more air is pumped in; the temperature of a cup of coffee drops as minutes go by. In each case, one quantity drives the other, and the two move together in a predictable way.

The central question of this chapter is not merely "did the output change?" but "*how fast* did it change?" Answering that question quantitatively is what separates casual observation ("it got warmer") from useful prediction ("it warmed 2 °C per hour, so by noon it will be 24 °C"). Rates of change are the bridge between raw function values and meaningful statements about the world.

A handful of real-world situations illustrate the range of problems a rate of change can answer:

- A car's position versus time → speed (miles per hour)
- A tank's water level versus time → fill rate (gallons per minute)
- A bank balance versus years → interest growth (dollars per year)
- A town's population versus years → growth rate (people per year)

Every one of these is a ratio: some change in the output divided by some change in the input.

## Average Rate of Change

When a function \( f \) moves from input \( x_1 \) to input \( x_2 \), the output changes from \( f(x_1) \) to \( f(x_2) \). The **average rate of change** of \( f \) over the interval \( [x_1, x_2] \) is the ratio of the change in output to the change in input:

\[ \text{Average Rate of Change} = \frac{f(x_2) - f(x_1)}{x_2 - x_1} \]

The numerator \( f(x_2) - f(x_1) \) is often written \( \Delta y \), read "change in \( y \)." The denominator \( x_2 - x_1 \) is \( \Delta x \), "change in \( x \)." The Greek letter \( \Delta \) (delta) is pronounced "delta" and means "the change in." Using this shorthand, the formula becomes the clean ratio \( \Delta y / \Delta x \).

To see the idea in action, suppose \( f(x) = x^2 \) and we want the average rate of change between \( x = 1 \) and \( x = 4 \). We compute the two outputs, find their difference, and divide:

\[ \frac{f(4) - f(1)}{4 - 1} = \frac{16 - 1}{3} = \frac{15}{3} = 5 \]

Over the interval \( [1, 4] \), the function gained 5 units of output for every 1 unit of input. That number summarizes three units of horizontal travel into a single rate.

Note the word "average." The function may have been changing faster than 5 at some moments and slower at others; the average smooths all that variability into one representative number. Measuring the *instantaneous* rate — the rate at a single point — is the job of calculus, not pre-calculus. In this course, we will always be computing averages over some interval.

## Slope and the Slope Formula

For a straight line, the average rate of change is especially simple: it is the same no matter which interval you pick. We give this invariant rate a special name, the **slope**, and denote it \( m \). The slope formula is just the average rate of change formula applied to two points on the line:

\[ m = \frac{y_2 - y_1}{x_2 - x_1} \]

Given any two points \( (x_1, y_1) \) and \( (x_2, y_2) \) on a line, the slope formula produces the line's single constant rate. If the points are \( (2, 3) \) and \( (6, 11) \), then:

\[ m = \frac{11 - 3}{6 - 2} = \frac{8}{4} = 2 \]

Every step of 1 to the right produces a rise of 2. Slope is sometimes memorized as "rise over run" — *rise* is the vertical change, *run* is the horizontal change.

The sign of the slope tells you the direction of the line, using the vocabulary from Chapter 2:

| Slope | Direction | Chapter 2 term |
|-------|-----------|----------------|
| \( m > 0 \) | Line rises left to right | Increasing |
| \( m < 0 \) | Line falls left to right | Decreasing |
| \( m = 0 \) | Line is horizontal | Constant |
| Undefined | Line is vertical | Not a function |

## Rate of Change Units

A rate of change is not just a number — it is a number with **units**. The units come from dividing the output units by the input units, so a rate of change always reads "output-unit per input-unit."

- If distance is in miles and time is in hours, the rate has units of *miles per hour* (mph).
- If volume is in gallons and time is in minutes, the rate has units of *gallons per minute* (gpm).
- If cost is in dollars and quantity is in items, the rate has units of *dollars per item*.

Including units is not bookkeeping — it is what makes the rate meaningful. "The rate is 60" tells you nothing; "the rate is 60 miles per hour" tells you what to expect after one more hour. On the AP exam, free-response answers frequently lose points when a student reports a correct number without the correct units.

!!! mascot-tip "The Fraction Tells the Units"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    If you ever forget the units of a rate, look at the fraction that defined it. The numerator's units go on top, the denominator's units go on bottom, and you read it "top per bottom." Miles divided by hours gives miles per hour. Simple division, simple units.

## The Secant Line

Average rate of change has a visual counterpart on the coordinate plane: the slope of a particular line connecting two points on the graph. That line is called a **secant line**.

A secant line through the points \( (x_1, f(x_1)) \) and \( (x_2, f(x_2)) \) is just the straight line connecting them. Its slope, calculated from the slope formula, equals the average rate of change of \( f \) over \( [x_1, x_2] \). So the two ideas are identical: average rate of change is the slope of the secant line.

This visual interpretation is powerful because it converts an algebraic calculation into a geometric one. To see whether a function is changing quickly or slowly over an interval, draw the secant line and eyeball its steepness. A nearly horizontal secant means a small rate; a nearly vertical secant means a large rate.

Before we examine the explorer below, let's name the three quantities it will display on every run: the two chosen points, the secant line connecting them, and the numeric slope of that line.

#### Diagram: Secant Line Explorer

<details markdown="1">
<summary>Interactive secant line on a user-chosen curve</summary>
Type: MicroSim
**sim-id:** secant-line-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a coordinate plane with a curve and two draggable points that sit on the curve. The line through the two points — the secant line — is drawn, and its slope is displayed.

Learning objective (Bloom's Understanding): Students will interpret the average rate of change as the slope of the secant line connecting two points on a function's graph.

Visual elements:

- A coordinate plane from -10 to 10 on each axis with gridlines.
- A curve drawn in maroon, selected from a dropdown: \( f(x) = x^2 \), \( f(x) = x^3 \), \( f(x) = \sqrt{x} \), \( f(x) = 2^x \), \( f(x) = \sin(x) \).
- Two draggable points \( P_1 \) and \( P_2 \) that slide along the curve only (their \( x \)-coordinates are controlled, and the \( y \)-coordinate is always \( f(x) \)).
- A cyan-blue straight line extending through both points — the secant line.
- A readout panel showing \( P_1 = (x_1, y_1) \), \( P_2 = (x_2, y_2) \), \( \Delta y \), \( \Delta x \), and the slope \( m = \Delta y / \Delta x \) computed live.

Data visibility: On every drag, the readout updates to show each stage: the coordinates of \( P_1 \) and \( P_2 \), the computed \( \Delta y = y_2 - y_1 \), the computed \( \Delta x = x_2 - x_1 \), and the final slope. Students see the full computation chain, not just the answer.

Interactive controls:

- Dropdown to choose the curve.
- Two sliders that control the \( x \)-coordinates of \( P_1 \) and \( P_2 \) from -10 to 10.
- A "Match Target" button that displays a target slope (e.g., "Find two points whose secant has slope 3") and lights up when the student succeeds.

Instructional rationale: The Understand-level objective requires students to see the connection between a computed number and a visible line. Real-time updates tie the ratio computation to the geometric steepness of the secant, building an intuition that carries forward into calculus.

Canvas: 800 × 550 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for curve, createSlider for each point's \( x \), createButton for Match Target.
</details>

## Linear Rate of Change

A function has a **linear rate of change** when the average rate of change is the same over every interval. Only one family of functions behaves this way — the **linear functions**, whose graphs are straight lines. The next chapter is devoted to them, but we introduce their defining property here.

Consider \( f(x) = 3x + 2 \). Compute the average rate of change on two different intervals:

- On \( [0, 4] \): \( \frac{f(4) - f(0)}{4 - 0} = \frac{14 - 2}{4} = 3 \).
- On \( [10, 13] \): \( \frac{f(13) - f(10)}{13 - 10} = \frac{41 - 32}{3} = 3 \).

Same rate. That is what makes a function linear. The slope of the line is the *one and only* rate of change the function has, so no matter where you measure, you get the same answer.

This constancy is why linear models are so useful. If a car is traveling at a steady 60 mph, it does not matter which 10-minute stretch you measure — the rate is 60 mph every time. Once you know the slope, you can predict future behavior with a single multiplication.

## Nonlinear Rate of Change

Most functions do not have this constant rate. For a **nonlinear function**, the average rate of change depends on which interval you measure. Computing it on \( [0, 1] \) will generally give a different number than computing it on \( [5, 6] \).

Return to \( f(x) = x^2 \). The average rate of change over \( [0, 1] \) is:

\[ \frac{f(1) - f(0)}{1 - 0} = \frac{1 - 0}{1} = 1 \]

Over \( [5, 6] \), the same function gives:

\[ \frac{f(6) - f(5)}{6 - 5} = \frac{36 - 25}{1} = 11 \]

The function is changing much faster at \( x = 5 \) than at \( x = 0 \). Eleven times faster, in fact. That accelerating behavior — the rate itself getting larger as \( x \) increases — is the signature of nonlinear growth and is invisible unless you compute the rate on several different intervals.

The table below compares the two categories side by side.

| Property | Linear | Nonlinear |
|----------|--------|-----------|
| Graph shape | Straight line | Curve |
| Average rate of change | Constant | Varies by interval |
| Secant slope | Same on every interval | Different on different intervals |
| Example | \( f(x) = 3x + 2 \) | \( f(x) = x^2 \), \( 2^x \), \( \sin(x) \) |

## Increasing and Decreasing Rates of Change

For nonlinear functions, the rate of change has its own behavior — and we can describe it with the same vocabulary we used for functions themselves. We can ask whether the *rate* is increasing, decreasing, or constant as \( x \) increases.

- A function has an **increasing rate of change** if the average rate over successive equal-width intervals keeps going up. The function is speeding up.
- A function has a **decreasing rate of change** if the average rate over successive equal-width intervals keeps going down. The function is slowing down.
- A function has a **constant rate of change** if the rate never varies — which, as we just saw, makes it linear.

For \( f(x) = x^2 \) with \( x \ge 0 \), the average rate over \( [0, 1] \) is 1, over \( [1, 2] \) is 3, over \( [2, 3] \) is 5, over \( [3, 4] \) is 7. The rates form the sequence 1, 3, 5, 7 — each one larger than the last. So \( f(x) = x^2 \) has an increasing rate of change for positive \( x \).

For \( f(x) = \sqrt{x} \), the average rate over \( [0, 1] \) is 1, over \( [1, 4] \) is \( \frac{2-1}{3} \approx 0.33 \), over \( [4, 9] \) is \( \frac{3-2}{5} = 0.2 \). The rates are falling: 1, 0.33, 0.2. So \( \sqrt{x} \) has a decreasing rate of change.

!!! mascot-thinking "Two Layers of Change"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Keep the two layers separate in your head. A function can be increasing (outputs going up) while its rate of change is decreasing (speed of the climb is slowing). \( \sqrt{x} \) does exactly that — it keeps rising, but less eagerly as you go right. Decompose! Let's break this down together: the function's direction and the rate's direction are two independent questions.

## Concavity from Rates

The behavior of the rate of change reveals the **concavity** of a function's graph. Concavity is the technical word for the direction in which a curve is bending.

- A graph is **concave up** on an interval if its rate of change is increasing on that interval. The curve bends upward — imagine a bowl that holds water.
- A graph is **concave down** on an interval if its rate of change is decreasing on that interval. The curve bends downward — an upside-down bowl.

For \( f(x) = x^2 \), we just saw the rates 1, 3, 5, 7 — increasing — so the parabola is concave up. For \( f(x) = \sqrt{x} \), the rates fell — so the square-root curve is concave down. A visual test: if you draw a chord (a secant line) between two points on the graph, a concave-up curve lies *below* its chord, and a concave-down curve lies *above* its chord.

Concavity is the first hint of a classification that will organize most of pre-calculus. The diagram below summarizes the four combinations of increasing/decreasing and concave up/concave down behavior; every function family in this course will be analyzed in these terms.

#### Diagram: The Four Shapes of Change

<details markdown="1">
<summary>Four-quadrant infographic of increasing/decreasing crossed with concave up/down</summary>
Type: infographic
**sim-id:** four-shapes-of-change<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic arranged as a 2 × 2 grid showing the four possible combinations of function behavior and concavity. Each cell displays a small reference curve, a descriptive label, and a real-world example.

Learning objective (Bloom's Analyzing): Students will classify a function graph into one of four combined behavior-concavity categories and connect each category to a familiar real-world scenario.

Grid layout:

- Top-left: Increasing, Concave Up. Curve: right half of \( y = x^2 \) starting from the vertex. Example: "A savings account earning compound interest — growing and accelerating."
- Top-right: Increasing, Concave Down. Curve: \( y = \sqrt{x} \). Example: "A coffee cup filling at a tapering rate — growing but slowing."
- Bottom-left: Decreasing, Concave Up. Curve: right half of \( y = 1/x \). Example: "A hot object cooling toward room temperature — falling but at a slowing rate."
- Bottom-right: Decreasing, Concave Down. Curve: left half of a downward parabola. Example: "A thrown ball slowing near apex then falling faster — falling at an accelerating rate."

Each cell displays: the sketch curve, the behavior label ("Increasing"/"Decreasing"), the concavity label ("Concave up"/"Concave down"), a rate-of-change arrow (↑ for increasing rate, ↓ for decreasing rate), and one sentence of real-world context.

Interactive behavior:

- Hovering over any cell enlarges it and adds a miniature chord-and-curve drawing showing that the chord sits above the curve (concave down) or below (concave up).
- A "Quiz Me" button displays a mystery graph in the center and four clickable quadrant labels; the student clicks the correct category to score a point.

Instructional rationale: Analyze-level objectives require comparing and distinguishing categories. Putting all four cases on one screen lets students see at a glance that behavior and concavity are independent axes — you can have any combination — rather than thinking of them as a single "rising/falling" property.

Canvas: 900 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with mouseOver detection for cell enlargement, createButton for Quiz Me.
</details>

## Putting It All Together

Rates of change will reappear in every chapter. When we study linear and quadratic functions, we will compare constant rates to changing rates. When we reach polynomials and rational functions, we will use the sign of the rate to locate turning points. When we model exponential and logarithmic growth, the rate of change at any instant is proportional to the output itself — the defining property of exponential behavior. When we reach trigonometric functions, the rate of change is itself a sinusoid shifted by a quarter period.

The key ideas to carry forward:

- The **average rate of change** of a function over an interval is \( \frac{f(x_2) - f(x_1)}{x_2 - x_1} \).
- Geometrically, it is the **slope of the secant line** through the two endpoints.
- For **linear** functions this rate is constant; for **nonlinear** functions it varies by interval.
- The rate of change itself can be **increasing** or **decreasing**, producing **concave up** or **concave down** graphs.
- Rates have **units** — always output-units per input-unit — and those units carry the meaning.

!!! mascot-celebration "A Powerful New Lens"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You have the tool that unlocks every future function family in this course: a way to measure not just where a function is, but how fast it's moving. From here on, every new function we meet will be described in part by *how its rate of change behaves*. Onward to the function families!

??? question "Quick Check: Average rate of change of \( f(x) = x^3 \) on \( [1, 3] \)?"
    \( \frac{f(3) - f(1)}{3 - 1} = \frac{27 - 1}{2} = 13 \).

??? question "Quick Check: A balloon fills from 200 mL to 650 mL over 15 seconds. What is the average fill rate?"
    \( \frac{650 - 200}{15} = \frac{450}{15} = 30 \) mL per second. Units are essential.

??? question "Quick Check: Is \( f(x) = \sqrt{x} \) concave up or concave down for \( x > 0 \)?"
    Concave down. The function is increasing but its rate of change is decreasing, so the curve bends downward — matching the top-right cell of the four-shapes diagram.
