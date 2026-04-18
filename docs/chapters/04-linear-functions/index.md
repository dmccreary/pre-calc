---
title: Linear Functions
description: Linear function forms, parallel and perpendicular lines, and an introduction to linear regression, residuals, and correlation.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:40:00
version: 0.07
---

# Linear Functions

## Summary

This chapter focuses on linear functions and their various representations. Students learn slope-intercept, point-slope, and standard forms, as well as the relationships between parallel and perpendicular lines. The chapter also introduces linear regression, residuals, and correlation as tools for modeling linear relationships in data. These concepts provide the foundation for understanding more complex function types.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

1. Linear Function Definition
2. Slope-Intercept Form
3. Point-Slope Form
4. Standard Form of a Line
5. Parallel Lines
6. Perpendicular Lines
7. Linear Regression
8. Residuals
9. Correlation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 3: Rates of Change](../03-rates-of-change/index.md)

---

!!! mascot-welcome "The Simplest Function Family"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Chapter 3 introduced the idea of a constant rate of change. Every function with that property belongs to a single family — the linear functions — and this chapter is their home. Let's meet them in every form they take and learn how to fit them to real data.

## What Makes a Function Linear

A **linear function** is a function whose average rate of change is the same on every interval. Because that rate never varies, the graph of a linear function is a straight line on the coordinate plane. In Chapter 3, we called that constant rate the **slope**, denoted \( m \). Linear functions are the only function family with this property, which is why they are the starting point for every modeling task in pre-calculus.

Every linear function can be written in the form

\[ f(x) = mx + b \]

where \( m \) is the slope and \( b \) is the **y-intercept** — the output when \( x = 0 \). Both numbers are constants. Changing \( m \) tilts the line; changing \( b \) slides it up or down. A linear function is fully determined once those two numbers are fixed, so it takes just two pieces of information — either two points, or one point and a slope — to pin down a line uniquely.

Because linear functions are so common, they have acquired three different equivalent algebraic forms. Each form is convenient for a different task: reading a graph, writing an equation from a point and slope, or working with lines in standard algebraic contexts. Before we compare the forms in a table, let's look at each one in its own right.

## Slope-Intercept Form

The form \( y = mx + b \) is called **slope-intercept form** because the slope and the y-intercept appear directly as the two constants. It is the form to use whenever the graph of the line is the main object of interest.

To graph a line given in slope-intercept form, plot the y-intercept \( (0, b) \) first, then use the slope to find a second point. For example, \( y = 2x + 1 \) has y-intercept \( (0, 1) \) and slope 2. Starting at \( (0, 1) \), a rise of 2 and a run of 1 lands at \( (1, 3) \); connecting the two points produces the line.

To go in the other direction — reading an equation from a graph — identify the y-intercept by eye, compute the slope from any two clearly marked points, and plug both values into \( y = mx + b \). A line crossing the y-axis at 4 with slope \( -\tfrac{1}{2} \) has the equation \( y = -\tfrac{1}{2}x + 4 \).

!!! mascot-tip "Two Pieces, One Line"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    A line is nailed down by any two pieces of information. Slope-intercept form packages them as "slope plus y-intercept." If you have different information — like two points, or one point and a slope — use one of the other forms instead.

## Point-Slope Form

Sometimes you know a slope and one point on the line — but that point is *not* the y-intercept. Slope-intercept form would require you to solve for \( b \) first, which is an extra step. **Point-slope form** sidesteps that:

\[ y - y_1 = m(x - x_1) \]

Here \( (x_1, y_1) \) is any known point on the line and \( m \) is the slope. The form is a direct translation of the slope formula \( m = (y - y_1)/(x - x_1) \) rearranged so that nothing needs to be solved — you just substitute and simplify.

Suppose the line has slope 3 and passes through \( (4, 7) \). Plugging in:

\[ y - 7 = 3(x - 4) \]

That is already a complete description of the line. To convert it to slope-intercept form, distribute and isolate \( y \):

\[ y = 3x - 12 + 7 = 3x - 5 \]

Both equations describe the same line. Point-slope is usually the fastest way to *write* the equation; slope-intercept is usually the easiest way to *read* its graph. Being fluent in both directions — point-slope to slope-intercept and back — is a basic pre-calculus skill.

