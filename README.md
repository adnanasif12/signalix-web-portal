# Signalix — Next.js Agency Website

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Structure

Every UI section lives in its own folder under `components/`, with its JSX
and CSS Module file kept together:

```
components/
  Header/        Header.jsx + Header.module.css
  Hero/          Hero.jsx + Hero.module.css
  PulseDivider/  PulseDivider.jsx + PulseDivider.module.css
  Services/      Services.jsx + Services.module.css
  Process/       Process.jsx + Process.module.css
  WhyUs/         WhyUs.jsx + WhyUs.module.css
  CTA/           CTA.jsx + CTA.module.css
  Footer/        Footer.jsx + Footer.module.css
hooks/
  useReveal.js   shared scroll-reveal hook
pages/
  _app.jsx
  index.jsx      composes all sections
styles/
  globals.css    design tokens (colors, fonts) + shared utility classes
```

## Editing content

- Services list: `components/Services/Services.jsx` (SERVICES array)
- Process steps: `components/Process/Process.jsx` (STEPS array)
- Why-us reasons: `components/WhyUs/WhyUs.jsx` (REASONS array)
- Contact email/phone: `components/Footer/Footer.jsx` and `components/CTA/CTA.jsx`
- Colors/fonts: `styles/globals.css` (`:root` variables)
