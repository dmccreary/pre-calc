---
title: Polynomial Fundamentals
description: Polynomial definitions, degree, leading coefficient, arithmetic, factoring, the Factor and Remainder Theorems, and polynomial division.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:44:00
version: 0.07
---

# Polynomial Fundamentals

## Summary

This chapter introduces polynomial functions and their essential properties. Students learn about polynomial definitions, degree, leading coefficient, and the classification of polynomials as monomials, binomials, and trinomials. The chapter covers polynomial arithmetic (addition and multiplication), factoring techniques, the Factor Theorem, Remainder Theorem, and both synthetic and long division of polynomials. These algebraic tools are essential for analyzing polynomial behavior in the next chapter.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Polynomial Definition
2. Degree of a Polynomial
3. Leading Coefficient
4. Monomial
5. Binomial
6. Trinomial
7. Polynomial Addition
8. Polynomial Multiplication
9. Factoring Polynomials
10. Factor Theorem
11. Remainder Theorem
12. Synthetic Division
13. Long Division of Polynomials

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)

---

!!! mascot-welcome "Beyond the Parabola"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Linear functions had degree 1. Quadratic functions had degree 2. What happens when we allow the \( x \) to be raised to any positive whole-number power? We get the polynomials — the largest and most versatile family we have met so far. This chapter builds the algebraic toolkit; Chapter 7 will study what their graphs look like.

## What Is a Polynomial?

A **polynomial** in the variable \( x \) is any finite sum of terms of the form \( a_k x^k \), where each \( a_k \) is a real-number coefficient and each exponent \( k \) is a non-negative integer. Written out in descending order of exponent, a general polynomial of degree \( n \) looks like

\[ P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0 \]

with \( a_n \neq 0 \). Every familiar function family we have studied so far — constants, lines, and parabolas — is a polynomial of small degree.

Two rules in the definition do real work:

- **Non-negative integer exponents.** The expression \( x^{1/2} = \sqrt{x} \) is *not* a polynomial. Neither is \( x^{-1} = 1/x \). Only whole-number powers are allowed.
- **Finitely many terms.** The infinite series \( 1 + x + x^2 + x^3 + \cdots \) is not a polynomial. Polynomials have a highest power, called the degree.

These two restrictions give polynomials their most useful property: they are completely tame. Every polynomial is defined for every real input, has a smooth unbroken graph, and can be evaluated using only multiplication and addition.

## Degree and Leading Coefficient

The **degree** of a polynomial is the largest exponent that appears with a non-zero coefficient. The **leading coefficient** is the coefficient of that highest-power term.

For \( P(x) = 4x^3 - 7x + 2 \), the degree is 3 and the leading coefficient is 4. For \( Q(x) = -x^5 + x^2 - 9 \), the degree is 5 and the leading coefficient is \( -1 \). The constant polynomial \( R(x) = 6 \) has degree 0 (every term is \( 6 x^0 \)).

Degree and leading coefficient together predict the most important qualitative feature of a polynomial — its **end behavior**, or what happens to \( P(x) \) as \( x \) runs toward \( \pm\infty \). We will use this link heavily in Chapter 7. Here we just note which piece of information controls which aspect:

- The **degree** determines how quickly \( P(x) \) grows and whether the two ends of the graph point the same direction or opposite directions.
- The **leading coefficient** determines the sign of \( P(x) \) for large \( |x| \).
- Lower-degree terms are negligible when \( |x| \) is huge — they are dominated by \( a_n x^n \).

## Classifying Polynomials by Number of Terms

Before a polynomial has many terms, it has a descriptive name that comes straight from Greek roots. We define these names now so the vocabulary is in place for the factoring techniques that follow.

- A **monomial** has exactly one term: \( 7x^4 \), \( -3x \), or the constant \( 5 \).
- A **binomial** has exactly two terms: \( x^2 - 9 \) or \( 2x + 1 \).
- A **trinomial** has exactly three terms: \( x^2 + 5x + 6 \) or \( 4x^3 - 2x + 7 \).

Polynomials with four or more terms are simply called polynomials — no special short name is standard.

Degree and term count answer different questions. A polynomial can be low-degree with many terms, or high-degree with few. The table below combines both descriptions for a handful of examples.

