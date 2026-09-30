# Deployment

Run `npm run prepare:deploy` to generate the current selected Thai portfolio as
the root `index.html` and build the complete website into `dist/`.
The entry includes the updated WCF slider and closing conversation section.
English, About, Work, and case pages retain their existing routes.

Upload the **contents of `dist/`**, including assets and nested pages, to a static
host. Relative asset URLs support a domain root or a subdirectory. No server
runtime is required. `.nojekyll` is included for GitHub Pages.

Use `npm run preview -- --port 4174` to preview the built website at `/`.
The source `Innovative-portfolio.html` is a separate single-file preview;
deployment uses `dist/index.html` with shared assets.

The ordinary `npm test` command regenerates the original route fixtures.
Always run `npm run prepare:deploy` after tests and before uploading.
The GitHub workflow runs tests, then `npm run prepare:deploy` with relative
asset paths before uploading the Pages artifact. Connect the repository and
enable GitHub Pages using Actions when ready to publish.
