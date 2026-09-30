import { renderCodaConversation } from './coda-conversation.mjs';
import { careerProfile, careerTimeline, localizedValue } from "../../src/data/career-history.js";
import { codaRoutePath, codaWorkSlugs } from "../../src/data/coda-routes.js";
import { escapeHtml, relativeHref } from "../lib/html.js";

const copy = {
  en: {
    eyebrow: "About / Dhittawat",
    title: "Product thinking.\nHands-on design.",
    introduction: "I design products across asset operations, service marketplaces, and case management, connecting user needs and business rules to practical interfaces.",
    methodLabel: "How I work",
    method: "I frame the problem with stakeholders, map flows and exceptions, design the interface with engineering constraints in mind, and refine it through testing and feedback.",
    location: "Based in Bangkok, Thailand",
    portraitAlt: "Portrait of Dhittawat Thongkhum",
    careerLabel: "01 / Experience",
    careerTitle: "A practice built across\nproducts and operations.",
    currentNote: "Currently expanding my product design practice through system analysis.",
    selectedCase: "Read selected case",
    toolsLabel: "Tools & methods",
    educationLabel: "Education",
    toolsNote: "AI supports specification and design work; decisions are reviewed with the team.",
    educationDegree: "Visual Communication Design",
    interestsLabel: "02 / Beyond work",
    interestsTitle: "A few personal interests.",
    interests: [
      { category: "I play", title: "Go", note: "" },
      { category: "I’m interested in", title: "Sisyphus", note: "" },
      { category: "A book", title: "The Book of Why", note: "" }
    ],
    dreamLabel: "03 / What I hope to build",
    dreamStatus: "Personal research · Concept",
    dream: "A crisis coordination system that helps people work from shared information about events, resources, and missions.",
    dreamNote: "LCCS is a personal project I want to keep developing.",
    workLink: "Explore the three selected projects",
    contactLabel: "Let’s talk",
    linkedIn: "LinkedIn"
  },
  th: {
    eyebrow: "เกี่ยวกับ / Dhittawat",
    title: "คิดเป็นผลิตภัณฑ์\nลงมือออกแบบ",
    introduction: "ฉันออกแบบผลิตภัณฑ์ด้านการจัดการทรัพย์สิน marketplace บริการ และระบบจัดการเคส โดยเชื่อมความต้องการผู้ใช้กับกติกาธุรกิจให้เป็นหน้าจอที่ใช้งานได้",
    methodLabel: "วิธีทำงาน",
    method: "ฉันวางโจทย์ร่วมกับผู้เกี่ยวข้อง ทำ flow และกรณียกเว้น ออกแบบหน้าจอโดยคำนึงถึงข้อจำกัดทางเทคนิค แล้วปรับจากการทดสอบและ feedback",
    location: "ทำงานอยู่ที่กรุงเทพฯ ประเทศไทย",
    portraitAlt: "ภาพบุคคลของ Dhittawat Thongkhum",
    careerLabel: "01 / ประสบการณ์",
    careerTitle: "ประสบการณ์จากผลิตภัณฑ์\nและงานปฏิบัติการ",
    currentNote: "กำลังต่อยอดการออกแบบผลิตภัณฑ์ด้วยการวิเคราะห์ระบบ",
    selectedCase: "อ่านกรณีศึกษา",
    toolsLabel: "เครื่องมือและวิธีทำงาน",
    educationLabel: "การศึกษา",
    toolsNote: "ใช้ AI ช่วยงานข้อกำหนดและการออกแบบ โดยทบทวนการตัดสินใจร่วมกับทีม",
    educationDegree: "การออกแบบนิเทศศิลป์",
    interestsLabel: "02 / นอกเวลางาน",
    interestsTitle: "เรื่องที่ฉันสนใจ",
    interests: [
      { category: "เกมที่เล่น", title: "โกะ", note: "Go" },
      { category: "เรื่องที่ชอบ", title: "ซิซิฟัส", note: "Sisyphus" },
      { category: "หนังสือ", title: "The Book of Why", note: "" }
    ],
    dreamLabel: "03 / สิ่งที่อยากสร้าง",
    dreamStatus: "งานค้นคว้าส่วนตัว · แนวคิดที่อยากพัฒนาต่อ",
    dream: "ระบบประสานงานในภาวะวิกฤต ที่ช่วยให้ผู้เกี่ยวข้องทำงานจากข้อมูลเหตุการณ์ ทรัพยากร และภารกิจร่วมกัน",
    dreamNote: "LCCS เป็นโปรเจกต์ส่วนตัวที่ฉันอยากพัฒนาต่อ",
    workLink: "ดูสามโปรเจกต์ที่เลือกมา",
    contactLabel: "ติดต่อ",
    linkedIn: "LinkedIn"
  }
};