| Polynomial | Degree | Leading coefficient | Number of terms | Common name |
|------------|--------|---------------------|-----------------|-------------|
| \( 5 \) | 0 | 5 | 1 | Constant monomial |
| \( 3x - 2 \) | 1 | 3 | 2 | Linear binomial |
| \( x^2 + 5x + 6 \) | 2 | 1 | 3 | Quadratic trinomial |
| \( x^3 - 1 \) | 3 | 1 | 2 | Cubic binomial |
| \( 2x^4 - x^3 + 7x - 3 \) | 4 | 2 | 4 | Quartic polynomial |

## Polynomial Addition

Adding two polynomials is as simple as combining **like terms** — terms with the same power of \( x \). Coefficients add; exponents stay the same. Writing both polynomials in descending order first keeps the work organized.

\[ (3x^3 + 2x^2 - x + 4) + (x^3 - 5x^2 + 7) \]

Combining like terms:

- \( x^3 \) terms: \( 3x^3 + x^3 = 4x^3 \)
- \( x^2 \) terms: \( 2x^2 - 5x^2 = -3x^2 \)
- \( x^1 \) terms: \( -x \) (only one present)
- Constant terms: \( 4 + 7 = 11 \)

So the sum is \( 4x^3 - 3x^2 - x + 11 \). Subtraction works the same way after distributing the minus sign across the second polynomial. The degree of a sum is at most the larger of the two degrees — sometimes less, if the leading terms cancel.

## Polynomial Multiplication

Multiplying polynomials uses the distributive property: every term of the first polynomial multiplies every term of the second, and like terms are combined at the end.

For two binomials, the familiar **FOIL** pattern (First, Outer, Inner, Last) is just distribution organized by position:

\[ (x + 3)(x - 5) = x \cdot x + x \cdot (-5) + 3 \cdot x + 3 \cdot (-5) = x^2 - 2x - 15 \]

For larger polynomials, distribute term by term. A short worked example:

\[ (x^2 + 2x - 1)(x + 4) \]
\[ = x^2(x + 4) + 2x(x + 4) - 1(x + 4) \]
\[ = (x^3 + 4x^2) + (2x^2 + 8x) + (-x - 4) \]
\[ = x^3 + 6x^2 + 7x - 4 \]

The degree of a product is the sum of the degrees. A cubic times a quadratic produces a quintic (degree 5). This multiplicative degree rule is so reliable that it underpins the Fundamental Theorem of Algebra in Chapter 7.

!!! mascot-tip "Count the Degrees Before You Start"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    Before multiplying two polynomials, add their degrees and write down the answer's degree. If your final product has the wrong degree, you made an arithmetic slip — the leading term calculation is the first place to check.

## Factoring Polynomials

**Factoring** reverses multiplication: given a polynomial, find smaller polynomials whose product equals it. Factoring is one of the most important operations in pre-calculus because the factored form immediately reveals the **zeros** of the polynomial — the inputs that make it equal to zero.

Three factoring techniques cover most quadratic-and-up situations in this course:

- **Greatest common factor (GCF).** Pull the largest common factor out of all terms. \( 6x^3 - 9x^2 = 3x^2(2x - 3) \).
- **Difference of squares.** \( a^2 - b^2 = (a - b)(a + b) \). Example: \( x^2 - 25 = (x - 5)(x + 5) \).
- **Trinomial factoring.** For \( x^2 + bx + c \), find two numbers that multiply to \( c \) and add to \( b \). For \( x^2 + 5x + 6 \), the numbers 2 and 3 work: \( (x + 2)(x + 3) \).

For higher-degree polynomials, factoring usually means first *finding* a zero \( r \), then dividing by \( (x - r) \) to get a smaller polynomial. The two theorems below explain why that works.

## The Factor Theorem

The **Factor Theorem** is a direct link between algebra and geometry:

!!! info "Factor Theorem"
    A polynomial \( P(x) \) has \( (x - r) \) as a factor **if and only if** \( P(r) = 0 \).

In other words, \( r \) is a zero of the polynomial exactly when \( (x - r) \) divides it evenly. Each real zero produces one linear factor, and each linear factor produces one real zero. This reciprocal relationship turns every zero-finding question into a factoring question, and vice versa.

