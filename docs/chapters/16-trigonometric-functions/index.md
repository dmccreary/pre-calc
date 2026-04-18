---
title: Trigonometric Functions
description: The six trigonometric functions defined from the unit circle, exact values at special angles, right-triangle trigonometry, the SOH-CAH-TOA mnemonic, and the reciprocal functions secant, cosecant, and cotangent.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:58:00
version: 0.07
---

# Trigonometric Functions

## Summary

This chapter defines the six trigonometric functions and develops skills for evaluating them. Students learn the sine, cosine, and tangent functions from the unit circle, along with the reciprocal functions (secant, cosecant, cotangent). The chapter covers trigonometric function evaluation at special angles, finding exact trigonometric values, right triangle trigonometry, and the SOH-CAH-TOA mnemonic. These definitions and evaluation skills are used extensively in the remaining trigonometry chapters.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Sine Function
2. Cosine Function
3. Tangent Function
4. Reciprocal Trig Functions
5. Secant Function
6. Cosecant Function
7. Cotangent Function
8. Trig Function Evaluation
9. Exact Trig Values
10. Right Triangle Trig
11. SOH-CAH-TOA

## Prerequisites

This chapter builds on concepts from:

- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)

---

!!! mascot-welcome "Six Functions, One Circle"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    The unit circle from the last chapter does double duty in this one: it gives us the values of the six trigonometric functions for every angle. We will start with sine, cosine, and tangent — the three workhorses — then add the three reciprocals that round out the set. Every later trigonometry chapter assumes you can evaluate these six functions fluently at the special angles.

## Sine Function

The **sine function** is defined for any angle \( \theta \) in standard position as the \( y \)-coordinate of the point where the terminal side meets the unit circle:

\[ \sin\theta = y \]

A few immediate consequences from the unit-circle definition:

- The sine function's value is always between -1 and 1, because every \( y \)-coordinate on the unit circle satisfies \( -1 \leq y \leq 1 \).
- \( \sin\theta = 0 \) whenever the terminal side is on the \( x \)-axis (\( \theta = 0, \pi, 2\pi, \ldots \)).
- \( \sin\theta = 1 \) when the terminal side points up the positive \( y \)-axis (\( \theta = \pi/2 \)).
- \( \sin\theta = -1 \) when the terminal side points down the negative \( y \)-axis (\( \theta = 3\pi/2 \)).
- The sign of \( \sin\theta \) follows the sign of \( y \): positive in QI and QII, negative in QIII and QIV.

## Cosine Function

The **cosine function** is defined for any angle \( \theta \) in standard position as the \( x \)-coordinate of the point where the terminal side meets the unit circle:

\[ \cos\theta = x \]

The cosine has parallel properties to the sine:

- The cosine function's value is always between -1 and 1.
- \( \cos\theta = 0 \) whenever the terminal side is on the \( y \)-axis (\( \theta = \pi/2, 3\pi/2, \ldots \)).
- \( \cos\theta = 1 \) when the terminal side points along the positive \( x \)-axis (\( \theta = 0, 2\pi, \ldots \)).
- \( \cos\theta = -1 \) when the terminal side points along the negative \( x \)-axis (\( \theta = \pi \)).
- The sign of \( \cos\theta \) follows the sign of \( x \): positive in QI and QIV, negative in QII and QIII.

The Pythagorean identity \( \cos^2\theta + \sin^2\theta = 1 \) follows immediately from the unit-circle equation \( x^2 + y^2 = 1 \) — sine and cosine are not independent, but always linked by this constraint.

## Tangent Function

The **tangent function** is defined as the ratio of sine to cosine:

\[ \tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{y}{x} \]

Three things follow directly:

- Tangent is undefined wherever cosine is 0 — that is, at \( \theta = \pi/2, 3\pi/2 \), and any angle coterminal with these. These are the *vertical asymptotes* of the tangent graph.
- Unlike sine and cosine, tangent is not bounded between -1 and 1; it can take any real value.
- The sign of \( \tan\theta \) is the sign of \( y/x \), which is positive in QI and QIII (where \( x \) and \( y \) share signs) and negative in QII and QIV.

