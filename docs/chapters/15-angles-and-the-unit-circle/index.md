---
title: Angles and the Unit Circle
description: Angles in degrees and radians, arc length and sector area, standard position, reference and coterminal angles, the unit circle and its special-angle coordinates that define every trigonometric value.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 20:57:30
version: 0.07
---

# Angles and the Unit Circle

## Summary

This chapter transitions into trigonometry by establishing the foundational concepts of angles and the unit circle. Students learn about angle definitions in degrees and radians, degree-radian conversion, arc length, and sector area. The chapter covers angles in standard position, terminal sides, reference angles, and coterminal angles. Students then explore the unit circle, its coordinate system, special angles, quadrantal angles, and signs by quadrant — all essential for defining trigonometric functions in the next chapter.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Angle Definition
2. Degree Measure
3. Radian Measure
4. Degree-Radian Conversion
5. Arc Length
6. Sector Area
7. Standard Position
8. Terminal Side
9. Reference Angle
10. Coterminal Angles
11. Unit Circle Definition
12. Unit Circle Coordinates
13. Special Angles
14. Quadrantal Angles
15. Signs by Quadrant

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 13: Exponential Functions](../13-exponential-functions/index.md) (for Natural Base e used in Radian Measure)

---

!!! mascot-welcome "From Functions to Angles"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    Welcome to Unit 3. The toolkit changes here: instead of polynomials and exponentials, we will work with angles and rotation. The single most important picture in trigonometry is the **unit circle**, and this chapter builds it from scratch — angles, radians, special points, and the rules for moving around the four quadrants. Master these foundations and the rest of trig is bookkeeping.

## Angle Definition

An **angle** is the figure formed by two rays sharing a common endpoint. The shared endpoint is called the **vertex**, and the two rays are called the **sides** of the angle. One side is called the *initial side* and the other is the *terminal side*; the angle's measure describes the rotation that takes the initial side to the terminal side.

Two important conventions about rotation:

- A **positive** angle rotates counterclockwise (the standard math convention).
- A **negative** angle rotates clockwise.

So an angle of \( +90° \) is a quarter turn counterclockwise; an angle of \( -90° \) is a quarter turn clockwise. Both produce a right angle, but they reach it from opposite directions.

## Degree Measure

**Degree measure** is the familiar unit of angle: a full rotation is divided into 360 equal parts, and each part is one degree. The system is ancient (originating with Babylonian astronomers) and persists because 360 has many integer factors — it can be split into halves, thirds, fourths, fifths, sixths, eighths, and so on without remainders.

A few benchmark angles in degrees:

- A full rotation: \( 360° \).
- A half rotation (a straight line): \( 180° \).
- A quarter rotation (a right angle): \( 90° \).
- An eighth rotation: \( 45° \).
- A twelfth rotation: \( 30° \).

## Radian Measure

**Radian measure** is the natural mathematical unit of angle. One radian is defined as the angle subtended at the center of a circle by an arc whose length equals the circle's radius. Equivalently:

\[ 1 \text{ radian} = \text{the angle whose arc length equals the radius} \]

Because the full circumference of a circle of radius 1 is \( 2\pi \), there are exactly \( 2\pi \) radians in a full rotation:

\[ 2\pi \text{ radians} = 360° \quad \text{and} \quad \pi \text{ radians} = 180° \]

Why bother with radians? Because they are a *pure ratio* (arc length divided by radius, a unitless number), they make the calculus and physics formulas clean. The derivative of \( \sin x \) is \( \cos x \) only when \( x \) is measured in radians; in degrees, that derivative carries an extra constant factor. Throughout the rest of trigonometry, *radians are the default* unless degrees are explicitly requested.

A few benchmark angles in radians:

- A full rotation: \( 2\pi \).
- A half rotation: \( \pi \).
- A quarter rotation: \( \pi/2 \).
- An eighth rotation: \( \pi/4 \).
- A twelfth rotation: \( \pi/6 \).

## Degree-Radian Conversion

The **degree-radian conversion** rests on the single identity \( \pi \text{ rad} = 180° \). Two conversion factors fall out immediately:

\[ \text{degrees} \to \text{radians:} \quad \theta_{\text{rad}} = \theta_{\text{deg}} \cdot \frac{\pi}{180} \]

\[ \text{radians} \to \text{degrees:} \quad \theta_{\text{deg}} = \theta_{\text{rad}} \cdot \frac{180}{\pi} \]

A worked example: convert \( 60° \) to radians.

