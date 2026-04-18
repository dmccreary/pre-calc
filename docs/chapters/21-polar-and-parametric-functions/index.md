---
title: Polar and Parametric Functions
description: Polar coordinates with conversions and graphs of circles, cardioids, limaçons, and rose curves, plus parametric equations for describing planar motion, eliminating the parameter, and modeling position, velocity, direction, and projectile motion.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 21:50:00
version: 0.07
---

# Polar and Parametric Functions

## Summary

This chapter introduces two alternative coordinate systems for representing functions and curves. In the polar section, students learn polar coordinates, conversions between rectangular and polar forms, and how to graph polar functions including circles, cardioids, limaçons, and rose curves. The chapter covers symmetry, rate of change, and intersections of polar graphs. In the parametric section, students learn parametric equations, graphing, eliminating the parameter, and modeling planar motion including position, velocity, direction, and projectile motion.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Polar Coordinate System
2. Polar Point Plotting
3. Rectangular to Polar
4. Polar to Rectangular
5. Multiple Polar Representations
6. Polar Function Definition
7. Polar Graphs
8. Circles in Polar Form
9. Cardioids
10. Limaçons
11. Rose Curves
12. Petal Count of Roses
13. Symmetry of Polar Graphs
14. Polar Rate of Change
15. Polar Graph Intersections
16. Parametric Equations
17. Parameter
18. Parametric Graphs
19. Eliminating the Parameter
20. Parametric Motion
21. Position Functions
22. Velocity from Parametrics
23. Direction of Motion
24. Parametric Modeling
25. Projectile Motion Model

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 2: Functions and Their Properties](../02-functions-and-their-properties/index.md)
- [Chapter 3: Rates of Change](../03-rates-of-change/index.md)
- [Chapter 5: Quadratic Functions and Complex Numbers](../05-quadratic-functions-and-complex-numbers/index.md)
- [Chapter 10: Data Modeling and Regression](../10-data-modeling-and-regression/index.md)
- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)
- [Chapter 16: Trigonometric Functions](../16-trigonometric-functions/index.md)

---

!!! mascot-welcome "Two New Ways to See a Curve"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    So far every point has been described with an \( (x, y) \) pair. In this chapter we learn two new ways to describe points and curves: polar coordinates (distance and angle from the origin) and parametric equations (position as a function of time). Each framework makes certain curves easy that would be nightmarish in rectangular form.

## Part 1: Polar Coordinates

### Polar Coordinate System

The **polar coordinate system** locates a point in the plane using two quantities: a distance \( r \) from the origin and an angle \( \theta \) measured counterclockwise from the positive \( x \)-axis. A polar coordinate pair is written \( (r, \theta) \).

Here is a comparison of the two coordinate systems:

| System | Coordinates | Interpretation |
|---|---|---|
| Rectangular | \( (x, y) \) | horizontal distance, vertical distance |
| Polar | \( (r, \theta) \) | distance from origin, angle from positive \( x \)-axis |

Polar coordinates are natural for situations involving rotation or radial distance — think of a radar screen, a spiral staircase, or any problem centered on a single origin point.

### Polar Point Plotting

**Polar point plotting** draws a point given its polar coordinates \( (r, \theta) \). The procedure:

1. Rotate counterclockwise from the positive \( x \)-axis by the angle \( \theta \).
2. Travel outward from the origin along that ray by the distance \( r \).
3. Mark the endpoint.

A subtlety: the distance \( r \) can be negative. A negative \( r \) means "walk backward" — travel in the opposite direction from the angle \( \theta \), which lands you at angle \( \theta + \pi \) instead.

### Multiple Polar Representations

Because angles repeat every \( 2\pi \) and negative distances reverse direction, **every point in the plane has infinitely many polar representations**. For example, the point \( (2, \pi/4) \) can also be written:

