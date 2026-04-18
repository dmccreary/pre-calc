---
title: Functions and Their Properties
description: The function concept — notation, domain, range, the vertical line test, graph behavior, intercepts, symmetry, even and odd functions, and bounded behavior.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:29:00
version: 0.07
---

# Functions and Their Properties

## Summary

This chapter establishes the central concept of a function and explores its key properties. Students learn function definition, notation, evaluation, domain, range, and the vertical line test. The chapter also covers graphing functions, intercepts, increasing and decreasing behavior, symmetry (even and odd functions), bounded functions, and positive/negative regions. These concepts form the language used throughout the rest of the course.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Function Definition
2. Function Notation
3. Domain
4. Range
5. Vertical Line Test
6. Function Evaluation
7. Piecewise Functions
8. Domain Restrictions
9. Graphing Functions
10. Intercepts
11. X-Intercept
12. Y-Intercept
13. Increasing Functions
14. Decreasing Functions
15. Constant Functions
16. Function Behavior
17. Positive and Negative Regions
18. Bounded Functions
19. Even Functions
20. Odd Functions
21. Symmetry

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)

---

!!! mascot-welcome "Meet the Star of the Course"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Functions are the main characters of pre-calculus — every chapter that follows is really a story about a particular family of functions. Let's learn the vocabulary we'll use to describe them, from notation to shape to symmetry.

## What a Function Is

A **function** is a rule that takes an input and produces exactly one output. The word "exactly" is the heart of the definition: a rule that sometimes gives 3 and sometimes gives −3 for the same input is not a function. Every legitimate function is a reliable machine — the same input always yields the same output.

We borrow the variable roles from Chapter 1. The **input** is the independent variable, and the **output** is the dependent variable. A function *assigns* each input to one specific output. The set of allowed inputs is the **domain**, and the set of outputs that actually appear is the **range**.

To make this precise, we can restate the definition three ways that all mean the same thing:

- *Rule form:* A function from set \( A \) to set \( B \) assigns each element of \( A \) to exactly one element of \( B \).
- *Pair form:* A function is a set of ordered pairs \( (x, y) \) in which no two pairs share the same \( x \).
- *Machine form:* A function is a box that takes one number in and returns one number out.

## Function Notation

Functions are almost always written using **function notation**: \( f(x) \), read aloud as "*f* of *x*." The letter \( f \) names the function; the expression inside the parentheses names the input. The whole expression \( f(x) \) names the output when \( x \) is the input.

This notation is more powerful than the equation form \( y = \ldots \) because it lets us refer to the output for a specific input without drawing a graph. If \( f(x) = 2x + 1 \), then \( f(3) \) is the single number produced when 3 is the input: \( f(3) = 7 \). The symbol \( f(3) \) is a number, not a formula — it is the answer after substitution.

A few conventions you will see throughout the course:

- We often use different letters for different functions: \( f, g, h \), or descriptive names like \( C(t) \) for cost as a function of time.
- Parentheses around the input do not mean multiplication — \( f(3) \) is "f of 3," not "f times 3."
- Any expression can appear inside the parentheses: \( f(x+2) \), \( f(-x) \), or even \( f(g(x)) \).

## Function Evaluation

**Evaluating** a function means substituting a specific value for the input and simplifying. It is the most common operation you will perform on a function, and the process is always the same: replace every occurrence of the input variable with the given value, then simplify using the order of operations from Chapter 1.

Suppose \( f(x) = x^2 - 2x + 5 \). To evaluate \( f(4) \), we replace every \( x \) with 4:

\[ f(4) = (4)^2 - 2(4) + 5 = 16 - 8 + 5 = 13 \]

Function evaluation also works for expressions, not just numbers. To find \( f(a + 1) \), we substitute the entire expression \( a+1 \) for \( x \):

\[ f(a+1) = (a+1)^2 - 2(a+1) + 5 = a^2 + 2a + 1 - 2a - 2 + 5 = a^2 + 4 \]

#### Diagram: Function Machine

<details markdown="1">
<summary>Interactive function machine that evaluates user-chosen inputs</summary>
Type: MicroSim
**sim-id:** function-machine<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a stylized "function machine" as a box in the center of the canvas. An input chute enters from the left labeled \( x \), and an output chute exits to the right labeled \( f(x) \). The rule currently loaded into the machine is displayed on the front of the box (e.g., \( f(x) = 2x + 1 \)).