\[ 60° \cdot \frac{\pi}{180} = \frac{60\pi}{180} = \frac{\pi}{3} \approx 1.047 \text{ rad} \]

Another: convert \( 5\pi/4 \) radians to degrees.

\[ \frac{5\pi}{4} \cdot \frac{180}{\pi} = \frac{5 \cdot 180}{4} = 225° \]

The next table tabulates the conversions for the angles you will see most often. Memorizing this table makes every later trigonometry computation faster.

| Degrees | Radians | Notes |
|---------|---------|-------|
| 0°      | 0       | Initial position |
| 30°     | \( \pi/6 \) | Special angle |
| 45°     | \( \pi/4 \) | Special angle |
| 60°     | \( \pi/3 \) | Special angle |
| 90°     | \( \pi/2 \) | Quadrantal |
| 120°    | \( 2\pi/3 \) | |
| 135°    | \( 3\pi/4 \) | |
| 150°    | \( 5\pi/6 \) | |
| 180°    | \( \pi \)   | Quadrantal |
| 270°    | \( 3\pi/2 \) | Quadrantal |
| 360°    | \( 2\pi \)  | Full rotation |

!!! mascot-tip "Multiply by π/180 to Get Smaller, by 180/π to Get Bigger"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema holding up a tip">
    Degrees are bigger numbers than radians (90 vs. 1.57), so converting from degrees to radians shrinks the number — multiply by \( \pi/180 \). Going the other way grows the number — multiply by \( 180/\pi \). Whichever direction you choose, the units that survive should be the ones you want.

## Arc Length

**Arc length** is the distance traveled along a circular arc. For an arc that subtends an angle \( \theta \) (in radians) at the center of a circle of radius \( r \), the formula is:

\[ s = r\theta \]

This formula is the entire reason radians exist — it is breathtakingly simple compared to its degree-measure cousin. (In degrees, the arc length is \( s = (\pi/180) r \theta \), which carries an unwanted conversion factor.)

A worked example: find the arc length on a circle of radius 5 meters that subtends an angle of \( \pi/3 \) radians.

\[ s = 5 \cdot \frac{\pi}{3} = \frac{5\pi}{3} \approx 5.24 \text{ meters} \]

Another example: a wheel of radius 0.4 m turns through 2 full rotations. How far does a point on the rim travel?

Two rotations is \( 2 \cdot 2\pi = 4\pi \) radians, so:

\[ s = 0.4 \cdot 4\pi = 1.6\pi \approx 5.03 \text{ meters} \]

## Sector Area

A **sector** of a circle is the pie-slice region bounded by two radii and the arc between them. The sector's area is:

\[ A = \frac{1}{2} r^2 \theta \]

with \( \theta \) measured in radians. This formula is the rotational analog of the standard triangle area formula \( \frac{1}{2}bh \) — and again, it is much simpler in radians than in degrees.

A worked example: find the area of a sector of radius 6 cm with central angle \( \pi/4 \) radians.

\[ A = \frac{1}{2} \cdot 6^2 \cdot \frac{\pi}{4} = \frac{1}{2} \cdot 36 \cdot \frac{\pi}{4} = \frac{36\pi}{8} = \frac{9\pi}{2} \approx 14.14 \text{ cm}^2 \]

## Standard Position

An angle is in **standard position** when:

1. Its vertex is at the origin of the coordinate plane.
2. Its initial side lies along the positive \( x \)-axis.

This convention places every angle on a common reference frame, so we can speak unambiguously about *where* the terminal side ends up. Angles in standard position are the bridge from the geometric idea of an angle to the coordinate-based definitions of sine, cosine, and tangent in the next chapter.

## Terminal Side

The **terminal side** of an angle in standard position is the ray that results after the rotation specified by the angle has been applied to the initial side. Knowing the terminal side's direction is enough to evaluate every trigonometric function of the angle.

Some examples of terminal-side directions:

- For \( \theta = 0 \), the terminal side lies along the positive \( x \)-axis.
- For \( \theta = \pi/2 \) (90°), the terminal side lies along the positive \( y \)-axis.
- For \( \theta = \pi \) (180°), the terminal side lies along the negative \( x \)-axis.
- For \( \theta = 3\pi/2 \) (270°), the terminal side lies along the negative \( y \)-axis.

Once an angle exceeds \( 2\pi \), the terminal side has wrapped past its starting position and lands somewhere it has been before. That repetition is the source of the *coterminal* relationship below.

## Reference Angle

The **reference angle** of an angle \( \theta \) in standard position is the *positive acute angle* between the terminal side and the nearest part of the \( x \)-axis. Reference angles are always between 0 and \( \pi/2 \) (between 0° and 90°).

