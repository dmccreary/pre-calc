---
title: Trigonometric Identities
description: The Pythagorean, reciprocal, quotient, cofunction, and even-odd identities, plus sum, difference, and double-angle formulas, with techniques for verifying identities and simplifying trigonometric expressions.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 21:30:00
version: 0.07
---

# Trigonometric Identities

## Summary

This chapter develops the fundamental trigonometric identities and techniques for working with them. Students learn the Pythagorean, reciprocal, quotient, cofunction, and even-odd identities. The chapter covers the sum and difference formulas and double angle formulas, then applies all of these in verifying identities and simplifying trigonometric expressions. These algebraic manipulation skills are essential for solving trigonometric equations in the next chapter.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Pythagorean Identity
2. Reciprocal Identities
3. Quotient Identities
4. Cofunction Identities
5. Even-Odd Identities
6. Sum and Difference Formulas
7. Double Angle Formulas
8. Verifying Identities
9. Simplifying Trig Expressions

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)
- [Chapter 16: Trigonometric Functions](../16-trigonometric-functions/index.md)

---

!!! mascot-welcome "Equations That Always Hold"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    An identity is an equation that is true for every allowable input, not just special values. In this chapter we collect the trig identities that show up everywhere in the rest of pre-calculus and calculus. They are the grammar rules that make trig expressions rewritable.

## Identity vs. Equation

Before we dive into specific identities, it's important to separate two words that sound similar but mean different things.

- An **equation** is a statement that is true for certain values of the variable. For example, \( \sin\theta = 1/2 \) is true only at specific angles like \( \theta = \pi/6 \) and \( \theta = 5\pi/6 \).
- An **identity** is an equation that is true for **every** value in the domain. For example, \( \sin^2\theta + \cos^2\theta = 1 \) holds for every real \( \theta \) — you cannot find a counterexample.

Identities give us permission to rewrite one expression in terms of another. Whenever an equation is getting tangled up in sines and cosines, applying identities is often the move that unlocks it.

## Pythagorean Identity

The **Pythagorean identity** is the most important identity in trigonometry:

\[ \sin^2\theta + \cos^2\theta = 1 \]

It follows directly from the equation of the unit circle \( x^2 + y^2 = 1 \) together with the unit-circle definitions \( x = \cos\theta \) and \( y = \sin\theta \) from Chapter 16. Every point on the unit circle automatically satisfies this equation, so every angle automatically satisfies the identity.

Two other Pythagorean identities follow by dividing through by \( \cos^2\theta \) or \( \sin^2\theta \):

- Divide the base identity by \( \cos^2\theta \): \( \tan^2\theta + 1 = \sec^2\theta \)
- Divide the base identity by \( \sin^2\theta \): \( 1 + \cot^2\theta = \csc^2\theta \)

Here are the three Pythagorean identities arranged together so you can see their family resemblance:

| Identity | When to use it |
|---|---|
| \( \sin^2\theta + \cos^2\theta = 1 \) | Convert between \( \sin^2 \) and \( \cos^2 \) |
| \( \tan^2\theta + 1 = \sec^2\theta \) | Convert between \( \tan^2 \) and \( \sec^2 \) |
| \( 1 + \cot^2\theta = \csc^2\theta \) | Convert between \( \cot^2 \) and \( \csc^2 \) |

!!! mascot-tip "Pick the Right Pythagorean Identity"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema offering a tip">
    Look at your expression. If you see \( \sin^2 \) or \( \cos^2 \), use the first. If you see \( \tan^2 \) or \( \sec^2 \), use the second. If you see \( \cot^2 \) or \( \csc^2 \), use the third. Pick the identity that matches the functions already on the page.

## Reciprocal Identities

The **reciprocal identities** express the three reciprocal trig functions as one-over their partner functions. These come directly from the definitions given in Chapter 16:

\[ \csc\theta = \frac{1}{\sin\theta}, \qquad \sec\theta = \frac{1}{\cos\theta}, \qquad \cot\theta = \frac{1}{\tan\theta} \]

