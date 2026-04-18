---
title: Composition and Inverse Functions
description: Combining functions through composition, decomposing complex expressions, and reversing input-output relationships through inverse functions, the horizontal line test, and domain restriction.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:55:30
version: 0.07
---

# Composition and Inverse Functions

## Summary

This chapter covers two important ways to combine and relate functions: composition and inversion. Students learn to compose functions, determine the domain of compositions, and decompose complex functions into simpler components. The chapter introduces inverse functions, one-to-one functions, the horizontal line test, finding inverses algebraically, graphing inverse functions as reflections, and restricting domains to create invertible functions. These concepts are essential for understanding exponential-logarithmic and trigonometric inverse relationships.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Composition of Functions
2. Domain of Compositions
3. Decomposing Functions
4. Inverse Function Definition
5. One-to-One Functions
6. Horizontal Line Test
7. Finding Inverses Algebraically
8. Inverse Function Graphs
9. Restricting Domains

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 9: Function Transformations](../09-function-transformations/index.md)

---

!!! mascot-welcome "Two Ways to Connect Functions"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    So far we have studied functions one at a time. This chapter introduces two operations that link functions together: **composition**, which feeds the output of one function into the input of another, and **inversion**, which reverses an input-output relationship. Both ideas appear constantly in the trigonometry and exponential chapters that follow.

## Composition of Functions

**Composition of functions** is the operation of using one function's output as another function's input. If \( f \) and \( g \) are functions, the composition \( f \circ g \) (read "f composed with g" or "f of g") is defined by:

\[ (f \circ g)(x) = f(g(x)) \]

The notation reads from the inside out: first \( g \) acts on \( x \), and then \( f \) acts on the result. The order matters — \( f \circ g \) is generally not the same function as \( g \circ f \).

For example, if \( f(x) = x^2 \) and \( g(x) = x + 3 \), then:

- \( (f \circ g)(x) = f(g(x)) = f(x+3) = (x+3)^2 \)
- \( (g \circ f)(x) = g(f(x)) = g(x^2) = x^2 + 3 \)

The first composition squares the result of adding 3, while the second adds 3 to the square. Same two functions, different compositions, different outputs.

Composition can be visualized as a pipeline: the input enters one function, its output flows directly into the next function, and the final output emerges. The next diagram shows that pipeline so we can see clearly which function runs first.

#### Diagram: Function Composition Pipeline

<details markdown="1">
<summary>Pipeline view of f(g(x)) showing input flowing through g, then through f</summary>
Type: MicroSim
**sim-id:** function-composition-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that visualizes the composition \( f(g(x)) \) as two boxes connected by an arrow, with a draggable input value that flows through the pipeline.

