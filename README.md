# Professor Iain Rice — Personal Website

Professional website for Professor Iain Rice, Professor of Industrial AI at
Birmingham City University. Built with [Astro](https://astro.build), deployed
to GitHub Pages at **https://iainriceai.github.io**.

## Design

- **"The Living Network"** hero — an interactive neural-graph canvas: nodes
  drift, edges form, and a heartbeat-rhythm pulse (lub-dub) propagates signals
  through the network. The cursor gathers and links to nearby nodes.
  Respects `prefers-reduced-motion`.
- Palette: deep navy ink `#0a1322`, signal teal `#0fae9e`, pulse amber
  `#e8a33d`, warm paper `#fbfbf8`. **No purple.**
- Typography: Fraunces (display serif) + Space Grotesk (UI).

## Structure

```
src/
  layouts/Base.astro        — head, nav, footer, reveal/count-up scripts
  components/
    NeuralCanvas.astro      — hero canvas (heartbeat pulse + mouse graph)
    PageHero.astro          — subpage hero band
    ProjectCard.astro       — project card with artefact slots
    Quote.astro / CTA.astro / Motif.astro
  data/projects.js          — ★ PROJECT & ARTEFACT REGISTRY (edit this)
  pages/                    — index, industry, research, leadership, contact
  styles/global.css         — design system
public/
  images/                   — photos
  images/artefacts/         — ★ drop project images/artefacts here
  Iain_Rice_CV_UK.pdf       — served at /Iain_Rice_CV_UK.pdf
```

## Adding a project or artefact later

Everything is driven by **`src/data/projects.js`**. To add images or
artefact links to an existing project, add the optional fields:

```js
{
  title: 'GenAI Customer Support Platform',
  // ...
  image: '/images/artefacts/metcloud-dashboard.jpg',          // ← new
  artefact: { label: 'View case study (PDF)', href: '/case-studies/metcloud.pdf' },
  links: [{ label: 'Live demo', href: 'https://…' }],
}
```

Drop the referenced files into `public/images/artefacts/` (images) or
`public/` (PDFs). Cards without an `image` render a neural-motif placeholder,
so the site always looks complete. Set `featured: true` to show a project on
the homepage; `kind: 'industry' | 'research'` controls which listing it
appears in.

## Develop & deploy

```bash
npm install
npm run dev       # local dev server
npm run build     # outputs static site to dist/
```

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`)
on every push to `main`. The site is served from the **root domain**, so
`astro.config.mjs` deliberately has **no `base` property** — do not add one.
