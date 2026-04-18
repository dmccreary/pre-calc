---
title: Vectors
description: Vectors as quantities with magnitude and direction — including notation, component form, unit vectors, vector addition and subtraction, scalar multiplication, the dot product, and real-world vector applications.
generated_by: claude skill chapter-content-generator
date: 2026-04-17 22:00:00
version: 0.07
---

# Vectors

## Summary

This chapter introduces vectors as quantities with both magnitude and direction. Students learn vector definition, notation, and how to find the magnitude and direction of a vector. The chapter covers component form, unit vectors, and vector operations including addition, subtraction, and scalar multiplication. Students also learn about the dot product and explore real-world vector applications. These concepts provide the foundation for understanding matrices and linear transformations in the next chapter.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Vector Definition
2. Vector Notation
3. Magnitude of a Vector
4. Direction of a Vector
5. Component Form
6. Unit Vectors
7. Vector Addition
8. Vector Subtraction
9. Scalar Multiplication
10. Dot Product
11. Vector Applications

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Mathematical Foundations](../01-mathematical-foundations/index.md)
- [Chapter 15: Angles and the Unit Circle](../15-angles-and-the-unit-circle/index.md)

---

!!! mascot-welcome "Arrows That Do Math"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Prema waving">
    A vector is an arrow — a quantity with both a size and a direction. Velocity, force, and displacement are all vectors. In this chapter we learn how to describe them, combine them, and use them to model the physical world.

## Vector Definition

A **vector** is a mathematical object that has both a **magnitude** (how big) and a **direction** (which way). We visualize a vector as an arrow: the length of the arrow represents magnitude, and the way the arrow points represents direction.

Vectors are different from regular numbers, which are called **scalars** in this context. A scalar has magnitude but no direction — a temperature, a mass, a count of apples. Here are examples to distinguish the two:

| Quantity | Vector or Scalar? | Why |
|---|---|---|
| Mass of a box (5 kg) | Scalar | Only magnitude |
| Temperature (72°F) | Scalar | Only magnitude |
| Speed (60 mph) | Scalar | Magnitude without direction |
| Velocity (60 mph, north) | Vector | Magnitude **and** direction |
| Displacement (3 m east) | Vector | Magnitude and direction |
| Force (10 N, pushing down) | Vector | Magnitude and direction |

A key property: two vectors with the same magnitude and same direction are **equal**, regardless of where they are drawn on the page. Vectors do not have a fixed position — they can be translated anywhere.

## Vector Notation

**Vector notation** has several common forms, and you'll encounter all of them:

- **Bold letters:** \( \mathbf{v} \) (in print) — this textbook's primary notation.
- **Arrow notation:** \( \vec{v} \) (handwritten) — the standard way to write vectors by hand.
- **Endpoint notation:** \( \overrightarrow{AB} \) — the vector from point \( A \) to point \( B \).
- **Angle bracket notation:** \( \langle 3, 4 \rangle \) — a vector given by its components.

The magnitude of a vector \( \mathbf{v} \) is denoted \( \|\mathbf{v}\| \) or \( |\mathbf{v}| \), with the double bars being more formally correct.

## Magnitude of a Vector

The **magnitude** of a vector is its length — a non-negative number representing the size of the quantity, ignoring direction. For a vector given in component form \( \mathbf{v} = \langle a, b \rangle \), the magnitude follows from the Pythagorean theorem:

\[ \|\mathbf{v}\| = \sqrt{a^2 + b^2} \]

For example, \( \|\langle 3, 4 \rangle\| = \sqrt{9 + 16} = \sqrt{25} = 5 \).

The magnitude is always non-negative. A vector with magnitude zero is called the **zero vector**, written \( \mathbf{0} \) — it has no direction and is the vector analogue of the number zero.

## Direction of a Vector

The **direction of a vector** is the angle it makes with a reference axis — usually the positive \( x \)-axis, measured counterclockwise. For a vector \( \mathbf{v} = \langle a, b \rangle \):

\[ \theta = \arctan\left(\frac{b}{a}\right) \]

As with the polar conversions in Chapter 21, we must adjust the quadrant:

- If \( (a, b) \) is in Quadrant I or IV, \( \theta = \arctan(b/a) \).
- If \( (a, b) \) is in Quadrant II or III, \( \theta = \arctan(b/a) + \pi \).

Together, magnitude and direction uniquely specify a vector. Given \( \|\mathbf{v}\| = r \) and direction angle \( \theta \), the components are:

\[ a = r\cos\theta, \qquad b = r\sin\theta \]

These are the same formulas as polar-to-rectangular conversion — and that is no coincidence. A vector in the plane is exactly the polar representation of a point, interpreted as a displacement rather than a location.

