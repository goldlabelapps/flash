# Flash — Public npm Library

We are building `@goldlabelapps/flash`, a public, standalone React/TypeScript library inspired by the old Macromedia Flash programming model.

GitHub repository:

`goldlabelapps/flash`

npm package:

`@goldlabelapps/flash`

The goal is to turn the existing Flash work from the Goldlabel project into a legitimate, reusable npm package that can be installed into essentially any modern JavaScript/React application.

## Core concept

Flash provides a React-based animation runtime inspired by the old Flash model:

* **Stage** — the rendering surface
* **MovieClips** — reusable React components representing things on the stage
* **Movies** — TypeScript `.as` files containing animation/timeline logic
* **GSAP** — drives animation
* **Redux** — manages Flash runtime state where state is genuinely required
* **Toolbar** — optional playback/debug controls
* **TraceMC** — optional debugging information

The architecture should preserve the conceptual separation between rendering, animation and runtime state.

## Very important: work incrementally

DO NOT attempt to build the entire library in one pass.

We are going to build this project step by step.

At every stage:

1. Inspect the current repository.
2. Understand what already exists.
3. Make the smallest sensible change.
4. Keep the project buildable.
5. Run the relevant typecheck/build/test commands.
6. Explain briefly what was changed.
7. Stop and wait for the next instruction.

Do not invent future architecture prematurely.

Do not add features simply because they might eventually be useful.

Do not create unnecessary abstractions.

## First objective

The first objective is NOT to port the existing Flash implementation.

First create a clean, professional npm library foundation.

We need to prove that:

```bash
pnpm install
pnpm build
```

works in a completely empty repository.

Then we will progressively introduce the Flash architecture.

## Technology

Use:

* TypeScript
* React
* GSAP
* Redux Toolkit only where appropriate
* a modern lightweight TypeScript library bundler such as tsup
* pnpm
* ESLint where useful
* Vitest for tests when testing becomes relevant

Do not introduce Next.js.

Do not introduce CRA.

Do not introduce Vite as an application runtime.

This repository is a LIBRARY, not an application.

## Package requirements

The package must eventually support:

```tsx
import { Flash } from '@goldlabelapps/flash';

export default function App() {
  return (
    <Flash
      movie="intro"
      width={300}
      height={250}
      color="black"
      loop
    />
  );
}
```

The public API should hide implementation details wherever possible.

A consumer should not need to understand GSAP, Redux or the internal movie system just to play a Flash movie.

## Target public API

The primary API should eventually look approximately like:

```tsx
<Flash
  movie="intro"
  width={300}
  height={250}
  color="black"
  loop
/>
```

Potential lower-level exports may eventually include:

```tsx
import {
  Flash,
  Stage,
  useFlash,
  Pingpongball,
  TraceMC,
} from '@goldlabelapps/flash';
```

However, DO NOT implement these exports until they are actually needed.

The public API must be deliberately designed rather than accidentally exposing internal files.

## Architecture

The conceptual architecture is:

```text
Flash
  |
  └── Stage
        |
        ├── MovieClip
        ├── MovieClip
        └── MovieClip
              |
              └── Movie (.as)
                    |
                    └── GSAP timeline
```

### Flash

High-level public component.

Responsible for providing the convenient consumer-facing API.

### Stage

Rendering surface.

Responsible for:

* rendering movieclips
* selecting/initialising the requested movie
* connecting movieclips to animation code
* handling dimensions
* coordinating playback

The Stage is the glue between React rendering and the animation system.

### MovieClips

Pure React components.

They should render visual objects.

They should NOT contain animation timelines.

They should NOT own global state.

Example:

```tsx
function Pingpongball() {
  return (
    <circle
      ...
    />
  );
}
```

Animation belongs in the movie.

### Movies

Movies are TypeScript files using the `.as` extension to deliberately evoke ActionScript.

Example:

```ts
import { gsap } from 'gsap';

export default function intro({
  target,
  color,
  loop,
  onComplete,
}) {
  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    onComplete,
  });

  gsap.set(target, {
    scale: 0,
    rotation: -45,
    fill: color,
  });

  tl.to(target, {
    scale: 6,
    rotation: 45,
    duration: 0.5,
    ease: 'power3.out',
  });

  return tl;
}
```

Movies should contain animation/timeline logic.

Movies should not directly depend on Redux.

If runtime state needs to change, the Stage/runtime layer should provide the appropriate callback or dispatcher.

### Redux

Redux is an implementation detail of the Flash runtime.

Use it only where it provides genuine value.

