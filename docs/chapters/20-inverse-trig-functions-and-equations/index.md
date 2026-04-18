---
title: Inverse Trigonometric Functions and Equations
description: Inverse trig functions — arcsine, arccosine, arctangent — with their restricted domains, ranges, and graphs, plus techniques for solving trigonometric equations including general solutions, solutions in an interval, inequalities, and multiple-angle equations.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 21:40:00
version: 0.07
---

# Inverse Trigonometric Functions and Equations

## Summary

This chapter covers the inverse trigonometric functions and techniques for solving trigonometric equations. Students learn arcsine, arccosine, and arctangent, including their restricted domains, ranges, and graphs. The chapter explores composing trigonometric and inverse trigonometric functions. Students then develop skills for solving trigonometric equations, finding general solutions and solutions in specific intervals, solving trigonometric inequalities, and working with multiple angle equations.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Arcsine
2. Arccosine
3. Arctangent
4. Inverse Trig Domains
5. Inverse Trig Ranges
6. Inverse Trig Graphs
7. Composing Trig Inverses
8. Solving Trig Equations
9. General Solutions
10. Solutions in an Interval
11. Trig Inequalities
12. Multiple Angle Equations

## Prerequisites

This chapter builds on concepts from:

- [Chapter 11: Composition and Inverse Functions](../11-composition-and-inverse-functions/index.md)
- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)
- [Chapter 16: Trigonometric Functions](../16-trigonometric-functions/index.md)
- [Chapter 19: Trigonometric Identities](../19-trigonometric-identities/index.md)

---

!!! mascot-welcome "Undoing a Trig Function"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Given an angle, a trig function returns a ratio. But often we have the ratio and need the angle. That's where inverse trig functions come in — they reverse the direction. In this chapter we define those inverses carefully and use them to solve equations.

## The Need for Inverse Trig Functions

Suppose we know that \( \sin\theta = 0.5 \). Which angle \( \theta \) produced this value? Looking at the unit circle, we find \( \theta = \pi/6 \) — but also \( \theta = 5\pi/6 \), \( \theta = \pi/6 + 2\pi \), \( \theta = 5\pi/6 + 2\pi \), and infinitely many other angles. A single output of 0.5 corresponds to infinitely many inputs.

This is a problem: a well-defined function must return exactly one output for each input. Trig functions are not one-to-one on their entire domain, so their inverses cannot exist on that entire domain. The fix is to **restrict** the domain of each trig function to a piece where it is one-to-one, then invert that restricted piece.

Before defining the three inverse functions, recall the rule from Chapter 11:

- A function has an inverse if and only if it is one-to-one — each output comes from exactly one input.
- We test this graphically with the horizontal line test.
- If a function fails the test, we can still define an inverse by restricting its domain to a piece that passes.

Every inverse trig function you meet in this chapter is defined on a carefully chosen restricted domain.

## Arcsine

The **arcsine** function, written \( \arcsin(x) \) or \( \sin^{-1}(x) \), answers the question: "Which angle has a sine value of \( x \)?" Because sine repeats infinitely, we restrict our answer to the interval \( [-\pi/2, \pi/2] \) — the right half of the unit circle, where sine is one-to-one.

Formally:

\[ y = \arcsin(x) \iff \sin(y) = x \quad \text{and} \quad -\frac{\pi}{2} \leq y \leq \frac{\pi}{2} \]

For example:

- \( \arcsin(0) = 0 \)
- \( \arcsin(1/2) = \pi/6 \)
- \( \arcsin(1) = \pi/2 \)
- \( \arcsin(-1/2) = -\pi/6 \) (not \( 7\pi/6 \), because we must stay in the restricted range)

!!! mascot-warning "\( \sin^{-1} \) Does Not Mean \( 1/\sin \)"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    The notation \( \sin^{-1}(x) \) is a standard shorthand for the inverse function arcsine. It does **not** mean \( 1/\sin(x) \) — that is cosecant, written \( \csc(x) \). This is one of the most common notation traps in trigonometry.

## Arccosine

The **arccosine** function, written \( \arccos(x) \) or \( \cos^{-1}(x) \), answers "Which angle has a cosine value of \( x \)?" The restricted domain for cosine is \( [0, \pi] \) — the upper half of the unit circle, where cosine is one-to-one.

\[ y = \arccos(x) \iff \cos(y) = x \quad \text{and} \quad 0 \leq y \leq \pi \]

For example:

- \( \arccos(1) = 0 \)
- \( \arccos(1/2) = \pi/3 \)
- \( \arccos(0) = \pi/2 \)
- \( \arccos(-1/2) = 2\pi/3 \)
- \( \arccos(-1) = \pi \)

