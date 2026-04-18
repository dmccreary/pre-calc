---
title: Data Modeling and Regression
description: Choosing function models for data, analyzing patterns, fitting regressions, validating assumptions, and comparing competing models using residuals and goodness of fit.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:52:00
version: 0.07
---

# Data Modeling and Regression

## Summary

This chapter develops the skills needed to select, build, and evaluate mathematical models from data. Students learn about function model selection, data analysis techniques, and regression models. The chapter covers model assumptions, validation, extrapolation, interpolation, residual analysis, goodness of fit, and comparing competing models. These modeling skills are applied throughout the remainder of the course to exponential, logarithmic, and trigonometric contexts.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Function Model Selection
2. Data Analysis for Models
3. Regression Models
4. Model Assumptions
5. Model Validation
6. Extrapolation
7. Interpolation
8. Residual Analysis
9. Goodness of Fit
10. Competing Models

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Rates of Change](../03-rates-of-change/index.md)
- [Chapter 4: Linear Functions](../04-linear-functions/index.md)
- [Chapter 9: Function Transformations](../09-function-transformations/index.md)

---

!!! mascot-welcome "From Data to Function"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    So far we have built graphs from equations. This chapter reverses the arrow: given a table of real measurements, which function family fits best — and how sure are we? Model-building is the skill that turns pre-calculus from an abstract exercise into a tool for understanding the world.

## What Is a Model?

A **model** is a mathematical function chosen to approximate a relationship observed in real data. Real measurements are noisy, incomplete, and sometimes contradictory, but they often follow a recognizable pattern. A model captures that pattern as an equation we can use to describe, predict, and reason about the underlying process.

Every model makes a trade-off between two competing goals:

- **Fit**: how closely the model's predictions match the observed data points.
- **Simplicity**: how few parameters and assumptions the model requires.

A model that memorizes every data point (perfect fit) may be useless for prediction because it has absorbed the noise along with the signal. A model that is too simple may miss the pattern entirely. Good modeling sits between those extremes.

## Function Model Selection

**Function model selection** is the decision of which function family (linear, quadratic, exponential, logarithmic, sinusoidal, etc.) best matches a data set. The choice is guided by two complementary lines of evidence: the *shape* of the scatterplot and the *pattern of change* in the data.

The shape-based approach looks at the scatterplot and compares its visual appearance to the parent-function graphs from Chapter 9. If points cluster along a straight line, a linear model is appropriate. If they cluster along a curve that bends one way consistently, a quadratic, exponential, or power function is a candidate. If the data repeats — a cycle of rises and falls — a sinusoidal model is likely needed.

The pattern-based approach computes rates of change or ratios and asks which pattern is constant.

- **Constant differences**: the output changes by roughly the same amount for each equal step in the input → linear model.
- **Constant second differences**: the *change in the change* is roughly constant → quadratic model.
- **Constant ratios**: the output is multiplied by roughly the same factor for each equal input step → exponential model.
- **Repeating pattern of rises and falls**: the same values return at regular input intervals → sinusoidal model.

These two strategies — visual shape and pattern of change — usually point to the same candidate. When they disagree, the pattern-of-change analysis is typically more reliable than a quick visual scan.

## Data Analysis for Models

**Data analysis for models** is the preparation step that turns a raw table into evidence for or against a candidate function family. Four routine checks do most of the work:

1. **Scatterplot inspection.** Plot the data. Look for overall shape, outliers, and obvious breaks.
2. **First differences.** Compute the change in the output between consecutive data points. A constant first difference points to a linear model.
3. **Ratios.** Compute the ratio of consecutive outputs. A constant ratio points to an exponential model.
4. **Second differences.** Compute the differences of the first differences. A constant second difference points to a quadratic model.

Before the diagnostic table, note that this routine narrows a universe of possible models down to a short list of serious candidates. Once one or two candidates are identified, a regression computes the best parameters.

