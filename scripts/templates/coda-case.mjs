import { escapeHtml as e, relativeHref } from "../lib/html.js";
import { codaProjects, codaCaseCopy } from "../../src/data/coda-projects.js";
import { changeDate } from "../../src/data/change-date.js";
import { changeDateStations } from "../../src/data/change-date-stations.js";
import { renderCodaAssetFlow } from "./coda-asset-flow.mjs";
import { findWork } from "../../src/data/work-items.js";

const labels = {
  en: { work: "Work", role: "My contribution", context: "Context", year: "Year", status: "Project status", next: "Next case", all: "All three projects", evidence: "Project evidence", open: "Enlarge image", close: "Close image", original: "Open original image", decisions: "Design decisions", outcome: "What happened", learning: "What I learned", problem: "The problem", process: "The process", read: "Explore the decisions" },
  th: { work: "ผลงาน", role: "ส่วนที่ฉันรับผิดชอบ", context: "บริบท", year: "ปี", status: "สถานะโครงการ", next: "เคสถัดไป", all: "ดูทั้งสามโครงการ", evidence: "หลักฐานจากโครงการ", open: "ขยายภาพ", close: "ปิดภาพ", original: "เปิดภาพต้นฉบับ", decisions: "การตัดสินใจออกแบบ", outcome: "สิ่งที่เกิดขึ้น", learning: "สิ่งที่ได้เรียนรู้", problem: "ปัญหา", process: "กระบวนการ", read: "ดูการตัดสินใจ" }
};
const casePath = (locale, slug = "") => `${locale === "th" ? "/th" : ""}/coda/work/${slug ? `${slug}/` : ""}`;
const assetPath = (route, src) => relativeHref(route.path, `/${src.replace(/^\//, "")}`);

function media(route, src, alt, caption, options = {}) {
  const l = labels[route.locale];
  const href = assetPath(route, src);
  return `<figure class="co-case-media ${options.className || ""}">
    <button type="button" class="co-case-media__trigger" aria-haspopup="dialog" aria-label="${e(`${l.open}: ${alt}`)}" data-image-modal-trigger data-image-src="${href}" data-image-alt="${e(alt)}" data-image-title="${e(alt)}" data-image-description="${e(caption)}">
      <img src="${href}" alt="${e(alt)}" ${options.width ? `width="${options.width}" height="${options.height}"` : ""} ${options.eager ? 'fetchpriority="high"' : 'loading="lazy"'}>
      <span class="co-case-media__open" aria-hidden="true">${e(l.open)} ↗</span>
    </button>
    <figcaption>${e(caption)}</figcaption>
  </figure>`;
}

function sectionHead(number, eyebrow, title, copy = "") {
  return `<header class="co-case-section__head"><p class="co-case-label">${number} / ${e(eyebrow)}</p><h2>${e(title)}</h2>${copy ? `<p class="co-case-lead">${e(copy)}</p>` : ""}</header>`;
}

function decisions(items) {
  return `<ol class="co-case-decisions">${items.map(([title, copy], i) => `<li><span class="co-case-label">${String(i + 1).padStart(2, "0")}</span><div><h3>${e(title)}</h3><p>${e(copy)}</p></div></li>`).join("")}</ol>`;
}

function flow(steps) {
  return `<ol class="co-case-flow">${steps.map((step, i) => `<li><span class="co-case-label">0${i + 1}</span><strong>${e(step)}</strong>${i < steps.length - 1 ? '<span class="co-case-flow__arrow" aria-hidden="true">→</span>' : ""}</li>`).join("")}</ol>`;
}

function header(item, route) {
  const l = labels[route.locale];
  const c = item[route.locale];
  const index = codaProjects.indexOf(item) + 1;
  return `<header class="co-case-hero">
    <div class="co-case-hero__top"><a href="${relativeHref(route.path, casePath(route.locale))}">← ${e(l.work)}</a><span>${String(index).padStart(2, "0")} / 03</span><span>${e(c.domain)}</span></div>
    <p class="co-case-label">${e(c.title)}</p><h1>${e(c.problem)}</h1>
    <div class="co-case-hero__bottom"><p>${e(c.summary)}</p><a class="co-case-jump" href="#decisions">${e(l.read)} <span aria-hidden="true">↓</span></a></div>
  </header>`;
}