## Component Form

The **component form** of a vector writes it as an ordered pair of numbers enclosed in angle brackets: \( \mathbf{v} = \langle a, b \rangle \). The first number is the **horizontal component** (how far in the \( x \)-direction) and the second is the **vertical component** (how far in the \( y \)-direction).

**Finding component form from two points:** If a vector goes from point \( P_1 = (x_1, y_1) \) to point \( P_2 = (x_2, y_2) \), its component form is:

\[ \overrightarrow{P_1 P_2} = \langle x_2 - x_1, y_2 - y_1 \rangle \]

This is the displacement vector: how far right and how far up you travel to get from the tail to the head.

**Example:** A vector from \( (2, 1) \) to \( (5, 7) \) has component form \( \langle 5 - 2, 7 - 1 \rangle = \langle 3, 6 \rangle \).

!!! mascot-tip "Angle Brackets, Not Parentheses"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Prema offering a tip">
    Write vector components in angle brackets \( \langle a, b \rangle \), not parentheses \( (a, b) \). Parentheses indicate a point (a specific location). Angle brackets indicate a vector (a displacement you can apply anywhere). The distinction matters especially when a single page has both.

## Unit Vectors

A **unit vector** is any vector with magnitude exactly 1. Unit vectors are useful for representing pure direction without any magnitude information. Given any non-zero vector \( \mathbf{v} \), we can produce a unit vector in the same direction by dividing by its magnitude:

\[ \hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|} \]

The "hat" symbol \( \hat{\phantom{v}} \) conventionally denotes a unit vector. For example, for \( \mathbf{v} = \langle 3, 4 \rangle \) with magnitude 5:

\[ \hat{\mathbf{v}} = \frac{1}{5}\langle 3, 4 \rangle = \langle 0.6, 0.8 \rangle \]

Two special unit vectors deserve names of their own:

- \( \mathbf{i} = \langle 1, 0 \rangle \) points along the positive \( x \)-axis.
- \( \mathbf{j} = \langle 0, 1 \rangle \) points along the positive \( y \)-axis.

Any vector can be written as a combination of \( \mathbf{i} \) and \( \mathbf{j} \):

\[ \langle a, b \rangle = a\mathbf{i} + b\mathbf{j} \]

This is called the **standard unit vector form**. Both notations — angle brackets and \( \mathbf{i}, \mathbf{j} \) — are equivalent and you should recognize both.

## Vector Addition

**Vector addition** combines two vectors into a third. Geometrically, we place the tail of the second vector at the head of the first; the sum is the vector from the starting tail to the final head. This is called the **tip-to-tail** rule.

Algebraically, add component-by-component:

\[ \langle a_1, b_1 \rangle + \langle a_2, b_2 \rangle = \langle a_1 + a_2, b_1 + b_2 \rangle \]

For example, \( \langle 3, 2 \rangle + \langle -1, 4 \rangle = \langle 2, 6 \rangle \).

Vector addition has two equivalent geometric interpretations:

- **Tip-to-tail:** Place the second vector starting at the tip of the first. The sum is tail-of-first to tip-of-second.
- **Parallelogram rule:** Draw both vectors from a common starting point. Complete the parallelogram. The sum is the diagonal from the shared tail to the opposite corner.

These descriptions produce identical results — the parallelogram rule just draws both tip-to-tail arrangements at once.

## Vector Subtraction

**Vector subtraction** is defined as adding the negative: \( \mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v}) \). The negative vector \( -\mathbf{v} \) has the same magnitude as \( \mathbf{v} \) but points in the opposite direction. In components:

\[ \langle a_1, b_1 \rangle - \langle a_2, b_2 \rangle = \langle a_1 - a_2, b_1 - b_2 \rangle \]

Geometrically, \( \mathbf{u} - \mathbf{v} \) is the vector that goes from the tip of \( \mathbf{v} \) to the tip of \( \mathbf{u} \) when both are drawn from the same starting point. This matches our earlier "two points" formula: the vector from \( P_1 \) to \( P_2 \) is the position vector of \( P_2 \) minus the position vector of \( P_1 \).

## Scalar Multiplication

**Scalar multiplication** multiplies a vector by a number. If \( c \) is a scalar and \( \mathbf{v} = \langle a, b \rangle \) is a vector, then:

\[ c\mathbf{v} = \langle ca, cb \rangle \]

The effect on the vector depends on the sign and size of \( c \):

| Value of \( c \) | Effect on \( \mathbf{v} \) |
|---|---|
| \( c > 1 \) | Same direction, stretched |
| \( 0 < c < 1 \) | Same direction, shrunk |
| \( c = 0 \) | Zero vector |
| \( -1 < c < 0 \) | Reversed direction, shrunk |
| \( c < -1 \) | Reversed direction, stretched |

