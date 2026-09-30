import { escapeHtml as e, relativeHref } from "../lib/html.js";
import { changeDate } from "../../src/data/change-date.js";
import { changeDateStations } from "../../src/data/change-date-stations.js";

export function renderChangeDate(item, route) {
  const c = changeDate[route.locale];
  const n = changeDate.counts;
  const process = changeDateStations[route.locale];
  const stations = process.steps.map(([title, description, alt], i) => {
    const number = String(i + 1).padStart(2, '0');
    const image = relativeHref(route.path, `/src/assets/images/work/rescheduling-pain/stations/station-${number}.webp`);
    return `<li class="qcase-station"><div class="qcase-station-copy"><span class="qcase-station-number" aria-hidden="true">${number}</span><h3>${e(title)}</h3><p>${e(description)}</p></div><figure class="qcase-station-art"><img src="${image}" alt="${e(alt)}" width="246" height="246" loading="lazy"></figure></li>`;
  }).join('');
  const ids = ["signal", "backstage", "window", "changes", "reflection"];
  const heading = (i, title, text) => `<header class="qcase-section-head"><p class="qcase-label">0${i + 1} / ${e(c.chapters[i])}</p><h2>${e(title)}</h2>${text ? `<p>${e(text)}</p>` : ""}</header>`;
  const sourceImages = c.sources.map(([file, alt, caption]) => {
    const href = relativeHref(route.path, `/src/assets/images/work/rescheduling-pain/${file}`);
    return `<figure><a href="${href}" target="_blank" rel="noopener" aria-label="${e(c.openSource)}: ${e(alt)}"><img src="${href}" alt="${e(alt)}" width="${file === 'research-channels.png' ? 2553 : 2688}" height="${file === 'research-channels.png' ? 1301 : 1512}" loading="lazy"><span>${e(c.openSource)} ↗</span></a><figcaption>${e(caption)}</figcaption></figure>`;
  }).join("");
  const cover = relativeHref(route.path, `/${item.cover.src}`);
  return `<article class="qcase">
    <nav class="qcase-breadcrumb" aria-label="${route.locale === 'th' ? 'เส้นทางหน้า' : 'Breadcrumb'}"><a href="${relativeHref(route.path, route.locale === 'th' ? '/th/' : '/')}">${route.locale === 'th' ? 'หน้าแรก' : 'Home'}</a> / <a href="${relativeHref(route.path, route.locale === 'th' ? '/th/work/' : '/work/')}">${route.locale === 'th' ? 'ผลงาน' : 'Work'}</a> / Change Date</nav>
    <header class="qcase-hero">
      <div class="qcase-hero-copy"><p class="p-work-detail__hero-index">03 / 11</p><p class="qcase-label">${e(c.kicker)}</p><h1>${e(c.title)}</h1><p class="qcase-statement">${e(c.statement)}</p><p class="qcase-summary">${e(c.summary)}</p><a class="qcase-jump" href="#process">${e(c.jump)} <span aria-hidden="true">↓</span></a></div>
      <figure class="qcase-hero-art"><img src="${cover}" alt="${e(item.cover.alt[route.locale])}" width="1120" height="1440" fetchpriority="high"></figure>
    </header>
    <div class="qcase-role"><div><p class="qcase-label">${e(c.roleLabel)}</p><strong>${e(c.role)}</strong><p>${e(c.context)}</p></div><p>${e(c.scope)}</p></div>
    <nav class="qcase-index" aria-label="${route.locale === 'th' ? 'สารบัญเคส' : 'Case contents'}"><a href="#process">${e(process.nav)}</a>${c.chapters.map((x,i)=>`<a href="#${ids[i]}"><span>0${i+1}</span>${e(x)}</a>`).join('')}</nav>
    <section class="qcase-section qcase-process" id="process" aria-labelledby="process-title"><header class="qcase-process-head"><p class="qcase-label">${e(process.label)}</p><h2 id="process-title">${e(process.title)}</h2><p>${e(process.intro)}</p></header><ol class="qcase-stations">${stations}</ol><p class="qcase-note">${e(process.note)}</p></section>
    <section class="qcase-section" id="signal">
      ${heading(0,c.evidenceTitle,c.evidenceCopy)}
      <div class="qcase-evidence"><div class="qcase-total"><strong>${n.total.toLocaleString('en-US')}</strong><span>${e(c.totalLabel)}</span><p>${e(c.period)}</p></div><div class="qcase-breakdown"><div class="qcase-bar" aria-hidden="true"><span style="width:${n.admin/n.total*100}%"></span></div><dl><div><dt><i class="qcase-dot" aria-hidden="true"></i>${e(c.adminLabel)}</dt><dd>${n.admin.toLocaleString('en-US')} <span>≈ 89%</span></dd></div><div><dt><i class="qcase-dot qcase-dot--light" aria-hidden="true"></i>${e(c.customerLabel)}</dt><dd>${n.customer} <span>≈ 11%</span></dd></div></dl></div></div>
      <p class="qcase-note">${e(c.countNote)}</p>
    </section>
    <section class="qcase-section qcase-section--dark" id="backstage">
      ${heading(1,c.chainTitle,c.chainCopy)}
      <ol class="qcase-chain">${c.chain.map(([actor,action],i)=>`<li><span class="qcase-step">0${i+1}</span><h3>${e(actor)}</h3><p>${e(action)}</p></li>`).join('')}</ol>
      <p class="qcase-note">${e(c.exception)}</p>
      <div class="qcase-reframe"><p class="qcase-label">${e(c.reframeLabel)}</p><h3>${e(c.reframe)}</h3><p>${e(c.reframeCopy)}</p></div>
    </section>
    <section class="qcase-section" id="window">
      ${heading(2,c.windowTitle,c.windowCopy)}
      <p class="qcase-status">${e(c.hypothesis)}</p>
      <ol class="qcase-timeline">${c.timeline.map(([day,title,desc])=>`<li><strong>${e(day)}</strong><h3>${e(title)}</h3><p>${e(desc)}</p></li>`).join('')}</ol>
      <p class="qcase-note">${e(c.windowNote)}</p>
    </section>
    <section class="qcase-section qcase-section--paper" id="changes">
      ${heading(3,c.changesTitle,c.changesIntro)}
      <div class="qcase-changes">${c.changes.map(([num,actor,title,text])=>`<section><span class="qcase-change-number">${num}</span><p class="qcase-label">${e(actor)}</p><h3>${e(title)}</h3><p>${e(text)}</p></section>`).join('')}</div>
      <aside class="qcase-calendar"><span aria-hidden="true">＋</span><div><h3>${e(c.calendarTitle)}</h3><p>${e(c.calendarCopy)}</p></div></aside>
      <aside class="qcase-observation"><p class="qcase-label">${e(c.observationLabel)}</p><p>${e(c.observation)}</p></aside>
    </section>
    <section class="qcase-section" id="reflection">${heading(4,c.reflectionTitle,c.reflection)}</section>
    <section class="qcase-section qcase-sources" aria-labelledby="qcase-sources"><h2 id="qcase-sources">${e(c.sourcesTitle)}</h2><p>${e(c.sourcesCopy)}</p><div class="qcase-source-grid">${sourceImages}</div><p class="qcase-note">${e(c.sourcesNote)}</p></section>
  </article>`;
}
