# Innovative edition: editing notes

## Structure

The Innovative edition adds 12 routes to the original portfolio. Each language has Home, About, Work, and three case studies. English currently lives at `/coda/` and Thai at `/th/coda/`; these are inherited technical paths.

The shared project selection controls cards, case counts, About links, and next-case navigation. Keep the reading order **WCF → Q-CHANG → PEC Smart Asset → WCF**. Language switching should retain the current page.

## Evidence boundaries

- **Q-CHANG:** 3,999 records = 3,545 staff-assisted + 454 self-service. Around 4,000 is the rounded presentation figure. These are research counts, not unique customer counts or improvement metrics. The five-day reminder remains a proposal/hypothesis. Attribute team actions to the team and do not add interview findings that have not been supplied.
- **WCF:** Hospital Billing is the selected scope. Go-live was 27 July 2026. Training and UAT observations are qualitative. The designer contributed interfaces, workflows, specifications, and testing support; do not imply deployment or policy ownership. The medical supplies flow separates three categories and supports selecting multiple items, entering quantities, and saving together.
- **Smart Asset:** UX × SA Intern working with a software engineer, with Codex supporting specification and design work. Master Asset was delivered and began use. Keep confusion around SKU before asset creation separate from the planned direct asset-view navigation.
- **About:** Interests are Go, Sisyphus, and The Book of Why. Add personal interpretations only when supplied by Dhittawat. LCCS is a personal research/concept and aspiration, not a fourth delivered case study.

## Visual behavior

- Large evidence images, clear type, off-white backgrounds, and thin dividers.
- Important content remains HTML rather than being embedded in artwork.
- Q-CHANG's station flow is vertical, with text on the left and illustrations on the right on wide screens.
- Evidence images open in a keyboard-accessible enlarged view.
- Keep reduced-motion support, visible keyboard focus, and readable narrow layouts.
- No autoplay or scroll hijacking.

## Images

The Smart Asset case reuses the original portfolio's bilingual `coverFlow` in `src/data/work-items.js` for **Master Asset / Site operation**. All seven evidence screens remain available on desktop and mobile. `scripts/templates/coda-asset-flow.mjs` renders the Coda version; `src/styles/components/coda-asset-flow.css` controls its layout. Images open in the existing case-study viewer, and the links below each screen identify and navigate to the next step. The Site screens describe the workflow, while the confirmed live scope remains Master Asset.

WCF evidence copies are in `src/assets/images/work/wcf-digital/coda/`: `medical-categories.png`, `medical-items.png`, `legacy-hospital-billing.png`, and `hospital-pricing-categories.jpeg`. These are supplied project evidence; avoid modifying them in ways that change the meaning of the interface.

The WCF card on Home and Work uses a three-image slider: medical-item selection, treatment categories, and price review. The legacy screen remains inside the case narrative rather than the prominent slider. The slider has thumbnail buttons on wide screens, previous/next controls, a slide count, and keyboard arrow support.

The Smart Asset **System flow evidence** appendix reuses the six `flowEvidence` records in `src/data/work-items.js`, including the overview and five rental stages. The Coda template renders a responsive card grid and uses the existing single image viewer. Keep these as specification evidence, separate from the confirmed Master Asset launch.

## Review after changes

Run `npm test`, then inspect affected pages in both languages. Check mobile and desktop layouts, language pairing, next-case links, menu keyboard behavior, and enlarged images in the production preview. Avoid adding unverified outcomes to improve a resume or portfolio score.
