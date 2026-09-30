import { routePath } from "../../src/data/routes.js";
import { site } from "../../src/data/site-content.js";
import { featuredWork } from "../../src/data/work-items.js";
import { escapeHtml, relativeHref } from "../lib/html.js";
import { renderWorkCard } from "./work-card.mjs";

export function renderHome(route) {
  const locale = route.locale;
  const copy = site.home[locale];
  const common = site.common[locale];
  const aboutHref = relativeHref(route.path, routePath(locale, "about"));
  const workHref = relativeHref(route.path, routePath(locale, "work-index"));
  const heroImage = relativeHref(route.path, "/src/assets/images/home/hero-construction-mark.png");
  const heroDiagram = relativeHref(route.path, "/src/assets/images/home/hero-system-diagram.svg");
  const interludeImage = relativeHref(route.path, "/src/assets/images/work/wcf-digital/hero-wide.jpg");
  const quoteLead = escapeHtml(copy.quoteLead);
  const renderedQuoteLead = locale === "th"
    ? quoteLead.replace("หน้าจอ", '<span class="p-home-hero__keep-together">หน้าจอ</span>')
    : quoteLead;
  const serviceImages = featuredWork.slice(0, 4).map((item) => ({
    href: relativeHref(route.path, `/${item.cover.src}`),
    alt: item.cover.alt[locale],
    width: item.cover.width,
    height: item.cover.height
  }));

  return `
    <section class="p-home-hero" aria-labelledby="home-title">
      <figure class="p-home-hero__artwork-space">
        <div class="p-home-hero__artwork-panel p-home-hero__artwork-panel--source">
          <img class="p-home-hero__artwork p-home-hero__artwork--source" src="${heroImage}" width="1853" height="1375" alt="${escapeHtml(locale === "th" ? "เครื่องหมายเชิงเรขาคณิตและเส้นโครงสร้างของนักออกแบบ" : "Geometric designer mark with construction lines")}" fetchpriority="high">
        </div>
        <div class="p-home-hero__artwork-panel p-home-hero__artwork-panel--diagram">
          <img class="p-home-hero__artwork p-home-hero__artwork--diagram" src="${heroDiagram}" width="739" height="743" alt="${escapeHtml(locale === "th" ? "ไดอะแกรมระบบที่เชื่อมธุรกิจ เทคโนโลยี การออกแบบ และการปฏิบัติการ" : "Animated systems diagram connecting business, technology, design, and operations")}">
        </div>
      </figure>
      <div class="p-home-hero__statement">
        <h1 class="p-home-hero__title" id="home-title">${escapeHtml(copy.hero).replace("\n", "<br>")}</h1>
        <blockquote class="p-home-hero__quote" data-reveal>
          <p class="p-home-hero__quote-lead">${renderedQuoteLead}</p>
          <p class="p-home-hero__quote-detail">${escapeHtml(copy.quoteDetail)}</p>
        </blockquote>
      </div>
      <p class="p-home-hero__note">${escapeHtml(copy.heroNote).replace("\n", "<br>")}</p>
    </section>

    <section class="p-home-work" aria-labelledby="featured-title">
      <div class="c-section-heading" data-reveal>
        <p class="c-section-heading__eyebrow">${escapeHtml(common.selectedWork)}</p>
        <h2 class="c-section-heading__title" id="featured-title">${escapeHtml(copy.workTitle)}</h2>
        <p class="c-section-heading__intro">${escapeHtml(copy.workIntro)}</p>
      </div>
      <div class="p-home-work__rows">
        ${featuredWork.map((item, index) => renderWorkCard({ item, route, headingLevel: 3, eager: index === 0 })).join("\n")}
      </div>
      <div class="p-home-work__more" data-reveal><a class="c-text-link" href="${workHref}">${escapeHtml(common.allWork)}</a></div>
    </section>

    <section class="p-home-interlude" aria-labelledby="interlude-title">
      <img class="p-home-interlude__image" src="${interludeImage}" width="2520" height="1080" alt="${escapeHtml(locale === "th" ? "หน้าจอระบบ WCF Digital แบบกว้าง" : "Wide WCF Digital system interface")}" loading="lazy">
      <div class="p-home-interlude__content">
        <h2 class="p-home-interlude__title" id="interlude-title" data-reveal>${escapeHtml(locale === "th" ? "ผู้ใช้สัมผัสระบบผ่านการตัดสินใจทีละครั้ง" : "A system is experienced one decision at a time.")}</h2>
      </div>
    </section>

    <section class="p-home-services" id="services" aria-labelledby="services-title">
      <div class="c-section-heading" data-reveal>
        <p class="c-section-heading__eyebrow">${escapeHtml(copy.servicesLabel)}</p>
        <h2 class="c-section-heading__title" id="services-title">${escapeHtml(copy.servicesTitle)}</h2>
        <p class="c-section-heading__intro">${escapeHtml(copy.servicesIntro)}</p>
      </div>
      ${copy.serviceGroups.map((service, index) => {
          const media = serviceImages[index % serviceImages.length];
        return `<article class="p-home-services__item" data-reveal>
          <figure class="p-home-services__media"><img src="${media.href}" width="${media.width}" height="${media.height}" alt="${escapeHtml(media.alt)}" loading="lazy"></figure>
          <div class="p-home-services__content">
            <span class="p-home-services__index">${escapeHtml(service.index)} / ${escapeHtml(copy.servicesLabel)}</span>
            <h3 class="p-home-services__title">${escapeHtml(service.title)}</h3>
            <p class="p-home-services__copy">${escapeHtml(service.copy)}</p>
            <a class="c-text-link" href="${aboutHref}">${escapeHtml(site.nav[locale].about)}</a>
          </div>
        </article>`;
      }).join("\n")}
    </section>

    <section class="p-home-value" aria-labelledby="value-title">
      <p class="p-home-value__label">${escapeHtml(copy.principleLabel)}</p>
      <h2 class="p-home-value__title" id="value-title" data-reveal>${escapeHtml(copy.principle)}</h2>
    </section>

    <section class="p-home-purpose" aria-labelledby="purpose-title">
      <p class="p-home-purpose__label">${escapeHtml(copy.purposeLabel)}</p>
      <h2 class="p-home-purpose__title" id="purpose-title" data-reveal>${escapeHtml(copy.purpose)}</h2>
      <p class="p-home-purpose__copy" data-reveal>${escapeHtml(copy.purposeCopy)}</p>
    </section>`;
}
