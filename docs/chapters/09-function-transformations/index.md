---
title: Function Transformations
description: Parent functions, translations, stretches, compressions, reflections, combined transformations, and the order in which to apply them.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:50:00
version: 0.07
---

# Function Transformations

## Summary

This chapter explores how functions can be transformed through translations, stretches, compressions, and reflections. Students learn to identify parent functions and apply vertical and horizontal translations, stretches, compressions, and reflections over both axes. The chapter covers combining multiple transformations, understanding the order in which transformations are applied, and writing equations for transformed functions. These skills apply to all function types studied throughout the course.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Parent Functions
2. Vertical Translation
3. Horizontal Translation
4. Vertical Stretch
5. Vertical Compression
6. Horizontal Stretch
7. Horizontal Compression
8. Reflection Over X-Axis
9. Reflection Over Y-Axis
10. Combined Transformations
11. Transformation Order
12. Writing Transformed Equations

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 4: Linear Functions](../04-linear-functions/index.md)
- [Chapter 5: Quadratic Functions and Complex Numbers](../05-quadratic-functions-and-complex-numbers/index.md)
- [Chapter 8: Rational Functions](../08-rational-functions/index.md)

---

!!! mascot-welcome "One Graph, Many Positions"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Every function family you meet in this course has a single "base" graph that all other members come from — shifted, stretched, or flipped. Once you can describe those changes as operations on the equation, you only ever have to *memorize* a handful of parent graphs. Every other graph is a recipe applied to one of them.

## Parent Functions

A **parent function** is the simplest, unshifted, unstretched member of a function family — the "template" graph from which every other family member is derived. Each family has exactly one parent function. Knowing the parent gives you the starting shape; knowing the transformations tells you what was done to it.

The parent functions we have met so far are:

- **Linear:** \( f(x) = x \) — a straight line through the origin with slope 1.
- **Quadratic:** \( f(x) = x^2 \) — the upward parabola with vertex at the origin.
- **Cubic:** \( f(x) = x^3 \) — an S-shaped curve through the origin.
- **Square root:** \( f(x) = \sqrt{x} \) — a curve starting at the origin and rising to the right.
- **Absolute value:** \( f(x) = |x| \) — a V-shape with vertex at the origin.
- **Reciprocal:** \( f(x) = 1/x \) — a rational function with asymptotes at the axes.

Chapters 13 and 16 will add the exponential and trigonometric parent functions. Every graph in the course can be written as one of these parents with a finite list of transformations applied.

!!! mascot-tip "Know the Parents Cold"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    Memorize each parent graph's shape, key point, and direction *before* worrying about transformations. If \( y = x^2 \) is solid in your head, then \( y = -2(x - 3)^2 + 5 \) is no harder than translating a sticky note — move it right 3, flip it over, stretch it, move it up 5.

## Vertical Translations

A **vertical translation** shifts a graph up or down by adding a constant *outside* the function. Replacing \( f(x) \) with \( f(x) + k \) moves the entire graph up by \( k \) units if \( k > 0 \) and down by \( |k| \) units if \( k < 0 \).

- \( f(x) + 3 \): every point shifts up 3.
- \( f(x) - 2 \): every point shifts down 2.

Geometrically, \( (x, y) \) is replaced by \( (x, y + k) \). The inputs are unchanged; every output is raised or lowered uniformly.

## Horizontal Translations

A **horizontal translation** shifts a graph left or right by subtracting a constant *inside* the function's argument. Replacing \( f(x) \) with \( f(x - h) \) moves the entire graph right by \( h \) units if \( h > 0 \) and left by \( |h| \) units if \( h < 0 \).

- \( f(x - 4) \): every point shifts right 4.
- \( f(x + 2) \) (i.e., \( f(x - (-2)) \)): every point shifts left 2.

The direction can feel backward: subtracting a positive number inside the argument moves the graph in the *positive* direction. The reason is that to get the same output, we must now plug in a larger \( x \) — meaning the graph arrives at the same height later, which is exactly what "shifted right" means.

!!! mascot-warning "Inside-the-Parentheses Feels Backward"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    \( f(x - 4) \) shifts *right* 4, not left. The rule for horizontal moves runs opposite the sign you see. A good memory trick: "inside flips, outside matches."

