---
title: Logarithmic Functions
description: Logarithms as inverses of exponentials, common and natural logarithms, conversion between forms, properties of logarithms, change of base, equations and graphs, logarithmic and semi-log modeling, and exponential and power regression.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:57:00
version: 0.07
---

# Logarithmic Functions

## Summary

This chapter introduces logarithmic functions as inverses of exponential functions. Students learn the definition of logarithms, common and natural logarithms, and conversion between exponential and logarithmic forms. The chapter covers properties of logarithms (product, quotient, power rules), the change of base formula, solving logarithmic equations, and graphing logarithmic functions with transformations. Students also learn about logarithmic modeling, semi-log plots, linearizing exponential data, log-log plots, and exponential and power regression.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Logarithm Definition
2. Common Logarithm
3. Natural Logarithm
4. Logarithmic Form
5. Exponential-Log Conversion
6. Properties of Logarithms
7. Product Rule for Logs
8. Quotient Rule for Logs
9. Power Rule for Logs
10. Change of Base Formula
11. Logarithmic Equations
12. Logarithmic Graphs
13. Logarithmic Transformations
14. Logarithmic Modeling
15. Logarithmic Scale
16. Semi-Log Plot
17. Linearizing Exponential Data
18. Log-Log Plots
19. Exponential Regression
20. Power Regression

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 4: Linear Functions](../04-linear-functions/index.md)
- [Chapter 9: Function Transformations](../09-function-transformations/index.md)
- [Chapter 10: Data Modeling and Regression](../10-data-modeling-and-regression/index.md)
- [Chapter 13: Exponential Functions](../13-exponential-functions/index.md)

---

!!! mascot-welcome "Asking the Other Question"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Exponentials answered "what is \( b^x \) when I know \( x \)?" Logarithms answer the reverse question: "what exponent \( x \) makes \( b^x \) equal a given number?" That single inversion gives us the algebra to solve any exponential equation, the right tool for measuring quantities that span enormous ranges, and a way to make exponential data look linear on graphs.

## Logarithm Definition

A **logarithm** is the inverse operation of exponentiation. The expression \( \log_b y \) (read "log base \( b \) of \( y \)") is *the exponent to which \( b \) must be raised to produce \( y \)*. Formally:

\[ \log_b y = x \quad \text{means exactly} \quad b^x = y \]

Three restrictions keep the logarithm well-defined:

- The **base** \( b \) must satisfy \( b > 0 \) and \( b \neq 1 \) — the same requirements that defined valid exponential bases in Chapter 13.
- The **argument** \( y \) must satisfy \( y > 0 \). You cannot raise a positive base to any real exponent and get a non-positive number, so the logarithm of zero or a negative number is undefined.

For example:

- \( \log_2 8 = 3 \) because \( 2^3 = 8 \).
- \( \log_{10} 1000 = 3 \) because \( 10^3 = 1000 \).
- \( \log_5 1 = 0 \) because \( 5^0 = 1 \).
- \( \log_3 (1/9) = -2 \) because \( 3^{-2} = 1/9 \).

The logarithm function "asks the exponent question." It is the precise inverse of exponentiation and inherits all of the inverse-function properties from Chapter 11.

## Common Logarithm

The **common logarithm** is the logarithm with base 10:

\[ \log y = \log_{10} y \]

When the base is omitted in scientific or engineering writing, base 10 is assumed. Common logarithms are the natural choice for any quantity organized in powers of 10 — the pH scale, the decibel scale, and the Richter scale all use base-10 logarithms.

Some quick values to keep in mind:

- \( \log 1 = 0 \), \( \log 10 = 1 \), \( \log 100 = 2 \), \( \log 1000 = 3 \).
- \( \log 0.1 = -1 \), \( \log 0.01 = -2 \).
- \( \log 5 \approx 0.699 \) (one calculator press to confirm).

## Natural Logarithm

