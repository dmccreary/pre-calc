---
title: Exponential Functions
description: Exponential functions, growth and decay factors, the natural base e, continuous growth, compound interest, exponential equations and graphs, transformations, half-life, doubling time, and percent rate of change.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:56:30
version: 0.07
---

# Exponential Functions

## Summary

This chapter explores exponential functions and their applications. Students learn about exponential function definitions, base, growth and decay factors, the natural base e, continuous growth, and compound interest. The chapter covers solving exponential equations, graphing exponential functions, applying transformations, and modeling real-world phenomena including half-life, doubling time, and percent rate of change. Exponential functions serve as the foundation for logarithmic functions in the next chapter.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Exponential Function Definition
2. Base of Exponential
3. Growth Factor
4. Decay Factor
5. Exponential Growth
6. Exponential Decay
7. Natural Base e
8. Continuous Growth
9. Compound Interest
10. Exponential Equations
11. Exponential Graphs
12. Exponential Transformations
13. Exponential Modeling
14. Half-Life
15. Doubling Time
16. Percent Rate of Change

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 9: Function Transformations](../09-function-transformations/index.md)
- [Chapter 10: Data Modeling and Regression](../10-data-modeling-and-regression/index.md)
- [Chapter 12: Sequences](../12-sequences/index.md)

---

!!! mascot-welcome "When Change Is Multiplicative"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Linear functions answered the question "what if change is constant?" Exponential functions answer a different question: "what if change is *proportional* to the current amount?" Populations, savings accounts, and radioactive isotopes all follow this multiplicative pattern. We are about to make the geometric sequences from Chapter 12 continuous.

## Exponential Function Definition

An **exponential function** is a function of the form:

\[ f(x) = a \cdot b^x \]

where:

- \( a \) is the **initial value** — the function's output when \( x = 0 \), since \( b^0 = 1 \) gives \( f(0) = a \).
- \( b \) is the **base** — a positive constant, \( b > 0 \) and \( b \neq 1 \).
- \( x \) is the **exponent** — the variable input that the base is raised to.

The defining feature is that the variable lives in the *exponent*, not the base. The function \( f(x) = x^2 \) is a quadratic, not an exponential — the variable is in the base. Exponential functions reverse those roles, so the variable controls how many times the constant base is multiplied by itself.

A few examples:

- \( f(x) = 3 \cdot 2^x \) starts at 3 and doubles each unit step.
- \( f(x) = 100 \cdot (0.9)^x \) starts at 100 and shrinks by 10% each unit step.
- \( f(x) = 5^x \) starts at 1 and is multiplied by 5 each unit step.

## Base of Exponential

The **base** \( b \) controls everything about the function's long-run behavior. Two restrictions on \( b \) keep the function well-behaved:

- \( b > 0 \) so that \( b^x \) is defined for all real numbers \( x \) (negative bases produce undefined values at non-integer exponents, e.g., \( (-2)^{1/2} \)).
- \( b \neq 1 \) so that the function does not collapse to the constant function \( f(x) = a \).

Within those restrictions, the value of \( b \) splits exponential functions into three distinct regimes summarized in the table below.

| Base condition | Behavior of \( b^x \) as \( x \) increases | Function regime |
|----------------|---------------------------------------------|-----------------|
| \( b > 1 \)    | Grows without bound | Exponential growth |
| \( b = 1 \)    | Stays at 1 (excluded by definition) | Constant — not exponential |
| \( 0 < b < 1 \) | Shrinks toward 0 | Exponential decay |

## Growth Factor

When \( b > 1 \), the base is called the **growth factor** because each unit increase in \( x \) multiplies the output by \( b \). For \( f(x) = a \cdot b^x \):

\[ \frac{f(x+1)}{f(x)} = \frac{a \cdot b^{x+1}}{a \cdot b^x} = b \]

So a growth factor of \( b = 1.05 \) means the output is multiplied by 1.05 — a 5% increase — for every unit increase in \( x \). A growth factor of 2 means the output doubles each unit step.

The growth factor connects to the **percent growth rate** \( r \) by the relation:

\[ b = 1 + r \]

For example, a population growing 3% per year has \( r = 0.03 \) and growth factor \( b = 1.03 \).

## Decay Factor

When \( 0 < b < 1 \), the base is called the **decay factor** because each unit increase in \( x \) multiplies the output by a number less than 1, shrinking it. The same ratio identity applies — each unit step multiplies the output by \( b \).

