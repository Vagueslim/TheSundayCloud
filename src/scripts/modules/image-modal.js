export function initImageModal(root = document) {
  root.querySelectorAll("[data-flow-evidence]").forEach((evidenceRoot) => {
    const modal = evidenceRoot.querySelector("[data-image-modal]");
    const image = modal?.querySelector("[data-image-modal-image]");
    const title = modal?.querySelector("[data-image-modal-title]");
    const description = modal?.querySelector("[data-image-modal-description]");
    const originalLink = modal?.querySelector("[data-image-modal-original]");
    const closeButton = modal?.querySelector("[data-image-modal-close]");
    const triggers = evidenceRoot.querySelectorAll("[data-image-modal-trigger]");

    if (!modal || !image || !title || !description || !originalLink || !closeButton) return;

    let returnFocus = null;

    const closeModal = () => {
      if (modal.open) modal.close();
    };

    const openModal = (trigger) => {
      const { imageSrc, imageAlt, imageTitle, imageDescription } = trigger.dataset;

      if (!imageSrc || typeof modal.showModal !== "function") return;

      returnFocus = trigger;
      image.src = imageSrc;
      image.alt = imageAlt || imageTitle || "";
      title.textContent = imageTitle || "";
      description.textContent = imageDescription || "";
      originalLink.href = imageSrc;
      document.body.classList.add("is-image-modal-open");
      modal.showModal();
      closeButton.focus();
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => openModal(trigger));
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeModal();
    });

    modal.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      closeModal();
    });

    modal.addEventListener("click", (event) => {
      if (event.target !== modal) return;

      const bounds = modal.getBoundingClientRect();
      const clickedOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (clickedOutside) closeModal();
    });

    modal.addEventListener("close", () => {
      document.body.classList.remove("is-image-modal-open");
      image.removeAttribute("src");
      originalLink.removeAttribute("href");

      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    });
  });
}