The magnitude scales proportionally: \( \|c\mathbf{v}\| = |c| \cdot \|\mathbf{v}\| \). The direction either stays the same (positive \( c \)) or flips by 180° (negative \( c \)).

#### Diagram: Vector Operations Playground

<iframe src="../../sims/vector-operations/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Vector Operations Playground</summary>
Type: microsim
**sim-id:** vector-operations<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Apply, L3, demonstrate): Demonstrate the geometric meaning of vector addition, subtraction, and scalar multiplication through hands-on manipulation of component vectors.

Canvas layout:
- Main area: coordinate plane with two draggable vectors
- Right panel: results panel showing the sum, difference, and scalar multiples

Visual elements:
- Vector \( \mathbf{u} \) drawn in blue from origin, with draggable tip
- Vector \( \mathbf{v} \) drawn in orange from origin, with draggable tip
- Sum \( \mathbf{u} + \mathbf{v} \) drawn in maroon using tip-to-tail construction, dashed parallelogram shown
- Difference \( \mathbf{u} - \mathbf{v} \) drawn in green
- Scalar multiple \( c\mathbf{v} \) shown in orange (light) with \( c \) controllable

Interactive controls:
- Drag endpoints of both vectors
- Slider for scalar \( c \), range -3 to 3 step 0.1
- Toggle: tip-to-tail mode vs. parallelogram mode for displaying the sum
- Button: Reset vectors to standard positions

Data Visibility Requirements:
- Stage 1: Display component form of \( \mathbf{u} \) and \( \mathbf{v} \)
- Stage 2: Display computed \( \mathbf{u} + \mathbf{v} \), \( \mathbf{u} - \mathbf{v} \), \( c\mathbf{v} \) in component form
- Stage 3: Display magnitudes of all vectors
- Stage 4: Display direction angle of each vector

Instructional Rationale: Dragging the vector tips produces continuous updates to the computed sum and difference, making the algebraic component-wise rule visibly the same as the geometric tip-to-tail construction. This dual presentation anchors both representations.

Implementation: p5.js with responsive canvas.
</details>

## Dot Product

The **dot product** of two vectors is a scalar (not a vector) computed by multiplying corresponding components and adding:

\[ \mathbf{u} \cdot \mathbf{v} = \langle a_1, b_1 \rangle \cdot \langle a_2, b_2 \rangle = a_1 a_2 + b_1 b_2 \]

For example, \( \langle 3, 4 \rangle \cdot \langle 2, 1 \rangle = 6 + 4 = 10 \).

The dot product has a beautiful geometric interpretation in terms of magnitudes and the angle between the vectors:

\[ \mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta \]

where \( \theta \) is the angle between the two vectors when drawn from a common starting point. This second formula tells us three useful things:

- If \( \mathbf{u} \cdot \mathbf{v} > 0 \), the angle between them is less than 90° (acute).
- If \( \mathbf{u} \cdot \mathbf{v} = 0 \), the vectors are perpendicular (orthogonal).
- If \( \mathbf{u} \cdot \mathbf{v} < 0 \), the angle is more than 90° (obtuse).

**Finding the angle between two vectors.** Rearranging the geometric formula:

\[ \cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}, \qquad \theta = \arccos\left(\frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}\right) \]

**Example:** Find the angle between \( \mathbf{u} = \langle 1, 2 \rangle \) and \( \mathbf{v} = \langle 3, 1 \rangle \).

- Dot product: \( 1\cdot 3 + 2\cdot 1 = 5 \).
- Magnitudes: \( \|\mathbf{u}\| = \sqrt{5} \), \( \|\mathbf{v}\| = \sqrt{10} \).
- Cosine: \( \cos\theta = 5/(\sqrt{5}\sqrt{10}) = 5/\sqrt{50} = 1/\sqrt{2} \).
- Angle: \( \theta = \pi/4 = 45° \).

!!! mascot-thinking "Two Formulas, One Concept"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
    The dot product has an algebraic formula (components) and a geometric formula (magnitudes and angle). They give the same number. That's why the dot product is the tool for finding the angle between vectors — it connects the component-wise computation to the geometric picture.

## Vector Applications

**Vector applications** appear throughout physics, engineering, computer graphics, and navigation. Here are three classic examples from AP Pre-Calculus.

### Force Problems

When two or more forces act on an object, the **net force** is the vector sum of the individual forces. The object accelerates in the direction of the net force.

**Example:** Two ropes pull on a crate. Rope A pulls with 50 N at 30° above horizontal; rope B pulls with 40 N at 120° above horizontal. What is the net force?

