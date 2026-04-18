---
title: Quadratic Functions and Complex Numbers
description: Quadratic functions in three forms, the vertex and axis of symmetry, the quadratic formula and discriminant, and an introduction to complex numbers and complex zeros.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:42:00
version: 0.07
---

# Quadratic Functions and Complex Numbers

## Summary

This chapter covers quadratic functions in their standard, vertex, and factored forms, along with key features like the vertex, axis of symmetry, and parabola shape. Students learn techniques including completing the square, the quadratic formula, and the discriminant. The chapter extends the number system to include complex numbers and the imaginary unit, preparing students to understand complex zeros of polynomials in the next chapter.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Quadratic Function Definition
2. Standard Form of Quadratic
3. Vertex Form
4. Factored Form
5. Vertex
6. Axis of Symmetry
7. Parabola
8. Completing the Square
9. Quadratic Formula
10. Discriminant
11. Complex Numbers
12. Imaginary Unit
13. Complex Zeros

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 4: Linear Functions](../04-linear-functions/index.md)

---

!!! mascot-welcome "Where Curves Begin"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Linear functions change at a constant rate; quadratic functions do not. They bend. This chapter introduces the first function family that curves, along with the algebraic techniques and the extended number system needed to understand every zero a quadratic can produce.

## The Quadratic Function

A **quadratic function** is any function that can be written in the form

\[ f(x) = ax^2 + bx + c \]

where \( a \), \( b \), and \( c \) are real-number constants and \( a \neq 0 \). The defining feature is the \( x^2 \) term: without it, the expression would be linear. The coefficient \( a \) controls the strength and direction of the curve; \( b \) shifts the vertex horizontally; \( c \) gives the y-intercept (the output at \( x = 0 \)).

The graph of a quadratic function is called a **parabola**. A parabola is a symmetric U-shaped curve that opens upward when \( a > 0 \) and downward when \( a < 0 \). The magnitude of \( a \) controls how "tight" the parabola is — larger \( |a| \) produces a narrower curve, smaller \( |a| \) produces a wider one. A parabola has exactly one highest or lowest point, and the curve is mirror-symmetric across a vertical line through that extremum.

- \( a > 0 \): parabola opens upward; the vertex is the global minimum.
- \( a < 0 \): parabola opens downward; the vertex is the global maximum.
- \( |a| \) large: narrow parabola (steep climb).
- \( |a| \) small: wide parabola (gentle climb).

## The Vertex and Axis of Symmetry

Every parabola has two features that organize the rest of the graph. The **vertex** is the single turning point — the bottom of an upward-opening parabola or the top of a downward-opening one. The **axis of symmetry** is the vertical line through the vertex; reflecting the parabola across that line maps it exactly onto itself.

For a quadratic in the form \( f(x) = ax^2 + bx + c \), the axis of symmetry sits at

\[ x = -\frac{b}{2a} \]

and the vertex is the point \( \left( -\tfrac{b}{2a},\ f\!\left(-\tfrac{b}{2a}\right) \right) \). Substituting \( -b/(2a) \) back into \( f \) gives the vertex's y-coordinate.

Example: for \( f(x) = 2x^2 - 8x + 3 \), we have \( a = 2 \), \( b = -8 \), \( c = 3 \). The axis of symmetry is \( x = -(-8)/(2 \cdot 2) = 2 \). The vertex's y-coordinate is \( f(2) = 8 - 16 + 3 = -5 \). So the vertex is \( (2, -5) \) and the parabola opens upward.

!!! mascot-thinking "Two Features, One Symmetry"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Notice how the vertex and the axis of symmetry are really one fact expressed two ways: the axis *is* the vertical line through the vertex. Once you know one, you instantly know the other.

## Three Forms of a Quadratic Function

Just as linear functions have three common forms, quadratic functions are commonly written three ways. Each form is a complete description — same parabola, same domain, same range — but each highlights a different feature.