The trick of reference angles: every trigonometric value of \( \theta \) is, up to a sign, equal to the same trigonometric value of its reference angle. Knowing the few special-angle values (sine and cosine of 0, \( \pi/6 \), \( \pi/4 \), \( \pi/3 \), \( \pi/2 \)) plus the sign rules from the quadrant tells us the value at any related angle.

The next table shows how to compute the reference angle in each quadrant, where \( \theta \) is between 0 and \( 2\pi \) (or 0° and 360°).

| Quadrant containing the terminal side | Reference angle (radians) | Reference angle (degrees) |
|---------------------------------------|---------------------------|---------------------------|
| QI (0 to \( \pi/2 \))                 | \( \theta \)               | \( \theta \) |
| QII (\( \pi/2 \) to \( \pi \))         | \( \pi - \theta \)         | \( 180° - \theta \) |
| QIII (\( \pi \) to \( 3\pi/2 \))       | \( \theta - \pi \)         | \( \theta - 180° \) |
| QIV (\( 3\pi/2 \) to \( 2\pi \))       | \( 2\pi - \theta \)        | \( 360° - \theta \) |

A worked example: the reference angle of \( \theta = 5\pi/6 \) (in QII) is \( \pi - 5\pi/6 = \pi/6 \). The trig values at \( 5\pi/6 \) match those at \( \pi/6 \), with signs determined by QII.

## Coterminal Angles

Two angles are **coterminal** if they share the same terminal side. Because a full rotation returns the terminal side to its starting position, adding or subtracting any multiple of \( 2\pi \) (360°) produces a coterminal angle.

Formally, the coterminal angles of \( \theta \) are:

\[ \theta + 2\pi k \quad \text{for any integer } k \]

A worked example: angles coterminal with \( \pi/4 \) include \( \pi/4 + 2\pi = 9\pi/4 \), \( \pi/4 - 2\pi = -7\pi/4 \), \( \pi/4 + 4\pi = 17\pi/4 \), and so on.

Coterminal angles have *exactly the same* trigonometric values, because trig functions depend only on the terminal side. So when an angle is given as \( 13\pi/4 \), we can subtract \( 2\pi \) twice to reduce it to \( 13\pi/4 - 4\pi = -3\pi/4 \), or once to \( 5\pi/4 \), and work with whichever form is most convenient.

#### Diagram: Standard Position and Reference Angles Explorer

<details markdown="1">
<summary>Interactive coordinate plane showing an angle, its terminal side, and its reference angle</summary>
Type: MicroSim
**sim-id:** standard-position-reference-angles<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim with a draggable angle in standard position, displaying the terminal side, the reference angle, and the quadrant in real time.

