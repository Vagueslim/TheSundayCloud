import { routePath } from "../../src/data/routes.js";
import { escapeHtml, relativeHref } from "../lib/html.js";

export function renderWorkCard({ item, route, headingLevel = 2, eager = false }) {
  const locale = route.locale;
  const content = item[locale];
  const detailHref = relativeHref(route.path, routePath(locale, "work-detail", item.slug));
  const coverHref = relativeHref(route.path, `/${item.cover.src}`);
  const Heading = `h${headingLevel}`;
  const index = String(item.order).padStart(2, "0");

  return `<article class="c-work-card" data-work-card data-reveal>
    <a class="c-work-card__link" href="${detailHref}" aria-label="${escapeHtml(`${content.title}: ${content.listStatement}`)}">
      <figure class="c-work-card__media" aria-hidden="true">
        <img src="${coverHref}" width="${item.cover.width}" height="${item.cover.height}" alt="" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>
      </figure>
      <div class="c-work-card__meta">
        <span class="c-work-card__index">${index} / ${escapeHtml(item.year)}</span>
        <span class="c-work-card__client">${escapeHtml(item.facts.client[locale])}</span>
      </div>
      <${Heading} class="c-work-card__statement">${escapeHtml(content.listStatement)}</${Heading}>
      <div class="c-work-card__details">
        <p class="c-work-card__title">${escapeHtml(content.cardTitle ?? content.title)}</p>
        <p class="c-work-card__tags">${item.facts.domain[locale].map((tag) => `#${escapeHtml(tag)}`).join(" · ")}</p>
        <span class="c-work-card__arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  </article>`;
}