## Vertical Stretches and Compressions

A **vertical stretch** multiplies the output by a constant greater than 1; a **vertical compression** multiplies by a positive constant less than 1. Replacing \( f(x) \) with \( a \cdot f(x) \) scales the graph vertically by a factor of \( a \).

- \( a > 1 \): vertical stretch — the graph becomes taller.
- \( 0 < a < 1 \): vertical compression — the graph becomes shorter.

Every point \( (x, y) \) on the original graph becomes \( (x, a \cdot y) \) on the transformed graph. Points on the \( x \)-axis (where \( y = 0 \)) do not move, but every other point scales away from or toward the \( x \)-axis by factor \( a \).

Example: \( g(x) = 3x^2 \) is the parent parabola \( x^2 \) stretched vertically by 3. At \( x = 2 \), the parent has \( y = 4 \); the stretched version has \( y = 12 \).

## Horizontal Stretches and Compressions

A **horizontal stretch** or **compression** multiplies the input by a constant *inside* the function's argument. Replacing \( f(x) \) with \( f(b \cdot x) \) scales the graph horizontally:

- \( b > 1 \): horizontal **compression** by factor \( 1/b \) — the graph becomes narrower.
- \( 0 < b < 1 \): horizontal **stretch** by factor \( 1/b \) — the graph becomes wider.

Again the direction can feel reversed: multiplying the input by a *larger* number *compresses* the graph horizontally, because the function now reaches each output at a smaller \( x \). Every point \( (x, y) \) on the original becomes \( (x/b, y) \) on the transformed graph.

Example: \( g(x) = \sqrt{4x} \) compresses the parent \( \sqrt{x} \) horizontally by factor \( 1/4 \). The point \( (4, 2) \) on the parent corresponds to \( (1, 2) \) on the transformed graph — same height, but reached four times faster.

## Reflections

A **reflection** flips the graph across an axis. Two reflections are standard:

- **Reflection over the x-axis:** replace \( f(x) \) with \( -f(x) \). Every output changes sign; \( (x, y) \to (x, -y) \). A negative sign outside the function flips the graph vertically.
- **Reflection over the y-axis:** replace \( f(x) \) with \( f(-x) \). Every input changes sign; \( (x, y) \to (-x, y) \). A negative sign inside the function flips the graph horizontally.

Example: \( g(x) = -x^2 \) is the parent parabola reflected over the \( x \)-axis — it now opens downward. \( g(x) = \sqrt{-x} \) is the parent square-root reflected over the \( y \)-axis — it extends to the left instead of the right.

Reflections can be thought of as a special case of stretching: reflecting over the \( x \)-axis is a vertical "stretch" by factor \( -1 \), and reflecting over the \( y \)-axis is a horizontal "stretch" by factor \( -1 \). Treating them this way lets us combine stretches and reflections into a single rule, which the next sections formalize.

Before the unified table, note the pattern that ties every transformation together:

- Operations *outside* \( f \) affect the **output** and therefore the graph **vertically**.
- Operations *inside* \( f \)'s argument affect the **input** and therefore the graph **horizontally**, and their visible direction is opposite the sign.

| Transformation | Equation | Effect on \( (x, y) \) | Where the constant appears |
|----------------|----------|------------------------|-----------------------------|
| Vertical translation by \( k \) | \( f(x) + k \) | \( (x, y + k) \) | Outside, added |
| Horizontal translation by \( h \) | \( f(x - h) \) | \( (x + h, y) \) | Inside, subtracted |
| Vertical stretch/reflection by \( a \) | \( a \cdot f(x) \) | \( (x, a y) \) | Outside, multiplied |
| Horizontal stretch/reflection by \( b \) | \( f(b x) \) | \( (x/b, y) \) | Inside, multiplied |
| Reflection over x-axis | \( -f(x) \) | \( (x, -y) \) | Outside, sign change |
| Reflection over y-axis | \( f(-x) \) | \( (-x, y) \) | Inside, sign change |

#### Diagram: Transformation Sandbox

<details markdown="1">
<summary>Side-by-side parent and transformed graphs with live slider controls</summary>
Type: MicroSim
**sim-id:** transformation-sandbox<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that places a parent function graph next to a transformed version and lets students adjust transformation parameters with sliders, watching the transformed graph update live.

