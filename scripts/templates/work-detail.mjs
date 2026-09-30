import { routePath } from "../../src/data/routes.js";
import { site } from "../../src/data/site-content.js";
import { workItems } from "../../src/data/work-items.js";
import { escapeHtml, paragraphs, relativeHref } from "../lib/html.js";
import { renderChangeDate } from "./change-date.mjs";

const labels = {
  en: {
    project: "Project",
    client: "Context",
    product: "Product",
    year: "Year",
    domain: "Domain",
    platform: "Platform",
    role: "My role",
    workArea: "Work area",
    challenge: "Challenge",
    approach: "Approach",
    approachOutcome: "Approach & outcome",
    outcome: "Outcome",
    detail: "Detail",
    gallery: "Project evidence",
    flowEvidence: "System flow evidence",
    flowEvidenceIntro: "A compact record of how the work expanded from interface decisions into operational stages. Open any snapshot to inspect the full activity diagram.",
    openDiagram: "Open full diagram",
    closeDiagram: "Close diagram",
    openOriginal: "Open original resolution"
  },
  th: {
    project: "โครงการ",
    client: "บริบท",
    product: "ผลิตภัณฑ์",
    year: "ปี",
    domain: "ประเภทงาน",
    platform: "แพลตฟอร์ม",
    role: "บทบาทของผม",
    workArea: "ขอบเขตงาน",
    challenge: "ความท้าทาย",
    approach: "แนวทาง",
    approachOutcome: "แนวทางและผลลัพธ์",
    outcome: "ผลลัพธ์",
    detail: "รายละเอียด",
    gallery: "หลักฐานจากโครงการ",
    flowEvidence: "หลักฐานการเข้าใจ flow ของระบบ",
    flowEvidenceIntro: "บันทึกแบบกระชับว่างานขยายจากการตัดสินใจบนหน้าจอไปสู่ขั้นตอนปฏิบัติการอย่างไร กดแต่ละภาพเพื่อดู activity diagram ฉบับเต็ม",
    openDiagram: "เปิดแผนภาพเต็ม",
    closeDiagram: "ปิดแผนภาพ",
    openOriginal: "เปิดภาพความละเอียดต้นฉบับ"
  }
};

function factList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

const factIcons = {
  project: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 7.5h17v12h-17zM8 7.5V4.5h8v3"/></svg>`,
  product: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/></svg>`,
  domain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>`,
  role: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6"/></svg>`
};

function renderFact(label, value, icon = "") {
  const term = icon
    ? `<span class="p-work-detail__fact-icon">${icon}</span><span>${escapeHtml(label)}</span>`
    : escapeHtml(label);

  return `<div><dt>${term}</dt><dd>${Array.isArray(value) ? factList(value) : escapeHtml(value)}</dd></div>`;
}

function renderFacts(item, copy, locale, label) {
  if (item.factsLayout === "compact") {
    return `<dl class="p-work-detail__facts p-work-detail__facts--compact" aria-label="${escapeHtml(label.project)}" data-reveal>
        ${renderFact(label.project, copy.title, factIcons.project)}
        ${renderFact(label.product, item.facts.product[locale], factIcons.product)}
        ${renderFact(label.domain, item.facts.domain[locale], factIcons.domain)}
        ${renderFact(label.role, item.facts.role[locale], factIcons.role)}
      </dl>`;
  }

  return `<dl class="p-work-detail__facts" aria-label="${escapeHtml(label.project)}" data-reveal>
        ${renderFact(label.project, copy.title)}
        ${renderFact(label.client, item.facts.client[locale])}
        ${renderFact(label.product, item.facts.product[locale])}
        ${renderFact(label.year, item.year)}
        ${renderFact(label.domain, item.facts.domain[locale])}
        ${renderFact(label.platform, item.facts.platform[locale])}
        ${renderFact(label.role, item.facts.role[locale])}
        ${renderFact(label.workArea, item.facts.workArea[locale])}
      </dl>`;
}