function context(item, route, body, scope) {
  const l = labels[route.locale];
  const c = item[route.locale];
  return `<section class="co-case-context" aria-label="${e(l.context)}"><div><p class="co-case-label">${e(l.context)}</p><p>${e(body)}</p></div><div><p class="co-case-label">${e(l.role)}</p><h2>${e(c.role)}</h2><p>${e(scope)}</p></div><dl><div><dt>${e(l.year)}</dt><dd>${e(item.year)}</dd></div><div><dt>${e(l.status)}</dt><dd>${e(c.status)}</dd></div></dl></section>`;
}

function qchang(item, route) {
  const c = changeDate[route.locale];
  const l = labels[route.locale];
  const process = changeDateStations[route.locale];
  const n = changeDate.counts;
  const th = route.locale === "th";
  const stations = process.steps.map(([title, description, alt], index) => {
    const number = String(index + 1).padStart(2, "0");
    return `<li class="co-case-station"><div><span class="co-case-label">${number}</span><h3>${e(title)}</h3><p>${e(description)}</p></div><img src="${assetPath(route, `src/assets/images/work/rescheduling-pain/stations/station-${number}.webp`)}" alt="${e(alt)}" width="246" height="246" loading="lazy"></li>`;
  }).join("");
  const source = c.sources.map(([file, alt, caption]) => media(route, `src/assets/images/work/rescheduling-pain/${file}`, alt, caption)).join("");
  return `<div class="co-case-qhero">
    <div class="co-case-qhero__number"><p class="co-case-label">${e(c.period)}</p><strong>${n.total.toLocaleString("en-US")}</strong><span>${e(c.totalLabel)}</span></div>
    <img src="${assetPath(route, 'src/assets/images/work/rescheduling-pain/stations/station-01.webp')}" width="246" height="246" alt="${e(process.steps[0][2])}" fetchpriority="high">
    <dl class="co-case-qhero__split"><div><dt>${e(c.adminLabel)}</dt><dd>${n.admin.toLocaleString("en-US")}</dd></div><div><dt>${e(c.customerLabel)}</dt><dd>${n.customer}</dd></div></dl>
  </div><p class="co-case-note">${e(c.countNote)}</p>
  ${context(item, route, c.context + ". " + c.evidenceCopy, c.scope)}
  <nav class="co-case-index" aria-label="${th ? "สารบัญเคส" : "Case contents"}"><a href="#process">01 ${e(l.process)}</a><a href="#decisions">02 ${th ? "กรอบปัญหา" : "Framing"}</a><a href="#proposal">03 ${th ? "แนวทางที่เสนอ" : "Proposal"}</a><a href="#outcome">04 ${e(l.outcome)}</a><a href="#evidence">06 ${e(l.evidence)}</a></nav>
  <section class="co-case-section" id="process">${sectionHead("01", l.process, process.title, process.intro)}<ol class="co-case-stations">${stations}</ol><p class="co-case-note">${e(process.note)}</p></section>
  <section class="co-case-section" id="decisions">${sectionHead("02", th ? "งานหลังการเปลี่ยนวัน" : "Behind the date", c.chainTitle, c.chainCopy)}
    <ol class="co-case-chain">${c.chain.map(([actor, action], i) => `<li><span class="co-case-label">0${i + 1}</span><h3>${e(actor)}</h3><p>${e(action)}</p></li>`).join("")}</ol><p class="co-case-note">${e(c.exception)}</p>
    <div class="co-case-reframe"><p class="co-case-label">${e(c.reframeLabel)}</p><h3>${e(c.reframe)}</h3><p>${e(c.reframeCopy)}</p></div>
  </section>
  <section class="co-case-section" id="proposal">${sectionHead("03", th ? "แนวทางที่เสนอ" : "Proposed direction", c.windowTitle, c.windowCopy)}<p class="co-case-status">${e(c.hypothesis)}</p><ol class="co-case-timeline">${c.timeline.map(([day, title, desc]) => `<li><strong>${e(day)}</strong><h3>${e(title)}</h3><p>${e(desc)}</p></li>`).join("")}</ol><p class="co-case-note">${e(c.windowNote)}</p></section>
  <section class="co-case-section" id="outcome">${sectionHead("04", l.outcome, c.changesTitle, c.changesIntro)}<div class="co-case-team">${c.changes.map(([number, actor, title, body]) => `<section><p class="co-case-label">${number} / ${e(actor)}</p><h3>${e(title)}</h3><p>${e(body)}</p></section>`).join("")}</div><aside class="co-case-aside"><h3>${e(c.calendarTitle)}</h3><p>${e(c.calendarCopy)}</p></aside><aside class="co-case-aside"><p class="co-case-label">${e(c.observationLabel)}</p><p>${e(c.observation)}</p></aside></section>
  <section class="co-case-section co-case-reflection">${sectionHead("05", l.learning, c.reflectionTitle, c.reflection)}</section>
  <section class="co-case-section" id="evidence">${sectionHead("06", l.evidence, c.sourcesTitle, c.sourcesCopy)}<div class="co-case-source-grid">${source}</div><p class="co-case-note">${e(c.sourcesNote)}</p></section>`;
}

