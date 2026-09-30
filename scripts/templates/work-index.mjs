import { routePath } from "../../src/data/routes.js";
import { site } from "../../src/data/site-content.js";
import { workItems } from "../../src/data/work-items.js";
import { escapeHtml, relativeHref } from "../lib/html.js";
import { renderWorkCard } from "./work-card.mjs";

export function renderWorkIndex(route) {
  const locale = route.locale;
  const nav = site.nav[locale];
  const homeHref = relativeHref(route.path, routePath(locale, "home"));
  const title = locale === "th" ? "ผลงาน / สารบัญ" : "Work / Index";
  return `
    <section class="p-work-index-hero" aria-labelledby="work-index-title">
      <h1 class="p-work-index-hero__title" id="work-index-title" data-reveal>${escapeHtml(title)}</h1>
      <p class="p-work-index-hero__breadcrumb"><a href="${homeHref}">${escapeHtml(nav.home)}</a> / ${escapeHtml(nav.work)}</p>
    </section>
    <section class="p-work-index-list" aria-label="${escapeHtml(locale === "th" ? "รายการผลงาน" : "Work list")}">
      ${workItems.map((item, index) => renderWorkCard({ item, route, headingLevel: 2, eager: index === 0 })).join("\n")}
    </section>`;
}