**Standard form** is \( f(x) = ax^2 + bx + c \). This is the form we used to introduce the family. It reveals the y-intercept (it's just \( c \)) but hides the vertex behind a calculation. It is the form best suited to the quadratic formula, which we will meet shortly.

**Vertex form** is

\[ f(x) = a(x - h)^2 + k \]

where \( (h, k) \) is the vertex and \( a \) plays the same role as in standard form. This form is best when the vertex is the object of interest — reading it off is immediate. The axis of symmetry is \( x = h \), and the extremum value is \( k \).

**Factored form** (when it exists over the real numbers) is

\[ f(x) = a(x - r_1)(x - r_2) \]

where \( r_1 \) and \( r_2 \) are the **zeros** of the function — the \( x \)-values where \( f(x) = 0 \), which correspond to the x-intercepts of the graph. Factored form makes zeros immediately visible but hides the y-intercept and vertex behind algebra. Not every quadratic can be factored over the real numbers; those that cannot are still valid quadratics and will force us to extend our number system later in the chapter.

Before the summary table, let's see all three forms describing the same parabola. Take \( f(x) = 2x^2 - 8x + 6 \). Its vertex is \( (2, -2) \) (from \( x = 2 \) and \( f(2) = -2 \)), and its zeros are \( x = 1 \) and \( x = 3 \). So:

- Standard: \( f(x) = 2x^2 - 8x + 6 \)
- Vertex: \( f(x) = 2(x - 2)^2 - 2 \)
- Factored: \( f(x) = 2(x - 1)(x - 3) \)

All three equations describe the same curve. The table below compares what each form reveals at a glance.

| Form | Equation | Reveals immediately | Hidden (requires algebra) |
|------|----------|--------------------|-----------------------------|
| Standard | \( ax^2 + bx + c \) | y-intercept \( c \); direction (sign of \( a \)) | Vertex, zeros |
| Vertex | \( a(x - h)^2 + k \) | Vertex \( (h, k) \); axis of symmetry \( x = h \) | y-intercept, zeros |
| Factored | \( a(x - r_1)(x - r_2) \) | Zeros \( r_1 \) and \( r_2 \) | Vertex, y-intercept |

#### Diagram: Three Forms of a Parabola

<details markdown="1">
<summary>Interactive display of a single parabola in standard, vertex, and factored form</summary>
Type: MicroSim
**sim-id:** three-forms-parabola<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a single parabola with its three algebraic forms updated live as the student drags its vertex and one additional anchor point.

Learning objective (Bloom's Applying): Students will convert a quadratic function between standard, vertex, and factored forms and verify algebraically and visually that the forms describe the same parabola.

Visual elements:

- A coordinate plane from -10 to 10 on each axis with gridlines.
- A single maroon parabola.
- A draggable vertex handle (solid dot) and a draggable zero handle (hollow dot) that define the curve.
- A side panel with three labelled boxes showing the current standard, vertex, and factored forms.
- Highlighted tick marks on the axis at the vertex's x-coordinate, at both zeros, and at the y-intercept, each labelled.

Interactive controls:

- Drag the vertex handle to translate the parabola.
- Drag the zero handle to change the width (the value of \( a \)).
- Preset buttons for \( f(x) = x^2 - 4 \), \( f(x) = -(x+1)^2 + 9 \), and \( f(x) = 2(x-1)(x-3) \).
- "Hide Factored" toggle that removes the factored box when no real zeros exist (to be used later with parabolas that don't cross the x-axis).

Instructional rationale: Apply-level fluency requires converting between representations. Seeing all three equations shift simultaneously makes the translations concrete rather than mechanical.

Canvas: 900 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createButton for presets, createCheckbox for hiding factored form, custom drag logic for both handles.
</details>

## Completing the Square

To convert from standard form to vertex form, we use an algebraic technique called **completing the square**. The goal is to rewrite \( ax^2 + bx + c \) as \( a(x - h)^2 + k \) by forcing the quadratic terms into a perfect square.

The procedure for \( f(x) = ax^2 + bx + c \):

1. Factor \( a \) out of the first two terms: \( a\!\left(x^2 + \tfrac{b}{a}x\right) + c \).
2. Take half of the new middle coefficient \( \tfrac{b}{a} \), square it, and add and subtract that value inside the parentheses.
3. Group the perfect square and simplify the leftover constant outside.

Worked example with \( f(x) = x^2 - 6x + 11 \) (here \( a = 1 \), so step 1 is trivial):

\[ f(x) = (x^2 - 6x) + 11 \]

Half of \( -6 \) is \( -3 \); squaring gives 9. Add and subtract 9:

\[ f(x) = (x^2 - 6x + 9) - 9 + 11 = (x - 3)^2 + 2 \]

The vertex is \( (3, 2) \) and the parabola opens upward. Completing the square is also the technique used to *derive* the quadratic formula and to rewrite any quadratic expression that appears in calculus integrals later on. It is worth practicing until it feels routine.

## The Quadratic Formula

The **quadratic formula** gives the zeros of any quadratic directly from its standard-form coefficients:

\[ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \]

The formula is derived by completing the square on the general expression \( ax^2 + bx + c = 0 \). It always produces the zeros, even when the quadratic cannot be factored over the integers.

Example: solve \( 2x^2 + 3x - 2 = 0 \). Identify \( a = 2 \), \( b = 3 \), \( c = -2 \):

\[ x = \frac{-3 \pm \sqrt{9 + 16}}{4} = \frac{-3 \pm 5}{4} \]

So \( x = \tfrac{1}{2} \) or \( x = -2 \). A quick check via factoring: \( 2x^2 + 3x - 2 = (2x - 1)(x + 2) \), which gives the same zeros.

!!! mascot-tip "Memorize, Then Understand"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    The quadratic formula is one of those pieces of math worth memorizing cold — it will show up in every unit for the rest of the course. But once it is memorized, trace where each piece comes from: the \( -b/(2a) \) is the axis of symmetry, and the square-root term is how far the zeros sit from that axis.

## The Discriminant

The expression under the square root in the quadratic formula, \( b^2 - 4ac \), has its own name: the **discriminant**. Its sign reveals — before you do the full calculation — what kind of zeros the quadratic has.

- \( b^2 - 4ac > 0 \): two distinct real zeros; the parabola crosses the x-axis at two points.
- \( b^2 - 4ac = 0 \): one repeated real zero; the parabola touches the x-axis at its vertex but does not cross.
- \( b^2 - 4ac < 0 \): no real zeros; the parabola does not cross the x-axis at all.

The third case is where the real number system runs out. A negative discriminant forces a square root of a negative number, which no real number can produce. Rather than stop there, we extend our number system to include a new kind of number.

## Complex Numbers and the Imaginary Unit

The **imaginary unit** \( i \) is defined by the property

\[ i^2 = -1 \]

Equivalently, \( i = \sqrt{-1} \). This single definition is all we need. With \( i \) in hand, any negative square root reduces: \( \sqrt{-9} = \sqrt{9}\sqrt{-1} = 3i \), and \( \sqrt{-16} = 4i \).

A **complex number** is any number of the form

\[ z = a + bi \]

where \( a \) and \( b \) are real numbers. The number \( a \) is the **real part**, and \( b \) is the **imaginary part**. Every real number is a complex number with \( b = 0 \); every pure imaginary number is a complex number with \( a = 0 \). The complex numbers form a system that contains the reals as a subset and extends them just enough to take square roots of any quantity, positive or negative.

Complex numbers add, subtract, and multiply using ordinary algebra with the rule \( i^2 = -1 \):

- \( (2 + 3i) + (4 - i) = 6 + 2i \)
- \( (2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i \)

The complex-number system closes a gap in the reals: inside it, *every* quadratic has zeros.

## Complex Zeros of a Quadratic

When the discriminant is negative, the quadratic formula still produces zeros — they just live in the complex numbers. Consider \( f(x) = x^2 + 4x + 13 \), with \( a = 1 \), \( b = 4 \), \( c = 13 \):

\[ x = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = \frac{-4 \pm 6i}{2} = -2 \pm 3i \]

The two zeros are \( -2 + 3i \) and \( -2 - 3i \). They come in a matched pair: same real part, opposite imaginary parts. This is no accident. Whenever a quadratic with real coefficients has a complex zero \( a + bi \), its **complex conjugate** \( a - bi \) is also a zero. We will prove this pattern for all polynomials in Chapter 7.

The diagram below visualizes the three discriminant cases on one screen so the geometric meaning of the zeros is unambiguous.

#### Diagram: Discriminant Decision Tree

<details markdown="1">
<summary>Infographic mapping the sign of the discriminant to zero behavior</summary>
Type: infographic
**sim-id:** discriminant-decision-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic showing a three-branch decision tree driven by the sign of \( b^2 - 4ac \). Each branch displays a miniature parabola showing the zero configuration.

Learning objective (Bloom's Analyzing): Students will analyze the discriminant of a quadratic to predict the number and nature of its zeros without computing the zeros directly.

Layout:

- Top of the diagram shows \( f(x) = ax^2 + bx + c \) with a prompt to compute \( b^2 - 4ac \).
- Three branches lead downward, one for each case.
- Left branch (\( b^2 - 4ac > 0 \)): small parabola crossing the x-axis at two points; caption "Two distinct real zeros"; example \( x^2 - 5x + 6 \) with zeros 2 and 3.
- Middle branch (\( b^2 - 4ac = 0 \)): small parabola touching the x-axis at its vertex; caption "One repeated real zero"; example \( x^2 - 4x + 4 \) with zero 2.
- Right branch (\( b^2 - 4ac < 0 \)): small parabola floating above the x-axis; caption "Two complex conjugate zeros"; example \( x^2 + 4x + 13 \) with zeros \( -2 \pm 3i \).

Interactive behavior:

- Input boxes for \( a \), \( b \), \( c \) at the top; entering values live-highlights the correct branch.
- "Show Zeros" button reveals the exact zeros for the entered quadratic.
- Preset buttons that cycle through the three example quadratics.

Instructional rationale: Analyze-level objectives require classifying based on evidence. Mapping a single calculation (the discriminant) to three visually distinct graph types makes the link between algebra and geometry immediate.

Canvas: 900 × 550 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createInput for coefficient entry, createButton for presets and Show Zeros.
</details>

## Putting It All Together

Quadratic functions bridge the gap from linear functions to the broader world of polynomials. Everything in this chapter — vertex, axis of symmetry, three forms, the discriminant, complex conjugate zeros — has a direct analogue or extension when we move to cubics, quartics, and beyond in Chapters 6 and 7.

The key ideas to carry forward:

- A **quadratic function** \( ax^2 + bx + c \) graphs as a **parabola** with a **vertex** and an **axis of symmetry**.
- Three equivalent forms — **standard**, **vertex**, and **factored** — each highlight different features.
- **Completing the square** converts standard form to vertex form; the **quadratic formula** finds the zeros of any quadratic.
- The **discriminant** \( b^2 - 4ac \) predicts whether the zeros are two real, one repeated real, or two complex.
- **Complex numbers** \( a + bi \), built on the **imaginary unit** \( i^2 = -1 \), ensure every quadratic has zeros — always in conjugate pairs when coefficients are real.

!!! mascot-celebration "Curves and Conjugates"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You crossed the line from straight lines to curves *and* from the real numbers to the complex numbers in a single chapter. These are two of the biggest conceptual moves in pre-calculus, and you have them both. The polynomial world ahead is going to feel much less mysterious now.

??? question "Quick Check: Find the vertex of \( f(x) = x^2 - 6x + 11 \)."
    From completing the square (worked in this chapter), \( f(x) = (x - 3)^2 + 2 \), so the vertex is \( (3, 2) \).

??? question "Quick Check: How many real zeros does \( f(x) = 3x^2 - 4x + 5 \) have?"
    Discriminant: \( 16 - 60 = -44 < 0 \). No real zeros; the parabola floats above the x-axis. Two complex conjugate zeros.

??? question "Quick Check: Simplify \( (3 + 2i)(1 - 4i) \)."
    \( 3 - 12i + 2i - 8i^2 = 3 - 10i + 8 = 11 - 10i \).