| Pattern found | Candidate model | Equation family |
|---------------|-----------------|-----------------|
| Constant first differences | Linear | \( y = mx + b \) |
| Constant second differences | Quadratic | \( y = ax^2 + bx + c \) |
| Constant ratios | Exponential | \( y = a \cdot b^x \) |
| Repeating highs and lows | Sinusoidal | \( y = A \sin(B(x - C)) + D \) |
| Constant difference of logs vs. difference of \( x \) | Exponential | \( y = a \cdot b^x \) (linearized on semi-log plot) |

## Regression Models

A **regression model** is a specific function equation produced by fitting a chosen function family to the data in a way that minimizes some measure of error. We met linear regression in Chapter 4; the idea generalizes to every function family.

- **Linear regression** fits \( y = mx + b \) using least squares on vertical residuals.
- **Quadratic regression** fits \( y = ax^2 + bx + c \) using least squares.
- **Exponential regression** fits \( y = a \cdot b^x \), often by first taking the logarithm of \( y \) to turn the problem into a linear regression.
- **Logarithmic regression** fits \( y = a + b \ln x \).
- **Sinusoidal regression** fits \( y = A \sin(B(x - C)) + D \) using iterative methods.

Graphing calculators and software perform every one of these regressions automatically, producing both the fitted equation and a quality measure. The analyst's job is (1) to choose a sensible family before running the regression, (2) to check that the fitted model makes physical sense, and (3) to evaluate how well it actually fits.

!!! mascot-thinking "Regression Is Parameter Fitting, Not Family Selection"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    A regression tool does not decide whether a linear model is appropriate — it only finds the *best* linear model given that you asked for one. Choosing the family is your call, based on the data analysis. Regression handles the parameters; you handle the shape.

## Model Assumptions

Every regression carries **model assumptions** — conditions that must hold for the resulting equation to be trustworthy. The standard assumptions for least-squares regression are:

- The form of the relationship matches the chosen family (linearity for linear regression, etc.).
- Residuals are roughly random — no visible pattern when plotted against \( x \).
- Residuals have roughly constant spread across the range of \( x \).
- No single data point dominates the fit (no large outliers).

When an assumption is violated, the regression equation is still produced, but its coefficients may be misleading and its predictions unreliable. Checking assumptions is not optional — it is the difference between a model that informs and a model that misleads.

## Model Validation

**Model validation** is the process of confirming that a fitted model behaves correctly on data it has not seen. A model that fits its training data perfectly can still fail on new data — a phenomenon called *overfitting*. Validation tests whether the model generalizes.

Three simple validation techniques are common in pre-calculus:

- **Hold-out check**: set aside a few data points before fitting; after the regression, see how well the model predicts those held-out values.
- **Residual plot**: plot the residuals against \( x \). If the plot looks like random scatter with no pattern, the model is capturing the structure. If a pattern appears — a curve, a fan shape, clusters — the model is missing something.
- **Physical reasonableness**: check that the fitted parameters make sense in context. An exponential growth rate of 500% per second is probably wrong even if it minimizes the residual sum.

!!! mascot-tip "Always Plot the Residuals"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    A residual plot with no pattern is a green light. A residual plot with a visible curve is a red flag — try a different function family. The residual plot is the single most useful validation tool, and it takes about thirty seconds to produce.

#### Diagram: Residual Plot Validator

<details markdown="1">
<summary>Interactive comparison of a fit and its residual plot for three function families</summary>
Type: MicroSim
**sim-id:** residual-plot-validator<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing a scatterplot with a fitted model on the left and the corresponding residual plot on the right, letting students see how a bad choice of model family reveals itself as a pattern in the residuals.

