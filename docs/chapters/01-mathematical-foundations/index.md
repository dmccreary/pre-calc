---
title: Mathematical Foundations
description: Core building blocks of pre-calculus — real numbers, the number line, order of operations, variables, the coordinate plane, and interval and set-builder notation.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:15:37
version: 0.07
---

# Mathematical Foundations

## Summary

This chapter introduces the core mathematical building blocks that underpin all of pre-calculus. Students will review the real number system, the number line, order of operations, variables and expressions, and the coordinate plane. The chapter also covers notation systems including interval and set-builder notation, and distinguishes between independent and dependent variables. These foundational concepts are prerequisites for every subsequent chapter.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Real Number System
2. Number Line
3. Order of Operations
4. Variables and Expressions
5. Coordinate Plane
6. Ordered Pairs
7. Input and Output
8. Independent Variable
9. Dependent Variable
10. Interval Notation
11. Set-Builder Notation

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Welcome to Pre-Calculus"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving hello">
    Hi, I'm **Prema** — your learning companion for this textbook. I'll pop up throughout every chapter to introduce new ideas, flag common pitfalls, celebrate your wins, and whisper shortcuts when they help. My one big rule: *decompose — let's break this down together!* Before we dive into functions and graphs, we need a shared vocabulary, so think of this chapter as sharpening our tools.

## Why Foundations Matter

Pre-calculus is the language of change, and like any language, it has an alphabet. The symbols, number systems, and notation conventions introduced in this chapter will appear on nearly every page of this textbook. A student who is fluent with interval notation can read a solution set in seconds; a student who is shaky on the order of operations will second-guess every algebraic step.

The goal of this chapter is not to teach anything dramatically new — most of these ideas surfaced in Algebra 1 and 2 — but to unify the notation we will use from here onward. Each subsequent chapter assumes confident command of the vocabulary laid out below.

## The Real Number System

A **real number** is any number that can be placed on a continuous number line. The real numbers include familiar quantities like 3, -7, 1/2, and 0, but also numbers that cannot be written as a ratio of integers, such as \( \pi \) and \( \sqrt{2} \). We write the set of all real numbers as \( \mathbb{R} \).

The real numbers are not a flat, undifferentiated pool — they are organized into nested categories. Each category is a subset of the one that contains it, and membership in a category tells us what kinds of operations are safe to perform.

- **Natural numbers** \( \mathbb{N} = \{1, 2, 3, \dots\} \): the counting numbers.
- **Whole numbers**: the natural numbers together with 0.
- **Integers** \( \mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\} \): whole numbers and their negatives.
- **Rational numbers** \( \mathbb{Q} \): any number expressible as \( \tfrac{p}{q} \) where \( p \) and \( q \) are integers and \( q \neq 0 \).
- **Irrational numbers**: real numbers that are not rational — their decimal expansions neither terminate nor repeat.
- **Real numbers** \( \mathbb{R} \): the union of the rationals and the irrationals.

Each category above is strictly larger than the one preceding it (except irrationals, which are a separate branch). Every natural number is an integer, every integer is rational, and every rational is real — but not every real is rational. The number \( \pi = 3.14159\ldots \) is real but not rational.

Before we look at the diagram below, note that it visualizes the *containment* relationship: each smaller circle sits inside every circle that represents a larger category.

#### Diagram: Real Number System Hierarchy

<details markdown="1">
<summary>Nested Venn diagram of number categories</summary>
Type: infographic
**sim-id:** real-number-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

A nested Venn-style infographic showing the containment of number categories within the real numbers. The outermost region is labeled "Real Numbers (ℝ)" in a maroon color. Inside, a large circle labeled "Rational Numbers (ℚ)" sits to the left, and a separate circle labeled "Irrational Numbers" sits to the right with no overlap with Rationals. Inside Rationals, nested circles appear in order: Integers (ℤ), Whole Numbers, Natural Numbers (ℕ). Each region displays 2-3 example numbers: Naturals show {1, 2, 3}, Integers add {-3, 0}, Rationals add {1/2, -3/4, 0.25}, Irrationals show {π, √2, e}.

