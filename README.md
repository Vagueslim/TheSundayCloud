# Dhittawat x The Sunday Cloud

A bilingual product design portfolio with three selected case studies:

1. **PEC Smart Asset** — UX and specification work on asset management.
2. **Q-CHANG · Change Date** — investigating service rescheduling across customers, technicians, and operations.
3. **WCF Digital · Hospital Billing** — translating medical billing requirements into a usable entry flow.

The Sunday Cloud edition contains **12 pages**: Home, About, Work, and three case studies in English and Thai. The original portfolio's 28 routes are retained because both editions share content, assets, templates, and build infrastructure. There is no backend. Its internal routes and source filenames still use `coda` for now.

## Published portfolio

- English: <https://vagueslim.github.io/TheSundayCloud/coda/>
- ภาษาไทย: <https://vagueslim.github.io/TheSundayCloud/>

## Run locally

Use **Node.js 22.12+** (or Node.js 24 LTS) and npm.

```sh
npm ci
npm run dev -- --port 4174
```

Open:

- English: <http://127.0.0.1:4174/coda/>
- ภาษาไทย: <http://127.0.0.1:4174/th/coda/>

On Windows, double-click `start-local.cmd` to install dependencies if needed and open the English Coda homepage.

## Edit the portfolio

Edit the source data and templates, then regenerate the HTML:

```sh
npm run generate:pages
```

| Content | Source |
| --- | --- |
| Three selected projects and localized case copy | `src/data/coda-projects.js` |
| Routes and language pairs | `src/data/coda-routes.js` |
| Q-CHANG story and station flow | `src/data/change-date.js`, `src/data/change-date-stations.js` |
| Career history | `src/data/career-history.js` |
| Home, Work, navigation, and Q-CHANG hero | `scripts/templates/coda.mjs` |
| Case study layout | `scripts/templates/coda-case.mjs` |
| About page | `scripts/templates/coda-about.mjs` |
| Styles | `src/styles/coda.css`, `src/styles/pages/coda-*.css` |
| Menu, WCF image slider, and evidence-image interactions | `src/scripts/coda.js`, `src/scripts/modules/wcf-slider.js` |

Files under `coda/` and `th/coda/` are generated outputs. Direct HTML edits will be replaced by the generator. Development and production build commands regenerate pages automatically; rerun the generator after changing a template or content while the dev server is already running.

## Build and check

```sh
npm test
npm run preview -- --port 4175
```

`npm test` builds all 40 routes into `dist/` and runs the regression tests for both editions. Preview the Coda edition at <http://127.0.0.1:4175/coda/> or <http://127.0.0.1:4175/th/coda/>.

GitHub Actions runs installation, build, and tests on pushes and pull requests and creates the deployment with relative asset URLs. Successful builds on `main` publish `dist/` to GitHub Pages. Pull requests are tested without deploying. Local builds use `/` unless `PORTFOLIO_BASE` is set.

## Content and evidence

See [the editing notes](docs/coda-edition.md) for the boundaries between research data, proposals, observed results, and shipped work. Keep both languages consistent when updating names, roles, dates, or project status.

## สำหรับแก้งานต่อ

- เริ่มดูฉบับ Coda ที่ `/coda/` หรือ `/th/coda/`
- แก้ข้อมูลและ template ตามตาราง แล้วรัน `npm run generate:pages`
- รัน `npm test` ก่อนส่งขึ้น GitHub
- ภาพที่ใช้ในเว็บอยู่ใน `src/assets/`; ไฟล์ติดตั้งและไฟล์ build ไม่ถูกเก็บใน Git
- เมื่อ push เข้า `main` และผ่านการทดสอบ GitHub Actions จะเผยแพร่เว็บไซต์ให้ การส่งสมัครงานเป็นอีกขั้นตอนหนึ่ง