- Rope A components: \( \langle 50\cos 30°, 50\sin 30°\rangle \approx \langle 43.3, 25 \rangle \).
- Rope B components: \( \langle 40\cos 120°, 40\sin 120°\rangle \approx \langle -20, 34.6 \rangle \).
- Net force: \( \langle 23.3, 59.6 \rangle \).
- Magnitude: \( \sqrt{23.3^2 + 59.6^2} \approx 64 \) N.
- Direction: \( \arctan(59.6/23.3) \approx 68.6° \) above horizontal.

### Navigation and Velocity

A plane's **ground velocity** is the vector sum of its **airspeed** (velocity relative to the air) and the **wind velocity**. This is essential for pilots calculating heading and flight time.

**Example:** A plane flies due north at 300 mph airspeed. A 50 mph wind blows from the west (toward the east). The plane's ground velocity is:

- Airspeed vector: \( \langle 0, 300 \rangle \) (north = positive \( y \))
- Wind vector: \( \langle 50, 0 \rangle \) (east = positive \( x \))
- Ground velocity: \( \langle 50, 300 \rangle \)
- Ground speed: \( \sqrt{50^2 + 300^2} \approx 304 \) mph
- Direction: \( \arctan(300/50) \approx 80.5° \) — the plane's actual path is deflected 9.5° east of north.

### Work Done by a Force

In physics, **work** done by a force \( \mathbf{F} \) over a displacement \( \mathbf{d} \) is the dot product:

\[ W = \mathbf{F} \cdot \mathbf{d} \]

This reveals why only the component of the force along the direction of motion contributes to work. A force perpendicular to the motion does zero work, which matches our dot product observation that perpendicular vectors have zero dot product.

#### Diagram: Force and Displacement Workout

<iframe src="../../sims/force-displacement-work/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Force and Displacement Workout</summary>
Type: microsim
**sim-id:** force-displacement-work<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective (Understand, L2, explain): Explain how the dot product \( W = \mathbf{F} \cdot \mathbf{d} \) picks out only the component of force along the displacement, and why a perpendicular force does zero work.

Canvas layout:
- Main area: a block on a flat surface with an arrow showing the applied force and a dashed arrow showing the displacement direction
- Right panel: numeric breakdown of the dot product computation

Visual elements:
- Block as a gray square
- Displacement vector \( \mathbf{d} \) in blue, horizontal
- Force vector \( \mathbf{F} \) in maroon at an adjustable angle
- Projection of \( \mathbf{F} \) onto \( \mathbf{d} \) shown as a dashed gold segment
- Numerical work value updated in real time

Interactive controls:
- Slider: angle of force relative to displacement (0° to 180°)
- Slider: force magnitude (0 to 100 N)
- Slider: displacement magnitude (0 to 20 m)
- Button: Compute Work (animated step-through of the formula)

Data Visibility Requirements:
- Stage 1: Show force and displacement in both component form and magnitude/direction form
- Stage 2: Show the dot product formula with numbers substituted
- Stage 3: Show the computed work in joules
- Stage 4: When force is perpendicular, highlight that work equals zero

Instructional Rationale: Adjusting the angle to 90° and watching work drop to zero provides a memorable demonstration of the perpendicular case, reinforcing that the dot product measures alignment.

Implementation: p5.js with responsive canvas.
</details>

!!! mascot-celebration "Vectors in Your Toolkit"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Prema celebrating">
    Every quantity in physics, engineering, or computer graphics that has both size and direction is a vector — and you can now add them, subtract them, scale them, and measure the angle between them. In the next chapter we package vector operations into matrices and use them to transform the whole plane.

## Key Takeaways

- A vector has magnitude and direction; a scalar has only magnitude.
- Component form: \( \mathbf{v} = \langle a, b \rangle \), with magnitude \( \|\mathbf{v}\| = \sqrt{a^2 + b^2} \) and direction \( \theta = \arctan(b/a) \) (adjusted for quadrant).
- A unit vector has magnitude 1; divide any non-zero vector by its magnitude to get one. The standard unit vectors are \( \mathbf{i} \) and \( \mathbf{j} \).
- Add and subtract vectors component-wise. Geometrically, add tip-to-tail or with the parallelogram rule.
- Scalar multiplication scales magnitude by \( |c| \) and reverses direction if \( c < 0 \).
- The dot product \( \mathbf{u} \cdot \mathbf{v} = a_1 a_2 + b_1 b_2 = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta \) is a scalar, not a vector. A zero dot product means the vectors are perpendicular.
- Vector applications model forces, velocities, displacements, and work — any situation where both size and direction matter.