- \( (2, \pi/4 + 2\pi) = (2, 9\pi/4) \)
- \( (2, \pi/4 - 2\pi) = (2, -7\pi/4) \)
- \( (-2, \pi/4 + \pi) = (-2, 5\pi/4) \)

This is a genuine difference from rectangular coordinates, where every point has exactly one \( (x, y) \) pair. Polar coordinates trade uniqueness for the power to describe rotational problems more naturally.

### Rectangular to Polar

To convert a rectangular point \( (x, y) \) **rectangular to polar** form, use the relationships:

\[ r = \sqrt{x^2 + y^2}, \qquad \tan\theta = \frac{y}{x} \]

The distance \( r \) is straightforward — it is the hypotenuse of the right triangle formed by \( x \) and \( y \). The angle \( \theta \) requires care because \( \arctan(y/x) \) returns a value in \( (-\pi/2, \pi/2) \), which covers only the right half of the plane. To get \( \theta \) in the correct quadrant:

- If \( (x, y) \) is in Quadrant I or IV, \( \theta = \arctan(y/x) \).
- If \( (x, y) \) is in Quadrant II or III, \( \theta = \arctan(y/x) + \pi \).

### Polar to Rectangular

Converting **polar to rectangular** is simpler because trig gives the components of the radius directly:

\[ x = r\cos\theta, \qquad y = r\sin\theta \]

These come straight from the unit-circle definitions. For example, \( (4, \pi/3) \) in polar becomes \( (4\cos(\pi/3), 4\sin(\pi/3)) = (2, 2\sqrt{3}) \) in rectangular.

#### Diagram: Polar-Rectangular Converter

<iframe src="../../sims/polar-rectangular-converter/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Polar-Rectangular Converter</summary>
Type: microsim
**sim-id:** polar-rectangular-converter<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, convert): Convert points between rectangular \( (x, y) \) and polar \( (r, \theta) \) coordinate forms and visualize the equivalence.

Canvas layout:
- Main drawing area: coordinate plane with both rectangular grid and polar grid overlaid
- Side panel: numerical readouts for both representations

Visual elements:
- Draggable point shown as a gold dot
- Blue line from origin to the point representing \( r \)
- Arc showing the angle \( \theta \) with a label
- Vertical and horizontal dashed lines showing \( x \) and \( y \) components
- Circles of radius 1, 2, 3, ... lightly drawn for polar reference

Interactive controls:
- Click-and-drag to move the point
- Toggle: enter point in rectangular form (two inputs)
- Toggle: enter point in polar form (two inputs)
- Button: show alternative polar representations for the current point

Data Visibility Requirements:
- Stage 1: Show the current point's \( (x, y) \) coordinates
- Stage 2: Show the current point's \( (r, \theta) \) coordinates
- Stage 3: Show the conversion formulas applied with actual numbers
- Stage 4: On "alternatives" button, list three equivalent polar representations

Instructional Rationale: Dragging a single point and watching both coordinate readouts update in tandem makes the two systems feel like different descriptions of the same underlying point, which is the key conceptual move.

Implementation: p5.js with responsive canvas.
</details>

### Polar Function Definition

A **polar function** expresses \( r \) as a function of \( \theta \): \( r = f(\theta) \). For each input angle \( \theta \), the function outputs a distance from the origin. As \( \theta \) sweeps around a full revolution, the output traces a curve called a **polar graph**.

Some polar functions we'll explore in this chapter are:

- \( r = 3 \) — constant distance, traces a circle
- \( r = 2\cos\theta \) — a circle off-center from the origin
- \( r = 1 + \cos\theta \) — a cardioid (heart-shape)
- \( r = 2 + \sin\theta \) — a limaçon (with a loop or dimple)
- \( r = \cos(3\theta) \) — a three-petal rose

### Polar Graphs

**Polar graphs** are plotted by sampling the function at many values of \( \theta \) from 0 to \( 2\pi \), converting each \( (r, \theta) \) pair to rectangular coordinates, and connecting them in order. Graphing calculators do this automatically when you switch to polar mode.

