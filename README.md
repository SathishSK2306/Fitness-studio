# Focus Fitness Studio – Website

A responsive, animated one-page website for **Focus Fitness Studio**, Taramani, Chennai.

Built with **React 18 + Vite**, **Framer Motion** (animations), **Lenis** (smooth scrolling) and **Lucide** icons.

## Run locally (VS Code)

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # first time only
npm run dev      # starts the site at http://localhost:5173
```

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html              page shell (title, SEO meta, fonts)
public/favicon.svg      browser tab icon
src/
  main.jsx              React entry
  App.jsx               page layout + smooth scroll setup
  data.js               ALL the gym's content: phone, address, services, reviews, images
  index.css             design, colours, responsive layout
  lib/scroll.js         smooth-scroll helpers used by the menu
  components/           one file per section (Navbar, Hero, About, Services, ...)
```

## Editing content

Almost everything lives in **`src/data.js`**: phone, WhatsApp number, address, services, reviews and photo links.

- **Photos:** the site uses Unsplash stock photos. To use real studio photos, put them in `public/images/` and change the links in `IMAGES` in `src/data.js` (for example `"/images/hero.jpg"`).
- **Colours:** change `--accent` at the top of `src/index.css`.

## Deploy on Vercel

1. Go to https://vercel.com/new and import this GitHub repository.
2. Vercel detects **Vite** automatically (build command `npm run build`, output `dist`).
3. Click **Deploy**. Every push to `main` redeploys the site.
