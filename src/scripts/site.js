import { initCopyEmail } from "./modules/copy-email.js";
import { initImageModal } from "./modules/image-modal.js";
import { initReveal } from "./modules/reveal-on-scroll.js";
import { initSiteMenu } from "./modules/site-menu.js";
import { initWorkPreview } from "./modules/work-preview.js";

document.documentElement.classList.add("has-js");

const root = document;

initSiteMenu(root);
initReveal(root);
initWorkPreview(root);
initCopyEmail(root);
initImageModal(root);

const header = root.querySelector("[data-site-header]");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