Example: is \( (x - 2) \) a factor of \( P(x) = x^3 - 6x^2 + 11x - 6 \)? Evaluate \( P(2) = 8 - 24 + 22 - 6 = 0 \). Yes — so \( (x - 2) \) is a factor. The companion factor comes from dividing \( P(x) \) by \( (x - 2) \), which is the subject of the next section.

## The Remainder Theorem

The **Remainder Theorem** is a close cousin of the Factor Theorem:

!!! info "Remainder Theorem"
    When a polynomial \( P(x) \) is divided by \( (x - r) \), the remainder is \( P(r) \).

The Factor Theorem is the special case where that remainder is zero. But the Remainder Theorem is useful in its own right: it gives a quick way to evaluate a polynomial at a single point using division instead of direct substitution, and it tells you in advance what remainder to expect when you divide.

Example: dividing \( P(x) = x^3 - 6x^2 + 11x - 6 \) by \( (x - 4) \) must leave a remainder of \( P(4) = 64 - 96 + 44 - 6 = 6 \). Before we even perform the division, we know the answer has a remainder of 6 — so \( (x - 4) \) is *not* a factor.

!!! mascot-thinking "One Question, Two Theorems"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The Remainder Theorem says "the remainder is \( P(r) \)." The Factor Theorem says "the factor test is \( P(r) = 0 \)." They are the same fact seen from two angles. Once you have one, you have the other for free.

## Long Division of Polynomials

When the Remainder Theorem says the remainder is non-zero, we still might want the full quotient. **Long division of polynomials** is the algorithmic version of the long-division procedure used on numbers in grade school. The divisor, which can be any polynomial, is lined up against the dividend, and we eliminate one leading term at a time.

Divide \( x^3 - 6x^2 + 11x - 6 \) by \( (x - 2) \). Before reading the work below, note the three ingredients at each step: the current leading term of the dividend, the leading term of the divisor, and the quotient term that cancels them.

\[
\begin{array}{r}
x^2 - 4x + 3 \phantom{0} \\
x - 2 \enclose{longdiv}{x^3 - 6x^2 + 11x - 6}
\end{array}
\]

Step-by-step:

1. \( x^3 \div x = x^2 \). Multiply \( x^2(x - 2) = x^3 - 2x^2 \) and subtract: new dividend tail is \( -4x^2 + 11x - 6 \).
2. \( -4x^2 \div x = -4x \). Multiply \( -4x(x - 2) = -4x^2 + 8x \) and subtract: new tail is \( 3x - 6 \).
3. \( 3x \div x = 3 \). Multiply \( 3(x - 2) = 3x - 6 \) and subtract: remainder is 0.

Quotient: \( x^2 - 4x + 3 \). Remainder: 0. Dividing further: \( x^2 - 4x + 3 = (x - 1)(x - 3) \). So the original polynomial factors as \( (x - 2)(x - 1)(x - 3) \), with zeros 1, 2, and 3.

## Synthetic Division

**Synthetic division** is a streamlined shortcut for the special case of dividing by a linear factor \( (x - r) \). Only the coefficients participate; powers of \( x \) are tracked by position. The procedure is:

1. Write the coefficients of the dividend in order of descending power, inserting 0s for any missing powers.
2. Write \( r \) (not \( -r \)) in a box to the left.
3. Bring down the first coefficient.
4. Multiply by \( r \), add to the next coefficient, and repeat.
5. The last number is the remainder; the others are the quotient's coefficients (one degree lower than the dividend).

Applying synthetic division to \( (x^3 - 6x^2 + 11x - 6) \div (x - 2) \):

```
2 | 1  -6   11   -6
  |      2   -8    6
  ------------------
    1  -4    3    0
```

Quotient: \( x^2 - 4x + 3 \). Remainder: 0. Same answer as the long-division work above, obtained with a fraction of the writing.

Synthetic division only works when the divisor is \( (x - r) \) — a monic linear factor. For quadratic or higher-degree divisors, long division is required.

Before the comparison table, notice the division method you choose depends on one question: is the divisor linear? If yes, prefer synthetic division for speed. If no, fall back to long division.

