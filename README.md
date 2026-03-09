# DogStudio_Clone
An interactive 3D React website built with `react-three-fiber`, `three.js`, `drei`, and `gsap`.

The page renders an animated dog model in WebGL, then updates visuals as users scroll and hover project titles.

## What This Project Does

- Renders a 3D dog model (`public/models/dog.drc.glb`) inside a fullscreen `<Canvas>`.
- Plays the model animation (`Take 001`) on load.
- Uses custom shader logic (`onBeforeCompile`) to blend between matcap textures.
- Changes dog material style when hovering project titles in Section 2.
- Uses `GSAP + ScrollTrigger` to animate the 3D model through scroll sections.
- Crossfades full-screen background images to match hovered titles.

## Why It Is Useful

- Good reference for combining `React + Three.js + GSAP` in one experience.
- Demonstrates practical `MeshMatcapMaterial` shader patching for transitions.
- Shows how to coordinate DOM interactions (hover/scroll) with 3D scene updates.
- Useful starter for creative portfolios, interactive landing pages, and web experiments.

## Tech Stack

- React 19
- Vite 7
- three.js
- @react-three/fiber
- @react-three/drei
- gsap + ScrollTrigger
- ESLint (flat config)

## Project Structure

```text
src/
	App.jsx                # Main page layout and sections
	App.css                # Visual styling and hover image logic
	components/
		Dog.jsx              # 3D model, materials, shader blend, GSAP timelines
public/
	models/dog.drc.glb
	matcap/*.png
	*.png, *.jpg, *.jpeg   # Background and texture assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage Example

The app mounts a fullscreen Three.js canvas and renders the dog scene:

```jsx
import { Canvas } from '@react-three/fiber'
import Dog from './components/Dog'

<Canvas id="canvas-elem">
	<Dog />
</Canvas>
```

In `Dog.jsx`, the material transition is animated by updating custom shader uniforms with GSAP.

## Notes

- `ScrollTrigger` markers are currently enabled in `src/components/Dog.jsx` for debugging:
	`markers: true`
- Set this to `false` before production deploy if you do not want debug markers visible.

## Where To Get Help

- Open an issue in this repository with:
	- Browser + OS
	- Steps to reproduce
	- Console errors/screenshots
- For framework docs:
	- Vite: https://vite.dev/guide/
	- React Three Fiber: https://r3f.docs.pmnd.rs/
	- Drei: https://github.com/pmndrs/drei
	- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

## Who Maintains and Contributes

- Maintained by the repository owner.
- Contributions are welcome via pull requests.

### Contributing Quick Start

```bash
git clone <your-fork-url>
cd react-dog-main
npm install
npm run dev
```

Create a feature branch, keep PRs focused, and include before/after visuals for UI changes.

