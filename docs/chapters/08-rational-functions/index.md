---
title: Rational Functions
description: Rational expressions, domain, vertical and horizontal and slant asymptotes, holes, end behavior, graphing, and rational inequalities.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:48:00
version: 0.07
---

# Rational Functions

## Summary

This chapter introduces rational functions and their unique features. Students learn about rational expressions, simplification, and domain restrictions. The chapter covers vertical, horizontal, and slant asymptotes, holes in graphs, rational function zeros, and end behavior. Students develop skills in graphing rational functions by combining all of these features, and the chapter concludes with solving rational inequalities.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Rational Function Definition
2. Rational Expressions
3. Simplifying Rational Expressions
4. Vertical Asymptotes
5. Horizontal Asymptotes
6. Slant Asymptotes
7. Holes in Graphs
8. Rational Function Zeros
9. Rational Function Domain
10. End Behavior of Rationals
11. Rational Function Graphs
12. Rational Inequalities

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 6: Polynomial Fundamentals](../06-polynomial-fundamentals/index.md)
- [Chapter 7: Polynomial Zeros and Graphs](../07-polynomial-zeros-and-graphs/index.md)

---

!!! mascot-welcome "Polynomials in a Ratio"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    What happens when we divide one polynomial by another? The result is a rational function — a function with all new behavior: forbidden inputs, invisible vertical walls, and horizontal ceilings. This chapter is the grand tour.

## What Is a Rational Function?

A **rational function** is a function that can be written as a ratio of two polynomials:

\[ R(x) = \frac{P(x)}{Q(x)} \]

where \( P(x) \) and \( Q(x) \) are polynomials and \( Q(x) \) is not the zero polynomial. The name *rational* comes from the word *ratio* — a rational function is literally a polynomial ratio, much as a rational number is a ratio of integers.

Every polynomial is trivially a rational function (divide by \( Q(x) = 1 \)), but the interesting rational functions are those where the denominator actually involves \( x \). Division by a variable polynomial opens up behaviors no polynomial can produce:

- Inputs that are forbidden because the denominator is zero (not in the domain).
- **Asymptotes** — lines the graph approaches but never touches.
- **Holes** — single points removed from an otherwise smooth curve.

These features make rational functions the first family we have met whose graphs are not a single connected piece.

## Rational Expressions and Simplification

The algebraic object inside a rational function — \( P(x)/Q(x) \) before we think of it as a function — is called a **rational expression**. Rational expressions can be simplified, added, subtracted, multiplied, and divided using the same rules that govern rational numbers, with polynomial factoring playing the role that integer factoring plays for numeric fractions.

**Simplifying a rational expression** means canceling any factor that appears in both the numerator and the denominator. The one subtle rule: canceling a factor changes the expression's *domain*, because the canceled factor's zero is still a forbidden input in the original.

Example:

\[ \frac{x^2 - 1}{x - 1} = \frac{(x-1)(x+1)}{x-1} \]

Cancelling \( (x - 1) \) gives the simpler expression \( x + 1 \), but \( x = 1 \) is still forbidden in the *original* rational function — it would require dividing by zero. The simplified version has a **hole** at \( x = 1 \), which we will see is a key graphical feature.

We will treat simplification carefully: cancel factors to reduce the expression, but always track which inputs were forbidden in the original denominator. They become either vertical asymptotes or holes.

## Domain of a Rational Function

The **domain** of a rational function \( R(x) = P(x)/Q(x) \) is the set of all real numbers \( x \) except those that make the original denominator \( Q(x) \) equal to zero. These forbidden inputs are called the **domain exclusions**.

To find the domain, factor \( Q(x) \) and locate its zeros. Every zero of the original \( Q(x) \) — even if it cancels with a factor in \( P(x) \) — is excluded from the domain.

Example: \( R(x) = \dfrac{x + 2}{(x - 3)(x + 5)} \). The denominator is zero when \( x = 3 \) or \( x = -5 \). Domain: all real numbers *except* 3 and \( -5 \).

Excluded inputs are not all alike. Each one ends up on the graph in one of two ways:

- A **vertical asymptote** at \( x = c \) if \( (x - c) \) appears in the denominator but *not* in the numerator after canceling, or appears with higher multiplicity in the denominator.
- A **hole** at \( x = c \) if \( (x - c) \) cancels completely between numerator and denominator.

The next two sections explain each case in detail.

## Vertical Asymptotes