## Arctangent

The **arctangent** function, written \( \arctan(x) \) or \( \tan^{-1}(x) \), answers "Which angle has a tangent value of \( x \)?" The restricted domain for tangent is the open interval \( (-\pi/2, \pi/2) \). The endpoints are excluded because tangent has vertical asymptotes there.

\[ y = \arctan(x) \iff \tan(y) = x \quad \text{and} \quad -\frac{\pi}{2} < y < \frac{\pi}{2} \]

For example:

- \( \arctan(0) = 0 \)
- \( \arctan(1) = \pi/4 \)
- \( \arctan(\sqrt{3}) = \pi/3 \)
- \( \arctan(-1) = -\pi/4 \)

## Inverse Trig Domains

The domain of an inverse trig function is the range of the corresponding original function. Sine and cosine only produce outputs between -1 and 1, so their inverses only accept inputs in that range. Tangent produces all real numbers, so arctangent accepts all real numbers.

## Inverse Trig Ranges

The range of an inverse trig function is the restricted domain we chose for the original. The specific choices are conventions adopted worldwide so that everyone computes the same numerical answer.

The following table summarizes the domain and range for all three inverse functions:

| Function | Domain | Range |
|---|---|---|
| \( \arcsin(x) \) | \( [-1, 1] \) | \( [-\pi/2, \pi/2] \) |
| \( \arccos(x) \) | \( [-1, 1] \) | \( [0, \pi] \) |
| \( \arctan(x) \) | all real numbers | \( (-\pi/2, \pi/2) \) |

## Inverse Trig Graphs

The graph of an inverse function is the reflection of the original function across the line \( y = x \). Because the original functions have restricted domains, their inverse graphs consist of just one "branch" of what could otherwise be an infinite cascade of points.

Key features of each graph:

- **Arcsine:** S-shaped curve passing through the origin, bounded between \( y = -\pi/2 \) and \( y = \pi/2 \), rising from left to right. Domain \( [-1, 1] \).
- **Arccosine:** Curve descending from \( (-1, \pi) \) to \( (1, 0) \), passing through \( (0, \pi/2) \). Domain \( [-1, 1] \).
- **Arctangent:** S-shaped curve passing through the origin, with horizontal asymptotes at \( y = \pi/2 \) (as \( x \to \infty \)) and \( y = -\pi/2 \) (as \( x \to -\infty \)). Domain all real numbers.

#### Diagram: Inverse Trig Graph Explorer

<iframe src="../../sims/inverse-trig-graphs/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Inverse Trig Graph Explorer</summary>
Type: microsim
**sim-id:** inverse-trig-graphs<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Understand, L2, interpret): Interpret each inverse trig graph as the reflection of a restricted piece of the corresponding trig function across the line \( y = x \).

Canvas layout:
- Left half: original trig function graph on \( [-2\pi, 2\pi] \) with the restricted piece highlighted
- Right half: corresponding inverse trig graph
- Dashed line \( y = x \) drawn across the full display to make the reflection visible

Visual elements:
- Original trig curve in gray with the restricted piece in maroon
- Inverse curve in maroon on the right panel
- Horizontal asymptote lines in red for arctangent
- Axis labels showing \( \pi/2 \), \( \pi \), etc. as tick marks
- Moving point with coordinates displayed as the user drags the input slider

Interactive controls:
- Radio buttons: select sine, cosine, or tangent
- Slider: input value on the inverse function
- Toggle: show / hide reflection line \( y = x \)
- Toggle: animate reflection from original to inverse

Data Visibility Requirements:
- Stage 1: Show the selected trig function's restricted domain highlighted
- Stage 2: Show \( (a, b) \) on the original graph corresponding to the user's input
- Stage 3: Show the reflected point \( (b, a) \) on the inverse graph
- Stage 4: Display the numerical values and the inverse function notation

Instructional Rationale: Side-by-side display plus slider-driven reflection makes the abstract "swap inputs and outputs" rule concrete. Students can verify each point's reflection before seeing the full curve.

Implementation: p5.js with responsive canvas.
</details>

## Composing Trig Inverses

**Composing trig inverses** means applying a trig function and its inverse one after the other. When the composition direction and the input are both within the restricted domain, the compositions collapse to the identity:

\[ \sin(\arcsin(x)) = x \quad \text{for } x \in [-1, 1] \]
\[ \arcsin(\sin(\theta)) = \theta \quad \text{for } \theta \in [-\pi/2, \pi/2] \]