const scope = {
  "capability-expansion": {
    en: "System analysis, data rules, and AI-assisted specification and design work alongside a software engineer.",
    th: "ต่อยอดการวิเคราะห์ระบบ กติกาข้อมูล และใช้ AI ช่วยงานข้อกำหนดกับการออกแบบ ร่วมกับ software engineer"
  },
  depthfirst: {
    en: "UX/UI for WCF Digital and SSO Core, translating service requirements and legacy constraints into interfaces and shared standards.",
    th: "ออกแบบ UX/UI สำหรับ WCF Digital และ SSO Core แปลงข้อกำหนดบริการและข้อจำกัดระบบเดิมให้เป็นหน้าจอและมาตรฐานร่วม"
  },
  "codehard-consulting": {
    en: "Connected requirements, workflows, client review, and development handoff across product projects.",
    th: "เชื่อม requirement, workflow, การทบทวนกับลูกค้า และการส่งต่องานให้ทีมพัฒนา"
  },
  "q-chang": {
    en: "Customer, technician, and operations journeys in a home-service marketplace.",
    th: "ออกแบบ journey ของลูกค้า ช่าง และทีมปฏิบัติการใน marketplace บริการบ้าน"
  },
  wedev: {
    en: "Product-team collaboration, Agile delivery, junior mentoring, and operational dashboards.",
    th: "ทำงานร่วมกับทีมผลิตภัณฑ์ในกระบวนการ Agile ดูแลนักออกแบบรุ่นน้อง และออกแบบ dashboard สำหรับงานปฏิบัติการ"
  },
  benchachinda: {
    en: "GIS asset views and interfaces for telecom field teams across Thailand, Myanmar, and Laos.",
    th: "ออกแบบมุมมองทรัพย์สิน GIS และหน้าจอสำหรับทีมโทรคมนาคมภาคสนามในไทย เมียนมา และลาว"
  },
  clicknext: {
    en: "Structured workflows and interfaces for finance, trading, reporting, and registration products.",
    th: "จัดโครงสร้าง workflow และหน้าจอสำหรับผลิตภัณฑ์การเงิน การซื้อขาย การรายงาน และการลงทะเบียน"
  },
  digitech: {
    en: "Translated client requirements into web interfaces, user flows, and development handoff.",
    th: "แปลง requirement ของลูกค้าให้เป็นหน้าจอเว็บ user flow และเอกสารส่งต่อให้ทีมพัฒนา"
  }
};

const caseTitles = {
  "rescheduling-pain": "Q-CHANG · Change Date",
  "wcf-digital": "WCF Digital · Hospital Billing",
  "smart-asset-sa-ai": "PEC Smart Asset"
};