Geometrically, the tangent at angle \( \theta \) measures the *slope* of the line from the origin through the unit-circle point — rise over run = \( y/x \). The connection to slope explains why tangent grows large near the vertical asymptotes and changes sign as the terminal side rotates past the \( y \)-axis.

## Reciprocal Trig Functions

The **reciprocal trigonometric functions** are the multiplicative inverses (reciprocals, *not* inverses-as-functions) of sine, cosine, and tangent. Each pairs with one of the primary functions:

- Cosecant pairs with sine.
- Secant pairs with cosine.
- Cotangent pairs with tangent.

The naming pattern is consistent but not always intuitive — note that **co**secant pairs with sine (no "co"), and **co**tangent pairs with tangent. Only secant pairs with the obvious primary function.

## Secant Function

The **secant function** is the reciprocal of cosine:

\[ \sec\theta = \frac{1}{\cos\theta} = \frac{1}{x} \]

Properties:

- Secant is undefined wherever cosine is 0 (at \( \theta = \pi/2, 3\pi/2, \ldots \)) — same vertical asymptotes as tangent.
- Because \( |\cos\theta| \leq 1 \), the secant satisfies \( |\sec\theta| \geq 1 \). Its range is \( (-\infty, -1] \cup [1, \infty) \).
- The sign of \( \sec\theta \) matches the sign of \( \cos\theta \).

## Cosecant Function

The **cosecant function** is the reciprocal of sine:

\[ \csc\theta = \frac{1}{\sin\theta} = \frac{1}{y} \]

Properties:

- Cosecant is undefined wherever sine is 0 (at \( \theta = 0, \pi, 2\pi, \ldots \)).
- Because \( |\sin\theta| \leq 1 \), the cosecant satisfies \( |\csc\theta| \geq 1 \). Its range is \( (-\infty, -1] \cup [1, \infty) \).
- The sign of \( \csc\theta \) matches the sign of \( \sin\theta \).

## Cotangent Function

The **cotangent function** is the reciprocal of tangent, which works out to the ratio of cosine to sine:

\[ \cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta} = \frac{x}{y} \]

Properties:

- Cotangent is undefined wherever sine is 0 (at \( \theta = 0, \pi, 2\pi, \ldots \)).
- Cotangent can take any real value.
- The sign of \( \cot\theta \) matches the sign of \( \tan\theta \): positive in QI and QIII, negative in QII and QIV.

The next table consolidates the six function definitions in unit-circle terms so they can be compared at a glance.

| Function | Definition | Undefined when |
|----------|------------|----------------|
| \( \sin\theta \) | \( y \) | never |
| \( \cos\theta \) | \( x \) | never |
| \( \tan\theta \) | \( y/x \) | \( x = 0 \) (i.e., \( \theta = \pi/2 + k\pi \)) |
| \( \csc\theta \) | \( 1/y \) | \( y = 0 \) (i.e., \( \theta = k\pi \)) |
| \( \sec\theta \) | \( 1/x \) | \( x = 0 \) (i.e., \( \theta = \pi/2 + k\pi \)) |
| \( \cot\theta \) | \( x/y \) | \( y = 0 \) (i.e., \( \theta = k\pi \)) |

!!! mascot-tip "Reciprocal Pairs Share Asymptotes"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    \( \tan\theta \) and \( \sec\theta \) both blow up where \( \cos\theta = 0 \). \( \cot\theta \) and \( \csc\theta \) both blow up where \( \sin\theta = 0 \). If you remember which primary function lives in the denominator of each ratio, you never need to memorize the asymptotes separately.

## Trig Function Evaluation

**Trigonometric function evaluation** at any angle uses the same three-step procedure regardless of which of the six functions is being computed:

1. Determine the angle's **quadrant** (or recognize it as a quadrantal angle on the axes).
2. Compute the **reference angle** to one of the special angles \( 0, \pi/6, \pi/4, \pi/3, \pi/2 \).
3. Look up the trig value at the reference angle, then attach the **sign** dictated by the quadrant via ASTC.

