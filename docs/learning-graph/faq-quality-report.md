# FAQ Quality Report

Generated: 2026-07-10

## Overall Statistics

- **Total Questions:** 89
- **Overall Quality Score:** 88/100
- **Content Completeness Score:** 100/100
- **Concept Coverage:** 73.3% (225/307 concepts)

Content completeness inputs: course description (quality score 96), valid
learning-graph DAG with 307 concepts, glossary with 307 terms, and
approximately 79,000 words of chapter content across all 23 chapters.

## Category Breakdown

| Category | Questions | Dominant Bloom's Levels |
|----------|-----------|------------------------|
| Getting Started | 10 | Remember / Understand |
| Core Concepts | 30 | Understand, with Apply |
| Technical Details | 19 | Remember / Understand / Apply |
| Common Challenges | 11 | Understand / Apply / Analyze |
| Best Practices | 11 | Apply / Evaluate / Create |
| Advanced Topics | 8 | Analyze / Evaluate / Create |

## Bloom's Taxonomy Distribution

Actual vs target:

| Level | Actual | Target | Deviation |
|-------|--------|--------|-----------|
| Remember | 25.8% | 20% | +5.8% |
| Understand | 33.7% | 30% | +3.7% |
| Apply | 20.2% | 25% | −4.8% |
| Analyze | 11.2% | 15% | −3.8% |
| Evaluate | 5.6% | 7% | −1.4% |
| Create | 3.4% | 3% | +0.4% |

Total absolute deviation: 19.8% (every level within the ±15% acceptance
band; total deviation in the 11–20% scoring band).

Bloom's Distribution Score: **20/25**

## Answer Quality Analysis

- **Examples:** 43/89 (48%) — Target: 40%+ ✓
- **Links to source content:** 87/89 (98%) — Target: 60%+ ✓
- **Average answer length:** 95 words (range 70–112) — slightly under the
  100–300 word target average, within acceptable range
- **Complete standalone answers:** 89/89 (100%) ✓
- **Anchor links:** 0 (hard requirement) ✓
- **Broken links:** 0 ✓

The two unlinked answers are Getting Started questions ("What are MicroSims
and how do I use them?" and "How much time should I plan to spend?") whose
content is site-wide rather than chapter-specific.

Answer Quality Score: **23/25**

## Concept Coverage

225 of the 307 learning-graph concepts are addressed by at least one FAQ
question. Coverage is strongest for the function families, transformations,
exponential/logarithmic material, the unit circle, and modeling workflow —
the highest-centrality regions of the learning graph.

Uncovered concepts: 82, of which only **1 is high-centrality** (Angle
Definition, in-degree 5, addressed indirectly by the radian and unit-circle
questions), 12 are medium-centrality, and 69 are low-centrality leaf
concepts (individual identity formulas, specific graph variants, and
polynomial arithmetic mechanics). See
[FAQ Coverage Gaps](faq-coverage-gaps.md) for the full prioritized list.

Coverage Score: **25/30**

## Organization Quality

- Logical categorization (6 standard categories): ✓
- Progressive difficulty (Getting Started → Advanced Topics): ✓
- No duplicate or near-duplicate questions: ✓ (validated programmatically)
- Clear, searchable question phrasing using glossary terminology: ✓

Organization Score: **20/20**

## Overall Quality Score: 88/100

| Component | Score |
|-----------|-------|
| Coverage | 25/30 |
| Bloom's Distribution | 20/25 |
| Answer Quality | 23/25 |
| Organization | 20/20 |
| **Total** | **88/100** |

## Validation Results

- Zero duplicate questions ✓
- Zero anchor-fragment links ✓
- All 87 internal links resolve to existing files ✓
- All 305 concept tags match learning-graph labels exactly ✓
- `faq-chatbot-training.json` parses as valid JSON with all required fields ✓

## Recommendations

### High Priority

1. Add a question covering **Angle Definition** directly (e.g. "What is an
   angle in standard position?") — the only high-centrality gap.

### Medium Priority

1. Add questions for medium-centrality gaps: Factoring Polynomials,
   Exponential Equations, Trig Function Evaluation, Tangent Graph, and
   Periodic Data Analysis.
2. Slightly rebalance Bloom's levels in future additions: favor Apply and
   Analyze questions over Remember.

### Low Priority

1. Lengthen a handful of the shortest answers (70–90 words) toward the
   100-word floor.
2. Consider covering identity-formula leaf concepts (sum/difference, double
   angle, cofunction) with one consolidated "which identity do I use when?"
   question.

## Suggested Additional Questions

1. "What is an angle in standard position?" (Core Concepts)
2. "How do I factor a polynomial?" (Technical Details)
3. "How do I solve an exponential equation?" (Technical Details)
4. "What does the graph of the tangent function look like?" (Core Concepts)
5. "Which trigonometric identity should I use when?" (Best Practices)
6. "How do I evaluate trig functions without a calculator?" (Common Challenges)
7. "What is a piecewise function?" (Technical Details)
8. "How do I find an inverse function algebraically?" (Technical Details)
9. "What is the difference between interpolation and extrapolation?" (Technical Details)
10. "What are the dot product and its applications?" (Advanced Topics)