function wcf(item, route) {
  const c = codaCaseCopy[item.slug][route.locale];
  const l = labels[route.locale];
  const th = route.locale === "th";
  const base = "src/assets/images/work/wcf-digital/coda/";
  return `${media(route, base + "medical-items.png", item.cover.alt[route.locale], c.itemsCaption, { eager: true, className: "co-case-media--hero", width: 1101, height: 842 })}
  ${context(item, route, c.context, c.scope)}
  <section class="co-case-section co-case-split">${sectionHead("01", l.problem, c.challenge, c.before)}${media(route, base + "legacy-hospital-billing.png", th ? "หน้าจอใบแจ้งหนี้ระบบเดิม" : "Legacy hospital billing screen", c.beforeCaption, { className: "co-case-media--legacy" })}</section>
  <section class="co-case-section" id="decisions">${sectionHead("02", l.decisions, c.structureTitle, c.structure)}${flow(c.structureSteps)}${decisions(c.decisions)}</section>
  <section class="co-case-section co-case-evidence" aria-label="${e(l.evidence)}">${media(route, base + "payment-flow-evidence.jpg", th ? "ผังหน้าจอการจ่ายเงิน WCF สำหรับโรงพยาบาล ทายาท และค่าตอบแทนแพทย์" : "WCF payment wireflow for hospitals, beneficiaries, and physician compensation", c.paymentFlowCaption, { width: 9300, height: 7198 })}${media(route, base + "hospital-pricing-categories.jpeg", th ? "ราคาเรียกเก็บ จ่ายได้ และราคาประกาศ" : "Charged, eligible, and declared price columns", c.pricesCaption, { width: 2772, height: 1485 })}</section>
  <section class="co-case-section co-case-outcome">${sectionHead("03", l.outcome, c.outcomeTitle, c.outcome)}<div class="co-case-outcome__detail"><p class="co-case-live"><span aria-hidden="true">●</span> ${e(item[route.locale].status)}</p><p>${e(c.live)}</p></div></section>
  <section class="co-case-section co-case-reflection">${sectionHead("04", l.learning, c.learningTitle, c.learning)}<p class="co-case-note">${e(c.evidence)}</p></section>`;
}

function systemFlowEvidence(item, route) {
  const c = codaCaseCopy[item.slug][route.locale];
  const th = route.locale === "th";
  const cards = findWork(item.slug).flowEvidence.map((evidence, index) => {
    const src = assetPath(route, evidence.src);
    const title = evidence.title[route.locale];
    const description = evidence.description[route.locale];
    return `<li class="co-case-flow-evidence__item">
      <button class="co-case-flow-evidence__trigger" type="button" aria-haspopup="dialog" aria-label="${e(`${c.openDiagram}: ${title}`)}" data-image-modal-trigger data-image-src="${src}" data-image-alt="${e(evidence.alt[route.locale])}" data-image-title="${e(title)}" data-image-description="${e(description)}">
        <span class="co-case-flow-evidence__snapshot">
          <img src="${src}" width="${evidence.width}" height="${evidence.height}" alt="" loading="lazy">
          <span class="co-case-flow-evidence__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        </span>
        <span class="co-case-flow-evidence__copy"><strong>${e(title)}</strong><span>${e(description)}</span><span class="co-case-flow-evidence__action" aria-hidden="true">${e(c.openDiagram)} ↗</span></span>
      </button>
    </li>`;
  }).join("\n");
  return `<section class="co-case-section co-case-flow-evidence" id="system-flow-evidence" aria-labelledby="system-flow-evidence-title">
    <header class="co-case-flow-evidence__header"><p class="co-case-label">${th ? "ภาคผนวก" : "Appendix"}</p><h2 id="system-flow-evidence-title">${e(c.flowEvidenceTitle)}</h2><p>${e(c.flowEvidenceIntro)}</p></header>
    <ol class="co-case-flow-evidence__grid">${cards}</ol>
  </section>`;
}

