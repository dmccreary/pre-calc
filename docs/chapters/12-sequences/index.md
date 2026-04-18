---
title: Sequences
description: Ordered lists of numbers — arithmetic sequences with common differences, geometric sequences with common ratios, recursive and explicit formulas, and the convergence or divergence of sequence values.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:56:00
version: 0.07
---

# Sequences

## Summary

This chapter introduces sequences as ordered lists of numbers with identifiable patterns. Students learn the definitions and properties of arithmetic sequences (with common differences) and geometric sequences (with common ratios), along with their explicit and recursive formulas. The chapter also covers sequence convergence and divergence, connecting geometric sequences to the exponential functions studied in the next chapter.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Sequence Definition
2. Arithmetic Sequence
3. Common Difference
4. Arithmetic Sequence Formula
5. Geometric Sequence
6. Common Ratio
7. Geometric Sequence Formula
8. Recursive Formulas
9. Explicit Formulas
10. Sequence Convergence
11. Sequence Divergence

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 3: Rates of Change](../03-rates-of-change/index.md)

---

!!! mascot-welcome "Patterns in Lists of Numbers"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    A sequence is a list of numbers that follows a rule. The two rules we focus on this chapter — *add the same amount each step* and *multiply by the same factor each step* — are the discrete twins of the linear and exponential functions you will study soon. Spotting which rule a sequence follows is the bridge between this chapter and the rest of Unit 2.

## Sequence Definition

A **sequence** is an ordered list of numbers, each one occupying a specific position. The numbers in a sequence are called its **terms**, and the position of each term is its **index**. We write the term at index \( n \) as \( a_n \), so a sequence might appear as:

\[ a_1, a_2, a_3, a_4, \ldots \]

Order matters. The sequence \( 2, 4, 6, 8 \) is different from \( 8, 6, 4, 2 \), even though they contain the same numbers. Each term has both a *value* (the number itself) and a *position* (its index).

Sequences are functions in disguise. The index \( n \) is an input — usually a positive integer — and the term \( a_n \) is the output. Because the inputs are restricted to whole-number positions, sequences are sometimes called *discrete functions*. This connection lets us reuse the function vocabulary from Chapter 2: domain (the index set), range (the set of term values), increasing or decreasing behavior, and even rates of change.

A sequence can be **finite** (a fixed number of terms) or **infinite** (continuing forever). Most of this chapter focuses on infinite sequences because their long-run behavior — convergence or divergence — is the most useful connection to later topics.

## Arithmetic Sequence

An **arithmetic sequence** is a sequence in which each term is obtained by adding the same fixed number to the previous term. That fixed number is called the **common difference**, written \( d \).

Examples of arithmetic sequences:

- \( 3, 7, 11, 15, 19, \ldots \) with \( d = 4 \)
- \( 100, 95, 90, 85, \ldots \) with \( d = -5 \)
- \( 0, 1.5, 3.0, 4.5, \ldots \) with \( d = 1.5 \)

Arithmetic sequences exhibit *constant additive change*. Plotted as points \( (n, a_n) \), the points fall on a straight line — they are the discrete cousins of linear functions.

## Common Difference

The **common difference** \( d \) is the constant gap between consecutive terms of an arithmetic sequence:

\[ d = a_{n+1} - a_n \]

If the differences between successive terms are not all equal, the sequence is *not* arithmetic. Computing the first few differences is the standard test:

- For \( 5, 8, 11, 14, \ldots \): differences are \( 3, 3, 3 \) → arithmetic with \( d = 3 \).
- For \( 2, 4, 8, 16, \ldots \): differences are \( 2, 4, 8 \) — not constant, so not arithmetic.
- For \( 10, 7, 4, 1, \ldots \): differences are \( -3, -3, -3 \) → arithmetic with \( d = -3 \).

Notice that the common difference can be positive (the sequence increases), negative (the sequence decreases), or zero (every term is the same).

## Arithmetic Sequence Formula

The **arithmetic sequence formula** gives the value of any term using the first term and the common difference:

\[ a_n = a_1 + (n - 1)d \]

The reasoning behind the formula is direct: starting at \( a_1 \), we add \( d \) to reach \( a_2 \), add \( d \) again to reach \( a_3 \), and so on. To reach \( a_n \), we have added \( d \) a total of \( n - 1 \) times.