The decay factor connects to the **percent decay rate** \( r \) by:

\[ b = 1 - r \]

For example, an asset depreciating 8% per year has \( r = 0.08 \) and decay factor \( b = 0.92 \). A medication clearing 25% per hour has \( b = 0.75 \).

!!! mascot-tip "Read the Base, Read the Story"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    The number after \( a \) tells you everything: \( b = 1.05 \) is +5% per step, \( b = 0.85 \) is -15% per step. If \( b > 1 \), things grow; if \( 0 < b < 1 \), things shrink. The further \( b \) is from 1, the more dramatic the change.

## Exponential Growth

**Exponential growth** is the behavior of \( f(x) = a \cdot b^x \) when \( a > 0 \) and \( b > 1 \). The defining property is that the function's output is multiplied by the same factor over equal input steps — exactly the continuous version of a geometric sequence.

Real-world examples include uninhibited bacterial population growth, compound interest, viral spread in early stages, and the spread of online content. In each case, the rate of change is *proportional to the current amount*: the bigger the population, the faster it grows.

The signature behavior of exponential growth is the doubling effect: even small percent increases produce enormous totals after many steps. A 7% annual return doubles a savings balance roughly every 10 years; in 70 years it doubles seven times, multiplying the original by 128. Linear growth at a similar absolute amount would lag far behind.

## Exponential Decay

**Exponential decay** is the behavior of \( f(x) = a \cdot b^x \) when \( a > 0 \) and \( 0 < b < 1 \). The function's output is divided by the same factor over equal input steps, approaching but never reaching 0.

Real-world examples include radioactive isotopes losing mass, a hot drink cooling toward room temperature (with a vertical shift), drug concentration in the bloodstream, and atmospheric pressure decreasing with altitude.

The graph of exponential decay has a horizontal asymptote at \( y = 0 \) (the function gets arbitrarily close to zero but never touches it). This horizontal asymptote is a hallmark of every basic exponential function — growth or decay.

#### Diagram: Exponential Growth vs Decay Explorer

<details markdown="1">
<summary>Two side-by-side exponential graphs with a draggable base parameter</summary>
Type: MicroSim
**sim-id:** exponential-growth-vs-decay<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim displaying \( f(x) = a \cdot b^x \) with a slider that smoothly sweeps the base \( b \) from 0.1 to 5, letting students see the transition from decay to growth in real time.

