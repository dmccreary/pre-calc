---
title: Trigonometric Graphs
description: Graphs of the six trigonometric functions with their key features — amplitude, period, midline, frequency, phase shift, and vertical shift — and the tangent, secant, cosecant, and cotangent graphs with their asymptotes.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 21:10:00
version: 0.07
---

# Trigonometric Graphs

## Summary

This chapter explores the graphs of all six trigonometric functions and their key features. Students learn to graph sine and cosine functions, identifying amplitude, period, midline, frequency, phase shift, and vertical shift. The chapter introduces sinusoidal functions as a general model, then covers the tangent graph with its period and asymptotes. Graphs of the reciprocal functions (secant, cosecant, cotangent) complete the picture. Students develop the graphing skills needed for sinusoidal modeling in the next chapter.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Sine Graph
2. Cosine Graph
3. Amplitude
4. Period
5. Midline
6. Frequency
7. Phase Shift
8. Vertical Shift of Trig
9. Sinusoidal Functions
10. Tangent Graph
11. Period of Tangent
12. Asymptotes of Tangent
13. Secant Graph
14. Cosecant Graph
15. Cotangent Graph

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 8: Rational Functions](../08-rational-functions/index.md) (for asymptote concepts)
- [Chapter 9: Function Transformations](../09-function-transformations/index.md)
- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)
- [Chapter 16: Trigonometric Functions](../16-trigonometric-functions/index.md)

---

!!! mascot-welcome "From Circle to Wave"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Last chapter we used the unit circle to evaluate trig functions at single angles. In this chapter we let the angle move continuously and watch the output trace out a graph. Every wiggle, peak, and asymptote you will see comes directly from a point moving around that circle.

## From the Unit Circle to a Graph

A trigonometric graph is just a record of unit-circle output over time. Imagine a point \( P \) moving counterclockwise around the unit circle. At any angle \( \theta \), the point sits at coordinates \( (\cos\theta, \sin\theta) \). If we unroll the angle onto a horizontal axis and plot the \( y \)-coordinate vertically, we trace the sine graph. If we plot the \( x \)-coordinate vertically instead, we trace the cosine graph.

Three features will appear on every trig graph we draw in this chapter:

- **Oscillation** — the output repeats after each full revolution around the circle.
- **Bounded vs. unbounded** — sine and cosine stay between -1 and 1, but tangent, secant, cosecant, and cotangent shoot off to infinity.
- **Asymptotes** — the unbounded functions have vertical lines they approach but never cross, just like the rational functions from Chapter 8.

Before we examine the first graph, let's define five vocabulary words that describe any wave-shaped curve. These terms will be used throughout the chapter and the next.

- **Amplitude** — half the vertical distance between the highest and lowest points of the graph. Always a positive number.
- **Period** — the horizontal distance required for the graph to complete one full cycle before repeating.
- **Midline** — the horizontal line halfway between the maximum and minimum values. A plain sine graph has midline \( y = 0 \).
- **Frequency** — the number of full cycles the graph completes per unit of the input. Frequency is the reciprocal of period: \( f = 1/T \).
- **Phase shift** — how far the graph has been slid horizontally from its standard starting position.

With this vocabulary in place, we can describe the sine graph precisely.

## Sine Graph

The **sine graph** plots \( y = \sin\theta \) as \( \theta \) varies across the real number line. From the unit circle we know that \( \sin(0) = 0 \), \( \sin(\pi/2) = 1 \), \( \sin(\pi) = 0 \), \( \sin(3\pi/2) = -1 \), and \( \sin(2\pi) = 0 \). Plotting these five key points and connecting them smoothly produces one full cycle of a wave that then repeats forever in both directions.

The key features of \( y = \sin\theta \) are:

- **Amplitude:** 1
- **Period:** \( 2\pi \)
- **Midline:** \( y = 0 \)
- **Zeros:** at every integer multiple of \( \pi \)
- **Maximum value:** 1, reached at \( \theta = \pi/2 + 2\pi k \) for integer \( k \)
- **Minimum value:** -1, reached at \( \theta = 3\pi/2 + 2\pi k \) for integer \( k \)
- **Symmetry:** odd function — \( \sin(-\theta) = -\sin\theta \), so the graph has point symmetry about the origin

#### Diagram: Unit Circle to Sine Graph Animation

<iframe src="../../sims/circle-to-sine-graph/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Unit Circle to Sine Graph Animation</summary>
Type: microsim
**sim-id:** circle-to-sine-graph<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Understand, L2, explain): Explain how the sine graph is generated point-by-point from the \( y \)-coordinate of a point moving around the unit circle.