Learning objective (Bloom's Understanding): Students will classify a given real number into its most restrictive category.

Interactive behavior: A clickable number tray at the bottom offers numbers like -5, π, 2/3, √9, 0, 1.7. When the student clicks one, the number animates into the correct region(s) and the region briefly highlights in gold. A counter shows "Correctly placed: X of 6." A "Reset" button returns all numbers to the tray.

Canvas: 700 × 500 pixels, responsive to container width via updateCanvasSize() in setup(). Color palette matches textbook maroon (#800020) for outer boundaries and cyan-blue (#00BFFF) for highlights.

Implementation: p5.js MicroSim using createButton for reset and createSelect for difficulty (easy/medium/hard, which changes the set of tray numbers).
</details>

## The Number Line

The **number line** is a geometric representation of the real numbers. Every real number corresponds to exactly one point on the line, and every point on the line corresponds to exactly one real number. This one-to-one correspondence between numbers and points is what allows us to use geometric intuition — distance, direction, betweenness — to reason about algebraic quantities.

By convention, the number line extends infinitely in both directions, with 0 at the origin, positive numbers to the right, and negative numbers to the left. The distance between any two consecutive integers is fixed, and every point between two integers represents a real number that is neither.

## Order of Operations

When an expression contains several operations, we need a rule that tells every reader to evaluate it the same way. Without such a rule, the expression \( 3 + 4 \times 2 \) could mean 14 (adding first) or 11 (multiplying first). The convention we use is called the **order of operations**, often remembered by the mnemonic PEMDAS.

The table below summarizes PEMDAS. A common mistake is to treat multiplication as "stronger than" division, or addition as "stronger than" subtraction. In fact, operations within the same row are performed left to right in the order they appear.

| Priority | Operation | Symbol(s) | Left-to-right rule |
|----------|-----------|-----------|--------------------|
| 1 | Parentheses (grouping) | ( ), [ ], { } | Evaluate innermost first |
| 2 | Exponents | \( x^n \), \( \sqrt{x} \) | Right-to-left for stacked exponents |
| 3 | Multiplication & Division | \( \times, \div, \cdot \) | Equal priority; left-to-right |
| 4 | Addition & Subtraction | \( +, - \) | Equal priority; left-to-right |

As an example, consider \( 12 - 2 \times (3 + 1)^2 \div 4 \). Working through PEMDAS:

1. Parentheses: \( (3 + 1) = 4 \), giving \( 12 - 2 \times 4^2 \div 4 \)
2. Exponents: \( 4^2 = 16 \), giving \( 12 - 2 \times 16 \div 4 \)
3. Multiplication and division, left to right: \( 2 \times 16 = 32 \), then \( 32 \div 4 = 8 \), giving \( 12 - 8 \)
4. Subtraction: \( 12 - 8 = 4 \)

!!! mascot-warning "The Most Common PEMDAS Trap"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema holding up a cautionary sign">
    Multiplication does not beat division, and addition does not beat subtraction — they share priority. When you see \( 8 \div 4 \times 2 \), resist the urge to multiply first; scan left to right and divide first. This single habit prevents a surprising number of sign errors.

## Variables and Expressions

A **variable** is a symbol — usually a letter like \( x \), \( y \), or \( t \) — that represents a number whose value may change or is not yet known. Variables let us write statements that are true for entire families of numbers rather than just one specific case. The equation \( 2x + 1 \) is a **variable expression**: a combination of variables, numbers, and operations that evaluates to a number once we substitute a value for the variable.

An expression is not an equation. Expressions have no equals sign — they produce a value. Equations, in contrast, assert that two expressions are equal. The expression \( 3x + 5 \) evaluates to 11 when \( x = 2 \); the equation \( 3x + 5 = 11 \) asks *which* values of \( x \) make the statement true (in this case, only \( x = 2 \)).

## Input, Output, and Variable Roles

A central habit of pre-calculus is separating the roles that variables play. In an expression like \( y = 3x + 1 \), one variable determines the value of the other. We call the variable we choose freely the **input**, and the variable whose value depends on that choice the **output**.

- The **independent variable** is the input — the quantity we set or choose.
- The **dependent variable** is the output — the quantity produced by the rule.

By near-universal convention in pre-calculus, \( x \) is the independent variable and \( y \) is the dependent variable. When modeling a real-world situation, the independent variable is often time, a cost, or a count; the dependent variable is the response — distance traveled, total price, population size. Recognizing which is which is the first step in building any model.

The table below shows how the same idea appears in different real-world settings. Notice that the independent variable is always the one we can change first, and the dependent variable is the consequence.

| Scenario | Independent (input) | Dependent (output) |
|----------|---------------------|--------------------|
| Driving at 60 mph | Time elapsed, \( t \) | Distance traveled, \( d \) |
| Buying apples at $2 each | Number of apples, \( n \) | Total cost, \( C \) |
| A plant growing over days | Days since planting, \( d \) | Height of plant, \( h \) |
| Temperature over a day | Hour of day, \( t \) | Temperature, \( T \) |

!!! mascot-thinking "Which Variable Comes First?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking with a finger to her temple">
    Here's a reliable test: ask yourself, "If I changed this quantity, would the other one have to change too?" The one you changed is the independent variable. The one that *responded* is the dependent variable. Cause leads; effect follows.

## The Coordinate Plane

To see how two variables relate, we need a way to picture pairs of numbers at once. The **coordinate plane** (also called the Cartesian plane) solves this by crossing two perpendicular number lines: a horizontal **x-axis** and a vertical **y-axis**. Their intersection is the **origin**, labeled (0, 0).

The two axes divide the plane into four **quadrants**, numbered I, II, III, and IV counterclockwise starting from the upper right. In Quadrant I both coordinates are positive; in Quadrant II \( x \) is negative and \( y \) is positive; in Quadrant III both are negative; in Quadrant IV \( x \) is positive and \( y \) is negative.

### Ordered Pairs

Every point in the coordinate plane corresponds to a unique **ordered pair** \( (x, y) \). The first number is the horizontal position (how far right or left of the origin) and the second is the vertical position (how far up or down). The order matters: (3, 5) and (5, 3) name different points.

Before exploring the interactive below, note that the horizontal coordinate always appears first. A helpful memory device: the x-axis is mentioned first in "x and y," and the x-coordinate is mentioned first in \( (x, y) \).

#### Diagram: Coordinate Plane Explorer

<details markdown="1">
<summary>Interactive coordinate plane with clickable points</summary>
Type: MicroSim
**sim-id:** coordinate-plane-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A MicroSim showing a coordinate plane spanning x from -10 to 10 and y from -10 to 10 with integer gridlines. Axes are labeled with tick marks at every integer and larger labels at every fifth integer. The four quadrants are softly tinted (Q1 light blue, Q2 light green, Q3 light yellow, Q4 light pink) with Roman numeral labels in the corner of each quadrant.

Learning objective (Bloom's Applying): Students will locate and identify ordered pairs on the coordinate plane and name the quadrant containing a given point.

Interactive behavior:
- A "Mystery Point" label displays an ordered pair like (4, -3). The student clicks anywhere on the plane to guess the location; correct clicks within a 0.5-unit radius flash gold and play a confirmation tone. Incorrect clicks display the actual pair next to the click location so the student can see their offset.
- A slider labeled "Mystery points remaining" decrements on each correct answer.
- A checkbox labeled "Show coordinates on hover" displays the (x, y) value at the mouse cursor when enabled.
- A "New Round" button generates a fresh set of 5 mystery points.
- A dropdown lets the student filter which quadrants are sampled (All, Quadrant I only, Quadrants I and II, etc.).

Canvas: 600 × 600 pixels, responsive via updateCanvasSize() in setup(). Gridlines are pale gray; axes are bold black; the maroon brand color highlights the most recent clicked point.

Implementation: p5.js with createButton for "New Round," createCheckbox for hover coordinates, createSelect for quadrant filter, and createSlider for grid density (integer-only or half-integer gridlines).
</details>

## Interval Notation

Once we start working with functions, we need compact ways to describe sets of real numbers — the values a variable can take, or the solution set of an inequality. **Interval notation** is one such language. It uses brackets and parentheses to describe a range of numbers on the number line.

The key distinction is between brackets \( [ \, ] \) and parentheses \( ( \, ) \):

- A **bracket** means the endpoint is **included** in the interval. We call this a *closed* endpoint.
- A **parenthesis** means the endpoint is **excluded**. We call this an *open* endpoint.
- **Infinity** \( \infty \) is never a reachable number, so it always appears with a parenthesis.

The table below summarizes the five main shapes of interval you will encounter. Each row shows the same set written three ways — as an inequality, in interval notation, and in plain words — so the translation from one form to another becomes automatic.

| Inequality | Interval Notation | Meaning |
|------------|-------------------|---------|
| \( 2 \le x \le 5 \) | \( [2, 5] \) | All reals between 2 and 5, including both |
| \( 2 < x < 5 \) | \( (2, 5) \) | All reals strictly between 2 and 5 |
| \( 2 \le x < 5 \) | \( [2, 5) \) | Includes 2, excludes 5 |
| \( x > 2 \) | \( (2, \infty) \) | All reals greater than 2 |
| \( x \le 5 \) | \( (-\infty, 5] \) | All reals less than or equal to 5 |

A single interval describes a connected stretch of the number line. When we need two disconnected stretches, we join them with the **union** symbol \( \cup \). For example, "all real numbers except 3" is written \( (-\infty, 3) \cup (3, \infty) \).

## Set-Builder Notation

Interval notation is compact, but it can only describe *continuous* regions of the number line. When we need to describe a set that follows a more complex rule — say, "all real numbers whose square is less than 4" — we use **set-builder notation**.

Set-builder notation has a consistent three-part structure: `{ variable | condition }`, read aloud as "the set of all *variable* such that *condition*." The vertical bar `|` (sometimes written as a colon `:`) is read as "such that."

The example below uses each part of the pattern:

\[ \{ x \mid x \in \mathbb{R}, \; x > 0 \} \]

This reads: "the set of all \( x \) such that \( x \) is a real number and \( x \) is greater than 0." In plain English: the positive real numbers.

Interval notation and set-builder notation often describe the same set — they are different dialects, not different meanings. The table below translates between them so you can move fluently between the two when the problem favors one over the other.

| Set-Builder | Interval Notation | In Words |
|-------------|-------------------|----------|
| \( \{ x \mid x \ge 0 \} \) | \( [0, \infty) \) | Non-negative reals |
| \( \{ x \mid -3 < x \le 2 \} \) | \( (-3, 2] \) | Reals from -3 (exclusive) to 2 (inclusive) |
| \( \{ x \mid x \neq 0 \} \) | \( (-\infty, 0) \cup (0, \infty) \) | All reals except 0 |
| \( \{ x \mid x^2 < 9 \} \) | \( (-3, 3) \) | Reals whose square is less than 9 |

!!! mascot-tip "When to Reach for Each Notation"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema giving a helpful pointer">
    Use *interval notation* whenever you can — it's shorter and easier to read. Switch to *set-builder notation* when the set follows a rule that isn't a simple interval, like "all \( x \) whose cosine is positive." The rule-based form handles cases that brackets cannot.

#### Diagram: Notation Translator

<details markdown="1">
<summary>Three-way translator between inequality, interval, and set-builder notation</summary>
Type: interactive infographic
**sim-id:** notation-translator<br/>
**Library:** p5.js<br/>
**Status:** Specified

An infographic with three synchronized panels arranged horizontally: (1) a number line showing a shaded region with open/closed endpoints, (2) interval notation (e.g., `[-2, 5)`), and (3) set-builder notation (e.g., `{x | -2 ≤ x < 5}`). All three representations always agree.

Learning objective (Bloom's Applying): Students will translate between inequality, interval, and set-builder notations for the same set.

Interactive behavior:
- The student can drag two endpoint handles along the number line from -10 to 10. As the handles move, all three representations update in real time.
- Each endpoint has a clickable toggle (open circle ⚪ or filled circle ⚫) that flips inclusion on or off. The bracket/parenthesis in the interval panel and the \( \le \)/\( < \) in the set-builder panel update together.
- A "Challenge Mode" button displays a random target interval in one representation (e.g., shows only the interval notation) and asks the student to reproduce it using the number-line handles. Correct matches award a point and unlock the next challenge.
- A "Union" button adds a second shaded region on the number line; the interval and set-builder panels both update to use \( \cup \) notation.

Canvas: 900 × 400 pixels, responsive via updateCanvasSize() in setup(). Number line is horizontal, 800 pixels wide, with integer tick marks; the shaded region is drawn in maroon with 40% opacity.

Implementation: p5.js with createButton for Challenge Mode, Union, and Reset, plus mousePressed/mouseDragged logic for endpoint handles and inclusion toggles.
</details>

## Putting It All Together

The concepts in this chapter form a single connected vocabulary. A function, introduced in the next chapter, is a rule that takes an **input** (an independent variable), applies some sequence of **operations** (respecting order of operations), and produces an **output** (a dependent variable). We visualize it on the **coordinate plane** using **ordered pairs**, describe which inputs are allowed using **interval** or **set-builder notation**, and verify that all the numbers involved belong to the **real number system**.

Every idea in the list below recurs dozens of times in the chapters that follow. Re-read the ones that feel shaky before moving on.

- Real numbers are organized into nested categories; knowing the category tells you what operations are safe.
- The number line gives every real number a unique geometric location, and vice versa.
- The order of operations is a convention; multiplication and division share priority, as do addition and subtraction.
- Variables are symbols that represent numbers. Expressions evaluate to a value; equations assert equality.
- In \( y = f(x) \), \( x \) is the independent variable (input) and \( y \) is the dependent variable (output).
- The coordinate plane uses two perpendicular number lines to place ordered pairs \( (x, y) \) — horizontal first, then vertical.
- Interval notation uses brackets for included endpoints and parentheses for excluded endpoints (and always parentheses around \( \pm \infty \)).
- Set-builder notation has the form `{ variable | condition }` and is read "the set of all *variable* such that *condition*."

!!! mascot-celebration "Foundations Locked In"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating with arms raised">
    You now have the vocabulary that every chapter to come will rely on — real numbers, coordinates, variable roles, and two ways to describe sets. Keep this chapter bookmarked; it is the Rosetta Stone of the rest of the course. On to functions!