## Standard Form of a Line

The third common form is **standard form**:

\[ Ax + By = C \]

where \( A \), \( B \), and \( C \) are integers and \( A \) is non-negative by convention. Unlike the first two forms, standard form does not display the slope or intercept directly. Its advantages are algebraic: it treats \( x \) and \( y \) symmetrically, it handles vertical lines (where \( B = 0 \)) without a special case, and it is the form produced naturally by many real-world constraint equations.

For example, a budget of $60 spent on \$5 sandwiches and \$3 drinks with \( x \) sandwiches and \( y \) drinks gives the constraint \( 5x + 3y = 60 \) — standard form, produced directly by the problem statement. Converting to slope-intercept form by solving for \( y \) yields \( y = -\tfrac{5}{3}x + 20 \), showing a slope of \( -\tfrac{5}{3} \) and a y-intercept of 20.

The three forms describe the same family of lines but emphasize different information. The table below summarizes each one *after* we have met it in prose.

| Form | Equation | Best when you know… | Reveals at a glance |
|------|----------|--------------------|---------------------|
| Slope-intercept | \( y = mx + b \) | Slope and y-intercept | Slope \( m \), y-intercept \( (0, b) \) |
| Point-slope | \( y - y_1 = m(x - x_1) \) | Slope and any one point | Slope \( m \), point \( (x_1, y_1) \) |
| Standard | \( Ax + By = C \) | A linear constraint between \( x \) and \( y \) | Both intercepts after algebra; handles vertical lines |

#### Diagram: Three-Form Translator

<details markdown="1">
<summary>Interactive converter between the three forms of a linear equation</summary>
Type: MicroSim
**sim-id:** linear-form-translator<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that displays the same line in all three algebraic forms simultaneously as the student manipulates the line on a coordinate plane.