Learning objective (Bloom's Applying): Students will evaluate a function at specific numeric and expression inputs and predict outputs before they are revealed.

Interactive controls:

- A text input lets the student type any input value (a number or simple expression like "3", "-2", or "a+1").
- A dropdown lets the student choose among five pre-loaded rules: \( 2x+1 \), \( x^2 \), \( x^2 - 2x + 5 \), \( \sqrt{x} \), and \( \frac{1}{x} \).
- A "Predict" button locks the student's typed answer, then a "Reveal" button animates the input traveling through the machine and shows the computed output. If the prediction matches, the output flashes gold.
- A "Next" button presents the next input in a preset challenge sequence.

Data visibility: On each run, the display shows three stages — the raw input, the substituted expression (e.g., \( 2(3) + 1 \)), and the simplified output. Students see the intermediate step, not just the final answer.

Instructional rationale: Step-through with concrete substituted values is appropriate for an Apply-level objective because it lets students verify their mental substitution matches the machine's substitution, catching errors in arithmetic and order of operations.

Canvas: 700 × 400 pixels, responsive via updateCanvasSize() in setup(). Maroon for the machine body, cyan-blue for input/output chutes, gold for correct answers.

Implementation: p5.js using createInput for the typed value, createSelect for the rule, createButton for Predict/Reveal/Next.
</details>

## The Vertical Line Test

When a function is drawn on the coordinate plane, its graph must obey the "exactly one output" rule visually. A vertical line on the coordinate plane represents a single \( x \)-value — every point on that vertical line shares the same \( x \)-coordinate. If the graph of the rule crosses that vertical line in two places, then that single \( x \) is assigned to two different \( y \) values. That is not allowed for a function.

The **vertical line test** formalizes this:

!!! info "Vertical Line Test"
    A graph in the \( xy \)-plane represents a function if and only if no vertical line intersects the graph more than once.

The test makes it easy to spot non-functions at a glance. A circle \( x^2 + y^2 = 25 \), for example, fails the test — the vertical line \( x = 3 \) passes through the circle at both \( (3, 4) \) and \( (3, -4) \). A parabola that opens sideways like \( x = y^2 \) also fails. A parabola that opens up or down, however, passes.

Before looking at the diagram below, note what "passes" and "fails" will look like: a passing graph is one you can sweep a vertical line across from left to right without ever hitting two points at once.

#### Diagram: Vertical Line Test Explorer

<details markdown="1">
<summary>Interactive test that drags a vertical line across multiple curves</summary>
Type: MicroSim
**sim-id:** vertical-line-test<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a coordinate plane with one curve drawn at a time. A draggable vertical red line lives on the plane; the student drags it left or right across the curve.

Learning objective (Bloom's Analyzing): Students will classify graphs as functions or non-functions by observing how many times a vertical line intersects them.

Visual elements:

- Coordinate plane from -10 to 10 on each axis with light gridlines.
- One curve drawn in maroon at a time, selected from a dropdown: parabola \( y = x^2 \), sideways parabola \( x = y^2 \), circle \( x^2 + y^2 = 16 \), line \( y = 2x - 1 \), absolute value \( y = |x| \), and square root \( y = \sqrt{x} \).
- A vertical cyan-blue line the student can drag horizontally across the plane.
- A counter at the top right displaying "Intersections: N" that updates in real time as the line moves.
- A banner at the bottom turning green ("Function so far") while N ≤ 1 for all positions the student has tested, and red ("Not a function — more than one output at \( x = \_\_ \)") the first time N ≥ 2.

Interactive controls:

- Dropdown to select which curve is displayed.
- "Auto-sweep" button that animates the vertical line from -10 to 10 across the plane, displaying intersection counts continuously.
- "Reset" button to clear the test banner.

Instructional rationale: The Analyze-level objective requires students to make a judgment based on observed behavior. A live intersection counter lets students test their hypothesis interactively rather than just memorizing which shapes are functions.

Canvas: 650 × 650 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for curve choice, createButton for Auto-sweep and Reset, and mouseDragged logic for the vertical line.
</details>

## Domain and Range

The **domain** of a function is the set of all valid inputs. The **range** is the set of all outputs the function actually produces. Domain lives on the \( x \)-axis; range lives on the \( y \)-axis.

Two kinds of reasoning determine a domain. The first is *context*: if \( A(r) \) gives the area of a circle with radius \( r \), then \( r \) cannot be negative, so the domain is \( r \ge 0 \). The second is *algebraic safety*: certain operations are undefined for some inputs, and those inputs must be excluded.

The three most common **domain restrictions** in pre-calculus come from three operations:

| Operation | Restriction | Example |
|----------|-------------|---------|
| Division \( \frac{1}{x} \) | Denominator cannot be zero | \( f(x) = \frac{1}{x-3} \): exclude \( x = 3 \) |
| Even root \( \sqrt{x} \) | Radicand cannot be negative | \( f(x) = \sqrt{x - 2} \): require \( x \ge 2 \) |
| Logarithm \( \log(x) \) | Argument must be positive | \( f(x) = \log(x + 1) \): require \( x > -1 \) |

Each restriction can be written using the interval or set-builder notation from Chapter 1. For \( f(x) = \sqrt{x-2} \), the domain is \( [2, \infty) \) in interval notation, or \( \{ x \mid x \ge 2 \} \) in set-builder notation.

Finding the range is usually harder than finding the domain because it requires reasoning about outputs. A quick method is to sketch the graph and read off the set of \( y \)-values covered. For \( f(x) = x^2 \), for instance, the graph never dips below the \( x \)-axis, so the range is \( [0, \infty) \).

!!! mascot-tip "Three Restriction Checks"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up three fingers">
    Whenever you meet a new function, run the three checks in order: *divide, root, log*. If none apply, the domain is all real numbers. This habit catches 95% of domain questions on the AP exam.

## Piecewise Functions

Sometimes a single rule cannot capture the behavior we want. A **piecewise function** stitches together two or more rules, each active on a different piece of the domain. The shipping fee that is \$5 for packages under 2 pounds and \$8 otherwise is naturally a piecewise function.

We write a piecewise function with a large brace and one rule per row, each paired with the interval on which the rule applies:

\[ f(x) = \begin{cases} 2x + 1 & \text{if } x < 0 \\ x^2 & \text{if } x \ge 0 \end{cases} \]

To evaluate a piecewise function at a specific input, first decide which piece owns that input, then apply that piece's rule. For the function above, \( f(-3) \) uses the first rule because \( -3 < 0 \), giving \( 2(-3) + 1 = -5 \). In contrast, \( f(2) \) uses the second rule because \( 2 \ge 0 \), giving \( 2^2 = 4 \).

The domain of a piecewise function is the union of all its pieces' domains. Its graph is the union of the pieces' graphs. A common source of error is forgetting whether each endpoint should be drawn as a closed dot (included) or an open dot (excluded). The inequality in each piece's definition tells you which — a \( \le \) or \( \ge \) marks an included endpoint.

## Graphing Functions

The **graph** of a function \( f \) is the set of all ordered pairs \( (x, f(x)) \) plotted on the coordinate plane. For each input \( x \) in the domain, we compute the output \( f(x) \), place a point at \( (x, f(x)) \), and repeat. The curve (or collection of dots) that emerges is the function's graph.

Graphs are the primary way pre-calculus students recognize, compare, and reason about functions. Throughout this course, you will build a visual library of function families — linear lines, parabolas, cubics, exponentials, sinusoids — and learn to tell one family from another at a glance. Before we can describe those shapes, though, we need a shared vocabulary for the features every graph shares.

## Intercepts

An **intercept** is a point where a graph crosses an axis. Because a graph can cross two axes, intercepts come in two kinds.

- The **y-intercept** is the point where the graph crosses the \( y \)-axis. Every point on the \( y \)-axis has \( x = 0 \), so the \( y \)-intercept occurs at \( x = 0 \). For a function \( f \), the \( y \)-intercept is \( (0, f(0)) \).
- An **x-intercept** is a point where the graph crosses the \( x \)-axis. Every point on the \( x \)-axis has \( y = 0 \), so \( x \)-intercepts occur where \( f(x) = 0 \). These inputs are also called **zeros** or **roots** of the function.

A function has at most one \( y \)-intercept (since the vertical line test allows only one output at \( x = 0 \)), but it can have many \( x \)-intercepts — or none. The parabola \( f(x) = x^2 + 1 \), for instance, sits entirely above the \( x \)-axis and has zero \( x \)-intercepts; its \( y \)-intercept is \( (0, 1) \).

The table below compares how to find each type of intercept for an arbitrary function.

| Intercept | How to find it | What it tells you |
|-----------|----------------|-------------------|
| \( y \)-intercept | Evaluate \( f(0) \) | The output when the input is 0 |
| \( x \)-intercepts | Solve \( f(x) = 0 \) | Inputs that produce output 0 (zeros) |

## Function Behavior: Increasing, Decreasing, Constant

Graphs do not just sit still — they rise, fall, and occasionally hold steady. We describe these trends with three terms:

- A function is **increasing** on an interval if larger inputs produce larger outputs — the graph rises as you move left to right.
- A function is **decreasing** on an interval if larger inputs produce smaller outputs — the graph falls as you move left to right.
- A function is **constant** on an interval if the output stays the same across all inputs — the graph is horizontal.

We describe behavior using the *interval of inputs*, not the \( y \)-values. For the parabola \( f(x) = x^2 \), the function is decreasing on \( (-\infty, 0) \) and increasing on \( (0, \infty) \). The switching point, \( x = 0 \), is called a **turning point**.

Notice how intervals and function behavior work together: a function's behavior can change from one interval to the next. The same graph can be increasing on one piece of the domain and decreasing on another. When we analyze a function, we break its domain into intervals where the behavior is uniform, then describe each interval separately.

#### Diagram: Function Behavior Labeler

<details markdown="1">
<summary>Interactive labeler for increasing, decreasing, and constant intervals</summary>
Type: MicroSim
**sim-id:** function-behavior-labeler<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a multi-feature graph (typically a cubic or piecewise curve) on a coordinate plane. The student divides the domain into intervals and labels each with a behavior type.

Learning objective (Bloom's Analyzing): Students will partition a function's domain into maximal intervals of uniform behavior and label each interval as increasing, decreasing, or constant.

Visual elements:

- A coordinate plane with a pre-drawn curve selected from a dropdown (cubic, absolute value, piecewise, or a sinusoidal fragment).
- Draggable vertical dividers the student places at the \( x \)-coordinates where behavior changes (turning points and corners).
- Three colored bands along the top of each sub-interval: blue for increasing, orange for decreasing, gray for constant.

Interactive controls:

- Dropdown to choose the curve.
- "Add Divider" button to place a new vertical divider at the current mouse position.
- Click on each band to cycle its label through increasing → decreasing → constant.
- "Check" button grades the student's labeling, highlighting any incorrectly labeled band in red.

Data visibility: Whenever the student hovers over the curve, the coordinates of the hovered point appear in a tooltip, so they can confirm that \( y \)-values are actually rising or falling.

Instructional rationale: Partitioning and labeling forces students to commit to specific boundaries where behavior changes, making turning points visible rather than hidden. Hovering to see coordinates gives concrete numeric evidence to back the classification.

Canvas: 800 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for curve choice, createButton for Add Divider and Check, mousePressed/mouseDragged for divider placement.
</details>

## Positive and Negative Regions

Related to where a function is going, we can ask *where it is*: above or below the \( x \)-axis. A function is **positive** on any interval where its outputs are positive (the graph sits above the \( x \)-axis) and **negative** where its outputs are negative (the graph sits below). The \( x \)-intercepts mark the boundaries between positive and negative regions.

Positive and negative regions are used heavily in the later chapters on polynomials and rational functions, where sign charts become the main tool for graphing. For now, remember the distinction: *increasing/decreasing* describes how the output is changing, while *positive/negative* describes what sign the output has.

## Bounded Functions

A function is **bounded above** if there is some horizontal line the graph never goes above — a ceiling, in other words. It is **bounded below** if there is a floor the graph never dips under. A function that has both a floor and a ceiling is simply **bounded**.

- \( f(x) = x^2 \) is bounded below (by 0) but not bounded above — outputs can be arbitrarily large.
- \( f(x) = \sin(x) \) is bounded both above (by 1) and below (by −1), so it is bounded.
- \( f(x) = x^3 \) is neither bounded above nor below — the graph runs off to \( \pm \infty \).

Boundedness is a global property; it is a statement about the *entire* range, not a piece of it. A function that dips to \(-1\) once and then runs off to \(-\infty\) is not bounded below, even though on a small interval it looks bounded.

## Symmetry: Even and Odd Functions

Some graphs have a built-in symmetry that simplifies analysis. There are two symmetries that pre-calculus cares about, named after the simplest polynomial that exhibits each.

- A function \( f \) is **even** if \( f(-x) = f(x) \) for every \( x \) in the domain. The graph is symmetric about the \( y \)-axis — reflecting across the \( y \)-axis leaves the graph unchanged.
- A function \( f \) is **odd** if \( f(-x) = -f(x) \) for every \( x \) in the domain. The graph is symmetric about the **origin** — rotating 180° around the origin leaves the graph unchanged.

The names come from the polynomials. Every polynomial of even degree built only from even powers (\( x^0, x^2, x^4, \ldots \)) is an even function; every polynomial built only from odd powers (\( x^1, x^3, x^5, \ldots \)) is an odd function. A polynomial that mixes the two — like \( x^2 + x \) — is neither.

!!! mascot-thinking "Algebraic Test Before Graphical Check"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema with hand to chin">
    To test for evenness or oddness, compute \( f(-x) \) and compare. If \( f(-x) = f(x) \), it's even. If \( f(-x) = -f(x) \), it's odd. Anything else — like \( f(x) = x^2 + x \), where \( f(-x) = x^2 - x \) — is neither. Don't guess from the graph when algebra can confirm it in two lines.

The table below summarizes the two symmetries side by side. Notice that "neither" is a legitimate answer — most functions fall into this category.

| Property | Algebraic test | Graphical symmetry | Example |
|----------|----------------|-------------------|---------|
| Even | \( f(-x) = f(x) \) | Reflection across \( y \)-axis | \( f(x) = x^2 \), \( \cos(x) \) |
| Odd | \( f(-x) = -f(x) \) | Rotation by 180° about origin | \( f(x) = x^3 \), \( \sin(x) \) |
| Neither | Neither test passes | No standard symmetry | \( f(x) = x^2 + x \) |

#### Diagram: Even and Odd Function Explorer

<details markdown="1">
<summary>Side-by-side comparison of even, odd, and neither symmetries</summary>
Type: interactive infographic
**sim-id:** even-odd-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic with three synchronized panels: the student picks a function from a dropdown, and each panel illustrates a different symmetry test on that function.

Learning objective (Bloom's Evaluating): Students will determine whether a function is even, odd, or neither by applying both algebraic and graphical tests and justifying the conclusion.

Panels:

- Left: the graph of \( f(x) \) plotted on a coordinate plane. A mirror reflection across the \( y \)-axis is drawn in translucent cyan on top. If the reflection and the original match, the panel flashes green and labels "Even ✓."
- Middle: the same graph rotated 180° about the origin, drawn in translucent gold on top. If the rotation matches the original, the panel flashes green and labels "Odd ✓."
- Right: the algebraic test. Shows the user-chosen \( f(x) \), computes and displays \( f(-x) \), and compares to \( f(x) \) and \( -f(x) \). The conclusion (Even, Odd, or Neither) is printed below.

Interactive controls:

- Dropdown to select from six functions: \( x^2 \), \( x^3 \), \( |x| \), \( x^2 + x \), \( \frac{1}{x} \), and \( \cos(x) \).
- "Compute" button that animates the algebraic substitution for \( f(-x) \) step by step.
- Checkboxes to toggle the reflection overlay and rotation overlay on or off.

Instructional rationale: The Evaluate-level objective requires students to justify a classification. Showing the algebraic proof alongside the visual symmetry lets students connect two independent lines of evidence — a student who sees both green checks develops a far stronger grasp than one who memorizes "x² is even."

Canvas: 900 × 450 pixels (three 300 × 450 panels), responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for the function, createButton for Compute, createCheckbox for overlay toggles.
</details>

## Putting It All Together

Every question we will ask about a function for the rest of this course is some combination of the properties introduced here. When we study linear, quadratic, polynomial, exponential, and trigonometric functions, we will describe each by listing the same features:

- Its rule, in function notation.
- Its domain (valid inputs) and range (produced outputs).
- Its intercepts — where it crosses each axis.
- Where it is increasing, decreasing, or constant.
- Where its outputs are positive or negative.
- Whether it is bounded above, below, both, or neither.
- Whether it has even, odd, or no symmetry.

Master this checklist now, and every function family later in the course becomes a matter of filling in the blanks.

!!! mascot-celebration "Vocabulary Unlocked"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now speak the language of functions — notation, domain, range, behavior, intercepts, and symmetry. Every chapter from here on tells the story of a specific function family using exactly this vocabulary. Let's go watch functions in motion.

??? question "Quick Check: What's \( f(-2) \) if \( f(x) = x^2 - 3x + 1 \)?"
    \( f(-2) = (-2)^2 - 3(-2) + 1 = 4 + 6 + 1 = 11 \). The key step is that \( -3(-2) = +6 \), not \( -6 \).

??? question "Quick Check: Is \( f(x) = x^4 - x^2 \) even, odd, or neither?"
    \( f(-x) = (-x)^4 - (-x)^2 = x^4 - x^2 = f(x) \). Even. Every term has an even power, which is a reliable shortcut.