### Circles in Polar Form

**Circles in polar form** have three common forms:

| Equation | Circle |
|---|---|
| \( r = a \) | Circle of radius \( a \) centered at the origin |
| \( r = 2a\cos\theta \) | Circle of radius \( a \) centered at \( (a, 0) \) — passes through origin |
| \( r = 2a\sin\theta \) | Circle of radius \( a \) centered at \( (0, a) \) — passes through origin |

The second and third forms describe circles that pass through the origin and open along the \( x \)- or \( y \)-axis. Polar form makes these circles easy to write down, where their rectangular equations would require completing the square.

### Cardioids

A **cardioid** is the heart-shaped polar curve with equation \( r = a \pm a\cos\theta \) or \( r = a \pm a\sin\theta \). Cardioids arise in acoustics (the pickup pattern of a microphone) and engineering (gear profiles). The defining feature: the maximum value of \( r \) is exactly twice the minimum value.

Key features of \( r = 1 + \cos\theta \):

- Maximum \( r = 2 \) at \( \theta = 0 \) (a point at \( (2, 0) \))
- Minimum \( r = 0 \) at \( \theta = \pi \) (passes through the origin)
- Symmetric about the \( x \)-axis

### Limaçons

A **limaçon** is a polar curve of the form \( r = a \pm b\cos\theta \) or \( r = a \pm b\sin\theta \), where \( a \) and \( b \) are positive constants. The shape depends on the ratio \( a/b \):

| Ratio | Shape |
|---|---|
| \( a/b < 1 \) | Inner loop limaçon (curve crosses itself) |
| \( a/b = 1 \) | Cardioid (no inner loop, no dimple) |
| \( 1 < a/b < 2 \) | Dimpled limaçon |
| \( a/b \geq 2 \) | Convex limaçon (smooth oval) |

Cardioids are the transitional case where \( a = b \), sitting right between inner-loop and dimpled limaçons.

### Rose Curves

A **rose curve** is a polar graph of the form \( r = a\cos(n\theta) \) or \( r = a\sin(n\theta) \), which traces a pattern of petals around the origin. The value of \( a \) sets the petal length, and \( n \) sets how many petals appear.

### Petal Count of Roses

The **petal count of a rose** depends on whether \( n \) is odd or even:

- If \( n \) is **odd**, the rose has \( n \) petals.
- If \( n \) is **even**, the rose has \( 2n \) petals.

This is a common source of confusion, so here is a table of concrete cases:

| Equation | \( n \) | Petal count |
|---|---|---|
| \( r = \cos(2\theta) \) | 2 (even) | 4 |
| \( r = \cos(3\theta) \) | 3 (odd) | 3 |
| \( r = \cos(4\theta) \) | 4 (even) | 8 |
| \( r = \cos(5\theta) \) | 5 (odd) | 5 |

The reason: for odd \( n \), the curve retraces itself on the second half of the interval \( [0, 2\pi] \); for even \( n \), the second half fills in additional petals.

### Symmetry of Polar Graphs

**Symmetry of polar graphs** can often be read off from the equation:

- If replacing \( \theta \) with \( -\theta \) leaves the equation unchanged, the graph is **symmetric about the \( x \)-axis**. This happens when the equation depends only on \( \cos\theta \).
- If replacing \( \theta \) with \( \pi - \theta \) leaves the equation unchanged, the graph is **symmetric about the \( y \)-axis**. This happens when the equation depends only on \( \sin\theta \).
- If replacing \( r \) with \( -r \) (or equivalently \( \theta \) with \( \theta + \pi \)) leaves the equation unchanged, the graph is **symmetric about the origin**.

Recognizing symmetry lets you plot only half (or a quarter) of the curve and reflect to get the rest.

### Polar Rate of Change