Canvas layout:
- Left half: unit circle with a rotating radius and moving point P
- Right half: sine graph with horizontal axis labeled in radians from 0 to \( 2\pi \)
- A horizontal dashed line connects the \( y \)-coordinate of point P on the circle to the current plotting point on the graph

Visual elements:
- Unit circle with axes, tick marks at multiples of \( \pi/6 \) and \( \pi/4 \)
- Point P moving counterclockwise at a controllable speed
- Trailing sine wave drawn in maroon as the angle advances
- Vertical gold line on the graph showing the current angle value
- Labels for the five key points (0, \( \pi/2 \), \( \pi \), \( 3\pi/2 \), \( 2\pi \))

Interactive controls:
- Slider: angle \( \theta \) from 0 to \( 4\pi \)
- Button: Play / Pause animation
- Button: Reset
- Checkbox: Show \( y \)-coordinate value in text

Data Visibility Requirements:
- Stage 1: Show current angle \( \theta \) in radians and degrees
- Stage 2: Show coordinates of point P: \( (\cos\theta, \sin\theta) \)
- Stage 3: Show the sine value as a numeric readout
- Stage 4: Show the plotted point on the graph matching the value

Instructional Rationale: Step-through with the slider lets a student pause at any angle, predict the next point, and verify the connection between circle \( y \)-coordinate and graph height. Continuous animation alone would not give the learner time to make these predictions.

Implementation: p5.js with responsive canvas sizing.
</details>

## Cosine Graph

The **cosine graph** plots \( y = \cos\theta \). The cosine graph has the same shape as the sine graph but starts at a different point. At \( \theta = 0 \), cosine equals 1 because the \( x \)-coordinate on the unit circle starts at its maximum. As the point rotates, cosine decreases to 0 at \( \pi/2 \), hits its minimum of -1 at \( \pi \), returns to 0 at \( 3\pi/2 \), and climbs back to 1 at \( 2\pi \).

The cosine graph is the sine graph shifted left by \( \pi/2 \) radians, which gives us our first identity in graph form:

\[ \cos\theta = \sin\left(\theta + \frac{\pi}{2}\right) \]

Here is a side-by-side comparison of the two graphs for the basic cycle:

| Feature | \( y = \sin\theta \) | \( y = \cos\theta \) |
|---|---|---|
| Amplitude | 1 | 1 |
| Period | \( 2\pi \) | \( 2\pi \) |
| Midline | \( y = 0 \) | \( y = 0 \) |
| Value at \( \theta = 0 \) | 0 | 1 |
| First maximum | \( \theta = \pi/2 \) | \( \theta = 0 \) |
| First zero (for \( \theta > 0 \)) | \( \theta = \pi \) | \( \theta = \pi/2 \) |
| Symmetry | Odd (origin) | Even (\( y \)-axis) |

## Amplitude

When we multiply a sine or cosine function by a constant, the graph stretches or compresses vertically. The function \( y = A\sin\theta \) has **amplitude** \( |A| \). The amplitude is always a non-negative number because it measures a distance from the midline to the peak.

A few concrete examples show how amplitude controls the size of the wave:

- \( y = 2\sin\theta \) has amplitude 2 — peaks reach \( y = 2 \) and valleys reach \( y = -2 \).
- \( y = 0.5\cos\theta \) has amplitude 0.5 — a squashed wave between -0.5 and 0.5.
- \( y = -3\sin\theta \) has amplitude 3 — the negative sign flips the graph upside down but amplitude stays positive.

## Period

The **period** of a trig function is the horizontal length of one complete cycle. The period changes when we multiply the input angle by a constant. For the function \( y = \sin(B\theta) \), the period is:

\[ T = \frac{2\pi}{|B|} \]

Larger values of \( B \) compress the graph horizontally, producing a shorter period and faster oscillation. Smaller values of \( B \) stretch the graph, giving a longer period. Here are three examples to anchor this relationship:

- \( y = \sin(2\theta) \) has period \( \pi \) — twice as many oscillations in the same interval.
- \( y = \sin(\theta/3) \) has period \( 6\pi \) — three times slower.
- \( y = \cos(\pi\theta) \) has period 2 — one full cycle over each unit interval on the \( x \)-axis.

!!! mascot-tip "Period vs. Amplitude"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema offering a tip">
    Amplitude stretches the graph **up and down**. Period stretches it **left and right**. If you ever mix them up, remember: amplitude lives on the \( y \)-axis, period lives on the \( x \)-axis.

## Midline

