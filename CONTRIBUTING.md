# Contributing to DevMap

## File locations

Roadmaps live in `src/data/roadmaps/`. Each file exports a named object with two arrays:
`nodes` and `edges`. Add the export to `src/data/roadmaps/index.js`.

Language metadata lives in `src/data/languages.js`.
CS Core metadata lives in `src/data/csCore.js`.

## Node shape

```js
{
  id: "1",           // unique string within the roadmap
  data: {
    label: "...",    // display name shown on the canvas
    description: "", // shown in the NodeCard drawer (markdown)
    resources: [],   // array of { title, url, type }
  },
  position: { x: 0, y: 0 },
  type: "roadmapNode",
}
```

## Running locally

```bash
npm install
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # production build
npm run lint     # ESLint (must pass with 0 errors)
```

## PR checklist

- [ ] `npm run build` exits 0 with no new errors
- [ ] `npm run lint` exits 0 with 0 errors
- [ ] Node `id` values are unique within the roadmap
- [ ] New roadmap added to `src/data/roadmaps/index.js`
- [ ] New language entry added to `src/data/languages.js`
- [ ] PR description says what changed and why
- [ ] No hardcoded counts (use data length, not magic numbers)
