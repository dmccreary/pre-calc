# AP Pre-Calculus Intelligent Textbook

## Learning Mascot: Prema

Prema is the pedagogical agent for this textbook. She is a humanoid robot
(chibi-anime meets sleek sci-fi) with a maroon-and-gold color palette and
glowing cyan-blue LED accents. See
[docs/img/mascot/character-reference.md](docs/img/mascot/character-reference.md)
for the canonical visual description.

### Voice and Writing Style

When generating mascot admonition text, write as Prema speaking **directly to
the student** in first person or inclusive "we" / "let's". Match this voice:

- **Positive, can-do, optimistic** — every obstacle is a puzzle we can
  decompose. No "this is hard," no "you might struggle." Instead: "let's
  break this down" or "you've got the tools for this."
- **Kind and encouraging** — warm, never condescending. Treat the student as
  a capable collaborator, not a novice who needs hand-holding.
- **Funny in a gentle way** — light wordplay and math-nerd enthusiasm is
  welcome; sarcasm and snark are not.
- **Catchphrase**: *"Decompose! Let's break this down together!"* — use
  sparingly (once per chapter at most), usually when introducing a tricky
  concept that benefits from being split into parts.
- **Inclusive "we"** — prefer "let's look at," "we can see," "notice how"
  over "you should" or "you must."
- **Concrete and specific** — reference the actual concept, equation, or
  figure on the page. Never write generic filler like "this is important!"

### Body Text Rules

- **1–3 sentences** per admonition. If it needs more, it belongs in the
  main body text, not an admonition.
- **Specific to the surrounding content** — Prema's lines should feel
  impossible to paste into a different chapter unchanged.
- **Active voice, present tense** — "notice the symmetry" beats "symmetry
  can be noticed."
- **Celebrate small wins** — finishing a derivation, spotting a pattern, or
  recognizing a function family all deserve a `mascot-celebration`.

### Pose Selection

Match the admonition variant to the moment:

| Variant | When Prema uses it |
|---|---|
| `mascot-welcome` | Opening a chapter or major section |
| `mascot-thinking` | Introducing a key concept or insight |
| `mascot-tip` | Short hint that unlocks a shortcut or mnemonic |
| `mascot-warning` | Common mistake or misconception to avoid |
| `mascot-encourage` | Tough topic — reassure and reframe |
| `mascot-celebration` | Milestone reached, derivation completed |
| `mascot-neutral` | General sidebar; use sparingly |

### Placement Rules

- **Maximum 6 mascot admonitions per chapter.** Restraint keeps Prema feeling
  special, not chatty.
- **One `mascot-welcome` and one `mascot-celebration` per chapter, max.**
- **Never place two mascot admonitions back-to-back** — separate them with
  real body content.
- **Image path depth**: for a page at `chapters/<chapter>/index.md`, use
  `src="../../img/mascot/<pose>.png"`. Count `../` from the rendered page URL.

### Examples

**Good** (`mascot-thinking` in a chapter on function composition):

> !!! mascot-thinking "The Chain Effect"
>     <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Prema thinking">
>     Notice how `f(g(x))` reads inside-out: `g` runs first, then `f` acts
>     on whatever `g` produced. Once you see that order, composition stops
>     feeling tangled.

**Bad** (generic, wrong voice):

> !!! mascot-thinking "Important!"
>     <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="mascot">
>     This concept is very important. You should study it carefully.
