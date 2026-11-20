# Focus Fitness Studio – Website

A responsive, animated one-page website for **Focus Fitness Studio**, Taramani, Chennai.

It is plain HTML, CSS and JavaScript, so there is nothing to install and no build step.

## Files

| File | What it is |
|------|------------|
| `index.html` | Page content (all sections) |
| `styles.css` | Design, animations, responsive layout |
| `script.js` | Scroll animations, menu, counters, review slider, WhatsApp form |
| `favicon.svg` | Browser tab icon |

## Run locally (VS Code)

1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

Or, from a terminal: `npx serve .`

## Deploy on Vercel

1. Go to https://vercel.com/new and import this GitHub repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Click **Deploy**.

## Editing content

- **Phone / WhatsApp:** search for `919176443433` in `index.html` and `script.js`.
- **Photos:** the site uses Unsplash stock photos. Replace the `src` of the `<img>` tags with real photos of the studio (put them in an `images/` folder, e.g. `images/hero.jpg`).
- **Colours:** change `--accent` at the top of `styles.css`.
