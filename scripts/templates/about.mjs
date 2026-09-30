import { careerProfile, careerTimeline, localizedValue, personalProjects } from "../../src/data/career-history.js";
import { routePath } from "../../src/data/routes.js";
import { site } from "../../src/data/site-content.js";
import { workItems } from "../../src/data/work-items.js";
import { escapeHtml, relativeHref } from "../lib/html.js";

function renderLanguage(language, locale) {
  return `<div><dt>${escapeHtml(localizedValue(language.label, locale))}</dt><dd>${escapeHtml(localizedValue(language.level, locale))}</dd></div>`;
}

function renderProject(project, route, copy) {
  const locale = route.locale;
  const item = project.slug ? workItems.find((candidate) => candidate.slug === project.slug) : null;
  const title = item ? item[locale].title : localizedValue(project.title, locale);
  const year = item ? item.year : project.year;
  const titleMarkup = item
    ? `<a href="${relativeHref(route.path, routePath(locale, "work-detail", item.slug))}">${escapeHtml(title)} <span aria-hidden="true">↗</span></a>`
    : `<span>${escapeHtml(title)}</span>`;

  return `<article class="p-about-project">
    <header class="p-about-project__header">
      <h4>${titleMarkup}</h4>
      <time>${escapeHtml(year)}</time>
    </header>
    <dl class="p-about-project__details">
      <div><dt>${escapeHtml(copy.businessLabel)}</dt><dd>${escapeHtml(localizedValue(project.business, locale))}</dd></div>
      <div><dt>${escapeHtml(copy.flowLabel)}</dt><dd>${escapeHtml(localizedValue(project.flow, locale))}</dd></div>
      <div><dt>${escapeHtml(copy.responsibilityLabel)}</dt><dd>${escapeHtml(localizedValue(project.responsibility, locale))}</dd></div>
    </dl>
  </article>`;
}

function renderCareerEntry(entry, route, copy, index) {
  const locale = route.locale;
  const projects = entry.projects.length
    ? `<div class="p-about-career__projects" aria-label="${escapeHtml(copy.projectLabel)}">
        ${entry.projects.map((project) => renderProject(project, route, copy)).join("\n")}
      </div>`
    : "";

  return `<article class="p-about-career__entry p-about-career__entry--${escapeHtml(entry.kind)}" data-reveal>
    <div class="p-about-career__period">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <time>${escapeHtml(localizedValue(entry.period, locale))}</time>
    </div>
    <div class="p-about-career__role">
      <h3>${escapeHtml(entry.employer)}</h3>
      <p>${escapeHtml(localizedValue(entry.role, locale))}</p>
      <div>${escapeHtml(localizedValue(entry.scope, locale))}</div>
    </div>
${projects ? `    ${projects}\n` : ""}
  </article>`;
}