A worked example: find the 50th term of the sequence \( 7, 12, 17, 22, \ldots \). Here \( a_1 = 7 \) and \( d = 5 \), so:

\[ a_{50} = 7 + (50 - 1) \cdot 5 = 7 + 245 = 252 \]

The formula also works in reverse to identify a sequence's position from a given value. If \( a_n = 252 \), \( a_1 = 7 \), and \( d = 5 \), solving for \( n \) gives \( n = 50 \).

!!! mascot-tip "Arithmetic Sequences Are Linear Functions"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    The formula \( a_n = a_1 + (n-1)d \) rearranges to \( a_n = d \cdot n + (a_1 - d) \) — a linear function of \( n \) with slope \( d \). Every arithmetic sequence is a linear function evaluated at the integers. The slope is the common difference; the \( y \)-intercept is whatever the line would predict at \( n = 0 \).

## Geometric Sequence

A **geometric sequence** is a sequence in which each term is obtained by multiplying the previous term by the same fixed number. That fixed multiplier is called the **common ratio**, written \( r \).

Examples of geometric sequences:

- \( 3, 6, 12, 24, 48, \ldots \) with \( r = 2 \)
- \( 100, 50, 25, 12.5, \ldots \) with \( r = 1/2 \)
- \( 1, -2, 4, -8, 16, \ldots \) with \( r = -2 \)

Geometric sequences exhibit *constant multiplicative change*. Plotted as points \( (n, a_n) \), they curve in the recognizable shape of an exponential function — they are the discrete cousins of exponentials.

## Common Ratio

The **common ratio** \( r \) is the constant factor between consecutive terms of a geometric sequence:

\[ r = \frac{a_{n+1}}{a_n} \]

If the ratios between successive terms are not all equal, the sequence is *not* geometric. As with arithmetic, computing the first few ratios is the standard test:

- For \( 5, 15, 45, 135, \ldots \): ratios are \( 3, 3, 3 \) → geometric with \( r = 3 \).
- For \( 1, 2, 3, 4, \ldots \): ratios are \( 2, 1.5, 1.33 \) — not constant, so not geometric.
- For \( 64, 16, 4, 1, \ldots \): ratios are \( 1/4, 1/4, 1/4 \) → geometric with \( r = 1/4 \).

The common ratio can be greater than 1 (the sequence grows), between 0 and 1 (the sequence shrinks toward 0), negative (the sequence alternates sign), or exactly 1 (the sequence is constant). The case \( r = 0 \) is excluded because then \( a_2, a_3, \ldots \) would all be 0 and the ratio would be undefined.

## Geometric Sequence Formula

The **geometric sequence formula** gives any term using the first term and the common ratio:

\[ a_n = a_1 \cdot r^{n - 1} \]

The reasoning parallels the arithmetic case: starting at \( a_1 \), we multiply by \( r \) to reach \( a_2 \), multiply by \( r \) again to reach \( a_3 \), and so on. To reach \( a_n \), we have multiplied by \( r \) a total of \( n - 1 \) times.

A worked example: find the 10th term of the sequence \( 4, 12, 36, 108, \ldots \). Here \( a_1 = 4 \) and \( r = 3 \), so:

\[ a_{10} = 4 \cdot 3^{10-1} = 4 \cdot 19683 = 78732 \]

The next table places the two formulas side by side so the parallel structure is easy to see.

| Sequence type | Pattern of change | Explicit formula | Discrete cousin of |
|---------------|-------------------|------------------|--------------------|
| Arithmetic    | Add \( d \) each step    | \( a_n = a_1 + (n-1)d \) | Linear function    |
| Geometric     | Multiply by \( r \) each step | \( a_n = a_1 \cdot r^{n-1} \) | Exponential function |

#### Diagram: Arithmetic vs Geometric Sequence Explorer

<details markdown="1">
<summary>Side-by-side plot of arithmetic and geometric sequences with adjustable parameters</summary>
Type: MicroSim
**sim-id:** arithmetic-vs-geometric-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing two sequences plotted as points: an arithmetic sequence on the left, a geometric sequence on the right, with sliders to control the starting value, the common difference, and the common ratio.