function renderNarrative(item, copy, label) {
  if (item.narrativeLayout === "combined") {
    return `<section class="p-work-detail__narrative" aria-label="${escapeHtml(label.detail)}">
        <section aria-labelledby="case-${item.slug}-challenge" data-reveal><p class="p-work-detail__eyebrow">${escapeHtml(label.challenge)}</p><h2 id="case-${item.slug}-challenge">${escapeHtml(copy.challenge)}</h2></section>
        <section aria-labelledby="case-${item.slug}-approach-outcome" data-reveal><h2 class="p-work-detail__eyebrow" id="case-${item.slug}-approach-outcome">${escapeHtml(label.approachOutcome)}</h2><p>${escapeHtml(copy.approach)}</p><p>${escapeHtml(copy.outcome)}</p></section>
      </section>`;
  }

  return `<section class="p-work-detail__narrative" aria-label="${escapeHtml(label.detail)}">
        <section aria-labelledby="case-${item.slug}-challenge" data-reveal><p class="p-work-detail__eyebrow">${escapeHtml(label.challenge)}</p><h2 id="case-${item.slug}-challenge">${escapeHtml(copy.challenge)}</h2></section>
        <section aria-labelledby="case-${item.slug}-approach" data-reveal><h2 class="p-work-detail__eyebrow" id="case-${item.slug}-approach">${escapeHtml(label.approach)}</h2><p>${escapeHtml(copy.approach)}</p></section>
        <section aria-labelledby="case-${item.slug}-outcome" data-reveal><h2 class="p-work-detail__eyebrow" id="case-${item.slug}-outcome">${escapeHtml(label.outcome)}</h2><p>${escapeHtml(copy.outcome)}</p></section>
        <section aria-labelledby="case-${item.slug}-detail" data-reveal><h2 class="p-work-detail__eyebrow" id="case-${item.slug}-detail">${escapeHtml(label.detail)}</h2>${paragraphs(copy.detail)}</section>
      </section>`;
}

function renderCoverFlow(item, route) {
  const locale = route.locale;
  const flow = item.coverFlow;
  const headingId = `cover-flow-${item.slug}`;
  const renderHeadingLines = (lines, className) => `<span class="${className}" aria-hidden="true">${lines.map((line) => `<span class="p-cover-flow__title-line">${escapeHtml(line)}</span>`).join("")}</span>`;
  const nodes = flow.nodes.map((node, index) => {
    const src = relativeHref(route.path, `/${node.media.src}`);
    const mobileFallback = node.mobilePriority
      ? src
      : "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

    return `<li class="p-cover-flow__node p-cover-flow__node--${escapeHtml(node.id)}${node.mobilePriority ? " is-mobile-priority" : ""}" data-cover-flow-node data-cover-mobile-priority="${node.mobilePriority}" data-cover-reveal>
      <figure>
        <div class="p-cover-flow__media">
          <picture>
            <source media="(min-width: 48rem)" srcset="${src}">
            <img src="${mobileFallback}" width="${node.media.width}" height="${node.media.height}" alt="${escapeHtml(node.media.alt[locale])}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
          </picture>
        </div>
        <figcaption>
          <span class="p-cover-flow__index">${String(node.stage).padStart(2, "0")}</span>
          <strong><span class="p-cover-flow__desktop-copy">${escapeHtml(node.title[locale])}</span><span class="p-cover-flow__mobile-copy">${escapeHtml((node.mobileTitle || node.title)[locale])}</span></strong>
          <span><span class="p-cover-flow__desktop-copy">${escapeHtml(node.description[locale])}</span><span class="p-cover-flow__mobile-copy">${escapeHtml((node.mobileDescription || node.description)[locale])}</span></span>
        </figcaption>
      </figure>
    </li>`;
  }).join("\n");
  const edgeLabels = flow.edges.map((edge) => `<span class="p-cover-flow__edge-label p-cover-flow__edge-label--${escapeHtml(edge.from)}-${escapeHtml(edge.to)}">${escapeHtml(edge.label[locale])}</span>`).join("\n");
  const accessibleEdges = flow.edges.map((edge) => {
    const from = flow.nodes.find((node) => node.id === edge.from);
    const to = flow.nodes.find((node) => node.id === edge.to);
    return `<li>${escapeHtml(from.title[locale])} → ${escapeHtml(to.title[locale])}: ${escapeHtml(edge.label[locale])}</li>`;
  }).join("");

  return `<section class="p-work-detail__cover p-work-detail__cover--system-flow" aria-labelledby="${headingId}" data-cover-flow data-reveal>
    <div class="p-cover-flow__grid" aria-hidden="true"></div>
    <header class="p-cover-flow__intro" data-cover-reveal>
      <p class="p-cover-flow__kicker">Master Asset / Site operation</p>
      <h2 id="${headingId}" aria-label="${escapeHtml(flow.heading[locale])}">${renderHeadingLines(flow.headingLines[locale], "p-cover-flow__desktop-heading")}${renderHeadingLines(flow.mobileHeadingLines[locale], "p-cover-flow__mobile-heading")}</h2>
      <p>${escapeHtml(flow.description[locale])}</p>
    </header>
    <div class="p-cover-flow__canvas">
      <p class="p-cover-flow__lane p-cover-flow__lane--master">${escapeHtml(flow.lanes.master[locale])}</p>
      <p class="p-cover-flow__lane p-cover-flow__lane--operations">${escapeHtml(flow.lanes.operations[locale])}</p>
      <ol class="p-cover-flow__nodes">
        ${nodes}
      </ol>
      <svg class="p-cover-flow__connectors" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-cover-reveal>
        <defs>
          <marker id="cover-flow-arrow-${item.slug}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 8 4 0 8Z"></path>
          </marker>
        </defs>
        <path pathLength="1" d="M265 176H330V286H386" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
        <path pathLength="1" d="M498 360V430H250V492" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
        <path pathLength="1" d="M390 605H488V680H540" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
        <path pathLength="1" d="M708 704H790" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
        <path pathLength="1" d="M974 688H1060V312" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
        <path pathLength="1" d="M1084 322V438" marker-end="url(#cover-flow-arrow-${item.slug})"></path>
      </svg>
      <div class="p-cover-flow__edge-labels" aria-hidden="true" data-cover-reveal>
        ${edgeLabels}
      </div>
      <ol class="u-visually-hidden" aria-label="${escapeHtml(flow.heading[locale])}">${accessibleEdges}</ol>
    </div>
  </section>`;
}