The same pattern holds for cosine and tangent, each on their own restricted interval. But when the input is outside the restricted interval, the composition may not equal the input. For example, \( \arcsin(\sin(3\pi/4)) = \arcsin(\sqrt{2}/2) = \pi/4 \), not \( 3\pi/4 \), because arcsine's range does not include \( 3\pi/4 \).

A more interesting case is composing a trig function with a **different** inverse trig function, such as \( \cos(\arctan(x)) \). The standard move is to draw a right triangle with the angle \( \theta = \arctan(x) \):

- Since \( \tan\theta = x = x/1 \), the opposite side is \( x \) and the adjacent side is 1.
- The hypotenuse is \( \sqrt{x^2 + 1} \) by the Pythagorean theorem.
- Therefore \( \cos\theta = \text{adjacent}/\text{hypotenuse} = 1/\sqrt{x^2 + 1} \).

So \( \cos(\arctan(x)) = \dfrac{1}{\sqrt{x^2 + 1}} \) for all real \( x \).

## Solving Trig Equations

A **trigonometric equation** is an equation whose unknown appears inside a trig function. **Solving trig equations** draws on three tools: inverse trig functions (to find one solution), the unit circle (to find other solutions within one period), and the periodicity of trig functions (to extend to all solutions).

**Basic solving procedure for an equation like \( \sin\theta = k \):**

1. **Isolate the trig function** on one side if needed.
2. **Find the reference angle** using the inverse: \( \alpha = \arcsin(|k|) \).
3. **Identify all solutions in \( [0, 2\pi) \)** using the unit circle and reference angle rules.
4. **Extend to all solutions** by adding integer multiples of the period.

For example, solve \( \sin\theta = 1/2 \):

- Reference angle: \( \alpha = \arcsin(1/2) = \pi/6 \).
- Sine is positive in quadrants I and II, so solutions in \( [0, 2\pi) \) are \( \theta = \pi/6 \) and \( \theta = \pi - \pi/6 = 5\pi/6 \).
- The full solution set is \( \theta = \pi/6 + 2\pi n \) or \( \theta = 5\pi/6 + 2\pi n \) for any integer \( n \).

## General Solutions

A **general solution** gives every angle that satisfies the equation, typically written with an integer parameter \( n \) that runs over all integers. For sine and cosine, solutions repeat every \( 2\pi \); for tangent, solutions repeat every \( \pi \).

The standard templates for the general solution of basic trig equations are:

| Equation | General solution |
|---|---|
| \( \sin\theta = k \) | \( \theta = \arcsin(k) + 2\pi n \) or \( \theta = \pi - \arcsin(k) + 2\pi n \) |
| \( \cos\theta = k \) | \( \theta = \pm\arccos(k) + 2\pi n \) |
| \( \tan\theta = k \) | \( \theta = \arctan(k) + \pi n \) |

In all three rows, \( n \) ranges over all integers. The tangent template is simpler because tangent's period is \( \pi \), not \( 2\pi \).

## Solutions in an Interval

Often a problem asks only for solutions within a specific interval, usually \( [0, 2\pi) \) or \( [0, 360°) \). To find **solutions in an interval**, first write down the general solution, then choose integer values of \( n \) that place \( \theta \) inside the interval, discarding any that fall outside.

**Example:** Find all solutions of \( \cos\theta = -\sqrt{2}/2 \) in \( [0, 2\pi) \).

- Reference angle: \( \alpha = \arccos(\sqrt{2}/2) = \pi/4 \).
- Cosine is negative in quadrants II and III, so solutions are \( \theta = \pi - \pi/4 = 3\pi/4 \) and \( \theta = \pi + \pi/4 = 5\pi/4 \).
- Both values lie in \( [0, 2\pi) \), so the answer is \( \theta = 3\pi/4, \, 5\pi/4 \).

## Trig Inequalities

A **trigonometric inequality** asks for the set of angles where a trig expression is less than, greater than, or not equal to some value. The standard approach:

1. Solve the corresponding equation to find the **boundary angles**.
2. Sketch the trig function's graph and mark the boundary angles.
3. Read off the intervals where the graph lies on the correct side of the horizontal threshold.

**Example:** Solve \( \sin\theta > 1/2 \) on \( [0, 2\pi) \).

- Solve \( \sin\theta = 1/2 \): boundary angles are \( \pi/6 \) and \( 5\pi/6 \).
- The sine graph is above \( y = 1/2 \) between these two angles.
- Solution: \( \theta \in (\pi/6, 5\pi/6) \).

## Multiple Angle Equations