The **natural logarithm** is the logarithm with base \( e \approx 2.71828 \):

\[ \ln y = \log_e y \]

The natural logarithm is the inverse of the natural exponential function \( e^x \), so it pairs naturally with continuous-growth models. When a process is modeled by \( f(t) = a \cdot e^{kt} \), the natural logarithm is the right tool to solve for \( t \) given a value of \( f \).

Like the common logarithm, the natural logarithm has its own dedicated calculator key (\( \ln \)). Two essential values:

- \( \ln 1 = 0 \).
- \( \ln e = 1 \).

## Logarithmic Form

A logarithmic equation can always be rewritten in **exponential form**, and vice versa. The conversion is purely notational — the underlying statement is the same:

| Logarithmic form | Exponential form |
|------------------|------------------|
| \( \log_b y = x \) | \( b^x = y \) |
| \( \log_2 16 = 4 \) | \( 2^4 = 16 \) |
| \( \ln e^3 = 3 \) | \( e^3 = e^3 \) |
| \( \log 100 = 2 \) | \( 10^2 = 100 \) |

Reading the conversion as a sentence helps: "the logarithm equals the exponent." The number written between \( b \) and the equals sign on the right is exactly the same number written after the equals sign on the left.

## Exponential-Log Conversion

Converting between **exponential and logarithmic form** is the workhorse skill of this chapter. Most logarithm problems start by rewriting the equation in whichever form is easier to handle.

A worked example: solve \( 2^x = 50 \) for \( x \).

Step 1, convert to logarithmic form:

\[ x = \log_2 50 \]

Step 2, evaluate the logarithm. Since calculators normally compute only \( \log \) (base 10) and \( \ln \) (base \( e \)), we will need the change-of-base formula introduced below: \( x = \log 50 / \log 2 \approx 5.644 \).

Another example: solve \( e^{0.05t} = 3 \) for \( t \).

Step 1, convert to logarithmic form using the natural log:

\[ 0.05t = \ln 3 \]

Step 2, divide both sides by 0.05: \( t = \ln 3 / 0.05 \approx 21.97 \).

!!! mascot-tip "Conversion Is Just Notation"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    \( \log_b y = x \) and \( b^x = y \) say the same thing in different alphabets. Whichever form makes the variable easier to isolate is the form to use. This is also the cleanest way to remember which number goes where: the base stays the base, and the logarithm is always the exponent.

## Properties of Logarithms

The **properties of logarithms** are three identities that follow directly from the laws of exponents (\( b^{m+n} = b^m b^n \), \( b^{m-n} = b^m / b^n \), \( (b^m)^n = b^{mn} \)). Each property turns a hard logarithm computation into an easier one.

These properties hold for any valid base \( b \) and any positive arguments.

## Product Rule for Logs

The **product rule for logarithms** says that the log of a product equals the sum of the logs:

\[ \log_b (M \cdot N) = \log_b M + \log_b N \]

Where it comes from: if \( \log_b M = m \) and \( \log_b N = n \), then \( M = b^m \) and \( N = b^n \), so \( MN = b^{m+n} \), and therefore \( \log_b (MN) = m + n \).

A worked example: \( \log_2 (8 \cdot 4) = \log_2 8 + \log_2 4 = 3 + 2 = 5 \). And indeed \( 8 \cdot 4 = 32 = 2^5 \).

## Quotient Rule for Logs

The **quotient rule for logarithms** says that the log of a quotient equals the difference of the logs:

\[ \log_b \left(\frac{M}{N}\right) = \log_b M - \log_b N \]

A worked example: \( \log_{10} (100/10) = \log 100 - \log 10 = 2 - 1 = 1 \). And \( 100/10 = 10 = 10^1 \). ✓

A common application is to "split" a logarithm of a fraction into a difference that is easier to compute or differentiate.

## Power Rule for Logs

The **power rule for logarithms** moves an exponent inside a logarithm out front as a multiplier:

\[ \log_b (M^p) = p \cdot \log_b M \]

A worked example: \( \log_2 (8^3) = 3 \cdot \log_2 8 = 3 \cdot 3 = 9 \). And \( 8^3 = 512 = 2^9 \). ✓

The power rule is the secret sauce for solving exponential equations: it lets us pull the variable down out of an exponent. Solving \( 5^x = 17 \) becomes:

\[ \log(5^x) = \log 17 \implies x \log 5 = \log 17 \implies x = \frac{\log 17}{\log 5} \approx 1.760 \]

The next table summarizes all three properties side by side.

| Property | Identity | Verbal description |
|----------|----------|--------------------|
| Product | \( \log_b(MN) = \log_b M + \log_b N \) | Log of a product = sum of logs |
| Quotient | \( \log_b(M/N) = \log_b M - \log_b N \) | Log of a quotient = difference of logs |
| Power | \( \log_b(M^p) = p \log_b M \) | Exponent inside becomes a multiplier outside |

!!! mascot-warning "These Three Are the Only Rules"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    Tempting non-rules: \( \log(M + N) \neq \log M + \log N \) and \( \log(MN) \neq \log M \cdot \log N \). The product rule converts a *product* inside the log into a *sum* outside it — never a sum inside. Misapplying these laws is the most common error in this chapter.

## Change of Base Formula

The **change of base formula** lets us evaluate a logarithm of any base using only the calculator's \( \log \) and \( \ln \) keys:

\[ \log_b x = \frac{\log x}{\log b} = \frac{\ln x}{\ln b} \]

The numerator and denominator can be in any common base — base 10 and base \( e \) are convenient because both are calculator-accessible.

A worked example: compute \( \log_3 50 \).

\[ \log_3 50 = \frac{\log 50}{\log 3} = \frac{1.69897}{0.47712} \approx 3.561 \]

Verify: \( 3^{3.561} \approx 50 \). ✓

The change of base formula is the bridge between calculator-only logarithms and the limitless space of bases that appear in real problems.

#### Diagram: Exponential and Logarithm as Inverse Reflections

<details markdown="1">
<summary>Side-by-side graphs of y = b^x and y = log_b x reflected across y = x</summary>
Type: MicroSim
**sim-id:** exp-log-inverse-reflection<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim showing the exponential function \( y = b^x \) and the logarithmic function \( y = \log_b x \) on the same coordinate plane, with the line \( y = x \) drawn as a reflection axis.