Learning objective (Bloom's Analyzing): Students will analyze the contrast between additive and multiplicative growth patterns by adjusting parameters and observing the resulting shapes.

Visual elements:

- Two side-by-side coordinate planes, each showing the index \( n \) on the horizontal axis and the term value \( a_n \) on the vertical axis.
- Up to 20 points plotted per panel, with the explicit formula displayed above each plot.
- Connecting line for the arithmetic sequence (straight); a dashed exponential curve drawn through the geometric points to emphasize the curved shape.
- A dynamic value table showing \( a_1 \) through \( a_{10} \) for both sequences.

Interactive controls:

- A slider for \( a_1 \) ranging from -20 to 20.
- A slider for \( d \) ranging from -5 to 5 (controls arithmetic sequence).
- A slider for \( r \) ranging from -2 to 2 in steps of 0.1 (controls geometric sequence).
- A "Match Growth" button that picks \( d \) and \( r \) so the two sequences agree at \( a_5 \), highlighting how multiplicative growth pulls ahead afterward.

Instructional rationale: Students grasp the linear-vs-exponential contrast much faster when they see both patterns side by side and can drag the parameters to watch the geometric points rocket past the arithmetic ones.

Canvas: 1100 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for parameters, createButton for Match Growth.
</details>

## Recursive Formulas

A **recursive formula** defines a sequence by stating two things: a *starting value* (or starting values), and a *recurrence rule* that uses the previous term (or terms) to compute the next term.

For an arithmetic sequence, the recursive form is:

\[ a_1 = \text{starting value}, \quad a_n = a_{n-1} + d \text{ for } n \geq 2 \]

For a geometric sequence:

\[ a_1 = \text{starting value}, \quad a_n = a_{n-1} \cdot r \text{ for } n \geq 2 \]

A recursive formula mirrors the way the sequence is built step by step. It is excellent for computing nearby terms but inefficient for far-away terms — finding \( a_{1000} \) recursively requires 999 prior computations.

## Explicit Formulas

An **explicit formula** is a formula that expresses \( a_n \) directly in terms of \( n \), without referring to other terms. The arithmetic and geometric formulas in the previous sections are explicit. Explicit formulas are excellent for jumping straight to a far-away term — \( a_{1000} \) takes one calculation instead of 999.

The next table contrasts the two representations and shows when each is more useful.

| Form | Strength | Weakness | Best for |
|------|----------|----------|----------|
| Recursive | Mirrors the step-by-step pattern | Slow for far terms | Building intuition; programming small loops |
| Explicit | Direct calculation of any term | Sometimes hard to derive | Solving for specific terms; calculus connections |

A useful skill is converting between the two forms. Given the recursive arithmetic definition \( a_1 = 4, a_n = a_{n-1} + 6 \), the explicit form is \( a_n = 4 + (n-1) \cdot 6 = 6n - 2 \). Conversely, given \( a_n = 6n - 2 \), the common difference is \( d = 6 \) (the coefficient of \( n \)) and \( a_1 = 6(1) - 2 = 4 \), so the recursive form is recovered.

## Sequence Convergence

An infinite sequence **converges** if its terms approach a single fixed value as the index \( n \) grows without bound. That fixed value is called the **limit** of the sequence.

For a geometric sequence \( a_n = a_1 \cdot r^{n-1} \), the long-run behavior is determined entirely by \( |r| \):

- If \( |r| < 1 \), the powers \( r^{n-1} \) shrink toward 0, so the sequence converges to 0 (regardless of \( a_1 \) when \( a_1 \neq 0 \), the limit is 0; if \( a_1 = 0 \), the sequence is constantly 0).
- If \( r = 1 \), every term equals \( a_1 \), so the sequence converges to \( a_1 \).

For example, the sequence \( 100, 50, 25, 12.5, 6.25, \ldots \) (with \( a_1 = 100, r = 1/2 \)) converges to 0. The terms get arbitrarily close to 0 — and stay close — as \( n \) grows.

Convergence is the discrete preview of *limits*, a topic formalized in calculus. For pre-calculus, the test for a geometric sequence is simple: \( |r| < 1 \) implies convergence to 0; \( r = 1 \) implies convergence to \( a_1 \).

## Sequence Divergence

A sequence **diverges** if it does not converge. Three flavors of divergence are common:

- **Divergence to infinity**: terms grow without bound (positive or negative). Example: \( 1, 2, 4, 8, 16, \ldots \) with \( r = 2 \).
- **Oscillation**: terms bounce between values without settling. Example: \( 1, -1, 1, -1, \ldots \) with \( r = -1 \).
- **Unbounded oscillation**: terms swing in alternating signs with growing magnitude. Example: \( 1, -2, 4, -8, 16, \ldots \) with \( r = -2 \).

For a geometric sequence with \( a_1 \neq 0 \), divergence happens whenever \( |r| > 1 \) (unbounded growth) or \( r = -1 \) (sign-flipping oscillation).

For arithmetic sequences, the situation is simpler. Unless \( d = 0 \) (constant sequence), an arithmetic sequence always diverges — the terms grow without bound (if \( d > 0 \)) or fall without bound (if \( d < 0 \)). Linear growth never settles.

The next table summarizes the long-run behavior of geometric sequences as a function of the common ratio.

| Common ratio \( r \) | Long-run behavior of \( a_n \) | Verdict |
|----------------------|-------------------------------|---------|
| \( r > 1 \)           | Grows without bound | Diverges to \( \pm \infty \) |
| \( r = 1 \)           | Stays at \( a_1 \) | Converges to \( a_1 \) |
| \( 0 < r < 1 \)       | Shrinks toward 0 | Converges to 0 |
| \( r = 0 \)           | Becomes 0 immediately (excluded by definition) | — |
| \( -1 < r < 0 \)      | Alternates sign while shrinking | Converges to 0 |
| \( r = -1 \)          | Alternates between \( a_1 \) and \( -a_1 \) | Diverges (oscillates) |
| \( r < -1 \)          | Alternates sign with growing magnitude | Diverges (unbounded oscillation) |

!!! mascot-thinking "Convergence Lives Inside the Unit Interval"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    For geometric sequences, the dividing line for convergence is \( |r| = 1 \). Inside the unit interval (\( |r| < 1 \)), the terms shrink to 0. Outside (\( |r| > 1 \)), they explode. Right on the boundary, behavior depends on the sign of \( r \). This same boundary will appear again when we study geometric series and exponential decay.

## Putting It All Together

Sequences are functions defined on the positive integers, and the two patterns we have studied — additive and multiplicative — preview the linear and exponential functions that dominate the rest of Unit 2.

Key ideas to carry forward:

- A **sequence** is an ordered list of numbers indexed by position.
- An **arithmetic sequence** has constant additive change \( d \); its explicit form \( a_n = a_1 + (n-1)d \) is linear in \( n \).
- A **geometric sequence** has constant multiplicative change \( r \); its explicit form \( a_n = a_1 \cdot r^{n-1} \) is exponential in \( n \).
- **Recursive formulas** describe the step-by-step rule; **explicit formulas** describe any term directly.
- A geometric sequence **converges** to 0 when \( |r| < 1 \), and **diverges** when \( |r| > 1 \) or \( r = -1 \).
- Arithmetic sequences always diverge unless \( d = 0 \).

!!! mascot-celebration "Bridge to Exponentials"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    Geometric sequences are the discrete preview of exponential functions. Every insight you built here — the meaning of \( r \), the convergence condition \( |r| < 1 \), the explicit formula — has a continuous counterpart waiting in Chapter 13. You are about to meet exponentials with a real head start.

??? question "Quick Check: Is the sequence \( 2, 5, 8, 11, 14, \ldots \) arithmetic, geometric, or neither?"
    Differences are \( 3, 3, 3, 3 \) — constant. The sequence is arithmetic with \( a_1 = 2 \) and \( d = 3 \).

??? question "Quick Check: Find an explicit formula for \( 6, 12, 24, 48, \ldots \)."
    Ratios are all 2, so it is geometric with \( a_1 = 6 \) and \( r = 2 \). Explicit formula: \( a_n = 6 \cdot 2^{n-1} \).

??? question "Quick Check: Does the geometric sequence with \( a_1 = 80, r = 0.4 \) converge or diverge?"
    \( |r| = 0.4 < 1 \), so the sequence converges to 0.