Do not make consumers configure Redux just to use `<Flash />`.

The conceptual state may eventually include:

```ts
{
  cartridge: 'flash',
  movie: 'intro',
  loop: false
}
```

A simple generic action such as:

```ts
setFlashKey(key, value)
```

may be useful internally.

Do not over-engineer Redux.

## Important portability requirement

This package must NOT assume anything about the host application.

It must work independently of:

* Goldlabel
* Next.js
* Firebase
* Auth0
* application-specific Redux
* application routing
* application environment variables
* Goldlabel filesystem conventions

The package must own everything it needs.

The only assumptions should be the package's documented peer/runtime requirements.

## Dependency philosophy

Keep dependencies minimal.

React should be treated appropriately for a library, normally as a peer dependency.

GSAP should be handled deliberately rather than forcing consumers to understand its internals.

Redux should only become a dependency if the runtime actually requires it.

Do not add dependencies merely for convenience.

## Build requirements

The package should produce proper distributable JavaScript and TypeScript declarations.

The package should support modern consumers such as:

* Vite + React
* Next.js + React
* other React applications
* standard JavaScript/TypeScript bundlers

The package should expose clean entry points through `package.json`.

The package must not expose the source directory as its primary API.

## Repository philosophy

This repository should eventually contain something approximately like:

```text
flash/
├── src/
│   ├── Flash.tsx
│   ├── components/
│   │   ├── Stage.tsx
│   │   └── Toolbar.tsx
│   ├── movieclips/
│   ├── actionscript/
│   ├── actions/
│   ├── hooks/
│   ├── initialState.ts
│   └── index.ts
│
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── README.md
├── LICENSE
└── ...
```

Do not create all of this immediately.

Introduce directories and concepts only when they become necessary.

## Existing Flash implementation

There is an existing Flash implementation in another Goldlabel project.

It contains concepts including:

* Stage
* Toolbar
* TraceMC
* Pingpongball
* MacromediaMC
* Logo
* ActionScript-style `.as` movie classes/functions
* GSAP timelines
* Redux/Uberedux state
* movie selection
* playback controls
* looping
* animation completion callbacks

We will port these across gradually.

IMPORTANT:

Do not copy the old implementation wholesale.

The existing implementation was developed inside an application and contains assumptions that may not belong in a public library.

Treat it as a source of ideas and working implementations, not as the final architecture.

We will decide what belongs in the public library as we migrate each piece.

## Development order

Unless I explicitly tell you otherwise, follow roughly this sequence:

### Step 1 — Package foundation

Create:

* package.json
* TypeScript configuration
* bundler configuration
* source directory
* basic entry point
* basic build command
* basic typecheck command
* appropriate `.gitignore`
* README skeleton

At this point the package should build successfully.

### Step 2 — Minimal Flash component

Create the smallest possible `<Flash />` component.

It should render something simple.

Do not implement movies yet.

Prove that another React application could import the package.

### Step 3 — Stage

Introduce Stage as the rendering surface.

Keep it deliberately simple.

### Step 4 — First MovieClip

Port one very simple MovieClip.

The Pingpongball is a good candidate.

Keep it purely presentational.

### Step 5 — First `.as` movie

Port a simple animation.

Use GSAP.

Prove that:

```tsx
<Flash movie="pingpong" />
```

can actually run a movie.

### Step 6 — Movie registration/selection

Create a clean mechanism for selecting movies without a giant, unmaintainable switch statement if there is a better solution.

Do not over-engineer this prematurely.

### Step 7 — Playback

Add:

* play
* pause
* restart
* loop

Only where the API actually requires them.

### Step 8 — Runtime state

Introduce internal Redux/Uberedux only when necessary.

Consumers should not have to understand it.

### Step 9 — Debugging

Introduce TraceMC.

It should remain optional.

### Step 10 — More existing Flash functionality

Gradually port:

* Logo
* MacromediaMC
* Timemachine
* other useful movies/movieclips

Each should be evaluated and cleaned up rather than copied blindly.

### Step 11 — Real-world integration test

Create a completely separate example/test application.

Install the package as if it came from npm.

For example:

```bash
pnpm add @goldlabelapps/flash
```

Then verify:

```tsx
import { Flash } from '@goldlabelapps/flash';
```

works without any knowledge of this repository's internals.

### Step 12 — npm release

Only after the package works independently:

* finalise package metadata
* README
* licence
* versioning
* npm configuration
* build artefacts
* publish configuration
* `0.1.0` release

## Quality rules

Use strict TypeScript.

Avoid `any`.

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