Learning objective (Bloom's Analyzing): Students will analyze residual plots to detect model misspecification and distinguish random scatter (good fit) from systematic patterns (wrong family).

Visual elements:

- Left panel: scatterplot of 20 data points following a real pattern (e.g., mildly quadratic), with a fitted curve in maroon.
- Right panel: residual plot with \( x \) on the horizontal axis and residual value on the vertical axis; a horizontal line at zero.
- Annotations on the residual plot showing "looks random" (green) or "visible pattern" (red) based on live analysis.

Interactive controls:

- A "Fit Family" dropdown: Linear, Quadratic, Exponential.
- A "True Pattern" dropdown that regenerates the data following Linear, Quadratic, or Exponential ground truth.
- "Swap" button to reverse the currently chosen fit family.
- "Show Ideal" toggle that overlays the true underlying curve on the scatterplot.

Instructional rationale: Analyze-level detection skills require repeated exposure to both correct and incorrect model choices. Seeing the residual plot transform from pattern-free to visibly curved as the wrong family is chosen builds reliable intuition for diagnosis.

Canvas: 1100 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for fit family and true pattern, createButton for Swap, createCheckbox for Show Ideal.
</details>

## Interpolation and Extrapolation

Once a model is trusted, it can be used for two kinds of prediction. These kinds are different in reliability and deserve distinct names.

**Interpolation** is predicting the output for an input that lies *within* the range of the original data. If measurements were collected for \( x = 0, 1, 2, \ldots, 10 \) and the model is used to predict the output at \( x = 4.5 \), that is interpolation. The model has "seen" the surrounding region and is on firm ground.

**Extrapolation** is predicting the output for an input that lies *outside* the range of the original data. Predicting at \( x = 20 \) when the data only runs to \( x = 10 \) is extrapolation. The model has no evidence that the observed pattern continues — it is making a bet.

Extrapolation is inherently less reliable than interpolation. The further outside the data range, the more the prediction depends on the assumption that the chosen function family is exactly right. A linear model fit to bacterial growth data from hours 1-10 will eventually predict absurd population sizes because biology caps growth in ways the linear model cannot see.

!!! mascot-warning "Extrapolation Is a Bet, Not a Fact"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    Predicting inside the data range is supported by the measurements; predicting outside it requires a leap of faith that the pattern continues. Always flag extrapolations and treat their predictions with much more skepticism than interpolations — or avoid them entirely when the stakes are high.

## Residual Analysis

**Residual analysis** is the close examination of the residuals from a fitted model. Residuals are the building blocks of every goodness-of-fit measure, and their structure tells a richer story than any single summary number.

Four routine checks form a complete residual analysis:

- **Mean**: the average residual should be approximately 0 for a least-squares fit. A non-zero mean hints at a bias in the model.
- **Spread**: the magnitudes of the residuals should be similar across the range of \( x \). A spread that grows or shrinks systematically violates the constant-spread assumption.
- **Shape**: plotted against \( x \), the residuals should look like random scatter. Any curve, U-shape, or diagonal drift indicates the chosen family is too simple.
- **Outliers**: a single residual much larger than the rest is either a data error or a genuine anomaly worth investigating.

A clean residual analysis across all four checks is the strongest practical evidence that a model is appropriate for a data set.

## Goodness of Fit

**Goodness of fit** is a collection of single-number measures that summarize how well a model fits its data. The two most common in pre-calculus are:

- The **coefficient of determination** \( R^2 \): the fraction of the variability in the data that the model explains, always between 0 and 1. \( R^2 = 1 \) means perfect fit; \( R^2 = 0 \) means the model explains nothing beyond the mean.
- The **root-mean-square error** (RMSE): the square root of the average squared residual. RMSE is in the same units as \( y \) and reports typical prediction error in absolute terms.

For linear regression specifically, \( R^2 \) is exactly the square of the correlation coefficient \( r \) from Chapter 4. So \( r = 0.9 \) corresponds to \( R^2 = 0.81 \), meaning 81% of the variability is explained by the linear model.

Goodness-of-fit numbers should never be the only basis for choosing a model. A model can have a high \( R^2 \) and still fail badly on a residual plot (for example, if the data has a systematic curve that the model averages across). Always combine the number with the residual plot.

## Competing Models

When two or more function families produce reasonable fits to the same data, they become **competing models** and we must choose between them. Three comparison criteria are standard:

- **Residual patterns**: the model whose residual plot looks most random is usually preferred.
- **Goodness of fit**: the model with higher \( R^2 \) (or lower RMSE) is preferred, all else equal.
- **Parsimony**: if two models fit comparably, prefer the one with fewer parameters or the simpler functional form.
- **Physical plausibility**: if the problem context suggests a specific family (population growth → exponential; periodic signal → sinusoidal), prefer that family unless evidence strongly contradicts it.

A good analyst reports *both* competing models when neither clearly wins, and makes the assumptions behind the choice explicit.

#### Diagram: Competing Models Comparison

<details markdown="1">
<summary>Side-by-side evaluation of linear, quadratic, and exponential fits on the same data</summary>
Type: infographic
**sim-id:** competing-models-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic showing the same data set with three simultaneous fitted curves — linear, quadratic, and exponential — along with a summary table of their \( R^2 \), RMSE, and visual residual-plot quality.

Learning objective (Bloom's Evaluating): Students will evaluate competing function models for a single data set and justify the choice of one model over the others using multiple criteria.

Visual elements:

- A main scatterplot with about 30 data points generated from a known underlying process.
- Three fitted curves overlaid: linear (blue), quadratic (green), exponential (red).
- Three small residual plots beneath the main plot, one per model.
- A comparison table showing each model's equation, \( R^2 \), RMSE, residual-plot quality ("random," "slight curve," "strong curve").

Interactive controls:

- A "True Underlying Process" dropdown regenerates data under a linear, quadratic, or exponential ground truth.
- A "Reveal Winner" button highlights the best-fitting family and explains the criteria that support the choice.
- A "Add Noise" slider to vary data variability and show how fit quality degrades with noise.

Instructional rationale: Evaluate-level decisions require weighing multiple criteria. Showing all three candidates simultaneously — along with their residual plots and fit numbers — prevents the common mistake of choosing a model on \( R^2 \) alone.

Canvas: 1100 × 650 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSelect for ground truth, createSlider for noise, createButton for Reveal Winner.
</details>

## Putting It All Together

Modeling is the bridge between pre-calculus functions and real-world applications. Every later chapter — exponential, logarithmic, trigonometric — will revisit this chapter's workflow: analyze the data, select a family, fit a regression, validate the fit, and use the model responsibly within its data range.

The key ideas to carry forward:

- **Model selection** uses scatterplot shape *and* pattern-of-change analysis to pick a function family.
- **Regression** fits the parameters of the chosen family by minimizing residuals.
- Every regression carries **assumptions**; checking them is what makes the fit trustworthy.
- **Residual plots** are the single best validation tool: random scatter = good fit, visible pattern = wrong family.
- **Interpolation** is trustworthy; **extrapolation** is a bet that depends on the model remaining valid outside the data range.
- **Competing models** are compared on residual quality, goodness-of-fit numbers, parsimony, and physical plausibility — not on a single metric.

!!! mascot-celebration "The Modeling Mindset"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You now have a workflow — data analysis, model selection, regression, validation, comparison — that applies to every remaining chapter in this course. Each new function family you meet will fit right into this workflow. Unit 1 is complete!

??? question "Quick Check: A data set shows constant first differences of about 3. Which family fits?"
    Linear model — constant first differences are the signature of a linear relationship.

??? question "Quick Check: The \( R^2 \) for a regression is 0.95, but the residual plot shows a clear U-shape. Trust the model?"
    No. The \( R^2 \) is high but the residual pattern reveals a systematic curve the model is missing. Try a quadratic or exponential family instead.

??? question "Quick Check: Is predicting GDP in 2050 from 2000-2020 data interpolation or extrapolation?"
    Extrapolation — 2050 lies outside the data range. Treat the prediction with skepticism.