function renderCover(item, route) {
  if (item.coverFlow) return renderCoverFlow(item, route);

  const locale = route.locale;
  const coverHref = relativeHref(route.path, `/${item.cover.src}`);
  return `<figure class="p-work-detail__cover" data-reveal>
        <img src="${coverHref}" width="${item.cover.width}" height="${item.cover.height}" alt="${escapeHtml(item.cover.alt[locale])}" fetchpriority="high">
      </figure>`;
}

function renderMedia(media, route, locale, index) {
  const src = relativeHref(route.path, `/${media.src}`);
  return `<figure class="p-work-detail__media p-work-detail__media--${escapeHtml(media.layout)}" data-reveal>
    <img src="${src}" width="${media.width}" height="${media.height}" alt="${escapeHtml(media.alt[locale])}" loading="lazy">
    <figcaption>${String(index + 1).padStart(2, "0")} / ${escapeHtml(media.alt[locale])}</figcaption>
  </figure>`;
}

function renderLongSections(item, route) {
  const locale = route.locale;
  return item[locale].sections.map((section) => {
    const media = (section.media || [])
      .map((mediaIndex) => renderMedia(item.gallery[mediaIndex], route, locale, mediaIndex))
      .join("\n");
    return `<section class="p-work-detail__chapter" aria-labelledby="chapter-${item.slug}-${section.eyebrow.replace(/\D/g, "") || "x"}">
      <div class="p-work-detail__chapter-copy" data-reveal>
        <p class="p-work-detail__eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="chapter-${item.slug}-${section.eyebrow.replace(/\D/g, "") || "x"}">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.copy)}</p>
      </div>
      ${media}
    </section>`;
  }).join("\n");
}

function renderFlowEvidence(item, route) {
  if (!item.flowEvidence?.length) return "";

  const locale = route.locale;
  const label = labels[locale];
  const cards = item.flowEvidence.map((evidence, index) => {
    const src = relativeHref(route.path, `/${evidence.src}`);
    const title = evidence.title[locale];
    const description = evidence.description[locale];
    const alt = evidence.alt[locale];

    return `<li class="p-flow-evidence__item">
      <button class="p-flow-evidence__trigger" type="button" aria-haspopup="dialog" data-image-modal-trigger data-image-src="${src}" data-image-alt="${escapeHtml(alt)}" data-image-title="${escapeHtml(title)}" data-image-description="${escapeHtml(description)}">
        <span class="p-flow-evidence__snapshot">
          <img src="${src}" width="${evidence.width}" height="${evidence.height}" alt="" loading="lazy">
          <span class="p-flow-evidence__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        </span>
        <span class="p-flow-evidence__card-copy">
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(description)}</span>
          <span class="p-flow-evidence__action">${escapeHtml(label.openDiagram)} ↗</span>
        </span>
      </button>
    </li>`;
  }).join("\n");

  return `<section class="p-flow-evidence" aria-labelledby="flow-evidence-${item.slug}" data-flow-evidence>
    <div class="p-flow-evidence__header" data-reveal>
      <p class="p-work-detail__eyebrow">Appendix</p>
      <h2 id="flow-evidence-${item.slug}">${escapeHtml(label.flowEvidence)}</h2>
      <p>${escapeHtml(label.flowEvidenceIntro)}</p>
    </div>
    <ol class="p-flow-evidence__strip" aria-label="${escapeHtml(label.flowEvidence)}">
      ${cards}
    </ol>
    <dialog class="c-image-modal" aria-labelledby="image-modal-title" aria-describedby="image-modal-description" data-image-modal>
      <div class="c-image-modal__bar">
        <div>
          <p class="p-work-detail__eyebrow">Appendix</p>
          <h2 id="image-modal-title" data-image-modal-title></h2>
        </div>
        <button class="c-image-modal__close" type="button" aria-label="${escapeHtml(label.closeDiagram)}" data-image-modal-close>×</button>
      </div>
      <div class="c-image-modal__viewport">
        <img alt="" data-image-modal-image>
      </div>
      <div class="c-image-modal__caption">
        <p id="image-modal-description" data-image-modal-description></p>
        <a class="c-text-link" href="" target="_blank" rel="noopener" data-image-modal-original>${escapeHtml(label.openOriginal)} ↗</a>
      </div>
    </dialog>
  </section>`;
}