Learning objective (Bloom's Applying): Students will convert a linear equation between slope-intercept, point-slope, and standard forms and verify that all three describe the same line.

Visual elements:

- A coordinate plane from -10 to 10 on each axis with gridlines.
- A single maroon line drawn across the plane.
- Two draggable anchor points on the line — a movable y-intercept handle and a second point that controls the slope.
- A side panel with three labelled boxes: "Slope-Intercept," "Point-Slope," and "Standard." Each box shows the equation of the current line in that form, updated live.
- A "Show Work" toggle that reveals the algebraic steps between the forms (distributing, rearranging, clearing denominators).

Interactive controls:

- Drag either handle to reshape the line.
- A "Lock Slope" checkbox that freezes the slope while the y-intercept changes (or vice versa).
- Preset buttons for \( y = 2x + 1 \), \( y = -\tfrac{1}{2}x + 4 \), and \( 5x + 3y = 60 \).

Instructional rationale: Apply-level fluency requires seeing that a single line has multiple equivalent algebraic descriptions. Live updates in all three forms reinforce that the forms are interchangeable — a change in one is a change in all.

Canvas: 900 × 550 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createCheckbox for Show Work and Lock Slope, createButton for presets, custom drag logic for the two handles.
</details>

## Parallel and Perpendicular Lines

Two lines on the coordinate plane have a special relationship if they never cross, or if they cross at a perfect right angle. Both relationships can be detected from the slopes alone, making them clean tests to apply once a line's equation is in hand.

**Parallel lines** have the same slope and different y-intercepts. Same slope means they tilt identically; different y-intercepts mean they start at different heights and therefore never meet. The lines \( y = 2x + 1 \) and \( y = 2x - 4 \) are parallel because they share slope 2.

**Perpendicular lines** meet at a right angle. Two non-vertical lines are perpendicular if and only if their slopes multiply to \( -1 \). Equivalently, each slope is the *negative reciprocal* of the other. If one line has slope \( \tfrac{3}{4} \), any line perpendicular to it has slope \( -\tfrac{4}{3} \). The only exception is the pair horizontal-and-vertical, which is perpendicular by inspection but involves an undefined slope.

- Parallel test: \( m_1 = m_2 \)
- Perpendicular test: \( m_1 \cdot m_2 = -1 \), equivalently \( m_2 = -\tfrac{1}{m_1} \)

Example: is the line through \( (1, 2) \) and \( (5, 10) \) perpendicular to \( y = -\tfrac{1}{2}x + 6 \)? The first line has slope \( (10 - 2)/(5 - 1) = 2 \); the second has slope \( -\tfrac{1}{2} \). Their product is \( 2 \cdot (-\tfrac{1}{2}) = -1 \), so yes — they meet at a right angle.

!!! mascot-thinking "Flip and Negate"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    To build a perpendicular slope from a given slope, do two things in any order: flip the fraction upside down, then change its sign. \( \tfrac{2}{3} \) becomes \( -\tfrac{3}{2} \); \( -5 \) (which is \( -\tfrac{5}{1} \)) becomes \( \tfrac{1}{5} \). Two small operations, one reliable rule.

## Fitting Lines to Data: Linear Regression

Every line we have drawn so far has been defined by clean algebra. Real-world data is rarely so obedient. When we collect measurements — temperatures, heights, test scores — the points on a scatterplot almost never fall on a perfect line. Yet if the pattern *looks* linear, we still want to describe it with a linear equation. The process of choosing the best-fitting line for such data is called **linear regression**.

Linear regression produces a line of the form \( \hat{y} = mx + b \) where \( \hat{y} \) ("y-hat") denotes the predicted output. The hat distinguishes the line's prediction from the actual observed data value \( y \). For a given \( x \), \( \hat{y} \) is what the model expects, and \( y \) is what was actually measured.

The question "which line is best?" has a precise answer. The regression line is the one line that minimizes the sum of the squared vertical distances from each data point to the line. Those vertical distances have their own name, which we introduce next.

## Residuals

For each data point \( (x_i, y_i) \) and the regression line's prediction \( \hat{y}_i = m x_i + b \), the **residual** is the difference between the actual and predicted output:

\[ e_i = y_i - \hat{y}_i \]

A residual is positive when the data point lies above the line (the model under-predicts) and negative when the point lies below (the model over-predicts). A residual of zero means the line passes through that point exactly. Residuals measure — point by point — how wrong the model is.

Linear regression finds the line that makes the sum of *squared* residuals as small as possible:

\[ \text{Minimize} \quad \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \]

Squaring serves two purposes. First, squared residuals are always non-negative, so positive and negative errors cannot cancel each other out. Second, squaring penalizes large residuals much more than small ones, so the regression line works hard to avoid a few egregious misses rather than tolerating many small ones. This procedure is the **least-squares method**, the standard technique behind every linear regression calculator.

Before the diagram below, let's name the three pieces it will show: the scatterplot points, the regression line, and the vertical residual segments connecting each point to the line.

#### Diagram: Residuals and the Line of Best Fit

<details markdown="1">
<summary>Interactive scatterplot with a draggable line and live residual display</summary>
Type: MicroSim
**sim-id:** residuals-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that lets students drag a candidate line across a scatterplot and watch the sum of squared residuals change in real time. A "Best Fit" button snaps the line to the true least-squares solution.

Learning objective (Bloom's Analyzing): Students will analyze how vertical distances from data to a model line combine into a single goodness-of-fit measure, and recognize that the least-squares line minimizes that measure.

Visual elements:

- A coordinate plane with about 15 scatterplot points showing a roughly linear trend with noise.
- A movable regression line candidate drawn in cyan-blue with two draggable handles.
- For each data point, a thin vertical segment (dashed) connecting the point to the line, colored red for points above the line and blue for points below.
- A readout panel showing: current slope, current y-intercept, sum of residuals, sum of squared residuals (\( SSR \)).

Interactive controls:

- Drag either handle to reshape the candidate line.
- "Best Fit" button computes the least-squares line and animates the candidate into position.
- "New Data" button regenerates the scatterplot with a different seed.
- "Show Squares" toggle replaces each vertical segment with a visible red/blue square of side length \( |e_i| \), making the squared-residual quantity literal.

Instructional rationale: Analyze-level objectives require students to take apart a composite measurement. Seeing each residual as a square that gets bigger when the line is poorly chosen makes the sum-of-squares criterion intuitive rather than arbitrary.

Canvas: 900 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createButton for Best Fit and New Data, createCheckbox for Show Squares, custom drag logic for the line handles, and a small in-sketch regression calculation.
</details>

## Correlation

Linear regression always produces a line, no matter how messy the data is. That is dangerous — a meaningless line is still a line. We need a separate number that reports *how strong* the linear relationship actually is. That number is the **correlation coefficient**, denoted \( r \), and it always lies in the range

\[ -1 \le r \le 1 \]

The sign of \( r \) matches the sign of the slope of the regression line. The magnitude \( |r| \) reports how tightly the points cluster around that line: \( |r| = 1 \) means every point lies exactly on a single line, while \( |r| = 0 \) means the points show no linear pattern at all.

- \( r \) close to \( +1 \): strong positive linear relationship (points cluster along a rising line).
- \( r \) close to \( -1 \): strong negative linear relationship (points cluster along a falling line).
- \( r \) close to \( 0 \): weak or no linear relationship.

Correlation only captures *linear* patterns. A perfectly curved relationship — say, \( y = x^2 \) on \( [-3, 3] \) — can have a correlation coefficient of exactly 0, even though \( x \) and \( y \) are perfectly related. The statement "\( r = 0 \)" means "no linear pattern," not "no pattern." For non-linear data, a different model (quadratic, exponential, sinusoidal) is needed, and we will build those tools in later chapters.

The following table pairs typical \( r \) values with the scatterplot appearance we use to interpret them.

| Correlation \( r \) | Relationship | Scatterplot appearance |
|---------------------|--------------|------------------------|
| \( +0.9 \) to \( +1.0 \) | Strong positive | Tight cluster along a rising line |
| \( +0.5 \) to \( +0.9 \) | Moderate positive | Rising trend with noticeable scatter |
| \( -0.5 \) to \( +0.5 \) | Weak or none | Cloud of points, no clear line |
| \( -0.9 \) to \( -0.5 \) | Moderate negative | Falling trend with noticeable scatter |
| \( -1.0 \) to \( -0.9 \) | Strong negative | Tight cluster along a falling line |

!!! mascot-warning "Correlation Is Not Causation"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    A high \( |r| \) tells you two quantities move together — it does *not* tell you one causes the other. Ice cream sales and drowning rates both rise in summer, producing a strong positive correlation, but ice cream does not cause drownings; warm weather causes both. Always ask what third variable might be driving the pattern.

## Putting It All Together

Linear functions are the backbone of function study because they are the only family with a constant rate of change. Every other function type we meet in this course will be compared to linear behavior — either as a contrast (quadratic, exponential) or as a transformed version (point-slope form generalizes to vertex form; regression generalizes to non-linear fits).

The key ideas to carry forward:

- A **linear function** has the form \( f(x) = mx + b \) and a constant rate of change.
- Three equivalent algebraic forms — slope-intercept, point-slope, and standard — describe the same family of lines.
- **Parallel** lines have equal slopes; **perpendicular** lines have slopes whose product is \( -1 \).
- **Linear regression** finds the line that minimizes the sum of squared **residuals** between predictions and data.
- The **correlation coefficient** \( r \) measures how strongly the data cluster around that best-fit line — not whether one variable causes the other.

!!! mascot-celebration "The Family Template"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now have a complete template for studying any function family: its definition, its standard forms, the relationships between its members, and the way it fits real data. Every chapter ahead reuses this same template. Onward to quadratics!

??? question "Quick Check: Write the equation of the line through \( (2, 5) \) with slope \( -3 \) in slope-intercept form."
    Start with point-slope: \( y - 5 = -3(x - 2) \). Distribute and simplify: \( y = -3x + 6 + 5 = -3x + 11 \).

??? question "Quick Check: Are \( y = \tfrac{2}{3}x + 1 \) and \( 3x + 2y = 10 \) perpendicular?"
    The second line in slope-intercept form is \( y = -\tfrac{3}{2}x + 5 \). The slopes \( \tfrac{2}{3} \) and \( -\tfrac{3}{2} \) multiply to \( -1 \), so yes — the lines are perpendicular.

??? question "Quick Check: A regression gives \( r = -0.95 \). Describe the pattern."
    Strong negative linear relationship. The scatterplot shows points clustered tightly along a falling line, so the regression line will have a negative slope and predict well.
