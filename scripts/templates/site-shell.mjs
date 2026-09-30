import { alternateRoute, routePath } from "../../src/data/routes.js";
import { site } from "../../src/data/site-content.js";
import { escapeHtml, joinClasses, relativeHref } from "../lib/html.js";

function currentAttribute(active) {
  return active ? ' aria-current="page"' : "";
}

function externalAttribute(href) {
  return href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : "";
}

function consultation(route) {
  if (route.page === "about") return "";

  const locale = route.locale;
  const copy = site.common[locale];
  const emailButton = site.email
    ? `<a class="c-button c-button--light" href="mailto:${escapeHtml(site.email)}">Email</a>`
    : "";

  return `
    <section class="p-consultation" id="contact" aria-labelledby="contact-title">
      <div class="p-consultation__copy" data-reveal>
        <h2 class="p-consultation__title" id="contact-title">${escapeHtml(copy.contactTitle)}</h2>
        <p>${escapeHtml(copy.contactCopy)}</p>
      </div>
      <div class="p-consultation__action" data-reveal>
        ${emailButton}
        <a class="c-button" href="${escapeHtml(site.linkedin)}" target="_blank" rel="noreferrer">${escapeHtml(copy.linkedin)}</a>
      </div>
    </section>`;
}

export function renderShell({ route, meta, body, active = "" }) {
  const locale = route.locale;
  const nav = site.nav[locale];
  const common = site.common[locale];
  const alternate = alternateRoute(route);
  const href = (page, slug = "") => relativeHref(route.path, routePath(locale, page, slug));
  const alternateHref = relativeHref(route.path, alternate.path);
  const brandAsset = relativeHref(route.path, "/src/assets/images/brand/logo.png");
  const favicon = relativeHref(route.path, "/favicon.png");
  const stylesheet = relativeHref(route.path, "/src/styles/main.css");
  const script = relativeHref(route.path, "/src/scripts/site.js");
  const consultationMarkup = consultation(route);
  const homeHref = href("home");
  const servicesHref = relativeHref(route.path, `${routePath(locale, "home")}#services`);
  const contactHref = relativeHref(route.path, `${routePath(locale, "home")}#contact`);
  const isWork = active === "work" || route.page === "work-detail";
  const primaryLinks = [
    { label: nav.about, href: href("about"), key: "about" },
    { label: nav.work, href: href("work-index"), key: "work" },
    { label: nav.services, href: servicesHref, key: "services" },
    { label: nav.contact, href: contactHref, key: "contact" }
  ];
  const mobileLinks = [
    { label: nav.home, href: homeHref, key: "home" },
    ...primaryLinks
  ];
  const emailFooter = site.email
    ? `<li><a class="c-site-footer__link" href="mailto:${escapeHtml(site.email)}">Email</a></li>`
    : "";
  const filePreviewMessage = locale === "th"
    ? "โหมดเปิดไฟล์โดยตรง: ใช้ start-local.cmd ที่โฟลเดอร์หลัก เพื่อดูเมนู แอนิเมชัน และแก้ไขแบบ Live Reload"
    : "Direct-file preview: run start-local.cmd from the project root for menus, motion, and live reload.";

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(meta.description)}">
    <link rel="icon" type="image/png" href="${favicon}">
    <link rel="alternate" hreflang="${alternate.locale}" href="${alternateHref}" vite-ignore>
    <link rel="stylesheet" href="${stylesheet}">
    <style>
      #file-preview-warning{display:none}
      .is-file-preview #file-preview-warning{position:fixed;right:1rem;bottom:1rem;z-index:9999;display:block;max-width:34rem;padding:1rem 1.25rem;color:#fff;background:#141414;box-shadow:0 1rem 3rem rgb(0 0 0 / 22%);font:600 14px/1.5 Arial,sans-serif}
    </style>
    <script>if(location.protocol==="file:")document.documentElement.classList.add("is-file-preview")</script>
    <title>${escapeHtml(meta.title)}</title>
  </head>
  <body class="${joinClasses("l-grid-field", `is-locale-${locale}`)}" data-site-menu>
    <p id="file-preview-warning" role="status">${escapeHtml(filePreviewMessage)}</p>
    <a class="u-visually-hidden" href="#main-content">${escapeHtml(common.skip)}</a>

    <header class="c-site-header" data-site-header>
      <div class="c-site-header__inner">
        <a class="c-site-header__brand" href="${homeHref}" aria-label="${escapeHtml(site.person)} — ${escapeHtml(nav.home)}"${currentAttribute(active === "home")}>
          <img class="c-site-header__logo" src="${brandAsset}" width="184" height="81" alt="dhittawat">
          <span class="c-site-header__descriptor">${escapeHtml(site.role[locale])}<br>${escapeHtml(site.focus[locale])}</span>
        </a>
        <nav class="c-site-header__nav" aria-label="${locale === "th" ? "เมนูหลัก" : "Primary navigation"}">
          ${primaryLinks.map((item) => `<a class="c-site-header__link" href="${item.href}"${currentAttribute(item.key === active || (item.key === "work" && isWork))}>${escapeHtml(item.label)}</a>`).join("\n          ")}
          <a class="c-language-switch" href="${alternateHref}" hreflang="${alternate.locale}" aria-label="${escapeHtml(common.languageLabel)}"><span lang="${alternate.locale}">${escapeHtml(common.language)}</span></a>
          <a class="c-site-header__cta" href="${escapeHtml(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </nav>
        <button class="c-site-header__menu-button" type="button" aria-controls="site-menu-panel" aria-expanded="false" data-site-menu-toggle>
          ${escapeHtml(nav.menu)}
        </button>
      </div>
    </header>

    <aside class="c-site-menu" id="site-menu-panel" role="dialog" aria-modal="true" aria-label="${locale === "th" ? "เมนูสำหรับมือถือ" : "Mobile navigation"}" aria-hidden="true" inert data-site-menu-panel>
      <div class="c-ambient-background" aria-hidden="true"></div>
      <div class="c-site-menu__inner">
        <div class="c-site-menu__top">
          <img class="c-site-menu__logo" src="${brandAsset}" width="184" height="81" alt="dhittawat">
          <button class="c-site-menu__close" type="button" data-site-menu-close>${escapeHtml(nav.close)}</button>
        </div>
        <nav class="c-site-menu__nav" aria-label="${locale === "th" ? "ลิงก์เมนูมือถือ" : "Mobile navigation links"}">
          <ul class="c-site-menu__list">
            ${mobileLinks.map((item, index) => `<li><a class="c-site-menu__link" href="${item.href}"${currentAttribute(item.key === active || (item.key === "work" && isWork))}>${escapeHtml(item.label)} <span>${String(index + 1).padStart(2, "0")}</span></a></li>`).join("\n            ")}
          </ul>
        </nav>
        <div class="c-site-menu__meta">
          <span>${escapeHtml(site.focus[locale])}</span>
          <a href="${alternateHref}" hreflang="${alternate.locale}" aria-label="${escapeHtml(common.languageLabel)}"><span lang="${alternate.locale}">${escapeHtml(common.language)}</span> ↗</a>
        </div>
      </div>
    </aside>

    <main id="main-content" tabindex="-1">
      ${body}${consultationMarkup ? `\n      ${consultationMarkup}` : ""}
    </main>

    <footer class="c-site-footer">
      <div class="c-site-footer__grid">
        <a class="c-site-footer__brand" href="${homeHref}"><img src="${brandAsset}" width="184" height="81" alt="dhittawat"></a>
        <div class="c-site-footer__group">
          <p class="c-site-footer__group-title">${escapeHtml(locale === "th" ? "สำรวจ" : "Explore")}</p>
          <ul class="c-site-footer__links"><li><a class="c-site-footer__link" href="${href("about")}">${escapeHtml(nav.about)}</a></li><li><a class="c-site-footer__link" href="${href("work-index")}">${escapeHtml(nav.work)}</a></li></ul>
        </div>
        <div class="c-site-footer__group">
          <p class="c-site-footer__group-title">${escapeHtml(locale === "th" ? "ความสามารถ" : "Practice")}</p>
          <ul class="c-site-footer__links"><li><a class="c-site-footer__link" href="${servicesHref}">${escapeHtml(nav.services)}</a></li><li>${escapeHtml(site.focus[locale])}</li></ul>
        </div>
        <div class="c-site-footer__group">
          <p class="c-site-footer__group-title">${escapeHtml(nav.contact)}</p>
          <ul class="c-site-footer__links">${emailFooter}<li><a class="c-site-footer__link" href="${escapeHtml(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ↗</a></li></ul>
        </div>
        <div class="c-site-footer__group">
          <p class="c-site-footer__group-title">${escapeHtml(locale === "th" ? "ที่ตั้ง" : "Location")}</p>
          <ul class="c-site-footer__links"><li>${escapeHtml(common.location)}</li><li>UTC +07:00</li></ul>
        </div>
        <div class="c-site-footer__bottom"><span>${escapeHtml(common.availability)}</span><span>${escapeHtml(common.copyright)}</span></div>
      </div>
    </footer>

    <script type="module" src="${script}"></script>
  </body>
</html>
`;
}