function renderCareerEntry(entry, route, text) {
  const caseLinks = entry.projects
    .filter((project) => codaWorkSlugs.includes(project.slug))
    .map((project) => `<a href="${relativeHref(route.path, codaRoutePath(route.locale, "work-detail", project.slug))}"><span class="co-about__sr-only">${escapeHtml(text.selectedCase)}: </span>${escapeHtml(caseTitles[project.slug])} <span aria-hidden="true">↗</span></a>`)
    .join("");

  return `<li class="co-about__career-row">
    <p class="co-about__period">${escapeHtml(localizedValue(entry.period, route.locale))}</p>
    <div class="co-about__position">
      <h3>${escapeHtml(entry.employer)}</h3>
      <p>${escapeHtml(localizedValue(entry.role, route.locale))}</p>
    </div>
    <div class="co-about__scope">
      <p>${escapeHtml(scope[entry.id][route.locale])}</p>
      ${caseLinks ? `<div class="co-about__case-links">${caseLinks}</div>` : ""}
    </div>
  </li>`;
}

export function renderCodaAbout(route) {
  const locale = route.locale;
  const text = copy[locale];
  const title = escapeHtml(text.title).replaceAll("\n", "<br>");
  const careerTitle = escapeHtml(text.careerTitle).replaceAll("\n", "<br>");
  const portraitSrc = relativeHref(route.path, `/${careerProfile.portrait.src}`);
  const tools = careerProfile.tools.map((tool) => tool === "Claude" ? "Codex" : tool);

  return `<div class="co-about">
    <section class="co-about__hero" aria-labelledby="coda-about-title">
      <p class="co-about__label">${escapeHtml(text.eyebrow)}</p>
      <h1 id="coda-about-title">${title}</h1>
      <div class="co-about__identity">
        <figure class="co-about__portrait">
          <img src="${portraitSrc}" width="124" height="156" alt="${escapeHtml(text.portraitAlt)}">
          <figcaption>${escapeHtml(careerProfile.name)}<span>${escapeHtml(text.location)}</span></figcaption>
        </figure>
        <div class="co-about__introduction">
          <p class="co-about__role">${escapeHtml(localizedValue(careerProfile.targetRole, locale))}</p>
          <p class="co-about__lead">${escapeHtml(text.introduction)}</p>
          <div class="co-about__method">
            <p class="co-about__label">${escapeHtml(text.methodLabel)}</p>
            <p>${escapeHtml(text.method)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="co-about__career" aria-labelledby="coda-career-title">
      <header class="co-about__section-heading">
        <p class="co-about__label">${escapeHtml(text.careerLabel)}</p>
        <div><h2 id="coda-career-title">${careerTitle}</h2><p>${escapeHtml(text.currentNote)}</p></div>
      </header>
      <ol class="co-about__career-list">${careerTimeline.map((entry) => renderCareerEntry(entry, route, text)).join("\n")}</ol>
      <div class="co-about__credentials">
        <div><p class="co-about__label">${escapeHtml(text.toolsLabel)}</p><p>${tools.map(escapeHtml).join(" · ")}</p><p class="co-about__muted">${escapeHtml(text.toolsNote)}</p></div>
        <div><p class="co-about__label">${escapeHtml(text.educationLabel)}</p><p>${escapeHtml(text.educationDegree)}</p><p class="co-about__muted">${escapeHtml(localizedValue(careerProfile.education.school, locale))} · ${escapeHtml(careerProfile.education.year)}</p></div>
      </div>
    </section>

    ${renderCodaConversation(route)}

    <section class="co-about__closing" aria-label="${escapeHtml(text.contactLabel)}">
      <a class="co-about__work-link" href="${relativeHref(route.path, codaRoutePath(locale, "work-index"))}">${escapeHtml(text.workLink)}<span aria-hidden="true">↗</span></a>
      <div class="co-about__contact"><p class="co-about__label">${escapeHtml(text.contactLabel)}</p><a href="mailto:${escapeHtml(careerProfile.email)}">${escapeHtml(careerProfile.email)}</a><a href="${escapeHtml(careerProfile.linkedIn)}" target="_blank" rel="noreferrer">${escapeHtml(text.linkedIn)} <span aria-hidden="true">↗</span></a></div>
    </section>
  </div>`;
}