Learning objective (Bloom's Applying): Students will apply the reference-angle rules to compute the acute angle to the \( x \)-axis for any given angle.

Visual elements:

- A coordinate plane with the four quadrants clearly labeled (QI, QII, QIII, QIV).
- The angle \( \theta \) drawn from the positive \( x \)-axis to the terminal side, shaded as a sector.
- The reference angle drawn from the terminal side to the nearest part of the \( x \)-axis, in a contrasting color.
- A status panel showing \( \theta \) in both degrees and radians, the quadrant, and the reference angle.

Interactive controls:

- A slider for \( \theta \) ranging from \( -2\pi \) to \( 4\pi \).
- A "Snap to Special Angles" button that jumps to the nearest multiple of \( \pi/6 \) or \( \pi/4 \).
- A "Show Coterminal" toggle that draws additional dashed terminal sides for \( \theta + 2\pi \) and \( \theta - 2\pi \).

Instructional rationale: Reference angles and coterminal angles are spatial concepts that students struggle to internalize from formulas alone. Watching the reference angle update live as the terminal side rotates anchors the idea visually.

Canvas: 800 × 800 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with createSlider for the angle, createButton for snap, createCheckbox for coterminal display.
</details>

## Unit Circle Definition

The **unit circle** is the circle of radius 1 centered at the origin of the coordinate plane:

\[ x^2 + y^2 = 1 \]

Its single most important feature for trigonometry is this: every point on the unit circle can be written as \( (\cos\theta, \sin\theta) \) for some angle \( \theta \) measured from the positive \( x \)-axis. The unit circle is the geometric definition of sine and cosine.

Because the radius is 1, all the conversion factors that would otherwise clutter trig formulas vanish. Arc length on the unit circle is exactly the angle in radians. Coordinates on the unit circle are exactly the cosine and sine of the angle. Choosing radius 1 is a deliberate piece of mathematical hygiene.

## Unit Circle Coordinates

The **unit circle coordinates** of a point at angle \( \theta \) are:

\[ (x, y) = (\cos\theta, \sin\theta) \]

This identity is the *definition* of sine and cosine for general angles. For an angle \( \theta \) in standard position, the terminal side intersects the unit circle at exactly one point, and that point's \( x \)-coordinate is \( \cos\theta \) while its \( y \)-coordinate is \( \sin\theta \).

An immediate consequence is the **Pythagorean identity** \( \cos^2 \theta + \sin^2 \theta = 1 \), which holds for every angle \( \theta \) because every point on the unit circle satisfies \( x^2 + y^2 = 1 \).

## Special Angles

The **special angles** are the angles whose sine and cosine values can be expressed exactly in closed form, without needing a calculator. The five special angles in the first quadrant are:

- \( 0 \) (or \( 0° \))
- \( \pi/6 \) (or \( 30° \))
- \( \pi/4 \) (or \( 45° \))
- \( \pi/3 \) (or \( 60° \))
- \( \pi/2 \) (or \( 90° \))

Their sine and cosine values come from the side ratios of the special right triangles (45-45-90 and 30-60-90) that you met in geometry. The next table lists the values you will use throughout trigonometry — committing them to memory is one of the highest-value investments in this entire course.

| \( \theta \) (rad) | \( \theta \) (deg) | \( \cos\theta \) | \( \sin\theta \) | Unit-circle point |
|----------|------|--------|--------|-------------------|
| 0 | 0° | 1 | 0 | \( (1, 0) \) |
| \( \pi/6 \) | 30° | \( \frac{\sqrt{3}}{2} \) | \( \frac{1}{2} \) | \( \left(\frac{\sqrt{3}}{2}, \frac{1}{2}\right) \) |
| \( \pi/4 \) | 45° | \( \frac{\sqrt{2}}{2} \) | \( \frac{\sqrt{2}}{2} \) | \( \left(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}\right) \) |
| \( \pi/3 \) | 60° | \( \frac{1}{2} \) | \( \frac{\sqrt{3}}{2} \) | \( \left(\frac{1}{2}, \frac{\sqrt{3}}{2}\right) \) |
| \( \pi/2 \) | 90° | 0 | 1 | \( (0, 1) \) |

The values for special angles in other quadrants are obtained by combining the first-quadrant values above with the sign rules introduced below.

## Quadrantal Angles

The **quadrantal angles** are the angles whose terminal sides lie *along* the coordinate axes rather than inside a quadrant. These are the angles \( 0, \pi/2, \pi, 3\pi/2 \) and any of their coterminal partners.

For quadrantal angles, one of the unit-circle coordinates is 0 and the other is \( \pm 1 \).

| Quadrantal angle | Terminal side | Unit-circle point | \( \cos\theta \) | \( \sin\theta \) |
|------------------|---------------|-------------------|---------|---------|
| 0                | +\( x \)-axis | \( (1, 0) \) | 1 | 0 |
| \( \pi/2 \)      | +\( y \)-axis | \( (0, 1) \) | 0 | 1 |
| \( \pi \)        | −\( x \)-axis | \( (-1, 0) \) | -1 | 0 |
| \( 3\pi/2 \)     | −\( y \)-axis | \( (0, -1) \) | 0 | -1 |

These four angles are the easiest values to evaluate exactly because the coordinates sit right on the axes — no triangles required.

## Signs by Quadrant

Once an angle's terminal side leaves the first quadrant, the unit-circle coordinates can be negative. The **signs by quadrant** rule simply asks: "is the \( x \)-coordinate positive or negative? Is the \( y \)-coordinate positive or negative?"

The mnemonic **"All Students Take Calculus"** (or ASTC) records which trig functions are positive in each quadrant, going counterclockwise from QI:

- **A**ll positive in QI (cosine, sine, tangent — and reciprocals — all positive).
- **S**ine positive in QII (cosine and tangent negative).
- **T**angent positive in QIII (sine and cosine both negative, but their ratio is positive).
- **C**osine positive in QIV (sine and tangent negative).

The next table summarizes the signs for sine, cosine, and tangent in all four quadrants.

| Quadrant | \( \cos\theta \) (= x) | \( \sin\theta \) (= y) | \( \tan\theta \) (= y/x) |
|----------|------------------------|------------------------|--------------------------|
| QI       | + | + | + |
| QII      | − | + | − |
| QIII     | − | − | + |
| QIV      | + | − | − |