The **polar rate of change** asks how \( r \) changes as \( \theta \) changes — that is, \( \Delta r / \Delta\theta \). Intervals where \( r \) increases correspond to the curve spiraling outward; intervals where \( r \) decreases correspond to the curve spiraling inward.

For a cardioid \( r = 1 + \cos\theta \):

- On \( [0, \pi] \), \( r \) decreases from 2 to 0 — the curve spirals inward.
- On \( [\pi, 2\pi] \), \( r \) increases from 0 back to 2 — the curve spirals outward.

This rate-of-change reasoning follows the same pattern we used in Chapter 3 for rectangular functions, now applied to the polar relationship.

### Polar Graph Intersections

**Polar graph intersections** require more care than rectangular intersections because of the multiple-representation problem. Two polar curves may cross at a point even when setting their equations equal yields no solution, because the two curves may pass through the point at different values of \( \theta \).

The safe procedure:

1. Set \( f(\theta) = g(\theta) \) and solve for \( \theta \). These are intersections at matched \( \theta \) values.
2. Check whether both curves pass through the **origin** (i.e., \( r = 0 \)) for any \( \theta \). If so, the origin is an intersection even though \( f \) and \( g \) may reach it at different angles.
3. Consider alternate representations \( (-r, \theta + \pi) \) if the problem demands completeness.

#### Diagram: Polar Curve Gallery

<iframe src="../../sims/polar-curve-gallery/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Polar Curve Gallery</summary>
Type: microsim
**sim-id:** polar-curve-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Analyze, L4, distinguish): Distinguish the shape of a polar curve from its equation by adjusting parameters and observing changes in cardioids, limaçons, and rose curves.

Canvas layout:
- Main area: polar grid with the current curve drawn
- Control panel: equation template selector and parameter sliders

Visual elements:
- Polar grid with concentric circles and radial lines
- Current curve drawn in maroon with a pulse animation tracing through \( \theta \) from 0 to \( 2\pi \)
- Highlighted origin dot
- Symmetry axis lines shown as dotted lines when applicable

Interactive controls:
- Dropdown: curve type (circle, cardioid, limaçon, rose)
- Sliders for coefficients \( a \), \( b \), and the multiplier \( n \) for roses
- Button: Reset to classic example
- Toggle: trace the angle marker as the curve is drawn

Data Visibility Requirements:
- Stage 1: Show the equation with current parameters
- Stage 2: Show the shape category (e.g., "dimpled limaçon" based on \( a/b \) ratio)
- Stage 3: Show expected petal count for rose curves
- Stage 4: Show symmetry axes the curve possesses

Instructional Rationale: Sweeping a parameter and watching the curve morph lets students discover the shape classifications rather than memorize them from a table. The category readout reinforces classification after observation.

Implementation: p5.js with responsive canvas.
</details>

## Part 2: Parametric Equations

### Parametric Equations

**Parametric equations** describe a curve by giving \( x \) and \( y \) separately as functions of a third variable called a **parameter**, usually written \( t \):

\[ x = f(t), \qquad y = g(t) \]

As \( t \) varies over some interval, the point \( (f(t), g(t)) \) traces a curve in the plane. The parameter often represents time, but it can be any quantity — angle, arc length, or an abstract index.

Parametric equations are more flexible than \( y = f(x) \) for three reasons:

- They can describe curves that are not functions of \( x \) (loops, vertical lines, figure-eights).
- They encode **direction of motion** as \( t \) increases — the same curve can be traced one way or the other.
- They naturally model moving objects, where \( t \) is time.

### Parameter

The **parameter** \( t \) is the variable that drives both coordinates. The domain of \( t \) — the interval over which we let it vary — determines which portion of the curve is traced.

Some common parametric representations:

| Equations | \( t \) range | Curve |
|---|---|---|
| \( x = \cos t, y = \sin t \) | \( [0, 2\pi] \) | Unit circle |
| \( x = t, y = t^2 \) | all reals | Parabola \( y = x^2 \) |
| \( x = 2\cos t, y = 3\sin t \) | \( [0, 2\pi] \) | Ellipse |
| \( x = t - \sin t, y = 1 - \cos t \) | all reals | Cycloid |

### Parametric Graphs

**Parametric graphs** are plotted by evaluating \( x(t) \) and \( y(t) \) at many values of \( t \), then plotting the resulting points in order. Graphing calculators and Desmos have a parametric mode; in Desmos you simply write `(f(t), g(t))`.

### Eliminating the Parameter

**Eliminating the parameter** rewrites a parametric pair as a single equation in \( x \) and \( y \). The strategy depends on the form:

- **Solve for \( t \)** in the simpler equation, then substitute into the other.
- **Use a trig identity** when the equations involve \( \cos t \) and \( \sin t \).
- **Use an algebraic identity** when the equations involve powers of \( t \).

**Example:** Eliminate the parameter from \( x = 2\cos t, \, y = 2\sin t \).

Square both: \( x^2 = 4\cos^2 t, \, y^2 = 4\sin^2 t \). Add: \( x^2 + y^2 = 4(\cos^2 t + \sin^2 t) = 4 \). That's a circle of radius 2.

Notice eliminating the parameter discards information about direction and speed of travel. The rectangular equation \( x^2 + y^2 = 4 \) represents the full circle but doesn't say whether the point moves clockwise or counterclockwise, or how fast.

### Parametric Motion

**Parametric motion** interprets \( t \) as time and \( (x(t), y(t)) \) as the position of a moving object at time \( t \). This interpretation makes parametric equations the natural language for describing motion in a plane.

### Position Functions

The **position functions** \( x(t) \) and \( y(t) \) together describe where an object is at each moment. We often write the pair as a **position vector** \( \vec{r}(t) = \langle x(t), y(t) \rangle \), but for now we will stick with the pair notation and save vector notation for the next chapter.

### Velocity from Parametrics

**Velocity from parametric equations** is the instantaneous rate of change in each coordinate. In Pre-Calculus we work with **average velocity** over an interval, defined the same way as average rate of change from Chapter 3:

\[ \bar{v}_x = \frac{x(t_2) - x(t_1)}{t_2 - t_1}, \qquad \bar{v}_y = \frac{y(t_2) - y(t_1)}{t_2 - t_1} \]

The actual velocity vector's magnitude (speed) is:

\[ |\bar{v}| = \sqrt{\bar{v}_x^2 + \bar{v}_y^2} \]

### Direction of Motion

The **direction of motion** tells us which way the object is heading at a given moment. On a parametric graph, the direction at time \( t \) is along the tangent vector \( \langle \bar{v}_x, \bar{v}_y \rangle \). We can show direction graphically by placing arrowheads on the curve pointing in the direction of increasing \( t \).

For example, in \( x = \cos t, y = \sin t \) on \( [0, 2\pi] \), as \( t \) increases from 0 to \( 2\pi \) the point travels **counterclockwise** around the unit circle. Reversing the parameter to \( x = \cos(-t), y = \sin(-t) = -\sin t \) reverses the direction: the same circle is traced clockwise.

### Parametric Modeling

**Parametric modeling** uses parametric equations to describe real-world motion. The general approach:

1. Identify the relevant quantities that change with time.
2. Write each coordinate as a function of \( t \), using known physics or geometry.
3. Specify the domain of \( t \) that covers the motion of interest.

### Projectile Motion Model

The classic parametric application is the **projectile motion model**. Suppose an object is launched from height \( h_0 \) with initial speed \( v_0 \) at an angle \( \alpha \) above the horizontal. Ignoring air resistance, the horizontal motion is constant-velocity and the vertical motion is constant-acceleration (from gravity \( g \approx 9.8 \) m/s² or 32 ft/s²).

The position at time \( t \) is:

\[ x(t) = v_0\cos(\alpha)\cdot t \]

\[ y(t) = h_0 + v_0\sin(\alpha)\cdot t - \frac{1}{2}g t^2 \]

From this model we can answer standard projectile questions:

- **Maximum height:** find the \( t \) where \( y \) is largest (peak of the vertical parabola).
- **Time of flight:** find \( t > 0 \) where \( y(t) = 0 \).
- **Range:** substitute the time of flight into \( x(t) \).
- **Trajectory shape:** eliminating \( t \) shows that \( y \) is a quadratic in \( x \) — a parabola.

#### Diagram: Projectile Motion Simulator

<iframe src="../../sims/projectile-motion/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Projectile Motion Simulator</summary>
Type: microsim
**sim-id:** projectile-motion<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, use): Use parametric equations to model projectile motion and predict maximum height, time of flight, and range from given launch conditions.

Canvas layout:
- Main view: side-on scene with ground line and the projectile's trajectory
- Control panel: sliders for launch conditions
- Data panel: computed metrics (max height, time, range)

Visual elements:
- Ground as a horizontal line
- Launcher at the origin with an adjustable angle indicator
- Trajectory traced in maroon as \( t \) increases
- Current position shown as a gold dot moving along the trajectory
- Velocity vector decomposition (horizontal and vertical components) drawn as arrows from the dot

Interactive controls:
- Slider: initial speed \( v_0 \), 0 to 50 m/s
- Slider: launch angle \( \alpha \), 0° to 90°
- Slider: initial height \( h_0 \), 0 to 10 m
- Button: Launch (animate \( t \) from 0 to impact)
- Button: Reset
- Toggle: show velocity vector decomposition

Data Visibility Requirements:
- Stage 1: Show launch parameters and the two parametric equations
- Stage 2: Show current \( t \), \( x(t) \), \( y(t) \) during animation
- Stage 3: Show computed max height, time of flight, and range after landing
- Stage 4: Show the eliminated-parameter form \( y = f(x) \) revealing the parabolic trajectory

Instructional Rationale: Separating the motion into two component equations — one for horizontal, one for vertical — makes the independence of the two motions explicit. The velocity vector decomposition reinforces why the horizontal component stays constant while the vertical component changes.

Implementation: p5.js with responsive canvas.
</details>

!!! mascot-thinking "Why Two Frameworks?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Polar coordinates are great when the problem has rotational symmetry around a single origin. Parametric equations are great when something is moving and we care about position over time. Neither replaces rectangular coordinates — but each makes a certain kind of problem feel natural where rectangular would be clunky.

!!! mascot-celebration "Two New Coordinate Lenses"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You can now describe the same curve three different ways: rectangular, polar, or parametric. Each description highlights different features — shape, rotational symmetry, or time evolution — and each has its moment to shine. That's a big addition to your mathematical toolkit.

## Key Takeaways

- Polar coordinates \( (r, \theta) \) locate a point by distance and angle from the origin. Every point has infinitely many polar representations.
- Conversion formulas: \( x = r\cos\theta \), \( y = r\sin\theta \); \( r = \sqrt{x^2 + y^2} \), \( \tan\theta = y/x \).
- Polar equations produce families of curves: circles, cardioids, limaçons, and rose curves. The ratio \( a/b \) classifies limaçons; odd \( n \) gives \( n \) petals and even \( n \) gives \( 2n \) petals for roses.
- Parametric equations describe a curve as a time-dependent pair \( (x(t), y(t)) \), encoding both shape and direction of motion.
- Eliminating the parameter rewrites a parametric pair as a single rectangular equation, at the cost of losing direction and speed information.
- The projectile motion model — \( x(t) = v_0\cos(\alpha)\cdot t \), \( y(t) = h_0 + v_0\sin(\alpha)\cdot t - \frac{1}{2}gt^2 \) — is the benchmark application of parametric equations in Pre-Calculus.