A worked example: evaluate \( \sin(7\pi/6) \).

1. \( 7\pi/6 \) lies in QIII (between \( \pi \) and \( 3\pi/2 \)).
2. Reference angle: \( 7\pi/6 - \pi = \pi/6 \).
3. \( \sin(\pi/6) = 1/2 \), and sine is negative in QIII, so \( \sin(7\pi/6) = -1/2 \).

Another example: evaluate \( \cos(5\pi/4) \).

1. \( 5\pi/4 \) lies in QIII.
2. Reference angle: \( 5\pi/4 - \pi = \pi/4 \).
3. \( \cos(\pi/4) = \sqrt{2}/2 \), and cosine is negative in QIII, so \( \cos(5\pi/4) = -\sqrt{2}/2 \).

The reciprocal functions follow from these primary values: \( \csc(7\pi/6) = 1/\sin(7\pi/6) = 1/(-1/2) = -2 \), and \( \sec(5\pi/4) = 1/\cos(5\pi/4) = -\sqrt{2} \).

## Exact Trig Values

**Exact trigonometric values** are values expressed in closed form (using integers, fractions, and square roots) rather than as a calculator decimal. They are produced by combining the special-angle values from Chapter 15 with the sign rules above.

The next table tabulates the exact sine, cosine, and tangent values at every special angle in the first revolution. Combining this table with the sign rules gives the exact value at any angle.

| \( \theta \) | \( \sin\theta \) | \( \cos\theta \) | \( \tan\theta \) |
|----------|-------|-------|-------|
| 0           | 0          | 1          | 0          |
| \( \pi/6 \) | \( 1/2 \)  | \( \sqrt{3}/2 \) | \( \sqrt{3}/3 \) |
| \( \pi/4 \) | \( \sqrt{2}/2 \) | \( \sqrt{2}/2 \) | 1          |
| \( \pi/3 \) | \( \sqrt{3}/2 \) | \( 1/2 \)  | \( \sqrt{3} \)   |
| \( \pi/2 \) | 1          | 0          | undefined  |
| \( 2\pi/3 \) | \( \sqrt{3}/2 \) | \( -1/2 \) | \( -\sqrt{3} \) |
| \( 3\pi/4 \) | \( \sqrt{2}/2 \) | \( -\sqrt{2}/2 \) | -1 |
| \( 5\pi/6 \) | \( 1/2 \) | \( -\sqrt{3}/2 \) | \( -\sqrt{3}/3 \) |
| \( \pi \)   | 0          | -1         | 0          |
| \( 7\pi/6 \) | \( -1/2 \) | \( -\sqrt{3}/2 \) | \( \sqrt{3}/3 \) |
| \( 5\pi/4 \) | \( -\sqrt{2}/2 \) | \( -\sqrt{2}/2 \) | 1 |
| \( 4\pi/3 \) | \( -\sqrt{3}/2 \) | \( -1/2 \) | \( \sqrt{3} \) |
| \( 3\pi/2 \) | -1 | 0 | undefined |
| \( 5\pi/3 \) | \( -\sqrt{3}/2 \) | \( 1/2 \) | \( -\sqrt{3} \) |
| \( 7\pi/4 \) | \( -\sqrt{2}/2 \) | \( \sqrt{2}/2 \) | -1 |
| \( 11\pi/6 \) | \( -1/2 \) | \( \sqrt{3}/2 \) | \( -\sqrt{3}/3 \) |

#### Diagram: Six-Function Evaluation Wheel

<details markdown="1">
<summary>Interactive unit circle that displays all six trigonometric values for the selected angle</summary>
Type: MicroSim
**sim-id:** six-function-evaluation-wheel<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing the unit circle with a draggable terminal side, alongside a panel that displays exact and decimal values for all six trigonometric functions of the current angle.