#### Diagram: Unit Circle with Special Angles and Coordinates

<details markdown="1">
<summary>Interactive unit circle showing all special-angle coordinates and signs by quadrant</summary>
Type: MicroSim
**sim-id:** unit-circle-special-angles<br/>
**Library:** p5.js<br/>
**Status:** Specified

A p5.js MicroSim displaying the unit circle with all 16 standard special-angle points labeled, plus a draggable point that shows the current angle's exact coordinates and sign verdicts.

Learning objective (Bloom's Remembering): Students will recall the unit-circle coordinates of the special angles and the sign of each trigonometric function in each quadrant.

Visual elements:

- The unit circle drawn at the center of a coordinate plane spanning \(-1.5\) to \(1.5\) on both axes.
- 16 special-angle points marked with their coordinates in exact form (e.g., \( (\sqrt{3}/2, 1/2) \)).
- ASTC labels in each quadrant (All, Sine, Tangent, Cosine) listing which functions are positive.
- A draggable point on the circle showing the current angle in degrees and radians, plus its coordinates.

Interactive controls:

- Drag the point on the circle to move the terminal side.
- A "Snap to Special Angles" button.
- A "Show/Hide ASTC Labels" toggle.
- A "Quiz Me" mode that hides the coordinates and prompts the student to recall them.

Instructional rationale: The unit circle is the single most-used reference object in trigonometry. Repeated, interactive exposure with both the coordinates and the sign rules visible builds the recall fluency the rest of the unit assumes.

Canvas: 800 × 800 pixels, responsive via updateCanvasSize() in setup().

Implementation: p5.js with mouseDragged for the moving point, createButton for snap and quiz, createCheckbox for ASTC display.
</details>

!!! mascot-thinking "The Unit Circle Is Your Map"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    Every trigonometric value in this course can be read off a unit circle if you know two things: the special-angle coordinates in the first quadrant, and the sign rules for the other three quadrants. Combine those two skills and you can evaluate sine and cosine of any angle without a calculator.

## Putting It All Together

Trigonometry begins with rotation. Angles are how we measure rotation; radians are the unit that makes the formulas clean; the unit circle is the geometric object that turns angles into coordinates and coordinates into trig values.

Key ideas to carry forward:

- An **angle** is rotation; positive is counterclockwise, negative is clockwise.
- **Degrees** divide a full rotation into 360 parts; **radians** measure angle as arc-length-to-radius ratio, with \( 2\pi \) rad in a full rotation.
- The **conversion** \( \pi \text{ rad} = 180° \) generates both directions of conversion.
- **Arc length** \( s = r\theta \) and **sector area** \( A = \frac{1}{2}r^2\theta \) require \( \theta \) in radians.
- An angle in **standard position** has its vertex at the origin and initial side along the positive \( x \)-axis; its **terminal side** sets the trig values.
- The **reference angle** is the acute angle between the terminal side and the \( x \)-axis; **coterminal angles** differ by multiples of \( 2\pi \).
- The **unit circle** \( x^2 + y^2 = 1 \) defines \( (\cos\theta, \sin\theta) \) as the coordinates of the terminal side's intersection.
- The **special angles** \( 0, \pi/6, \pi/4, \pi/3, \pi/2 \) give exact trig values; the **quadrantal angles** give the simplest values; **ASTC** sets the signs in each quadrant.

!!! mascot-celebration "The Map Is Built"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    You can now navigate the unit circle: read off the coordinates of any special angle, find a reference angle, attach the right sign for the right quadrant, and switch between degrees and radians without missing a beat. Next chapter, we promote those coordinates to full-fledged trigonometric functions.

??? question "Quick Check: Convert 135° to radians."
    \( 135° \cdot \pi/180 = 135\pi/180 = 3\pi/4 \) radians.

??? question "Quick Check: A circle has radius 8 cm. What is the arc length subtended by an angle of \( \pi/6 \) radians?"
    \( s = r\theta = 8 \cdot \pi/6 = 4\pi/3 \approx 4.19 \) cm.

??? question "Quick Check: Find the reference angle for \( \theta = 7\pi/6 \)."
    \( 7\pi/6 \) is in QIII, so the reference angle is \( 7\pi/6 - \pi = \pi/6 \).

??? question "Quick Check: What are the unit-circle coordinates of \( \theta = 2\pi/3 \)?"
    Reference angle is \( \pi/3 \), with coordinates \( (1/2, \sqrt{3}/2) \). In QII, \( x \) is negative and \( y \) is positive, giving \( (-1/2, \sqrt{3}/2) \).