The **midline** is the horizontal line halfway between the maximum and minimum values of the graph. For the basic functions \( y = \sin\theta \) and \( y = \cos\theta \), the midline is the \( x \)-axis, \( y = 0 \). Adding a constant \( D \) shifts the entire graph up or down, moving the midline to \( y = D \).

You can always find the midline from the max and min values of a graph:

\[ \text{midline} = \frac{\text{max} + \text{min}}{2} \]

And the amplitude is the vertical distance from midline to max (or min):

\[ \text{amplitude} = \frac{\text{max} - \text{min}}{2} \]

## Frequency

**Frequency** counts how many full cycles a wave completes per unit of input. It is the reciprocal of the period:

\[ f = \frac{1}{T} \]

For \( y = \sin(B\theta) \), the period is \( 2\pi/|B| \) and the frequency is \( |B|/(2\pi) \) cycles per radian. In physics and engineering, frequency is often measured in Hertz (cycles per second). If \( t \) is time in seconds, then \( y = \sin(2\pi f t) \) describes a wave with frequency \( f \) Hz.

| Function | Period \( T \) | Frequency \( f \) |
|---|---|---|
| \( y = \sin\theta \) | \( 2\pi \) | \( 1/(2\pi) \) |
| \( y = \sin(2\theta) \) | \( \pi \) | \( 1/\pi \) |
| \( y = \sin(2\pi t) \) | 1 | 1 |
| \( y = \sin(4\pi t) \) | \( 0.5 \) | 2 |

## Phase Shift

A **phase shift** moves the graph horizontally without changing its shape. The function \( y = \sin(\theta - C) \) shifts the plain sine graph to the right by \( C \) units. A negative value of \( C \) shifts left. When the input has a coefficient \( B \), the phase shift is \( C/B \), not \( C \) itself:

\[ y = \sin\left(B\theta - C\right) = \sin\left(B\left(\theta - \frac{C}{B}\right)\right) \]

The factored form on the right shows the true horizontal shift: \( C/B \). Always factor the \( B \) out of the parentheses before reading off the phase shift.

For example, consider \( y = \sin(2\theta - \pi) \). Factoring gives \( y = \sin(2(\theta - \pi/2)) \), so the period is \( \pi \) and the phase shift is \( \pi/2 \) to the right.

## Vertical Shift of Trig

A **vertical shift** moves the entire graph up or down. Adding a constant \( D \) outside the trig function produces \( y = A\sin(B\theta - C) + D \), which shifts the graph so that the midline becomes \( y = D \). The maximum becomes \( D + |A| \) and the minimum becomes \( D - |A| \).

This completes our list of four transformations for sinusoidal functions: amplitude (\( A \)), period/frequency (\( B \)), phase shift (\( C \)), and vertical shift (\( D \)).

## Sinusoidal Functions

A **sinusoidal function** is any function that can be written as:

\[ y = A\sin(B\theta - C) + D \quad \text{or} \quad y = A\cos(B\theta - C) + D \]

Because cosine is just a shifted sine, these two forms describe the same family of curves. Any graph that looks like a sine wave — any smoothly oscillating, periodic, bounded curve — can be written in this form.

#### Diagram: Sinusoidal Parameter Explorer

<iframe src="../../sims/sinusoidal-parameter-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sinusoidal Parameter Explorer</summary>
Type: microsim
**sim-id:** sinusoidal-parameter-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, demonstrate): Demonstrate how each of the four parameters \( A \), \( B \), \( C \), and \( D \) in \( y = A\sin(B\theta - C) + D \) independently transforms the sine graph.

Canvas layout:
- Top (75%): graph area with gridlines, axes labeled in multiples of \( \pi/2 \) on the horizontal axis
- Bottom (25%): control panel with four sliders

Visual elements:
- Reference sine curve \( y = \sin\theta \) drawn lightly in gray
- Current transformed curve drawn in maroon
- Highlighted midline drawn as a gold dashed line
- Amplitude shown with a vertical measurement bar on the right edge
- Period shown with a horizontal measurement bar across the top
- Live display of the current equation in the form \( y = A\sin(B\theta - C) + D \)

Interactive controls:
- Slider A: amplitude, range -3 to 3, step 0.1, default 1
- Slider B: angular frequency, range 0.25 to 4, step 0.25, default 1
- Slider C: phase shift, range \( -\pi \) to \( \pi \), step \( \pi/12 \), default 0
- Slider D: vertical shift, range -3 to 3, step 0.1, default 0
- Button: Reset all parameters to defaults

Data Visibility Requirements:
- Stage 1: Show live values of A, B, C, D
- Stage 2: Show computed period \( 2\pi/|B| \) and amplitude \( |A| \)
- Stage 3: Show the midline \( y = D \) explicitly
- Stage 4: Show the current equation with all substitutions