A **multiple angle equation** contains a trig function of a multiple of \( \theta \), such as \( \sin(2\theta) = 1/2 \) or \( \cos(3\theta) = 0 \). These require one extra step in the general-solution process because changing variables compresses the period.

**Procedure for \( \sin(k\theta) = c \):**

1. Let \( u = k\theta \), so the equation becomes \( \sin(u) = c \).
2. Write the general solution for \( u \).
3. Divide through by \( k \) to get the general solution for \( \theta \).
4. For problems on a specific interval, list enough integer values of \( n \) to cover that interval.

**Example:** Find all solutions of \( \sin(2\theta) = 1/2 \) in \( [0, 2\pi) \).

- Let \( u = 2\theta \). The range for \( \theta \in [0, 2\pi) \) becomes \( u \in [0, 4\pi) \).
- Solve \( \sin u = 1/2 \) on \( [0, 4\pi) \): \( u = \pi/6, \, 5\pi/6, \, 13\pi/6, \, 17\pi/6 \).
- Divide by 2: \( \theta = \pi/12, \, 5\pi/12, \, 13\pi/12, \, 17\pi/12 \).

Notice we got four solutions instead of two because the doubled angle sweeps through two full cycles while \( \theta \) sweeps through one. Here is the rule in general:

| Equation form | Solutions in \( [0, 2\pi) \) |
|---|---|
| \( \sin\theta = c \) (one coefficient) | up to 2 |
| \( \sin(2\theta) = c \) (double angle) | up to 4 |
| \( \sin(3\theta) = c \) (triple angle) | up to 6 |
| \( \sin(k\theta) = c \) | up to \( 2k \) |

#### Diagram: Trig Equation Solution Unit Circle

<iframe src="../../sims/trig-equation-unit-circle/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Trig Equation Solution Unit Circle</summary>
Type: microsim
**sim-id:** trig-equation-unit-circle<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, solve): Apply unit-circle reasoning to find all solutions of a trigonometric equation in a given interval.

Canvas layout:
- Left half: unit circle with the relevant horizontal or vertical line corresponding to the equation's value
- Right half: listing of solution angles in both exact form and decimal approximation

Visual elements:
- Unit circle with angle markers at multiples of \( \pi/6 \) and \( \pi/4 \)
- Horizontal dashed line at \( y = c \) (for sine equations) or vertical dashed line at \( x = c \) (for cosine equations)
- Intersection points of the dashed line with the unit circle marked as gold dots
- Rays drawn from origin to each intersection, labeled with their angles

Interactive controls:
- Dropdown: choose sine, cosine, or tangent equation
- Slider: value of \( c \) in the equation
- Dropdown: coefficient \( k \) in multiple-angle equations (1, 2, 3)
- Radio: interval \( [0, 2\pi) \) or \( [0, 4\pi) \) or general solution

Data Visibility Requirements:
- Stage 1: Show the equation in standard form
- Stage 2: Show the reference angle computed from arcsin, arccos, or arctan
- Stage 3: Show all quadrants where the function takes the required sign
- Stage 4: List all solutions in the selected interval with both exact and decimal values

Instructional Rationale: Seeing the horizontal line slice the unit circle at one or two points directly explains why sine equations have up to two solutions per period. Animating \( c \) across \( [-1, 1] \) shows how the number of solutions changes at the boundary values.

Implementation: p5.js with responsive canvas.
</details>

!!! mascot-encourage "Four Skills Working Together"
    <img src="../../img/mascot/encourage.png" class="mascot-admonition-img" alt="Prema encouraging">
    Solving a trig equation uses inverse functions to find the starting angle, the unit circle to find its partner angle, periodicity to generate all solutions, and intervals to pick the ones you need. If you can do each piece by itself, you can do them together — that's the whole strategy.

## Key Takeaways

- Inverse trig functions exist because we restrict each trig function to a domain where it is one-to-one: \( [-\pi/2, \pi/2] \) for sine, \( [0, \pi] \) for cosine, \( (-\pi/2, \pi/2) \) for tangent.
- The domain of each inverse function is \( [-1, 1] \) for arcsine and arccosine, all reals for arctangent. The range of each inverse function equals its parent's restricted domain.
- The notation \( \sin^{-1}(x) \) means arcsine of \( x \), not \( 1/\sin(x) \).
- To solve a trig equation: find one solution using an inverse, find the other solution in one period using quadrant rules, then add the period times an integer to extend to the general solution.
- Multiple-angle equations produce more solutions per interval — if the coefficient is \( k \), expect up to \( 2k \) solutions in \( [0, 2\pi) \).
- Trig inequalities are solved by locating the boundary angles and reading off the intervals where the graph satisfies the inequality.