Equivalent rearrangements that are just as useful:

\[ \sin\theta\,\csc\theta = 1, \qquad \cos\theta\,\sec\theta = 1, \qquad \tan\theta\,\cot\theta = 1 \]

These identities are the tool that lets us eliminate reciprocal functions from an expression, replacing them with sines and cosines so we can work with a smaller toolkit.

## Quotient Identities

The **quotient identities** define tangent and cotangent as ratios of sine and cosine:

\[ \tan\theta = \frac{\sin\theta}{\cos\theta}, \qquad \cot\theta = \frac{\cos\theta}{\sin\theta} \]

Combined with the reciprocal identities, these two relationships let us rewrite **any** trig expression in terms of sine and cosine alone. That rewriting step is often the first move when verifying or simplifying an identity.

## Cofunction Identities

The **cofunction identities** express each trig function in terms of its complementary angle — the angle that sums to \( \pi/2 \) radians (90°):

\[ \sin\left(\frac{\pi}{2} - \theta\right) = \cos\theta, \qquad \cos\left(\frac{\pi}{2} - \theta\right) = \sin\theta \]

\[ \tan\left(\frac{\pi}{2} - \theta\right) = \cot\theta, \qquad \cot\left(\frac{\pi}{2} - \theta\right) = \tan\theta \]

\[ \sec\left(\frac{\pi}{2} - \theta\right) = \csc\theta, \qquad \csc\left(\frac{\pi}{2} - \theta\right) = \sec\theta \]

The reason "cosine" is called co-sine is exactly this: cosine of an angle equals sine of its complement. In a right triangle, the complement of one acute angle is the other acute angle — and the side opposite one angle is the side adjacent to the other. That geometric swap is where all six cofunction identities come from.

## Even-Odd Identities

The **even-odd identities** describe what happens when the angle is negated. From Chapter 17 we know that cosine is an even function (graph symmetric about the \( y \)-axis) and sine is an odd function (graph symmetric about the origin):

\[ \sin(-\theta) = -\sin\theta \quad (\text{odd}) \]
\[ \cos(-\theta) = \cos\theta \quad (\text{even}) \]

The other four functions inherit their parity from these two:

| Function | Parity | Identity |
|---|---|---|
| Sine | Odd | \( \sin(-\theta) = -\sin\theta \) |
| Cosine | Even | \( \cos(-\theta) = \cos\theta \) |
| Tangent | Odd | \( \tan(-\theta) = -\tan\theta \) |
| Cotangent | Odd | \( \cot(-\theta) = -\cot\theta \) |
| Secant | Even | \( \sec(-\theta) = \sec\theta \) |
| Cosecant | Odd | \( \csc(-\theta) = -\csc\theta \) |

These identities let us eliminate negative signs from inside a trig function, cleaning up expressions like \( \sin(-x)\cos(-x) \) into \( -\sin(x)\cos(x) \).

## Sum and Difference Formulas

The **sum and difference formulas** tell us how to evaluate a trig function of a sum or difference of two angles. The two that matter most are:

\[ \sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta \]

\[ \cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta \]

Pay close attention to the signs. The sine formula uses the **same sign** as on the left; the cosine formula uses the **opposite sign**. The tangent sum and difference formula is derived by dividing:

\[ \tan(\alpha \pm \beta) = \frac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha\tan\beta} \]

These formulas let us compute exact values of trig functions at angles that are not on the basic unit-circle list. For example, \( 15° = 45° - 30° \), so:

\[ \cos 15° = \cos(45° - 30°) = \cos 45°\cos 30° + \sin 45°\sin 30° \]

\[ = \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4} \]

#### Diagram: Sum Formula Geometric Proof

<iframe src="../../sims/sum-formula-proof/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sum Formula Geometric Proof</summary>
Type: infographic
**sim-id:** sum-formula-proof<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Understand, L2, interpret): Interpret the geometric origin of the cosine sum formula by following a rotation-and-distance argument on the unit circle.