Learning objective (Bloom's Analyzing): Students will analyze the effect of each transformation parameter on a graph and distinguish inside-the-argument changes (horizontal) from outside-the-function changes (vertical).

Visual elements:

- Two side-by-side coordinate planes from -8 to 8 on each axis.
- Left plane: the chosen parent function in gray.
- Right plane: the transformed function in maroon, with the parent faintly overlaid for comparison.
- A readout under the right plane showing the current equation as \( g(x) = a \cdot f(b(x - h)) + k \).
- Colored dots on corresponding key points in both planes (e.g., vertex, intercept) connected by faint matching-color lines to emphasize the one-to-one correspondence.

Interactive controls:

- A parent selector (dropdown): \( x \), \( x^2 \), \( x^3 \), \( \sqrt{x} \), \( |x| \), \( 1/x \).
- Four sliders for \( a \) (vertical stretch/reflection), \( b \) (horizontal stretch/reflection), \( h \) (horizontal shift), \( k \) (vertical shift).
- "Reset" button restores all sliders to identity values (\( a = 1 \), \( b = 1 \), \( h = 0 \), \( k = 0 \)).
- "Challenge Mode" button displays a mystery transformed graph and asks the student to match it with the sliders.

Instructional rationale: Analyze-level mastery comes from manipulating a single parameter at a time and noting the visual effect. Pairing the parent and transformed graphs prevents students from memorizing graphs and forces them to reason about transformations.

Canvas: 1100 × 550 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for parent, createSlider for each parameter, createButton for Reset and Challenge.
</details>

## Combined Transformations

Real-world problems rarely use just one transformation. A general transformed function takes the form

\[ g(x) = a \cdot f(b(x - h)) + k \]

where each of the four parameters \( a, b, h, k \) controls one family of effects:

- \( a \): vertical stretch by \( |a| \); reflection over the x-axis if \( a < 0 \).
- \( b \): horizontal stretch by \( 1/|b| \); reflection over the y-axis if \( b < 0 \).
- \( h \): horizontal translation by \( h \) (right if \( h > 0 \), left if \( h < 0 \)).
- \( k \): vertical translation by \( k \).

This four-parameter template covers every transformation that can be applied to any parent function. The form also appears throughout the rest of the course: vertex form for quadratics in Chapter 5 (\( a(x - h)^2 + k \)), general sinusoidal form in Chapter 18, general exponential form in Chapter 13. Every one of those is a special case of \( a f(b(x - h)) + k \).

## Transformation Order

Transformations do not commute: doing a stretch before a translation produces a different result than doing them the other way around. To build the correct transformed graph from the equation \( g(x) = a f(b(x - h)) + k \), apply the transformations in this order:

1. **Horizontal stretch/reflection by \( b \)** — affects the inside first.
2. **Horizontal translation by \( h \)** — shifts after the stretching.
3. **Vertical stretch/reflection by \( a \)** — affects the outside first.
4. **Vertical translation by \( k \)** — shifts last.

The horizontal operations happen "inside out" relative to the argument: whichever operation sits closest to \( x \) is applied first. The vertical operations happen "outside in": closest to \( f \) first, then the final addition of \( k \).

A useful mental shortcut: *inside the parentheses, work opposite to order of operations; outside, work in order of operations*. The reason is that inside the parentheses you are working on the input (the domain side), which is reversed from how the function processes information.

!!! mascot-thinking "Order Matters Because Operations Are Composed"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Under the hood, each transformation is a function composition. Shifting then stretching is \( a f(x) \) evaluated at \( x - h \); stretching then shifting is \( a f(x - h) \) evaluated with the same formula but a different meaning. The key is that inside the argument we "undo" the order, while outside we apply straightforwardly.

## Writing Equations for Transformed Functions

Going from a graph or a verbal description to the equation of a transformed function is a reverse procedure. Given a description of what happened to a parent, write the equation by substituting each transformation into the template.

Example: take \( f(x) = x^2 \) and describe the transformations for \( g(x) = -2(x - 3)^2 + 5 \).

- \( a = -2 \): vertical stretch by 2, reflection over the x-axis.
- \( b = 1 \): no horizontal stretch or reflection.
- \( h = 3 \): horizontal translation right 3.
- \( k = 5 \): vertical translation up 5.

So starting from the parent \( y = x^2 \), we shift right 3 to get \( (x - 3)^2 \), reflect and stretch vertically by \( -2 \) to get \( -2(x - 3)^2 \), and shift up 5 to get \( -2(x - 3)^2 + 5 \). The vertex of the parent at \( (0, 0) \) moves to \( (3, 5) \), and the parabola now opens downward with a steeper slope.

Going the other direction — graph to equation — is a matter of comparing the new key point to the parent's and measuring the stretch:

1. Identify the parent function family by the graph's overall shape.
2. Locate the graph's new key point (vertex for parabolas, corner for absolute value, origin for linear/cubic/etc.); the shift from the parent key point gives \( h \) and \( k \).
3. Check the graph's direction (does it open the expected way?); a flip gives \( a < 0 \) or \( b < 0 \).
4. Compare a second point on the graph with the parent's corresponding point to find \( |a| \).

#### Diagram: Transformation Composer

<details markdown="1">
<summary>Step-by-step construction of a transformed function from verbal description</summary>
Type: infographic
**sim-id:** transformation-composer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic that walks students through composing a transformed function equation one transformation at a time, showing how the graph and equation evolve at each step.

Learning objective (Bloom's Applying): Students will construct the equation of a transformed function from a sequence of described transformations, correctly applying the transformation order.

Visual elements:

- A coordinate plane on the left showing the current transformed graph, with the parent function faintly overlaid.
- A step panel on the right listing the four transformations in correct order (horizontal stretch → horizontal shift → vertical stretch → vertical shift), each with an empty slot for the parameter value.
- A live equation display at the bottom showing the current composed equation \( g(x) = a f(b(x - h)) + k \) with unfilled parameters shown as placeholders.
- Animated arrows showing each transformation being applied to the graph as the user fills in each step.

Interactive controls:

- A parent dropdown.
- Four input fields for \( a, b, h, k \), each grayed out until the previous step is entered.
- "Randomize" button generates a random transformed graph and asks the student to fill in the parameters to match.
- "Reveal Answer" button fills in the correct values after a randomize challenge.

Instructional rationale: Apply-level composition requires explicit ordering and bookkeeping. Forcing entry one step at a time prevents students from writing the wrong order and lets them see how each transformation builds on the previous ones.

Canvas: 1000 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for parent, createInput for each parameter, createButton for Randomize and Reveal Answer.
</details>

## Putting It All Together

Transformations are a universal language. Once you can decode the four-parameter template, every function in the course — quadratic, exponential, logarithmic, sinusoidal — becomes immediately familiar. Every family has one parent function and one standard transformation template, and the same rules apply to them all.

The key ideas to carry forward:

- Every function family has a **parent function**; every other member is a transformation of that parent.
- Operations **outside** the function affect the output (vertical); operations **inside** the argument affect the input (horizontal, with reversed direction).
- **Stretches**, **compressions**, and **reflections** multiply by constants; **translations** add constants.
- The general transformation template is \( g(x) = a f(b(x - h)) + k \).
- **Order matters**: horizontal stretch → horizontal shift → vertical stretch → vertical shift.
- Writing an equation for a transformed graph means identifying the parent and reading off the four parameters from the new key point and shape.

!!! mascot-celebration "The Universal Decoder"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now own a decoder that works on every function family you will ever meet. From here on, each new family only adds one new parent graph — the transformation rules remain the same. That is a huge leverage point: one skill, endless graphs.

??? question "Quick Check: Describe the transformations from \( f(x) = \sqrt{x} \) to \( g(x) = 2\sqrt{x + 3} - 1 \)."
    \( h = -3 \): shift left 3. \( a = 2 \): vertical stretch by 2. \( k = -1 \): shift down 1.

??? question "Quick Check: If \( (2, 7) \) is on \( y = f(x) \), where is the corresponding point on \( y = f(x - 4) + 3 \)?"
    Shift right 4, up 3: new point is \( (6, 10) \).

??? question "Quick Check: Write the equation of \( y = x^2 \) reflected over the x-axis, shifted right 5, shifted up 2."
    \( y = -(x - 5)^2 + 2 \).
