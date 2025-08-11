# Swee Leong — Personal Website

This is a minimal static site ready for GitHub Pages. It does not copy any content from external sites. Customize `docs/index.html` with your details.

## Local preview
Open `docs/index.html` in a browser, or use a simple static server.

## Deploy on GitHub Pages (user/organization site)
This repo is already connected to `origin`:

1. Commit and push changes to `main`.
2. In GitHub, go to Settings → Pages.
3. Set Source to "Deploy from a branch" and select `main` as the branch and `/docs` as the folder.
4. Save. Your site will be available at `https://sysing.github.io/swee-leong-webpage/` (or your configured custom domain later).

## Alternative design (educational)
- `yeong-like/` contains a layout-only demo inspired by an external site. It uses placeholder text (Lorem Ipsum) and random images. No external content or assets are copied.
- Open `yeong-like/index.html` locally to preview.

## Notes
- If you add images to the default site, place them under `docs/assets/img/`.
- `.nojekyll` in `docs/` ensures GitHub Pages serves files without Jekyll processing.