Learning objective (Bloom's Analyzing): Students will analyze how the value of the base \( b \) determines whether an exponential function grows, decays, or stays constant.

Visual elements:

- A coordinate plane with \( x \) ranging from -5 to 5 and \( y \) ranging from 0 to 30.
- The graph of \( f(x) = a \cdot b^x \) drawn in maroon, redrawn in real time.
- A horizontal line at \( y = 0 \) emphasizing the asymptote.
- A label showing the current \( b \) value and verdict: "growth" (green) for \( b > 1 \), "decay" (gold) for \( 0 < b < 1 \), "constant" (gray) for \( b = 1 \).

Interactive controls:

- A slider for the initial value \( a \) ranging from 0.1 to 10.
- A slider for the base \( b \) ranging from 0.1 to 5 in steps of 0.05, with a tick mark at \( b = 1 \).
- A "Show Y-Intercept" toggle that highlights the point \( (0, a) \).

Instructional rationale: Sliding the base across \( b = 1 \) makes the boundary between growth and decay visceral. The asymptote remains visible no matter the base, reinforcing its persistence.

Canvas: 900 × 600 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for both parameters, createCheckbox for y-intercept.
</details>

## Natural Base e

The **natural base** \( e \) is a specific irrational number, approximately:

\[ e \approx 2.71828\ldots \]

It appears throughout mathematics and science because it is the unique base for which the exponential function's rate of change exactly equals the function's value — a calculus result you will meet later. For pre-calculus, treat \( e \) as a special number, similar to \( \pi \), with a calculator key dedicated to it.

The function \( f(x) = e^x \) is called the **natural exponential function**. Because \( e > 1 \), it is an exponential growth function. Its graph passes through \( (0, 1) \) and rises steeply for positive \( x \).

The number \( e \) arises naturally as the limit of the compound interest formula as the compounding becomes infinitely frequent — a connection developed below.

## Continuous Growth

**Continuous growth** describes a quantity that grows by a fixed percentage *at every instant*, not just at discrete intervals. The model uses the natural base:

\[ f(t) = a \cdot e^{kt} \]

where:

- \( a \) is the initial value at \( t = 0 \).
- \( k \) is the **continuous growth rate** (also called the *instantaneous rate*).
- \( t \) is time.

If \( k > 0 \), the function grows continuously. If \( k < 0 \), it decays continuously.

Continuous growth is the model of choice for any process that is, in principle, always changing — bacterial reproduction (always some cell dividing), compound interest credited continuously, radioactive decay (atoms decay independently and continuously). The discrete model \( a \cdot b^t \) and the continuous model \( a \cdot e^{kt} \) are equivalent under the relationship \( b = e^k \), so any percent-growth scenario can be expressed in either form.

## Compound Interest

**Compound interest** is the standard model for money in a savings account, where each compounding period adds interest computed from the current balance:

\[ A(t) = P \left(1 + \frac{r}{n}\right)^{nt} \]

where:

- \( P \) is the principal — the initial deposit.
- \( r \) is the annual interest rate, written as a decimal (5% = 0.05).
- \( n \) is the number of compounding periods per year (12 for monthly, 365 for daily).
- \( t \) is time in years.
- \( A(t) \) is the account balance after \( t \) years.

As compounding becomes more frequent (\( n \to \infty \)), the formula approaches the continuous compounding formula:

\[ A(t) = P e^{rt} \]

This is exactly where the natural base \( e \) earns its name: compounding more frequently squeezes a tiny bit more growth out of the same annual rate, and the limiting case is continuous compounding.

A worked example: $1,000 invested at 5% annual interest compounded monthly for 10 years.

\[ A(10) = 1000 \left(1 + \frac{0.05}{12}\right)^{12 \cdot 10} = 1000 \cdot (1.00417)^{120} \approx \$1{,}647.01 \]

The same investment compounded continuously yields:

\[ A(10) = 1000 \cdot e^{0.05 \cdot 10} = 1000 \cdot e^{0.5} \approx \$1{,}648.72 \]

The difference is small — about $1.71 — because monthly compounding is already close to the continuous limit at this rate.

| Compounding | Formula | Balance after 10 yrs at 5% |
|-------------|---------|---------------------------|
| Annual (\( n = 1 \))    | \( P(1 + r)^t \) | \$1,628.89 |
| Monthly (\( n = 12 \))  | \( P(1 + r/12)^{12t} \) | \$1,647.01 |
| Daily (\( n = 365 \))   | \( P(1 + r/365)^{365t} \) | \$1,648.66 |
| Continuous              | \( P e^{rt} \)            | \$1,648.72 |

## Exponential Equations

**Exponential equations** are equations in which the variable appears in an exponent. Three solving techniques cover most pre-calculus cases:

1. **Equate the bases.** If both sides can be written with the same base, set the exponents equal.
   - \( 2^x = 32 \implies 2^x = 2^5 \implies x = 5 \).

2. **Take a logarithm of both sides.** When the bases cannot be matched, apply a logarithm. We will develop this technique fully in Chapter 14.
   - \( 5^x = 17 \implies x = \log_5 17 \).

3. **Substitute and reduce to a polynomial equation.** Some equations like \( 4^x - 5 \cdot 2^x + 4 = 0 \) become quadratic after letting \( u = 2^x \), giving \( u^2 - 5u + 4 = 0 \).

The first technique is the most accessible and the most testable in pre-calculus.

## Exponential Graphs

The graph of \( f(x) = a \cdot b^x \) (with \( a > 0 \)) has these features regardless of whether \( b > 1 \) or \( 0 < b < 1 \):

- **\( y \)-intercept** at \( (0, a) \).
- **No \( x \)-intercept** — the function is positive everywhere.
- **Horizontal asymptote** at \( y = 0 \). The function approaches but never reaches the \( x \)-axis.
- **Domain**: all real numbers.
- **Range**: \( (0, \infty) \).

The orientation depends on \( b \):

- For \( b > 1 \), the graph rises to the right and approaches the asymptote on the left.
- For \( 0 < b < 1 \), the graph falls to the right and approaches the asymptote on the right.

When \( a < 0 \), the entire graph is reflected across the \( x \)-axis: range becomes \( (-\infty, 0) \), and the asymptote is approached from below.

## Exponential Transformations

**Exponential transformations** apply the same rules from Chapter 9 to the parent function \( f(x) = b^x \). The general transformed form is:

\[ f(x) = a \cdot b^{c(x - h)} + k \]

where:

- \( a \) is a vertical stretch (and reflection if \( a < 0 \)).
- \( c \) is a horizontal stretch (and reflection if \( c < 0 \)).
- \( h \) shifts the graph horizontally by \( h \) units.
- \( k \) shifts the graph vertically by \( k \) units — and importantly, it shifts the horizontal asymptote from \( y = 0 \) to \( y = k \).

The vertical shift \( k \) deserves special attention: it is the only transformation that moves the horizontal asymptote, which determines the function's range. A graph of \( 2^x + 3 \) has asymptote \( y = 3 \) and range \( (3, \infty) \), not \( (0, \infty) \).

!!! mascot-warning "Watch the Asymptote, Not Just the Curve"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Prema warning">
    A vertical shift moves the asymptote with the graph. If you draw the curve correctly but leave the asymptote at \( y = 0 \), every value you read from the graph will be wrong. Sketch the asymptote first, then draw the curve approaching it.

## Exponential Modeling

**Exponential modeling** is the process of fitting an exponential function to a real-world scenario. The standard workflow for building a model:

1. Identify the **initial value** \( a \) — the quantity at time \( t = 0 \).
2. Identify the **growth factor** \( b \) (or **growth rate** \( r \) and use \( b = 1 + r \)).
3. Choose a time unit consistent with the rate (years, hours, days).
4. Write the model: \( f(t) = a \cdot b^t \).
5. Validate against known data points.

Exponential models are the right choice when the underlying process exhibits proportional change — the rate of change is proportional to the current amount. Bacterial growth, radioactive decay, drug clearance, viral spread, and uninhibited population growth all fit this pattern.

A classic worked example: a bacterial culture starts with 500 cells and doubles every 3 hours. Find the population after 24 hours.

The doubling-every-3-hours pattern means the growth factor over 1 hour is \( b = 2^{1/3} \approx 1.260 \), so the model is \( f(t) = 500 \cdot 2^{t/3} \). At \( t = 24 \):

\[ f(24) = 500 \cdot 2^{24/3} = 500 \cdot 2^8 = 500 \cdot 256 = 128{,}000 \text{ cells} \]

## Half-Life

**Half-life** is the time required for an exponentially decaying quantity to fall to half its starting value. It is the natural time scale for any decay process.

If a substance has half-life \( T \), then after time \( t \) the fraction remaining is:

\[ f(t) = a \cdot \left(\frac{1}{2}\right)^{t/T} \]

The exponent \( t/T \) counts how many half-lives have elapsed. After 1 half-life, the quantity is multiplied by \( 1/2 \); after 2 half-lives, by \( 1/4 \); after 3, by \( 1/8 \); and so on.

For example, the radioactive isotope carbon-14 has a half-life of 5,730 years. A sample starting with 100 grams will contain:

\[ f(11{,}460) = 100 \cdot (1/2)^{11460/5730} = 100 \cdot (1/2)^2 = 25 \text{ grams} \]

after 11,460 years (two half-lives).

## Doubling Time

**Doubling time** is the partner concept for exponential growth: the time required for an exponentially growing quantity to double. If a quantity has doubling time \( T \):

\[ f(t) = a \cdot 2^{t/T} \]

The exponent \( t/T \) counts how many doublings have elapsed. A handy rule of thumb in finance is the **rule of 72**: at an annual growth rate of \( r\% \), the doubling time is approximately \( 72 / r \) years. So a 6% annual return doubles money in roughly 12 years; an 8% return doubles it in about 9 years.

Half-life and doubling time both reframe an exponential function in terms of a *time scale* that is meaningful for the underlying process — usually easier to interpret than the abstract base \( b \).

#### Diagram: Half-Life and Doubling-Time Visualizer

<details markdown="1">
<summary>Animated decay or growth showing successive halvings or doublings on a number line</summary>
Type: MicroSim
**sim-id:** halflife-doubling-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim that animates an exponential process across a configurable number of half-lives or doubling times, displaying both the time axis and the value axis.

Learning objective (Bloom's Applying): Students will apply the half-life and doubling-time concepts to compute remaining or accumulated amounts after a given number of cycles.

Visual elements:

- A horizontal time axis labeled in units of half-life or doubling time \( T \).
- A vertical bar chart showing the current value at each completed cycle (1T, 2T, 3T, ...).
- An overlaid continuous exponential curve passing through the bar tops.
- A status line: "After \( n \) half-lives, fraction remaining = \( (1/2)^n = \) ___."

Interactive controls:

- A radio toggle: Half-Life mode or Doubling-Time mode.
- A slider for initial value from 1 to 100.
- A slider for the time scale \( T \) from 1 to 10.
- A "Step Forward" button that advances one cycle at a time.

Instructional rationale: Half-life and doubling-time problems are essentially counting problems — how many cycles fit into the elapsed time. Stepping through one cycle at a time makes the integer-power pattern visible, then transitions to non-integer exponents naturally.

Canvas: 1000 × 500 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createRadio for mode, createSlider for parameters, createButton for step.
</details>

## Percent Rate of Change

The **percent rate of change** of an exponential function \( f(x) = a \cdot b^x \) is the percent by which the output changes between \( x \) and \( x + 1 \). This rate is *constant* across the entire domain — every unit step multiplies the output by the same factor \( b \).

The percent rate of change \( r \) connects to the base by:

\[ r = b - 1 \quad \text{(expressed as a decimal)} \]

A percent change of +12% per unit step means \( r = 0.12 \) and \( b = 1.12 \). A percent change of -7% per unit step means \( r = -0.07 \) and \( b = 0.93 \).

Constant percent rate of change is the diagnostic signature of exponential behavior. If a data set shows roughly equal *percent* changes between successive equal-time observations, an exponential model is appropriate. (Compare with linear functions, which have constant *absolute* change.)

!!! mascot-thinking "Linear Adds, Exponential Multiplies"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The deepest contrast in this chapter is between linear and exponential growth. A linear quantity adds the same amount each step. An exponential quantity multiplies by the same factor each step. Multiplying by a number greater than 1 will eventually outrun any addition, no matter how large the addition.

## Putting It All Together

Exponential functions describe processes whose rate of change is proportional to the current amount. The base \( b \) decides everything: \( b > 1 \) gives growth, \( 0 < b < 1 \) gives decay, and the further \( b \) is from 1 the more dramatic the change.

Key ideas to carry forward:

- An **exponential function** has the form \( f(x) = a \cdot b^x \) with \( b > 0 \) and \( b \neq 1 \).
- The **base** \( b \) determines growth (\( b > 1 \)) or decay (\( 0 < b < 1 \)); the **percent rate** is \( r = b - 1 \).
- The **natural base** \( e \approx 2.71828 \) is the standard base for continuous-growth modeling, with \( f(t) = a \cdot e^{kt} \).
- **Compound interest** is exponential, and continuous compounding is the limit of more and more frequent compounding — exactly the place where \( e \) appears.
- The graph of \( f(x) = a \cdot b^x \) has horizontal asymptote \( y = 0 \), \( y \)-intercept \( (0, a) \), and is positive everywhere.
- **Half-life** and **doubling time** are reciprocals of the same idea — natural time scales for decay and growth.
- Constant **percent rate of change** is the diagnostic that distinguishes exponential from linear data.

!!! mascot-celebration "Exponentials Unlocked"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You can now read any exponential model and immediately translate it into a story: starting amount, growth or decay regime, time scale, percent change per unit. The next chapter introduces the inverse — logarithms — which let us solve exponential equations exactly and unlock data linearization on semi-log plots.

??? question "Quick Check: For \( f(x) = 200 \cdot (1.08)^x \), what is the percent rate of change per unit step?"
    \( r = b - 1 = 1.08 - 1 = 0.08 = 8\% \) growth per unit step.

??? question "Quick Check: A drug has a half-life of 4 hours. If 80 mg are present at \( t = 0 \), how much remains at \( t = 12 \) hours?"
    Three half-lives have passed: \( 80 \cdot (1/2)^3 = 80 \cdot 1/8 = 10 \) mg remain.

??? question "Quick Check: $5,000 is invested at 4% annual interest compounded continuously. What is the balance after 5 years?"
    \( A = 5000 \cdot e^{0.04 \cdot 5} = 5000 \cdot e^{0.2} \approx 5000 \cdot 1.2214 \approx \$6{,}107 \).