Layout: Unit circle on the left, worked-example panel on the right.

Visual elements:
- Unit circle with two adjustable angles \( \alpha \) and \( \beta \) marked with colored arcs
- Points \( P_1 = (\cos\alpha, \sin\alpha) \) and \( P_2 = (\cos(\alpha+\beta), \sin(\alpha+\beta)) \) highlighted
- Chord connecting \( P_1 \) and \( P_2 \) with its length labeled
- The same chord length recomputed after rotating the figure so one endpoint is at \( (1, 0) \)

Interactive controls:
- Slider for \( \alpha \): 0 to \( \pi \)
- Slider for \( \beta \): 0 to \( \pi \)
- Step-through buttons: Next / Previous to walk through the four algebraic steps

Data Visibility Requirements:
- Stage 1: Show the two angles as numeric values and highlighted arcs
- Stage 2: Show the coordinates of both points
- Stage 3: Show the distance formula applied to get a numeric chord length
- Stage 4: Show the second expression for the chord length and equate them
- Stage 5: Show the algebraic simplification that produces \( \cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta \)

Instructional Rationale: Step-through with concrete numeric values at every stage turns what can feel like a formula memorization exercise into a visible geometric argument. Continuous animation would not let students pause and read the algebra.

Implementation: p5.js with responsive canvas.
</details>

## Double Angle Formulas

The **double angle formulas** are a special case of the sum formulas with \( \alpha = \beta \). Setting both angles to \( \theta \) in the sum formulas gives:

\[ \sin(2\theta) = 2\sin\theta\cos\theta \]

\[ \cos(2\theta) = \cos^2\theta - \sin^2\theta \]

The cosine double-angle formula has two alternative forms that come from substituting the Pythagorean identity. Because \( \cos^2\theta + \sin^2\theta = 1 \) lets us replace either \( \cos^2\theta \) or \( \sin^2\theta \), we get:

\[ \cos(2\theta) = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta \]

All three forms are equivalent; use whichever one already matches the other terms in your expression. The tangent double-angle formula is:

\[ \tan(2\theta) = \frac{2\tan\theta}{1 - \tan^2\theta} \]

!!! mascot-thinking "Three Cosine Forms — Why?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The three versions of \( \cos(2\theta) \) exist because we can trade one squared term for the other using the Pythagorean identity. When an expression already contains \( \cos^2\theta \), use the form with \( \cos^2 \). When it contains \( \sin^2\theta \), use the \( \sin^2 \) form. Matching forms keeps the algebra clean.

## Simplifying Trig Expressions

**Simplifying trig expressions** means rewriting an expression in a cleaner equivalent form — often by combining fractions, canceling common factors, or collapsing to a simpler function. There is no single rule that always works, but the following strategy covers most cases.

**Simplification strategy:**

1. **Convert everything to sine and cosine** using the reciprocal and quotient identities.
2. **Find common denominators** and combine fractions.
3. **Look for Pythagorean identities** hiding in sums like \( \sin^2 + \cos^2 \) or \( 1 - \sin^2 \).
4. **Factor when possible** — difference of squares, common factors, or grouping.
5. **Cancel common factors** in the numerator and denominator.

For example, simplify \( \dfrac{\sin\theta}{1 - \cos\theta} + \dfrac{1 - \cos\theta}{\sin\theta} \):

- Common denominator is \( \sin\theta(1 - \cos\theta) \).
- Combine: \( \dfrac{\sin^2\theta + (1 - \cos\theta)^2}{\sin\theta(1 - \cos\theta)} \).
- Expand numerator: \( \sin^2\theta + 1 - 2\cos\theta + \cos^2\theta = 2 - 2\cos\theta \) (using Pythagorean identity).
- Factor: \( 2(1 - \cos\theta) \).
- Cancel \( 1 - \cos\theta \): \( \dfrac{2}{\sin\theta} = 2\csc\theta \).

## Verifying Identities