export function renderAbout(route) {
  const locale = route.locale;
  const copy = site.about[locale];
  const nav = site.nav[locale];
  const profile = careerProfile;
  const homeHref = relativeHref(route.path, routePath(locale, "home"));
  const portraitSrc = relativeHref(route.path, `/${profile.portrait.src}`);

  return `
    <section class="p-about-hero" aria-labelledby="about-title">
      <p class="p-about-hero__eyebrow">${escapeHtml(copy.eyebrow)}</p>
      <h1 class="p-about-hero__title" id="about-title" data-reveal>${escapeHtml(localizedValue(profile.targetRole, locale))}</h1>
      <p class="p-about-hero__breadcrumb"><a href="${homeHref}">${escapeHtml(nav.home)}</a> / ${escapeHtml(nav.about)}</p>
      <figure class="p-about-hero__portrait" data-reveal>
        <img src="${portraitSrc}" width="${profile.portrait.width}" height="${profile.portrait.height}" alt="${escapeHtml(localizedValue(profile.portrait.alt, locale))}">
        <figcaption>${escapeHtml(copy.temporaryPortrait)}</figcaption>
      </div>
      <div class="p-about-hero__identity" data-reveal>
        <p class="p-about-hero__name">${escapeHtml(profile.name)}</p>
        <p class="p-about-hero__specialization">${escapeHtml(localizedValue(profile.specialization, locale))}</p>
        <p class="p-about-hero__proposition">${escapeHtml(localizedValue(profile.valueProposition, locale))}</p>
      </figure>
      <dl class="p-about-hero__facts" data-reveal>
        <div><dt>${escapeHtml(copy.locationLabel)}</dt><dd>${escapeHtml(localizedValue(profile.availability, locale))}</dd></div>
        <div><dt>${escapeHtml(copy.languageLabel)}</dt><dd><dl class="p-about-hero__languages">${profile.languages.map((language) => renderLanguage(language, locale)).join("")}</dl></dd></div>
        <div><dt>${escapeHtml(copy.focusLabel)}</dt><dd>${escapeHtml(localizedValue(profile.specialization, locale))}</dd></div>
      </dl>
    </section>

    <section class="p-about-career" aria-labelledby="career-title">
      <header class="p-about-career__heading" data-reveal>
        <p>${escapeHtml(copy.experienceLabel)}</p>
        <h2 id="career-title">${escapeHtml(copy.experienceTitle)}</h2>
      </header>
      <div class="p-about-career__list">
        ${careerTimeline.map((entry, index) => renderCareerEntry(entry, route, copy, index)).join("\n")}
      </div>
    </section>

    <section class="p-about-personal" aria-labelledby="personal-projects-title">
      <header class="p-about-personal__heading" data-reveal>
        <p>${escapeHtml(copy.personalProjectLabel)}</p>
        <h2 id="personal-projects-title">${escapeHtml(copy.personalProjectTitle)}</h2>
      </header>
      <div class="p-about-personal__projects" aria-label="${escapeHtml(copy.personalProjectLabel)}">
        ${personalProjects.map((project) => renderProject(project, route, copy)).join("\n")}
      </div>
    </section>

    <section class="p-about-qualifications" aria-label="${escapeHtml(locale === "th" ? "ความสามารถและการศึกษา" : "Capabilities and education")}">
      <article class="p-about-qualifications__block" data-reveal>
        <p class="p-about-qualifications__label">${escapeHtml(copy.capabilityLabel)}</p>
        <ul>${profile.capabilities.map((item) => `<li>${escapeHtml(localizedValue(item, locale))}</li>`).join("")}</ul>
      </article>
      <article class="p-about-qualifications__block" data-reveal>
        <p class="p-about-qualifications__label">${escapeHtml(copy.toolsLabel)}</p>
        <ul>${[...profile.tools, ...profile.methods.map((item) => localizedValue(item, locale))].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="p-about-qualifications__block p-about-qualifications__block--education" data-reveal>
        <p class="p-about-qualifications__label">${escapeHtml(copy.educationLabel)}</p>
        <h2>${escapeHtml(localizedValue(profile.education.degree, locale))}</h2>
        <p>${escapeHtml(localizedValue(profile.education.field, locale))}</p>
        <p>${escapeHtml(localizedValue(profile.education.school, locale))} · ${escapeHtml(profile.education.year)}</p>
        <p>${escapeHtml(copy.gpaLabel)} ${escapeHtml(profile.education.gpa)}</p>
      </article>
    </section>

    <section class="p-about-contact" id="contact" aria-labelledby="about-contact-title">
      <p class="p-about-contact__label">${escapeHtml(copy.contactLabel)}</p>
      <h2 id="about-contact-title" data-reveal>${escapeHtml(copy.contactTitle)}</h2>
      <div class="p-about-contact__actions" data-reveal>
        <div class="p-about-contact__email" data-copy-email-root>
          <span data-copy-email-value>${escapeHtml(profile.email)}</span>
          <button type="button" data-copy-email data-copy-label="${escapeHtml(copy.copyEmail)}" data-copied-label="${escapeHtml(copy.copiedEmail)}" data-failed-label="${escapeHtml(copy.copyFailed)}">${escapeHtml(copy.copyEmail)}</button>
          <span class="u-visually-hidden" role="status" aria-live="polite" data-copy-email-status></span>
        </div>
        <a class="c-button" href="${escapeHtml(profile.linkedIn)}" target="_blank" rel="noreferrer">${escapeHtml(copy.linkedIn)}</a>
      </div>
    </section>`;
}
