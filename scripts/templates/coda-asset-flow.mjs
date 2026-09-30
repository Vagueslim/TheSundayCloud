import { escapeHtml as e, relativeHref } from '../lib/html.js';
import { workItems } from '../../src/data/work-items.js';

// Reuse the original portfolio's bilingual content and evidence images.
export function renderCodaAssetFlow(route) {
  const flow = workItems.find(item => item.slug === 'smart-asset-sa-ai').coverFlow;
  const locale = route.locale;
  const open = locale === 'th' ? 'ขยายภาพ' : 'Enlarge image';
  const nodes = flow.nodes.map(node => {
    const src = relativeHref(route.path, `/${node.media.src}`);
    const edge = flow.edges.find(edge => edge.from === node.id);
    const next = edge && flow.nodes.find(candidate => candidate.id === edge.to);
    return `<li id="asset-flow-${node.id}" class="co-asset-flow__node co-asset-flow__node--${node.id}" data-asset-flow-node="${node.id}">
      <figure><button type="button" class="co-asset-flow__image" aria-haspopup="dialog" aria-label="${e(`${open}: ${node.title[locale]}`)}" data-image-modal-trigger data-image-src="${src}" data-image-alt="${e(node.media.alt[locale])}" data-image-title="${e(node.title[locale])}" data-image-description="${e(node.description[locale])}">
        <img src="${src}" width="${node.media.width}" height="${node.media.height}" alt="${e(node.media.alt[locale])}" loading="lazy"><span aria-hidden="true">${e(open)} ↗</span>
      </button><figcaption><span class="co-asset-flow__number">${String(node.stage).padStart(2, '0')}</span><strong>${e(node.title[locale])}</strong><p>${e(node.description[locale])}</p></figcaption></figure>
      ${edge ? `<a class="co-asset-flow__edge" href="#asset-flow-${next.id}"><span>${e(edge.label[locale])}<small>${String(next.stage).padStart(2, '0')} / ${e(next.title[locale])}</small></span><span class="co-asset-flow__arrow" aria-hidden="true">→</span></a>` : ''}
    </li>`;
  }).join('');
  return `<section class="co-asset-flow" aria-labelledby="co-asset-flow-title" data-asset-site-flow>
    <header class="co-asset-flow__intro"><p class="co-asset-flow__kicker">Master Asset / Site operation</p><h2 id="co-asset-flow-title">${e(flow.heading[locale])}</h2><p class="co-asset-flow__description">${e(flow.description[locale])}</p></header>
    <div class="co-asset-flow__lanes" aria-hidden="true"><span>${e(flow.lanes.master[locale])}</span><span>${e(flow.lanes.operations[locale])}</span></div>
    <ol class="co-asset-flow__nodes">${nodes}</ol>
  </section>`;
}