A **vertical asymptote** is a vertical line \( x = c \) that the graph of \( R(x) \) approaches as inputs close in on \( c \) from either side. The output values grow without bound in magnitude — heading toward \( +\infty \) or \( -\infty \) — but the graph never actually touches the line \( x = c \).

To find vertical asymptotes:

1. Factor the numerator and denominator.
2. Cancel any common factors.
3. Every remaining factor \( (x - c) \) in the denominator produces a vertical asymptote at \( x = c \).

Example: \( R(x) = \dfrac{x + 2}{(x - 3)(x + 5)} \). No common factors to cancel, so vertical asymptotes at \( x = 3 \) and \( x = -5 \).

The graph's behavior near each asymptote depends on the sign of \( R(x) \) on each side. Testing a point just to the left and just to the right of \( x = 3 \) in the example:

- Just left of 3 (say \( x = 2.9 \)): numerator \( \approx 4.9 > 0 \); denominator \( \approx (-0.1)(7.9) < 0 \). So \( R(2.9) < 0 \) — graph heads to \( -\infty \).
- Just right of 3 (say \( x = 3.1 \)): numerator \( \approx 5.1 > 0 \); denominator \( \approx (0.1)(8.1) > 0 \). So \( R(3.1) > 0 \) — graph heads to \( +\infty \).

The graph plunges down on the left of \( x = 3 \) and rockets up on the right. Sign analysis around each asymptote is how we know which way the graph blows up.

!!! mascot-warning "Asymptotes Are Not Lines on the Graph"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    A vertical asymptote is a *reference line* the graph approaches — not a part of the graph itself. Draw it as a dashed line so it is clear it is a guide, not a piece of the function. The function is never defined at the asymptote.

## Holes in Graphs

A **hole** occurs at \( x = c \) when the factor \( (x - c) \) cancels completely between the numerator and the denominator. The simplified rational function is defined at \( x = c \), but the *original* function is not — so a single point is missing from the graph.

Example: \( R(x) = \dfrac{(x - 1)(x + 4)}{(x - 1)(x + 2)} \). The \( (x - 1) \) factor cancels, leaving \( \dfrac{x + 4}{x + 2} \) for all \( x \ne 1 \). The simplified form has value \( \dfrac{1 + 4}{1 + 2} = \dfrac{5}{3} \) at \( x = 1 \), so the graph looks like \( \dfrac{x + 4}{x + 2} \) with a single open circle at \( \left(1, \tfrac{5}{3}\right) \).

Holes and vertical asymptotes are the two possible fates of a denominator zero. The rule is clean:

- Factor fully cancels → hole (one open-circle point missing).
- Factor does not cancel (or cancels partially) → vertical asymptote (infinite vertical blowup).

Before we get to end behavior, the table below summarizes the local behavior at each domain exclusion.

| Situation | Graphical feature | Example |
|-----------|-------------------|---------|
| Factor \( (x - c) \) in denominator only | Vertical asymptote at \( x = c \) | \( \dfrac{1}{x - 2} \) at \( x = 2 \) |
| Factor \( (x - c) \) in both, same multiplicity | Hole at \( x = c \) | \( \dfrac{(x - 1)(x + 4)}{(x - 1)(x + 2)} \) at \( x = 1 \) |
| Factor \( (x - c) \) in both, higher multiplicity in denominator | Vertical asymptote at \( x = c \) | \( \dfrac{x - 2}{(x - 2)^2} \) at \( x = 2 \) |

## Rational Function Zeros

The **zeros** of a rational function are the inputs where \( R(x) = 0 \). A fraction equals zero only when its numerator equals zero *and* its denominator does not. So:

- Find the zeros of the numerator.
- Discard any that also zero the original denominator (those are holes, not zeros).
- What remains are the rational function's zeros — the \( x \)-intercepts of the graph.

Example: \( R(x) = \dfrac{(x + 2)(x - 1)}{(x - 1)(x + 5)} \). Numerator zeros: \( x = -2 \) and \( x = 1 \). But \( x = 1 \) also zeros the original denominator, so it is a hole. The only genuine zero is \( x = -2 \), which is the graph's single \( x \)-intercept.

## End Behavior and Horizontal Asymptotes

Rational functions have **end behavior** — the same large-\( |x| \) behavior we studied for polynomials — but with a new possibility. As \( |x| \) grows, \( R(x) = P(x)/Q(x) \) behaves like the ratio of leading terms of \( P \) and \( Q \). Comparing the degrees \( m = \deg P \) and \( n = \deg Q \) gives three cases:

- **\( m < n \) (numerator lower degree):** the ratio shrinks toward 0 for large \( |x| \). The graph has a **horizontal asymptote** at \( y = 0 \).
- **\( m = n \) (equal degrees):** the ratio approaches the ratio of the leading coefficients. The graph has a horizontal asymptote at \( y = a_m / b_n \), where \( a_m \) and \( b_n \) are the two leading coefficients.
- **\( m > n \) by exactly 1 (numerator one degree higher):** the ratio behaves like a linear expression. The graph has a **slant asymptote** (also called an oblique asymptote) found by polynomial long division of \( P(x) \) by \( Q(x) \) — the quotient (ignoring the remainder) is the equation of the line.
- **\( m > n \) by 2 or more:** no horizontal or slant asymptote; the graph's ends grow like a polynomial.

A **horizontal asymptote** is a horizontal line that the graph approaches as \( x \to \pm\infty \). Unlike a vertical asymptote, a graph *can* cross its horizontal asymptote at finite \( x \)-values; the asymptote only controls the *extreme* ends.

A **slant asymptote** is a non-horizontal line that the graph approaches. Slant asymptotes arise only when the numerator's degree is exactly one more than the denominator's. Long division produces the asymptote directly.

Example of a slant asymptote: \( R(x) = \dfrac{x^2 + 1}{x - 2} \). Degrees differ by exactly 1. Long division:

\[ \frac{x^2 + 1}{x - 2} = x + 2 + \frac{5}{x - 2} \]

For large \( |x| \), the \( \tfrac{5}{x - 2} \) term vanishes, so the graph approaches the line \( y = x + 2 \). That line is the slant asymptote.

!!! mascot-tip "Degree Comparison Is Everything"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    To decide what kind of end-behavior asymptote a rational function has, compare only the *degrees* of the numerator and denominator. Lower numerator → horizontal at 0. Equal → horizontal at ratio of leading coefficients. One higher → slant line from long division. Two or more higher → no end-behavior asymptote at all.

## Graphing a Rational Function

A rational function graph is built by layering all the features we have collected. Follow a seven-step procedure:

1. **Factor** the numerator and denominator fully.
2. **Simplify** by canceling any common factors; note each canceled factor as a hole.
3. **Domain exclusions** → each original denominator zero is either a hole or a vertical asymptote.
4. **Zeros** → solve (simplified) numerator = 0; discard any that were holes.
5. **y-intercept** → compute \( R(0) \), provided 0 is in the domain.
6. **End-behavior asymptote** → compare numerator and denominator degrees; find horizontal or slant asymptote.
7. **Sign chart and sketch** → between the asymptotes and zeros, test the sign of \( R(x) \) to see which side of the \( x \)-axis the graph lives on; draw the curve approaching each asymptote correctly.

Worked example: \( R(x) = \dfrac{x - 1}{x^2 - 4} \).

- Factor denominator: \( R(x) = \dfrac{x - 1}{(x - 2)(x + 2)} \). No common factors.
- Domain exclusions: \( x = 2 \), \( x = -2 \). Both are vertical asymptotes.
- Zero: \( x = 1 \).
- y-intercept: \( R(0) = \dfrac{-1}{-4} = \dfrac{1}{4} \).
- Numerator degree 1, denominator degree 2 → horizontal asymptote at \( y = 0 \).
- Sign chart on the four intervals produced by \( x = -2, 1, 2 \): negative on \( (-\infty, -2) \), positive on \( (-2, 1) \), negative on \( (1, 2) \), positive on \( (2, \infty) \). Graph lives accordingly.

#### Diagram: Rational Function Explorer

<details markdown="1">
<summary>Interactive layered display of every rational function feature</summary>
Type: MicroSim
**sim-id:** rational-function-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that lets students construct a rational function from factored form and reveals each graphical feature — asymptotes, holes, zeros, intercept, end behavior — as separate toggleable layers.