Instructional Rationale: Students can isolate one parameter at a time and watch its effect while all others are held constant. This isolation is the key pedagogical move for understanding each parameter's distinct role.

Implementation: p5.js with responsive canvas sizing.
</details>

## Tangent Graph

The **tangent graph** plots \( y = \tan\theta = \sin\theta / \cos\theta \). Unlike sine and cosine, tangent is unbounded: whenever \( \cos\theta \) approaches zero, the ratio grows without limit. The graph consists of infinitely many identical branches, each rising from \( -\infty \) to \( +\infty \), separated by vertical asymptotes.

The key features of \( y = \tan\theta \) are:

- **No amplitude** — the function is unbounded, so the amplitude concept does not apply.
- **Passes through the origin** — \( \tan(0) = 0 \).
- **Increasing on every branch** — within any interval between asymptotes, tangent is always increasing.
- **Odd function** — \( \tan(-\theta) = -\tan\theta \), symmetric about the origin.

## Period of Tangent

The tangent function has **period** \( \pi \), not \( 2\pi \). This is because \( \tan(\theta + \pi) = \tan\theta \): after a half-revolution around the unit circle, both the sine and cosine flip signs, and their ratio returns to the same value. So the tangent graph repeats twice as often as sine or cosine.

For the transformed function \( y = \tan(B\theta) \), the period becomes:

\[ T = \frac{\pi}{|B|} \]

## Asymptotes of Tangent

Tangent is undefined wherever cosine equals zero. This happens at:

\[ \theta = \frac{\pi}{2} + \pi k \quad \text{for integer } k \]

At each of these angles, the tangent graph has a **vertical asymptote** — a vertical line that the graph approaches but never touches. Just like the rational functions from Chapter 8, the function grows toward \( +\infty \) on one side of the asymptote and toward \( -\infty \) on the other side.

Within one period from \( -\pi/2 \) to \( \pi/2 \):

- As \( \theta \to -\pi/2^+ \), \( \tan\theta \to -\infty \)
- At \( \theta = 0 \), \( \tan\theta = 0 \)
- At \( \theta = \pi/4 \), \( \tan\theta = 1 \)
- As \( \theta \to \pi/2^- \), \( \tan\theta \to +\infty \)

!!! mascot-thinking "Why Tangent Has Two Asymptote Types"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Tangent is a quotient: \( \tan\theta = \sin\theta / \cos\theta \). The zeros come from the numerator (sine) and the asymptotes come from the denominator (cosine). That same numerator-denominator thinking from rational functions maps right onto trigonometry.

## Secant, Cosecant, and Cotangent Graphs

The three reciprocal functions are defined as:

\[ \sec\theta = \frac{1}{\cos\theta}, \quad \csc\theta = \frac{1}{\sin\theta}, \quad \cot\theta = \frac{\cos\theta}{\sin\theta} = \frac{1}{\tan\theta} \]

Each of these is a quotient, so each has vertical asymptotes wherever its denominator equals zero. Before we look at the three graphs, here is the governing rule that ties them together:

- **Zeros of the denominator** become **vertical asymptotes** of the reciprocal.
- **Maximums of the denominator at \( \pm 1 \)** become **minimums** of the reciprocal (flipped or not).
- **The reciprocal is undefined wherever the original is zero.**

### Secant Graph

The **secant graph** \( y = \sec\theta \) is the reciprocal of cosine. It has vertical asymptotes wherever \( \cos\theta = 0 \), which is at \( \theta = \pi/2 + \pi k \). The graph consists of U-shaped curves that open upward where cosine is positive and downward where cosine is negative. The minimum value on an upward-opening branch is 1, reached at the same points where cosine reaches its maximum of 1.

Key features of the secant graph:

- **Period:** \( 2\pi \)
- **Asymptotes:** \( \theta = \pi/2 + \pi k \)
- **Range:** \( (-\infty, -1] \cup [1, \infty) \) — the function never takes values between -1 and 1.
- **Local extrema:** minimum of 1 where \( \cos\theta = 1 \), local max of -1 where \( \cos\theta = -1 \).

### Cosecant Graph

The **cosecant graph** \( y = \csc\theta \) is the reciprocal of sine. It has vertical asymptotes wherever \( \sin\theta = 0 \), which is at every integer multiple of \( \pi \). Its branches alternate between U-shapes that open upward (where sine is positive) and U-shapes that open downward (where sine is negative).

Key features of the cosecant graph:

- **Period:** \( 2\pi \)
- **Asymptotes:** \( \theta = \pi k \) for integer \( k \)
- **Range:** \( (-\infty, -1] \cup [1, \infty) \)
- **Local extrema:** minimum of 1 where \( \sin\theta = 1 \) (that is, at \( \theta = \pi/2 \)); local max of -1 where \( \sin\theta = -1 \).

### Cotangent Graph

The **cotangent graph** \( y = \cot\theta \) is the reciprocal of tangent. It has vertical asymptotes wherever \( \sin\theta = 0 \), which is at every integer multiple of \( \pi \). Unlike tangent, cotangent is a **decreasing** function on each branch: it falls from \( +\infty \) down to \( -\infty \) between each pair of asymptotes.

Key features of the cotangent graph:

- **Period:** \( \pi \)
- **Asymptotes:** \( \theta = \pi k \) for integer \( k \)
- **Zeros:** \( \theta = \pi/2 + \pi k \) (wherever cosine is zero)
- **Always decreasing** on each branch.

#### Diagram: Six Trig Graph Comparison

<iframe src="../../sims/six-trig-graphs/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Six Trig Graph Comparison</summary>
Type: infographic
**sim-id:** six-trig-graphs<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Analyze, L4, compare): Compare and contrast the six trigonometric graphs side-by-side, identifying periods, asymptotes, and the reciprocal relationships.

Layout: 2x3 grid of small graphs, each plotting one trig function over \( [-2\pi, 2\pi] \).

Elements in each panel:
- Axes with tick marks at multiples of \( \pi/2 \)
- The primary function curve in maroon
- Light gray dashed curve of its reciprocal (or reciprocal of reciprocal) partner for visual pairing
- Red vertical dashed lines at vertical asymptotes
- Label showing the period and function name

Interactive controls:
- Toggle button: Show / hide paired reciprocal ghost curve
- Dropdown: Highlight one feature across all six graphs (zeros, asymptotes, max/min values)
- Click any panel to bring that function to an enlarged center view

Data Visibility Requirements:
- Stage 1: All six graphs visible in grid with labels
- Stage 2: When user selects "asymptotes," red dashed lines appear on the four graphs that have them
- Stage 3: When user selects "zeros," hollow circles mark every zero across all graphs

Instructional Rationale: Seeing all six graphs in a single view supports the analyze-level objective of comparing structural features. The highlighting tool draws attention to one feature at a time so the student doesn't have to hold six mental images simultaneously.

Implementation: p5.js grid layout with responsive sizing.
</details>

## Summary Table of the Six Graphs

After working through each graph individually, the following table organizes what we already know about all six functions in one place. Every entry in this table has been explained in the sections above.

| Function | Period | Amplitude | Zeros at | Vertical asymptotes | Range |
|---|---|---|---|---|---|
| \( \sin\theta \) | \( 2\pi \) | 1 | \( \pi k \) | none | \( [-1, 1] \) |
| \( \cos\theta \) | \( 2\pi \) | 1 | \( \pi/2 + \pi k \) | none | \( [-1, 1] \) |
| \( \tan\theta \) | \( \pi \) | n/a | \( \pi k \) | \( \pi/2 + \pi k \) | all reals |
| \( \csc\theta \) | \( 2\pi \) | n/a | none | \( \pi k \) | \( (-\infty, -1] \cup [1, \infty) \) |
| \( \sec\theta \) | \( 2\pi \) | n/a | none | \( \pi/2 + \pi k \) | \( (-\infty, -1] \cup [1, \infty) \) |
| \( \cot\theta \) | \( \pi \) | n/a | \( \pi/2 + \pi k \) | \( \pi k \) | all reals |

!!! mascot-celebration "Six Graphs Mastered"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now know the shape, period, and key features of every trig graph in the AP Pre-Calc curriculum. In the next chapter we will put the sine and cosine graphs to work modeling real periodic data — tides, temperatures, and daylight hours all follow the sinusoidal pattern you just learned to graph.

## Key Takeaways

- Every trig graph comes from watching a coordinate of a point on the unit circle as the angle advances.
- Sinusoidal functions \( y = A\sin(B\theta - C) + D \) have amplitude \( |A| \), period \( 2\pi/|B| \), phase shift \( C/B \), and midline \( y = D \).
- Tangent and cotangent have period \( \pi \) because sine and cosine flip signs simultaneously after a half-revolution.
- Every reciprocal trig function has a vertical asymptote wherever its denominator equals zero.
- The range of secant and cosecant excludes the open interval \( (-1, 1) \) because their reciprocal partners never exceed 1 in magnitude.