function renderCaseNavigation(item, route) {
  const locale = route.locale;
  const common = site.common[locale];
  const index = workItems.findIndex((candidate) => candidate.slug === item.slug);
  const previous = workItems[index - 1];
  const next = workItems[index + 1];
  const workHref = relativeHref(route.path, routePath(locale, "work-index"));
  const renderLink = (target, label, direction) => target
    ? `<a class="p-work-nav__link p-work-nav__link--${direction}" href="${relativeHref(route.path, routePath(locale, "work-detail", target.slug))}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(target[locale].title)}</strong></a>`
    : `<span class="p-work-nav__link p-work-nav__link--${direction} is-empty" aria-hidden="true"></span>`;

  return `<nav class="p-work-nav" aria-label="${escapeHtml(locale === "th" ? "ไปยังผลงานอื่น" : "More work")}">
    <a class="p-work-nav__all c-text-link" href="${workHref}">${escapeHtml(common.backToWork)}</a>
    <div class="p-work-nav__grid">
      ${renderLink(previous, common.previous, "previous")}
      ${renderLink(next, common.next, "next")}
    </div>
  </nav>`;
}

export function renderWorkDetail(item, route) {
  if (item.caseStudy === "change-date") return renderChangeDate(item, route) + renderCaseNavigation(item, route);
  const locale = route.locale;
  const copy = item[locale];
  const label = labels[locale];
  const nav = site.nav[locale];
  const homeHref = relativeHref(route.path, routePath(locale, "home"));
  const workHref = relativeHref(route.path, routePath(locale, "work-index"));
  const detailClass = `p-work-detail p-work-detail--${item.contentLevel}`;
  const gallery = item.contentLevel === "long"
    ? renderLongSections(item, route)
    : item.gallery.length
      ? `<section class="p-work-detail__gallery" aria-label="${escapeHtml(label.gallery)}">${item.gallery.map((media, index) => renderMedia(media, route, locale, index)).join("\n")}</section>`
      : "";
  const flowAppendix = renderFlowEvidence(item, route);

  return `
    <article class="${detailClass}">
      <header class="p-work-detail__hero">
        <p class="p-work-detail__breadcrumb"><a href="${homeHref}">${escapeHtml(nav.home)}</a> / <a href="${workHref}">${escapeHtml(nav.work)}</a> / ${escapeHtml(copy.title)}</p>
        <div class="p-work-detail__hero-index">${String(item.order).padStart(2, "0")} / ${String(workItems.length).padStart(2, "0")}</div>
        <p class="p-work-detail__eyebrow" data-reveal>${escapeHtml(copy.eyebrow)}</p>
        <h1 class="p-work-detail__title" data-reveal>${escapeHtml(copy.title)}</h1>
        <p class="p-work-detail__statement" data-reveal>${escapeHtml(copy.listStatement)}</p>
        <p class="p-work-detail__summary" data-reveal>${escapeHtml(copy.summary)}</p>
      </header>

      ${renderCover(item, route)}

      ${renderFacts(item, copy, locale, label)}

      ${renderNarrative(item, copy, label)}

      ${gallery}${flowAppendix ? `\n      ${flowAppendix}` : ""}
      ${renderCaseNavigation(item, route)}
    </article>`;
}