| Feature | Long division | Synthetic division |
|---------|---------------|--------------------|
| Works for any divisor | Yes | Only for linear \( (x - r) \) |
| Keeps powers of \( x \) explicit | Yes | No (only coefficients) |
| Faster for linear divisors | Slower | Much faster |
| Reveals the remainder | Yes | Yes |
| Recommended use | Quadratic or higher divisors | Testing a candidate zero |

#### Diagram: Synthetic Division Animator

<details markdown="1">
<summary>Step-by-step animation of synthetic division with tracked intermediate values</summary>
Type: MicroSim
**sim-id:** synthetic-division-animator<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that performs synthetic division one step at a time, highlighting the currently active cells and annotating the arithmetic so students see each multiplication and addition.

Learning objective (Bloom's Applying): Students will execute the synthetic-division procedure to divide a polynomial by a linear factor and verify the result using the Remainder Theorem.

Visual elements:

- A three-row grid on the left: top row shows the coefficients of the dividend, middle row accumulates the "bring-down × r" values, bottom row shows the running result.
- A boxed \( r \) value to the left of the grid.
- A cell highlighted in maroon for the current active position; an arrow showing the current multiplication and an arrow showing the current addition.
- On the right, a live status panel showing the quotient being built and the final remainder.

Interactive controls:

- Input boxes for the dividend coefficients and for \( r \).
- "Next Step" and "Previous Step" buttons to walk through the procedure one operation at a time.
- "Auto Play" button animates through all steps at a fixed pace.
- "Check with Remainder Theorem" button evaluates \( P(r) \) directly and compares to the computed remainder.

Instructional rationale: Apply-level procedures stick better when students see the mechanism, not just the result. Highlighting the active cell and showing each multiplication makes the compressed notation of synthetic division intelligible rather than mysterious.

Canvas: 900 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createInput for coefficients, createButton for step controls and check, state machine to track the current step.
</details>

## Putting It All Together

This chapter gave you the algebraic toolkit for working with polynomials: knowing their structure (degree, leading coefficient, term count), combining them (addition, multiplication), and decomposing them (factoring, division). With these tools in place, Chapter 7 can focus on the *behavior* of polynomials — how their zeros, turning points, and end behavior shape their graphs.

The key ideas to carry forward:

- A **polynomial** is a finite sum of terms \( a_k x^k \) with non-negative integer exponents.
- **Degree** and **leading coefficient** determine end behavior; term count distinguishes **monomials**, **binomials**, and **trinomials**.
- Polynomials **add** by combining like terms and **multiply** by distributing term by term; the degree of a product is the sum of the degrees.
- **Factoring** reverses multiplication and exposes zeros; the **Factor Theorem** says \( (x - r) \) is a factor iff \( P(r) = 0 \).
- The **Remainder Theorem** says dividing \( P(x) \) by \( (x - r) \) leaves remainder \( P(r) \).
- **Long division** works for any divisor; **synthetic division** is a fast shortcut when the divisor is linear.

!!! mascot-celebration "Tools in the Belt"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now have every algebraic tool needed to take apart any polynomial that will appear on the AP exam. Chapter 7 will use these tools to *see* polynomials — to predict the shape of a graph just from its factored form. The graphs are about to become much more interesting.

??? question "Quick Check: What is the degree of \( (2x^3 - x + 1)(x^2 + 4) \)?"
    Product of degree 3 and degree 2 is degree 5.

??? question "Quick Check: Is \( (x + 3) \) a factor of \( P(x) = x^3 + 2x^2 - 5x - 6 \)?"
    Evaluate \( P(-3) = -27 + 18 + 15 - 6 = 0 \). Yes — \( (x + 3) \) is a factor.

??? question "Quick Check: Use synthetic division to divide \( 2x^3 - 3x^2 + 4x - 5 \) by \( (x - 1) \)."
    Coefficients: 2, -3, 4, -5, with \( r = 1 \). Bring down 2; 2·1=2, -3+2=-1; -1·1=-1, 4-1=3; 3·1=3, -5+3=-2. Quotient \( 2x^2 - x + 3 \), remainder \( -2 \).
