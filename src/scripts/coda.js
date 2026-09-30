import { initSiteMenu } from './modules/site-menu.js';
import { initImageModal } from './modules/image-modal.js';
import { initWcfSliders } from './modules/wcf-slider.js';

initSiteMenu(document);
initWcfSliders(document);
// Use Vite's resolved image URL so enlarged evidence also works in a build.
document.querySelectorAll('[data-image-modal-trigger]').forEach(trigger => {
  const image = trigger.querySelector('img');
  if (image) trigger.dataset.imageSrc = image.currentSrc || image.src;
});
initImageModal(document);