Learning objective (Bloom's Understanding): Students will explain that the logarithmic function is the reflection of the exponential function across \( y = x \), with each function's domain matching the other's range.

Visual elements:

- A coordinate plane from -5 to 8 on both axes.
- The graph of \( y = b^x \) in maroon and the graph of \( y = \log_b x \) in gold.
- A dashed diagonal line \( y = x \).
- A draggable point on the exponential at \( (a, b^a) \) with its mirror \( (b^a, a) \) automatically on the logarithm, joined by a dotted segment through \( y = x \).

Interactive controls:

- A slider for the base \( b \) ranging from 1.1 to 5 in steps of 0.1.
- A "Show \( y = x \)" toggle.
- A "Trace Asymptotes" button highlighting how the horizontal asymptote of the exponential at \( y = 0 \) becomes the vertical asymptote of the logarithm at \( x = 0 \).

Instructional rationale: Students often memorize "logs are inverses of exponentials" without seeing what that means geometrically. Watching points reflect across the diagonal — and the asymptotes swap orientation — anchors the inverse relationship visually.

Canvas: 800 × 800 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for base, createCheckbox for diagonal, createButton for asymptote trace.
</details>

## Logarithmic Equations

A **logarithmic equation** is an equation with a logarithm of the unknown. Two solving strategies cover most cases:

1. **Combine logs into a single logarithm**, then convert to exponential form.
   - Example: \( \log_2 x + \log_2 (x - 2) = 3 \implies \log_2 [x(x-2)] = 3 \implies x(x-2) = 2^3 = 8 \implies x^2 - 2x - 8 = 0 \implies x = 4 \) (rejecting \( x = -2 \) because the log domain requires \( x > 0 \) and \( x - 2 > 0 \)).

2. **Take the logarithm of both sides** to bring an unknown out of an exponent.
   - Example: \( 7^{x+1} = 100 \implies \ln(7^{x+1}) = \ln 100 \implies (x+1) \ln 7 = \ln 100 \implies x = \frac{\ln 100}{\ln 7} - 1 \approx 1.366 \).

A persistent gotcha is the **domain check**: the argument of every logarithm must be positive. After solving algebraically, plug each candidate back into the original equation to discard any value that makes a logarithm's argument zero or negative — these are *extraneous solutions*, not valid answers.

## Logarithmic Graphs

The graph of \( f(x) = \log_b x \) (with \( b > 1 \)) has these features:

- **\( x \)-intercept** at \( (1, 0) \), since \( \log_b 1 = 0 \) for every valid base.
- **Vertical asymptote** at \( x = 0 \) — the function is undefined for \( x \leq 0 \) and plunges to \( -\infty \) as \( x \to 0^+ \).
- **Domain**: \( (0, \infty) \).
- **Range**: all real numbers.
- **Increasing**, with slope decreasing as \( x \) grows.

These features are exactly the reflection across \( y = x \) of the exponential graph from Chapter 13: the horizontal asymptote of the exponential becomes the vertical asymptote of the logarithm; the \( y \)-intercept of the exponential at \( (0, 1) \) becomes the \( x \)-intercept of the logarithm at \( (1, 0) \); the domain and range swap roles.

## Logarithmic Transformations

**Logarithmic transformations** apply the standard transformation toolkit from Chapter 9 to the parent function \( f(x) = \log_b x \). The general transformed form is:

\[ f(x) = a \cdot \log_b [c(x - h)] + k \]

where:

- \( a \) is a vertical stretch (and reflection if \( a < 0 \)).
- \( c \) is a horizontal stretch (and reflection if \( c < 0 \)).
- \( h \) shifts the graph horizontally by \( h \) units — and importantly, *moves the vertical asymptote* from \( x = 0 \) to \( x = h \).
- \( k \) shifts the graph vertically by \( k \) units.

The horizontal shift \( h \) deserves the same care that the vertical shift required for exponentials — it is the parameter that moves the asymptote, which controls the function's domain. The graph of \( \log(x - 3) \) has vertical asymptote \( x = 3 \) and domain \( (3, \infty) \), not \( (0, \infty) \).

## Logarithmic Modeling

**Logarithmic modeling** uses functions of the form \( f(x) = a + b \ln x \) to capture quantities that grow rapidly at first and then slow dramatically. Examples include the perceived loudness of sound, the magnitude scale for earthquakes, and many psychophysical responses where doubling the stimulus produces a constant increase in perceived intensity.

Logarithmic models also appear in growth processes that face diminishing returns — the time required for a chemical reaction to reach equilibrium, the accuracy of a measurement as more samples are added, the value gained from each additional study hour.

The signature behavior is *rapid early growth followed by a long flattening tail*. If a scatterplot shows a fast rise that turns into a gentle climb, a logarithmic model is the right family.

## Logarithmic Scale

A **logarithmic scale** is an axis whose tick marks correspond to powers of 10 (or some other base) rather than equal differences. Each unit step along the axis represents a *multiplicative* jump, not an additive one.

Logarithmic scales are the right tool when data spans many orders of magnitude. Plotting earthquake energies linearly is hopeless: small earthquakes are invisible next to large ones. Plotting them on a logarithmic scale gives every order of magnitude equal visual space. Three familiar logarithmic scales:

- The **Richter scale** for earthquake magnitude — a magnitude 7 quake releases about 32 times the energy of a magnitude 6.
- The **decibel scale** for sound intensity — every 10 dB step represents a factor-of-10 change in intensity.
- The **pH scale** for acidity — every unit drop in pH represents a tenfold increase in hydrogen-ion concentration.

## Semi-Log Plot

A **semi-log plot** is a graph in which the *vertical* axis uses a logarithmic scale and the *horizontal* axis uses a linear scale. Its purpose is to test for and visualize exponential relationships.

If \( y = a \cdot b^x \), then taking the logarithm of both sides gives:

\[ \log y = \log a + x \log b \]

The right side is linear in \( x \) — it has the form \( Y = mx + B \) where \( Y = \log y \), \( m = \log b \), and \( B = \log a \). So an exponential function plotted on a semi-log scale produces a straight line.

The slope of the resulting line equals \( \log b \) (the log of the growth or decay factor), and the intercept equals \( \log a \) (the log of the initial value). Reading these two numbers off the line lets us recover the original exponential equation.

## Linearizing Exponential Data

**Linearizing exponential data** is the practical procedure of using a semi-log plot to convert exponential data into linear data, fit a line, and recover an exponential model.

The workflow:

1. Suspect an exponential relationship in a data set \( (x_i, y_i) \).
2. Compute \( \log y_i \) for every data point.
3. Plot \( \log y_i \) against \( x_i \) — or equivalently, plot \( y_i \) on a semi-log axis.
4. If the points fall along a line, exponential is the right family.
5. Fit a line by least squares: slope \( m \) and intercept \( B \).
6. Recover the original exponential: \( a = 10^B \), \( b = 10^m \), so \( y = a \cdot b^x \).

This workflow is exactly how scientific calculators and spreadsheet "exponential regression" buttons compute their answers internally.

#### Diagram: Linear vs Semi-Log Plot of Exponential Data

<details markdown="1">
<summary>Same exponential data shown on a linear plot and a semi-log plot side by side</summary>
Type: infographic
**sim-id:** semilog-linearization<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js infographic with two side-by-side plots of the same data: a linear-axis plot showing the exponential curve and a semi-log plot showing the same data as a straight line.

Learning objective (Bloom's Analyzing): Students will analyze how a logarithmic vertical axis transforms an exponential curve into a straight line, and read the line's slope and intercept to recover the exponential's parameters.

Visual elements:

- Left panel: linear axes from \( x = 0 \) to 20 and \( y = 0 \) to 1000, exponential curve in maroon.
- Right panel: same \( x \) axis but vertical axis labeled with powers of 10 (1, 10, 100, 1000), same data points as a straight line in gold.
- Annotations on the right panel showing the slope = \( \log b \) and intercept = \( \log a \).
- A side panel showing the recovered equation \( y = a \cdot b^x \) with current values.

Interactive controls:

- A slider for the true initial value \( a \) ranging from 1 to 50.
- A slider for the true growth factor \( b \) ranging from 1.05 to 1.5.
- A "Add Noise" toggle to scatter the data points slightly so the linearization gain is visible even with imperfect data.

Instructional rationale: Linearization is far easier to grasp visually than algebraically. Watching the same data simultaneously bend on linear axes and straighten on semi-log axes makes the role of the logarithm concrete.

Canvas: 1100 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for parameters, createCheckbox for noise toggle.
</details>

## Log-Log Plots

A **log-log plot** uses a logarithmic scale on *both* the horizontal and vertical axes. Its purpose is to test for and visualize **power relationships** of the form \( y = a x^p \).

If \( y = a x^p \), taking logs of both sides gives:

\[ \log y = \log a + p \log x \]

So plotting \( \log y \) against \( \log x \) — or putting both axes on log scales — straightens a power function into a line. The slope of that line equals the *power* \( p \), and the intercept equals \( \log a \).

Log-log plots are standard in physics, biology, and engineering for relationships like the period of a pendulum vs. its length, allometric scaling laws (animal mass vs. body length), and many empirical engineering correlations.

| Plot type | Linear axis | Log axis | Straightens which family? |
|-----------|-------------|----------|---------------------------|
| Linear plot | both \( x \) and \( y \) | none | Linear: \( y = mx + b \) |
| Semi-log plot | \( x \) only | \( y \) | Exponential: \( y = a \cdot b^x \) |
| Log-log plot | none | both \( x \) and \( y \) | Power: \( y = a x^p \) |

## Exponential Regression

**Exponential regression** is the process of fitting an exponential model \( y = a \cdot b^x \) to a data set, usually by linearizing on a semi-log plot and running ordinary linear regression on \( (x, \log y) \).

Graphing calculators offer this as a one-button operation (often labeled `ExpReg`). Behind the scenes, the calculator computes \( \log y \) for each point, runs a least-squares linear fit, and reports the equivalent exponential parameters along with a goodness-of-fit measure.

A residual analysis on a semi-log plot is the appropriate diagnostic: if the linearized points scatter randomly about the fitted line with no curvature, the exponential family is justified. If a systematic curve appears, the exponential family is the wrong choice — try power, logistic, or another family instead.

## Power Regression

**Power regression** fits a model \( y = a x^p \) by linearizing on a log-log plot and running ordinary linear regression on \( (\log x, \log y) \). Calculators expose this as `PwrReg` (or similar).

Power regression is the right choice for relationships in which a doubling of one variable produces a fixed-ratio change in the other — a hallmark of the natural laws found in physics and biology. A scatterplot that bends in a way that *neither* exponential nor logarithmic captures is often power-shaped, and the log-log plot is the test.

!!! mascot-thinking "Three Plots, Three Families"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Linear plot for linear data, semi-log for exponentials, log-log for power laws. Each plot is designed to *straighten* one specific function family. If your data goes straight on one of these plots, the matching family is the right model — and the slope and intercept of that line tell you the parameters directly.

## Putting It All Together

Logarithms invert exponentials and unlock both algebraic problem-solving (extracting variables from exponents) and graphical problem-solving (linearizing exponential and power data on log-scaled axes).

Key ideas to carry forward:

- A **logarithm** is the inverse of an exponential: \( \log_b y = x \) means \( b^x = y \).
- The **common log** \( \log \) uses base 10; the **natural log** \( \ln \) uses base \( e \).
- The **product, quotient, and power rules** turn complicated logarithm expressions into simpler sums, differences, and multiples.
- The **change of base formula** \( \log_b x = \log x / \log b \) lets us evaluate any base with calculator keys.
- The graph of \( \log_b x \) is the reflection of \( b^x \) across \( y = x \), with vertical asymptote at \( x = 0 \) and domain \( (0, \infty) \).
- A **semi-log plot** linearizes exponential data; a **log-log plot** linearizes power data.
- **Exponential regression** fits \( y = a \cdot b^x \); **power regression** fits \( y = a x^p \) — both via linearization.

!!! mascot-celebration "Inverses Complete"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    Exponentials and logarithms are now a complete pair: one builds growth, the other extracts the exponent that produced it. With both tools you can model exponential phenomena, solve for any unknown, linearize data on log scales, and recognize when a power law is hiding inside seemingly curvy data. Unit 2 is complete — onward to trigonometry!

??? question "Quick Check: Rewrite \( \log_2 32 = 5 \) in exponential form."
    \( 2^5 = 32 \).

??? question "Quick Check: Use the product rule to expand \( \log(7xy) \)."
    \( \log(7xy) = \log 7 + \log x + \log y \).

??? question "Quick Check: A scatterplot becomes a straight line on a semi-log plot. Which function family fits?"
    Exponential — \( y = a \cdot b^x \). The slope of the linearized line gives \( \log b \), and the intercept gives \( \log a \).