function smart(item, route) {
  const c = codaCaseCopy[item.slug][route.locale];
  const l = labels[route.locale];
  const th = route.locale === "th";
  const base = "src/assets/images/work/smart-asset-sa-ai/";
  return `${renderCodaAssetFlow(route)}
  ${context(item, route, c.context, c.scope)}
  <section class="co-case-section">${sectionHead("01", l.problem, c.challenge, c.before)}${flow(c.modelSteps)}</section>
  <section class="co-case-section" id="decisions">${sectionHead("02", l.decisions, c.modelTitle, c.model)}${decisions(c.decisions)}${media(route, base + "metadata-driven-asset.png", th ? "ความสัมพันธ์ของ Category, SKU และ Asset พร้อม QR" : "Metadata-driven asset: Category, SKU, and individual asset with QR", c.modelCaption, { className: "co-case-media--metadata", width: 1024, height: 1536 })}<div class="co-case-asset-grid">${media(route, base + "cover-flow/category-rules.webp", th ? "กติกาข้อมูลตาม Category" : "Category-specific field rules", c.categoryCaption, { width: 1327, height: 886 })}${media(route, base + "cover-flow/sku.webp", item.cover.alt[route.locale], c.skuCaption, { width: 1440, height: 735 })}</div></section>
  <section class="co-case-section co-case-split">${sectionHead("03", l.evidence, c.flowTitle, c.flowCopy)}${media(route, base + "flow-01-request-to-order.png", th ? "แผนภาพ Request to Order" : "Request-to-order activity diagram", c.flowCaption, { className: "co-case-media--diagram", width: 1784, height: 1736 })}</section>
  <section class="co-case-section co-case-outcome">${sectionHead("04", l.outcome, c.outcomeTitle, c.outcome)}<div class="co-case-outcome__detail"><p class="co-case-live"><span aria-hidden="true">●</span> ${e(item[route.locale].status)}</p><h3>${e(c.nextTitle)}</h3><p>${e(c.next)}</p></div></section>
  <section class="co-case-section co-case-reflection">${sectionHead("05", l.learning, c.learningTitle, c.learning)}<p class="co-case-note">${e(c.evidence)}</p></section>${systemFlowEvidence(item, route)}`;
}

function nextCase(item, route) {
  const next = codaProjects[(codaProjects.indexOf(item) + 1) % codaProjects.length];
  const l = labels[route.locale];
  return `<nav class="co-case-next" aria-label="${e(l.next)}"><a class="co-case-next__all" href="${relativeHref(route.path, casePath(route.locale))}">${e(l.all)}</a><a data-coda-next href="${relativeHref(route.path, casePath(route.locale, next.slug))}"><span class="co-case-label">${e(l.next)}</span><strong>${e(next[route.locale].title)}</strong><span class="co-case-next__arrow" aria-hidden="true">↗</span><span>${e(next[route.locale].problem)}</span></a></nav>`;
}

function dialog(locale) {
  const l = labels[locale];
  return `<dialog class="co-case-dialog" aria-labelledby="co-case-image-title" aria-describedby="co-case-image-description" data-image-modal><div class="co-case-dialog__bar"><h2 id="co-case-image-title" data-image-modal-title></h2><button type="button" aria-label="${e(l.close)}" data-image-modal-close>×</button></div><div class="co-case-dialog__viewport" tabindex="0" role="region" aria-label="${locale === 'th' ? 'ภาพขยาย เลื่อนเพื่ออ่านรายละเอียด' : 'Enlarged image. Scroll to explore the details.'}"><img alt="" data-image-modal-image></div><div class="co-case-dialog__caption"><p id="co-case-image-description" data-image-modal-description></p><a target="_blank" rel="noopener" data-image-modal-original>${e(l.original)} ↗</a></div></dialog>`;
}

export function renderCodaCase(route) {
  const slug = route.workSlug || route.slug;
  const item = codaProjects.find((project) => project.slug === slug);
  if (!item) throw new Error(`Unknown Coda project: ${slug}`);
  const body = item.slug === "rescheduling-pain" ? qchang(item, route) : item.slug === "wcf-digital" ? wcf(item, route) : smart(item, route);
  return `<article class="co-case co-case--${e(item.slug)}" style="--co-case-accent:${item.color}" data-flow-evidence>${header(item, route)}${body}${nextCase(item, route)}${dialog(route.locale)}</article>`;
}