Learning objective (Bloom's Applying): Students will apply the seven-step graphing procedure to sketch a rational function and verify that each layer of the graph corresponds to an algebraic feature.

Visual elements:

- A coordinate plane from -8 to 8 on each axis with gridlines.
- A maroon curve drawn piecewise across the domain of the function.
- Dashed cyan-blue lines for each vertical asymptote and the horizontal/slant asymptote.
- Hollow cyan dots marking each hole; filled black dots marking each zero and the y-intercept.
- A side panel listing the seven-step procedure with a checkbox and a live toggle for each visual layer.

Interactive controls:

- Factored-form input fields for up to three linear factors in the numerator and three in the denominator, with multiplicity.
- Preset buttons: \( \dfrac{1}{x} \), \( \dfrac{x-1}{x^2-4} \), \( \dfrac{(x-1)(x+4)}{(x-1)(x+2)} \), \( \dfrac{x^2+1}{x-2} \).
- "Show Sign Chart" toggle that overlays a sign-analysis strip beneath the x-axis showing intervals where \( R(x) \) is positive or negative.

Instructional rationale: Apply-level graphing becomes reliable when each visual feature is tied back to a specific algebraic fact. Layer-by-layer construction prevents the "memorize the whole picture" trap and makes errors traceable.

Canvas: 1000 × 650 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createInput for factor entry, createButton for presets, createCheckbox for layer toggles and sign chart.
</details>

## Rational Inequalities

A **rational inequality** asks for all inputs where \( R(x) > 0 \), \( R(x) < 0 \), \( R(x) \ge 0 \), or \( R(x) \le 0 \). The strategy is straightforward but has one pitfall: you cannot multiply both sides by the denominator because the denominator's sign changes across vertical asymptotes.

The safe procedure is the **sign chart**:

1. Move all terms to one side so the inequality reads \( R(x) > 0 \) (or \( \ge \), \( < \), \( \le \)) with the other side zero.
2. Simplify \( R(x) \) into a single rational expression \( \dfrac{P(x)}{Q(x)} \) with fully factored numerator and denominator.
3. Find all **critical values**: zeros of \( P(x) \) and zeros of \( Q(x) \).
4. Mark these critical values on a number line; they partition the real line into intervals.
5. Test one value in each interval; record the sign of \( R \) on that interval.
6. Collect the intervals with the desired sign. Use open endpoints at domain exclusions; use closed endpoints at zeros if the inequality is \( \ge \) or \( \le \).

Worked example: solve \( \dfrac{x - 1}{x^2 - 4} \ge 0 \).

- Critical values: \( x = 1 \) (zero of numerator), \( x = \pm 2 \) (zeros of denominator).
- Number line split at \( -2, 1, 2 \) — four intervals.
- Test values: \( R(-3) < 0 \), \( R(0) > 0 \), \( R(1.5) < 0 \), \( R(3) > 0 \).
- Want \( R \ge 0 \): include \( (-2, 1] \) and \( (2, \infty) \). Include \( x = 1 \) (zero, satisfies equality). Exclude \( x = -2 \) and \( x = 2 \) (not in domain).

Solution: \( (-2, 1] \cup (2, \infty) \).

!!! mascot-thinking "Why Not Just Multiply Out?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    With polynomial equations, multiplying both sides by something is safe. With rational inequalities it is dangerous: the denominator might be negative in some intervals and positive in others, which flips the inequality sign for some inputs but not others. The sign-chart method avoids the trap entirely.

## Putting It All Together

Rational functions are the first family where the graph can come apart into multiple pieces. Every unfamiliar feature — asymptotes, holes, sign changes — comes from a simple cause: dividing by a polynomial that can be zero.

The key ideas to carry forward:

- A **rational function** is a ratio of two polynomials; its **domain** excludes zeros of the denominator.
- Each excluded input is a **hole** (if the factor cancels) or a **vertical asymptote** (if it does not).
- **Zeros** come from the numerator after simplification.
- End behavior produces a **horizontal asymptote**, a **slant asymptote**, or no asymptote, depending on how numerator and denominator degrees compare.
- Graphing layers these features with a **seven-step procedure**.
- **Rational inequalities** are solved by a sign chart on a number line — never by multiplying through.

!!! mascot-celebration "Onward Through the Asymptotes"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now handle the most structurally complex family on the AP Pre-Calculus exam — the one with disconnected graphs, infinite behavior, and multiple kinds of asymptotes. The rest of Unit 1 is about to feel like a breeze!

??? question "Quick Check: Find the vertical asymptotes of \( R(x) = \dfrac{(x-1)(x+2)}{(x-1)(x-3)} \)."
    Cancel \( (x-1) \): hole at \( x = 1 \). Remaining denominator factor \( (x - 3) \): vertical asymptote at \( x = 3 \).

??? question "Quick Check: Does \( R(x) = \dfrac{2x + 1}{x^2 + 3} \) have a horizontal asymptote? Where?"
    Numerator degree 1 < denominator degree 2, so horizontal asymptote at \( y = 0 \).

??? question "Quick Check: Solve \( \dfrac{x - 2}{x + 1} < 0 \)."
    Critical values: \( x = 2 \) (zero), \( x = -1 \) (asymptote). Test intervals: negative on \( (-1, 2) \). Solution: \( (-1, 2) \).
