export function initWcfSliders(root = document) {
  root.querySelectorAll('[data-wcf-slider]').forEach((slider) => {
    const thumbs = [...slider.querySelectorAll('[data-wcf-slide]')];
    const image = slider.querySelector('[data-wcf-image]');
    const count = slider.querySelector('[data-wcf-count]');
    if (!thumbs.length || !image || !count) return;

    let current = 0;
    const show = (index) => {
      current = (index + thumbs.length) % thumbs.length;
      const thumb = thumbs[current];
      image.src = thumb.querySelector('img').src;
      image.alt = thumb.dataset.slideAlt;
      count.textContent = `${current + 1}/${thumbs.length}`;
      thumbs.forEach((item, itemIndex) => item.setAttribute('aria-pressed', String(itemIndex === current)));
    };

    thumbs.forEach((thumb, index) => thumb.addEventListener('click', () => show(index)));
    slider.querySelector('[data-wcf-prev]')?.addEventListener('click', () => show(current - 1));
    slider.querySelector('[data-wcf-next]')?.addEventListener('click', () => show(current + 1));
    slider.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
  });
}
