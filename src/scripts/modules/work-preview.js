export function initWorkPreview(root = document) {
  const cards = [...root.querySelectorAll("[data-work-card]")];
  const finePointer = window.matchMedia("(min-width: 62rem) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!cards.length || !finePointer.matches) return;

  const updatePosition = (event) => {
    const previewWidth = Math.min(304, window.innerWidth * 0.22);
    const previewHeight = previewWidth * (4 / 3);
    const gap = 28;
    let x = event.clientX + gap;

    if (x + previewWidth > window.innerWidth - gap) {
      x = event.clientX - previewWidth - gap;
    }

    x = Math.max(gap, Math.min(x, window.innerWidth - previewWidth - gap));
    const y = Math.max(previewHeight / 2 + gap, Math.min(event.clientY, window.innerHeight - previewHeight / 2 - gap));

    document.documentElement.style.setProperty("--work-preview-x", `${x}px`);
    document.documentElement.style.setProperty("--work-preview-y", `${y}px`);
  };

  cards.forEach((card) => {
    if (!reducedMotion.matches) {
      card.addEventListener("pointermove", updatePosition, { passive: true });
    }
    card.addEventListener("focusin", () => {
      document.documentElement.style.setProperty("--work-preview-x", "72vw");
      document.documentElement.style.setProperty("--work-preview-y", "50vh");
    });
  });
}
