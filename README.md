# Flash

A lightweight React + TypeScript library inspired by the classic Flash programming model.

This repository is intentionally being built in small steps rather than as a full port all at once. The current package is a minimal, buildable library foundation with a public `Flash` component, a simple stage wrapper, and a few example movie clips and GSAP-driven movie definitions.

## Current status

The library currently includes:

- a minimal `Flash` public component
- a `Stage` rendering surface
- a presentational `Pingpongball` MovieClip
- a minimal `Logo` MovieClip
- GSAP-backed movie definitions for `pingpong` and `logo`
- movie lookup via a lightweight registry
- a ref-based playback API (`play`, `pause`, `restart`)
- an optional `TraceMC` debug overlay
- strict TypeScript and a working build pipeline

This is not yet a full Flash runtime or a published npm package. It is a buildable foundation that reflects the incremental direction described in the project goals.

## Installation

From this repository:

```bash
pnpm install
pnpm build
```

The package is designed to be consumed as a library, not as an app.

## Public API

```tsx
import { Flash } from '@goldlabelapps/flash';

export default function App() {
  return (
    <Flash
      movie="pingpong"
      width={300}
      height={250}
      color="black"
      loop
    />
  );
}
```

Optional debug output:

```tsx
<Flash movie="logo" debug />
```

Playback controls can be accessed via `ref`:

```tsx
import { useRef } from 'react';
import { Flash, type FlashHandle } from '@goldlabelapps/flash';

export default function App() {
  const ref = useRef<FlashHandle>(null);

  return (
    <>
      <Flash ref={ref} movie="pingpong" width={300} height={250} color="black" />
      <button onClick={() => ref.current?.play()}>Play</button>
      <button onClick={() => ref.current?.pause()}>Pause</button>
      <button onClick={() => ref.current?.restart()}>Restart</button>
    </>
  );
}
```

## Core concepts

### Flash

The top-level public component. It accepts a `movie` name and renders the relevant movie on a stage.

### Stage

A simple render surface responsible for dimensions and presentation.

### MovieClip

A visual component rendered on the stage. These are intentionally presentational and do not contain timeline logic.

### Movie

A GSAP-driven definition. It owns animation timing and is selected via the movie registry.

### TraceMC

A lightweight debug overlay that can be enabled temporarily for troubleshooting and inspection.

## Project structure

```text
src/
├── Flash.tsx
├── Stage.tsx
├── TraceMC.tsx
├── movies.ts
├── movies/
│   ├── pingpong.ts
│   └── logo.ts
├── movieclips/
│   ├── Pingpongball.tsx
│   └── Logo.tsx
├── __tests__/
│   └── Flash.test.tsx
└── index.ts
```

## Development philosophy

- build incrementally
- keep the public API clean
- avoid premature abstractions
- only add runtime complexity when it is actually required
- prefer a simple registry over a giant `switch` statement
- keep Redux and other app-specific state out unless it becomes genuinely necessary

## Quality bar

The package is kept to strict TypeScript, a working build, and passing test coverage for the incremental features we add.

## Next direction

The next work is to continue porting small, useful Flash-style components and movie definitions while keeping the API stable and the package independent from any host application assumptions.

Avoid unnecessary classes.

Prefer simple functions/components where appropriate.

Keep MovieClips presentational.

Keep animation in Movies.

Keep runtime coordination in Stage.

Keep public APIs small.

Avoid leaking internal implementation details.

Do not couple the package to a particular framework beyond React.

Do not make speculative abstractions.

Do not solve problems we haven't encountered yet.

## How I want you to work

I will be directing the project interactively.

When I say something like:

"Let's do step 1"

only implement Step 1.

When I say:

"Next"

move to the next appropriate step.

Before making a significant architectural decision, explain the decision briefly and wait for my approval if it could materially affect the public API.

The public API is more important than preserving the existing internal implementation.

The ultimate goal is:

> A small, elegant, genuinely reusable React animation library that brings the conceptual model of Macromedia Flash — Stage, MovieClips and ActionScript-style movies — into modern JavaScript.

Start by inspecting the repository and implementing **Step 1 only**.