**Verifying an identity** means showing that the two sides of a claimed equation are equal for every allowable input. The rule is: work on one side at a time, transforming it step-by-step until it matches the other side. You may not move terms across the equals sign — that would assume the thing you are trying to prove.

**Verification strategy:**

- Start with the **more complicated side** — there's more to simplify, so it's easier to find footholds.
- Convert to sines and cosines if stuck.
- Look for common denominators or factoring opportunities.
- Apply the Pythagorean identity wherever \( 1 - \sin^2 \), \( 1 - \cos^2 \), \( \sec^2 - 1 \), or \( \csc^2 - 1 \) appears.

**Example:** Verify that \( \sec\theta - \cos\theta = \sin\theta\tan\theta \).

Start with the left (more complicated, with both sec and cos). Convert secant to cosine:

\[ \sec\theta - \cos\theta = \frac{1}{\cos\theta} - \cos\theta = \frac{1 - \cos^2\theta}{\cos\theta} \]

Apply the Pythagorean identity \( 1 - \cos^2\theta = \sin^2\theta \):

\[ \frac{\sin^2\theta}{\cos\theta} = \sin\theta\cdot\frac{\sin\theta}{\cos\theta} = \sin\theta\tan\theta \]

which matches the right side. ✓

Here is a side-by-side comparison of verifying vs. simplifying:

| Task | Input | Output | Freedom |
|---|---|---|---|
| Simplify | one expression | a cleaner equivalent expression | rewrite however you like |
| Verify | a claimed identity with two sides | a sequence showing they are equal | transform one side only; never cross the equals sign |

#### Diagram: Identity Verification Worked Examples

<iframe src="../../sims/identity-verification-stepper/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Identity Verification Worked Examples</summary>
Type: microsim
**sim-id:** identity-verification-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, demonstrate): Demonstrate the step-by-step verification of trigonometric identities by choosing the next algebraic move at each stage.

Canvas layout:
- Top: current state of the expression being transformed, with the two sides displayed
- Middle: list of available moves (e.g., "Convert to sin/cos," "Apply Pythagorean identity," "Factor," "Combine fractions")
- Bottom: feedback area showing whether the chosen move brings the two sides closer

Visual elements:
- Current expression in large math-typeset form
- Highlighted portion of the expression that the selected move will transform
- Move history stack on the right side
- Success check when the two sides match

Interactive controls:
- Dropdown: choose from 6 preset identities to verify
- Button array: select the next move
- Button: Undo last move
- Button: Show full solution

Data Visibility Requirements:
- Stage 1: Starting identity displayed in full
- Stage 2: After each move, show which rule was applied and the resulting expression
- Stage 3: Show a progress indicator (how many moves completed vs. expected)
- Stage 4: When complete, display the full proof as a sequence

Instructional Rationale: Guided move selection teaches identity verification as a search problem with a small number of good moves, not a magic trick. The undo button encourages experimentation without penalty.

Implementation: p5.js with math rendering.
</details>

!!! mascot-celebration "Algebra with New Rules"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You have now added trig identities to your algebra toolkit. Solving equations, simplifying expressions, and building models will all be faster because you can rewrite \( \sin \), \( \cos \), and their relatives with confidence. The next chapter puts these skills to work solving trig equations.

## Key Takeaways

- An identity is true for every allowable input; an equation is only true for specific values.
- The core identity is \( \sin^2\theta + \cos^2\theta = 1 \). Dividing by \( \cos^2\theta \) or \( \sin^2\theta \) gives the other two Pythagorean identities.
- Reciprocal and quotient identities let you rewrite any trig expression in terms of sine and cosine.
- Cofunction identities pair each function with the function of its complement.
- Even-odd identities handle negative inputs: cosine and secant are even; the other four are odd.
- Sum and difference formulas compute trig values at sums of angles; double-angle formulas are the \( \alpha = \beta \) case.
- To verify an identity, transform one side at a time until it matches the other. Start with the more complicated side.