Learning objective (Bloom's Applying): Students will apply the unit-circle definitions to evaluate any of the six trig functions at any angle, observing the connection between the unit-circle coordinates and the function values.

Visual elements:

- The unit circle centered at the origin in a coordinate plane spanning \(-1.5\) to \(1.5\) on both axes.
- A draggable terminal-side ray with a highlighted point on the circle showing \( (\cos\theta, \sin\theta) \).
- A vertical green segment from the \( x \)-axis to the point representing \( \sin\theta \), and a horizontal blue segment from the \( y \)-axis to the point representing \( \cos\theta \).
- A side panel listing all six function values: \( \sin, \cos, \tan, \csc, \sec, \cot \) — exact form for special angles, decimal otherwise.

Interactive controls:

- Drag the terminal side to set the angle.
- A "Snap to Special Angles" button.
- A "Show Reference Angle" toggle that displays the acute angle to the \( x \)-axis.
- A "Quiz Mode" that hides one or more values for student recall practice.

Instructional rationale: Seeing all six values change in real time as the terminal side rotates makes the relationships among the six functions obvious — sine and cosecant move together, cosine and secant move together, and tangent and cotangent reciprocate around 1.

Canvas: 1100 × 700 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with mouseDragged for terminal side, createButton for snap and quiz, createCheckbox for reference angle.
</details>

## Right Triangle Trig

The **right triangle definitions** of the trig functions are the older, geometry-based definitions. They apply to *acute* angles only — angles strictly between 0 and \( \pi/2 \) (or 0° and 90°) — but they are extremely useful in applied problems involving right triangles.

For an acute angle \( \theta \) in a right triangle, label the three sides relative to \( \theta \):

- The **opposite** side is the side across from \( \theta \).
- The **adjacent** side is the side touching \( \theta \) that is *not* the hypotenuse.
- The **hypotenuse** is the side opposite the right angle (always the longest side).

The three primary trig functions are then defined as the side ratios:

\[ \sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \quad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \quad \tan\theta = \frac{\text{opposite}}{\text{adjacent}} \]

These ratios depend only on the angle \( \theta \), not on the size of the triangle — a consequence of similarity. Two right triangles with the same acute angle have proportional sides, so the side *ratios* are identical.

The right-triangle definitions and the unit-circle definitions agree perfectly for acute angles. If we drop a perpendicular from the unit-circle point \( (\cos\theta, \sin\theta) \) to the \( x \)-axis, we get a right triangle with hypotenuse 1, opposite side of length \( \sin\theta \), and adjacent side of length \( \cos\theta \). The unit-circle definition is the broader one — it works for *every* angle — but the right-triangle picture is the right tool when the problem already contains a triangle.

## SOH-CAH-TOA

**SOH-CAH-TOA** is the standard mnemonic for remembering the three primary right-triangle ratios:

- **SOH**: **S**ine = **O**pposite over **H**ypotenuse.
- **CAH**: **C**osine = **A**djacent over **H**ypotenuse.
- **TOA**: **T**angent = **O**pposite over **A**djacent.

The mnemonic is a memory aid for the side ratios, not a deeper definition — it just compresses the three formulas above into nine letters.

A worked example: in a right triangle, the angle \( \theta \) has opposite side 3 and hypotenuse 5. Find all six trig values.

The Pythagorean theorem gives the missing adjacent side: \( a^2 + 3^2 = 5^2 \implies a = 4 \). Then:

- \( \sin\theta = 3/5 \), \( \cos\theta = 4/5 \), \( \tan\theta = 3/4 \).
- The reciprocals follow: \( \csc\theta = 5/3 \), \( \sec\theta = 5/4 \), \( \cot\theta = 4/3 \).

This 3-4-5 triangle is one of the most useful exact triangles in trig. Two others worth memorizing are the 5-12-13 and 8-15-17 right triangles, which give exact values for angles other than the special angles.

#### Diagram: Right Triangle SOH-CAH-TOA Visualizer

<details markdown="1">
<summary>Interactive right triangle with adjustable acute angle showing the three side ratios</summary>
Type: MicroSim
**sim-id:** right-triangle-soh-cah-toa<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim displaying a right triangle with one acute angle controllable by a slider, showing the side lengths, the three ratios, and the SOH-CAH-TOA labels in real time.

Learning objective (Bloom's Understanding): Students will explain that the three trig ratios depend only on the acute angle, not on the triangle's size.

Visual elements:

- A right triangle drawn in the lower-left corner of the canvas.
- The acute angle \( \theta \) labeled at one vertex; the right angle marked by a small square at the corner.
- Side labels: opposite (green), adjacent (blue), hypotenuse (maroon).
- A side panel showing the three ratios, the SOH-CAH-TOA mnemonic, and the decimal values.
- An optional second similar triangle of different scale shown side-by-side to demonstrate that the ratios are unchanged.

Interactive controls:

- A slider for the acute angle \( \theta \) ranging from \( 5° \) to \( 85° \).
- A slider for the triangle's overall scale.
- A "Show Similar Triangle" toggle that displays a second, larger triangle with the same angles.

Instructional rationale: Many students first meet trig ratios in geometry without seeing why the ratio depends only on the angle. The side-by-side similar triangle demonstration makes the size-independence visible.

Canvas: 1000 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for angle and scale, createCheckbox for similar triangle.
</details>

!!! mascot-thinking "Two Definitions, One Function"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The right-triangle definition and the unit-circle definition are the *same* function for acute angles. The unit circle just generalizes the right-triangle picture so that sine, cosine, and tangent are defined for every angle. Use whichever picture is more convenient — the right triangle for surveying and physics word problems, the unit circle for the wider range of angles in periodic models.

## Putting It All Together

The six trigonometric functions all flow from one geometric source: a point on the unit circle. Sine and cosine are the coordinates; tangent and cotangent are their ratios; secant and cosecant are their reciprocals. Once those definitions are in hand, evaluation is a routine of *quadrant + reference angle + sign rule*.

Key ideas to carry forward:

- **Sine** is the \( y \)-coordinate, **cosine** is the \( x \)-coordinate, and **tangent** is the ratio \( y/x \) on the unit circle.
- The **reciprocal functions** are \( \csc = 1/\sin \), \( \sec = 1/\cos \), \( \cot = 1/\tan \) — each pair shares its asymptotes.
- **Trig evaluation** at any angle uses three steps: identify the quadrant, find the reference angle, and apply ASTC sign rules.
- **Exact values** at the special angles (multiples of \( \pi/6 \) and \( \pi/4 \)) come from the 30-60-90 and 45-45-90 right triangles.
- **SOH-CAH-TOA** organizes the right-triangle definitions: sine = opp/hyp, cosine = adj/hyp, tangent = opp/adj.
- The right-triangle and unit-circle definitions agree on acute angles; the unit-circle version generalizes to every angle.

!!! mascot-celebration "All Six Functions, Mastered"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You can now evaluate any of the six trig functions at any of the special angles, in any quadrant, using only the unit-circle picture and the sign rules. The next chapter promotes these point values to *graphs* — turning the rotation around the circle into the wave shapes that model every periodic process in nature.

??? question "Quick Check: Find \( \sin(2\pi/3) \) exactly."
    \( 2\pi/3 \) is in QII with reference angle \( \pi/3 \). \( \sin(\pi/3) = \sqrt{3}/2 \), and sine is positive in QII, so \( \sin(2\pi/3) = \sqrt{3}/2 \).

??? question "Quick Check: Find \( \tan(5\pi/4) \) exactly."
    \( 5\pi/4 \) is in QIII with reference angle \( \pi/4 \). \( \tan(\pi/4) = 1 \), and tangent is positive in QIII, so \( \tan(5\pi/4) = 1 \).

??? question "Quick Check: A right triangle has legs of length 6 and 8. Find \( \sin\theta \) and \( \cos\theta \) for the angle \( \theta \) opposite the leg of length 6."
    The hypotenuse is \( \sqrt{6^2 + 8^2} = 10 \). So \( \sin\theta = 6/10 = 3/5 \) and \( \cos\theta = 8/10 = 4/5 \).

??? question "Quick Check: Why is \( \sec(\pi/2) \) undefined?"
    Secant is the reciprocal of cosine, and \( \cos(\pi/2) = 0 \). Division by 0 is undefined, so \( \sec(\pi/2) \) is undefined as well.
