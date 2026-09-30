# Innovative hero design QA

final result: passed

## Scope and reference

- Replaced the previous `Innovative × Dhittawat` title block on `/coda/` and `/th/coda/` with the collaboration hero from the local reference at `C:\Users\Admin\Documents\ChatGPT\Portfolio Custom\app`.
- Reused the reference's text-free sculpture asset; headings, captions, and metadata remain editable HTML.
- Kept the existing navigation and WCF Digital featured case immediately after the hero.
- Used `Innovative` as the visible company name per the earlier portfolio naming decision, and corrected the portfolio owner's name to `Dhittawat`.

## Visual evidence

- Desktop English and Thai: `output/innovative-qa/hero-en-desktop.png`, `output/innovative-qa/hero-th-desktop.png` at 1491 × 1055.
- Mobile English and Thai: `output/innovative-qa/hero-en-mobile.png`, `output/innovative-qa/hero-th-mobile.png` at 390 × 844.
- Hero-to-WCF transition: `output/innovative-qa/hero-to-wcf-desktop.png`, `output/innovative-qa/hero-to-wcf-mobile.png`.
- The reference was inspected at the same desktop and mobile widths before implementation. The intended differences are the portfolio name and company label above.

## Verification

- `npm test`: build and all 33 smoke tests passed.
- Edge browser captures: sculpture loaded at its natural width; no console or page errors.
- Thai route at widths 320, 375, 390, 640, 768, 900, 901, 1024, 1491, and 1920: no document overflow or hero text outside the hero bounds.
- The shared `visual_lint.mjs` launcher could not start its bundled Chromium binary on this host. Direct Edge screenshot and DOM checks covered the rendered layout.

## WCF featured card update

- The card below the hero now uses a white background on both copy and image panels.
- Replaced its medical-item screenshot with the user-supplied 1492 × 1054 WCF Medical Expense Claim Flow composite. The original WCF slider and case evidence remain in place.
- Changed the caption from interface evidence to a flow illustration so the composite is not mistaken for one original system screenshot.
- Captures: `output/innovative-qa/wcf-white-th-desktop.png`, `output/innovative-qa/wcf-white-th-mobile.png`, and `output/innovative-qa/wcf-white-en-desktop.png`.
- Edge checks confirmed white computed backgrounds, a loaded image, no horizontal overflow, and no console errors. `npm test` passed again: 33/33.

## Offline HTML handoff

- `Innovative-portfolio.html` is a self-contained Thai Home page exported from the current production build by `scripts/export-coda-home.mjs`.
- The file embeds its styles, fonts, images, and page interactions. Direct `file://` checks in Edge confirmed the WCF slider and mobile menu work without console errors; all eight images decode when loaded.
- Links to About, Work, case pages, and English use adjacent project HTML files, so keep this export in the Innovative project root when using those links.

## Global page background

- Set the Innovative edition's shared `--co-paper` token to `#ffffff`. The original portfolio already used a white global paper token.
- Checked computed page backgrounds on all 12 Innovative routes; all returned `rgb(255, 255, 255)`. Desktop and mobile Home screenshots are saved as `output/innovative-qa/white-site-home-desktop.png` and `white-site-home-mobile.png`.
- Rebuilt the site, reran all 33 smoke tests, and regenerated `Innovative-portfolio.html`; its offline background also computes to white.