Learning objective (Bloom's Understanding): Students will explain that in \( f(g(x)) \), the inner function runs first and its output becomes the input to the outer function.

Visual elements:

- An input slider on the left labeled \( x \).
- A box labeled \( g(x) = x + 3 \) showing the intermediate value.
- An arrow connecting the box to a second box labeled \( f(x) = x^2 \).
- A final output value on the right labeled \( f(g(x)) \).
- A toggle to swap the order of \( f \) and \( g \), showing how \( g(f(x)) \) produces a different result.

Interactive controls:

- A slider for the input \( x \) ranging from -5 to 5 in steps of 0.1.
- A "Swap Order" button to compare \( f \circ g \) with \( g \circ f \).
- A dropdown to choose between three preset \( f, g \) pairs: \( (x^2, x+3) \), \( (\sqrt{x}, 2x) \), \( (1/x, x-1) \).

Instructional rationale: Composition order is the most common student confusion in this chapter. Watching a single value flow through a pipeline — and seeing the answer change when the order swaps — builds the inside-out reading habit that the algebra requires.

Canvas: 900 × 400 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for input, createButton for swap, createSelect for function pairs.
</details>

!!! mascot-thinking "Read Compositions Inside-Out"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The expression \( f(g(x)) \) reads from the inside out: \( g \) runs first, then \( f \) acts on whatever \( g \) produced. Once you see that order, composition stops feeling tangled.

## Domain of Compositions

The **domain of compositions** is the set of inputs \( x \) for which the entire pipeline produces a valid output. An input \( x \) belongs to the domain of \( f \circ g \) only when two conditions both hold:

1. \( x \) is in the domain of \( g \) (so \( g(x) \) is defined).
2. \( g(x) \) is in the domain of \( f \) (so \( f(g(x)) \) is defined).

A common pitfall is to compute \( f(g(x)) \) algebraically and use the resulting expression's "natural" domain. That can wrongly include inputs that fail the inner function. Always check both conditions in order.

For example, let \( g(x) = \sqrt{x} \) and \( f(x) = x - 1 \). The algebraic composition is \( f(g(x)) = \sqrt{x} - 1 \). The expression looks defined for all \( x \), but \( g(x) = \sqrt{x} \) requires \( x \geq 0 \), so the domain of \( f \circ g \) is \( [0, \infty) \), not all real numbers.

The next table summarizes how restrictions from each function combine to form the composition's domain.

| Inner function \( g \) | Outer function \( f \) | Domain of \( f \circ g \) |
|------------------------|------------------------|---------------------------|
| \( g(x) = \sqrt{x} \)  | \( f(x) = x - 1 \)    | \( [0, \infty) \) |
| \( g(x) = 1/x \)       | \( f(x) = x^2 \)      | \( x \neq 0 \) |
| \( g(x) = x^2 \)       | \( f(x) = \sqrt{x} \) | All real numbers (since \( x^2 \geq 0 \)) |
| \( g(x) = x - 3 \)     | \( f(x) = 1/x \)      | \( x \neq 3 \) |

!!! mascot-warning "The Algebra Can Hide Restrictions"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    Simplifying \( f(g(x)) \) to a clean expression sometimes erases the inner function's domain restrictions. Always determine the domain *before* simplifying — the inner function's rules apply even when they vanish from the final formula.

## Decomposing Functions

**Decomposing functions** is the reverse of composition: given a complicated function, identify simpler functions \( f \) and \( g \) whose composition reproduces it. The skill is essential for the chain rule in calculus, but it is also useful right now for recognizing structure.

A standard strategy is to identify the **outer operation** (what is done last to a packaged input) and the **inner operation** (the package itself).

For example, decompose \( h(x) = (3x + 1)^4 \):

- The outer operation is "raise to the fourth power": \( f(u) = u^4 \).
- The inner operation is "multiply by 3 and add 1": \( g(x) = 3x + 1 \).
- Check: \( f(g(x)) = f(3x+1) = (3x+1)^4 = h(x) \). ✓

Another example: decompose \( h(x) = \sqrt{x^2 + 5} \).

- The outer operation is "take the square root": \( f(u) = \sqrt{u} \).
- The inner operation is "square and add 5": \( g(x) = x^2 + 5 \).
- Check: \( f(g(x)) = \sqrt{x^2 + 5} = h(x) \). ✓

Decomposition is rarely unique — \( h(x) = ((3x+1)^2)^2 \) gives a different valid pair. We usually prefer the decomposition that splits the function into the most familiar pieces.

## Inverse Function Definition

An **inverse function** undoes what the original function did. If \( f \) takes input \( a \) to output \( b \), then its inverse \( f^{-1} \) takes \( b \) back to \( a \). Formally, \( f^{-1} \) is the function that satisfies both:

\[ f^{-1}(f(x)) = x \quad \text{for every } x \text{ in the domain of } f \]

\[ f(f^{-1}(x)) = x \quad \text{for every } x \text{ in the domain of } f^{-1} \]

The notation \( f^{-1} \) is a piece of standard mathematical shorthand, **not** an exponent — it does not mean \( 1/f(x) \). The reciprocal of \( f(x) \) is written \( 1/f(x) \) or \( [f(x)]^{-1} \) to avoid the conflict.

Three facts follow directly from the definition:

- The **domain of \( f^{-1} \) equals the range of \( f \)**.
- The **range of \( f^{-1} \) equals the domain of \( f \)**.
- An inverse exists only if every output of \( f \) comes from exactly one input — a property called *one-to-one*, defined next.

## One-to-One Functions

A function is **one-to-one** (also called *injective*) if every output value is produced by exactly one input. Equivalently, no two distinct inputs share the same output:

\[ f(a) = f(b) \implies a = b \]

Why does one-to-one matter for inverses? If two inputs \( a \) and \( b \) produced the same output \( c \), then the would-be inverse would have to send \( c \) both back to \( a \) and back to \( b \) at once — which is not a function. The inverse exists only when the original function pairs inputs and outputs uniquely in both directions.

Some quick examples:

- \( f(x) = 2x + 1 \) is one-to-one: each output traces back to one input.
- \( f(x) = x^2 \) is *not* one-to-one over all real numbers: \( f(2) = f(-2) = 4 \), so the output 4 has two sources.
- \( f(x) = x^3 \) is one-to-one: cubing is a strictly increasing operation, so each output has a single input.

## Horizontal Line Test

The **horizontal line test** is a graphical way to check whether a function is one-to-one. The test states: a function is one-to-one if and only if every horizontal line crosses the graph at most once.

A horizontal line at height \( y = c \) represents the question "which inputs produce output \( c \)?" If the line hits the graph in two or more places, two or more inputs share that output, violating the one-to-one property. If every horizontal line hits the graph in at most one place, every output is unique to one input.

The horizontal line test pairs neatly with the *vertical line test* from Chapter 2: vertical lines confirm a relation is a function, horizontal lines confirm a function is one-to-one. Both tests are required for the function to have an inverse function.

#### Diagram: Vertical and Horizontal Line Tests Compared

<details markdown="1">
<summary>Side-by-side demonstration of vertical-line-test (function) and horizontal-line-test (one-to-one)</summary>
Type: infographic
**sim-id:** line-tests-compared<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic showing four sample graphs, each tested against both vertical and horizontal lines, with passing/failing indicators.

Learning objective (Bloom's Analyzing): Students will analyze a graph against both line tests and determine whether the relation is a function and whether the function has an inverse.

Visual elements:

- Four graph panels arranged 2×2: a parabola \( y = x^2 \), a sideways parabola \( x = y^2 \), a cubic \( y = x^3 \), and a circle \( x^2 + y^2 = 4 \).
- A draggable vertical line and a draggable horizontal line on each panel.
- Status badges per panel: "Function?" (green/red) and "One-to-one?" (green/red).

Interactive controls:

- Drag handles to slide the vertical and horizontal lines across each panel.
- A "Reveal Verdicts" button that animates the test lines across each graph, showing intersection counts.

Instructional rationale: Side-by-side display makes the relationship between the two tests concrete. Students see that a function (vertical-line pass) might still fail to have an inverse (horizontal-line fail) and vice versa.

Canvas: 900 × 700 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with mouseDragged for line handles, createButton for reveal verdicts.
</details>

## Finding Inverses Algebraically

Once we know a function is one-to-one, we can find its inverse algebraically. The standard procedure has three steps:

1. Replace \( f(x) \) with \( y \).
2. Swap \( x \) and \( y \) (this reflects the role of input and output).
3. Solve the new equation for \( y \). The result is \( f^{-1}(x) \).

A short example: find the inverse of \( f(x) = 2x + 5 \).

1. Write \( y = 2x + 5 \).
2. Swap: \( x = 2y + 5 \).
3. Solve for \( y \): \( y = (x - 5)/2 \). So \( f^{-1}(x) = \frac{x - 5}{2} \).

We can verify by composing: \( f(f^{-1}(x)) = 2 \cdot \frac{x-5}{2} + 5 = (x - 5) + 5 = x \). ✓

A second example: find the inverse of \( f(x) = x^3 - 1 \).

1. Write \( y = x^3 - 1 \).
2. Swap: \( x = y^3 - 1 \).
3. Solve for \( y \): \( y^3 = x + 1 \), so \( y = \sqrt[3]{x+1} \). Thus \( f^{-1}(x) = \sqrt[3]{x + 1} \).

Verification: \( f(f^{-1}(x)) = (\sqrt[3]{x+1})^3 - 1 = (x + 1) - 1 = x \). ✓

!!! mascot-tip "Verify by Composition"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    After finding \( f^{-1}(x) \), compute \( f(f^{-1}(x)) \) and confirm you get \( x \). One quick algebra step catches almost every error in finding inverses.

## Inverse Function Graphs

The **graph of \( f^{-1} \)** is the reflection of the graph of \( f \) across the line \( y = x \). This geometric fact follows directly from the swap step in the algebraic procedure: swapping \( x \) and \( y \) in an equation reflects every point \( (a, b) \) on the curve to the point \( (b, a) \), and the line of reflection that takes \( (a, b) \) to \( (b, a) \) is exactly \( y = x \).

A few visual consequences worth remembering:

- The point \( (3, 8) \) on the graph of \( f \) corresponds to the point \( (8, 3) \) on the graph of \( f^{-1} \).
- Any point on the line \( y = x \) is its own reflection — so if \( (c, c) \) is on \( f \), it is also on \( f^{-1} \).
- If \( f \) crosses the \( x \)-axis at \( (a, 0) \), then \( f^{-1} \) crosses the \( y \)-axis at \( (0, a) \).
- A horizontal asymptote of \( f \) becomes a vertical asymptote of \( f^{-1} \), and vice versa.

#### Diagram: Inverse as Reflection Across y = x

<details markdown="1">
<summary>Interactive reflection of a function across the line y = x to produce its inverse</summary>
Type: MicroSim
**sim-id:** inverse-reflection-yx<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a function and its inverse mirrored across the line \( y = x \), with a draggable point that simultaneously appears on both curves.

Learning objective (Bloom's Understanding): Students will describe the geometric relationship between a function and its inverse as a reflection across \( y = x \).

Visual elements:

- Coordinate plane from -10 to 10 on both axes.
- A dashed line \( y = x \) drawn diagonally.
- The graph of a chosen function in maroon and its inverse in gold.
- A draggable point on \( f \) at \( (a, b) \) and an automatically synced point on \( f^{-1} \) at \( (b, a) \), with a dotted segment connecting them through \( y = x \).

Interactive controls:

- A function dropdown: linear \( 2x + 1 \), cubic \( x^3 \), exponential \( 2^x \), square root \( \sqrt{x} \).
- A "Show/Hide \( y = x \)" toggle.
- A "Trace Reflection" button that animates many points being reflected across the diagonal.

Instructional rationale: The reflection idea sticks better when students drag a point on one curve and watch its mirror image move on the other. The dotted connector across \( y = x \) makes the symmetry concrete.

Canvas: 800 × 800 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for function, createCheckbox for diagonal, createButton for trace.
</details>

## Restricting Domains

Some important functions are not one-to-one over their natural domain. The squaring function \( f(x) = x^2 \) sends both 3 and -3 to 9, so it has no inverse on all real numbers. The fix is **restricting domains** — choosing a smaller domain on which the function *is* one-to-one, and defining the inverse on that restricted domain.

For \( f(x) = x^2 \), the restriction \( x \geq 0 \) makes the function one-to-one. On that restricted domain, the inverse is \( f^{-1}(x) = \sqrt{x} \). The restriction \( x \leq 0 \) would also work, with inverse \( f^{-1}(x) = -\sqrt{x} \). Either choice is valid, but mathematicians conventionally pick the non-negative branch so that the principal square root is the standard inverse.

Domain restriction is the engine behind the inverse trigonometric functions, which we will meet in Chapter 20.

- Sine is not one-to-one over all reals, but restricting to \( [-\pi/2, \pi/2] \) makes it one-to-one. The inverse on that interval is \( \arcsin \).
- Cosine restricted to \( [0, \pi] \) gives \( \arccos \).
- Tangent restricted to \( (-\pi/2, \pi/2) \) gives \( \arctan \).

The next table summarizes the most common restrictions used to build standard inverse functions.

| Original function | Natural domain | Restricted domain | Inverse on restriction |
|-------------------|----------------|-------------------|------------------------|
| \( f(x) = x^2 \) | All reals | \( x \geq 0 \) | \( f^{-1}(x) = \sqrt{x} \) |
| \( f(x) = \sin x \) | All reals | \( [-\pi/2, \pi/2] \) | \( f^{-1}(x) = \arcsin x \) |
| \( f(x) = \cos x \) | All reals | \( [0, \pi] \) | \( f^{-1}(x) = \arccos x \) |
| \( f(x) = \tan x \) | All reals (with gaps) | \( (-\pi/2, \pi/2) \) | \( f^{-1}(x) = \arctan x \) |

!!! mascot-celebration "You've Built the Inverse Toolkit"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    Composition, inversion, the horizontal line test, and domain restriction are the four ideas you will reach for over and over in the rest of this course. Exponentials and logarithms (Chapters 13 and 14) are inverses of each other. Inverse trigonometric functions (Chapter 20) rely on careful domain restrictions. You now have everything you need to recognize that pattern wherever it appears.

## Putting It All Together

Composition and inversion are companion operations. Composition glues two functions into a pipeline; inversion reverses the pipeline of a single function. Both operations are governed by careful attention to domain — the inputs that survive the pipeline (for composition) or that map back uniquely (for inversion).

Key ideas to carry forward:

- Composition reads inside-out: \( f(g(x)) \) means \( g \) first, then \( f \).
- The composition's domain is more restrictive than either function's domain alone — always check both functions.
- Decomposition is the reverse of composition, splitting a complex expression into outer and inner pieces.
- An inverse exists only for one-to-one functions; the horizontal line test is the visual check.
- The graph of \( f^{-1} \) is the reflection of \( f \) across the line \( y = x \).
- Restricting the domain creates an inverse for any function that is locally one-to-one — this trick will return for inverse trig functions.

??? question "Quick Check: If \( f(x) = x + 4 \) and \( g(x) = x^2 \), what is \( (f \circ g)(3) \)?"
    \( g(3) = 9 \), then \( f(9) = 13 \). So \( (f \circ g)(3) = 13 \).

??? question "Quick Check: Does \( f(x) = x^4 \) pass the horizontal line test?"
    No — the horizontal line \( y = 16 \), for example, crosses the graph at \( x = 2 \) and \( x = -2 \). The function is not one-to-one over all reals and therefore has no inverse without a domain restriction.

??? question "Quick Check: Find the inverse of \( f(x) = 3x - 7 \)."
    Swap and solve: \( x = 3y - 7 \implies y = (x + 7)/3 \). So \( f^{-1}(x) = \frac{x + 7}{3} \).
