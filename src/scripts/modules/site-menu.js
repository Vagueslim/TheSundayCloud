const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

export function initSiteMenu(root = document) {
  const menuRoot = root.querySelector("[data-site-menu]");

  if (!menuRoot) return;

  const openButton = menuRoot.querySelector("[data-site-menu-toggle]");
  const panel = menuRoot.querySelector("[data-site-menu-panel]");
  const closeButton = panel?.querySelector("[data-site-menu-close]");

  if (!openButton || !panel || !closeButton) return;

  let previousFocus = null;
  let backgroundState = [];

  const getFocusable = () =>
    [...panel.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
      (element) => !element.hasAttribute("inert") && element.offsetParent !== null
    );

  const setBackgroundInert = (shouldBeInert) => {
    if (shouldBeInert) {
      backgroundState = [...document.body.children]
        .filter((element) => element !== panel && element.tagName !== "SCRIPT")
        .map((element) => ({ element, wasInert: element.hasAttribute("inert") }));

      backgroundState.forEach(({ element }) => element.setAttribute("inert", ""));
      return;
    }

    backgroundState.forEach(({ element, wasInert }) => {
      if (!wasInert) element.removeAttribute("inert");
    });
    backgroundState = [];
  };

  const focusSafely = (target) => {
    if (!(target instanceof HTMLElement)) return false;

    if (!target.matches(FOCUSABLE_SELECTOR)) {
      target.setAttribute("tabindex", "-1");
    }

    target.focus({ preventScroll: true });
    return document.activeElement === target;
  };

  const closeMenu = ({ restoreFocus = true, nextFocus = null } = {}) => {
    menuRoot.classList.remove("is-menu-open");
    panel.classList.remove("is-menu-open");
    document.body.classList.remove("is-menu-open");
    openButton.setAttribute("aria-expanded", "false");
    setBackgroundInert(false);

    const focusTarget = nextFocus || (restoreFocus ? previousFocus : openButton);
    focusSafely(focusTarget);

    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
  };

  const openMenu = () => {
    previousFocus = document.activeElement;
    menuRoot.classList.add("is-menu-open");
    panel.classList.add("is-menu-open");
    document.body.classList.add("is-menu-open");
    openButton.setAttribute("aria-expanded", "true");
    setBackgroundInert(true);
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
    closeButton.focus();
  };

  const handleKeydown = (event) => {
    if (!panel.classList.contains("is-menu-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    const first = focusable.at(0);
    const last = focusable.at(-1);

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  openButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", () => closeMenu());
  panel.addEventListener("keydown", handleKeydown);
  panel.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      const url = new URL(link.href, window.location.href);
      const isSameDocument =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      const target = isSameDocument && url.hash ? document.querySelector(url.hash) : null;

      closeMenu({ restoreFocus: false, nextFocus: target });
    });
  });

  window.addEventListener("resize", () => {
    if (
      window.matchMedia("(min-width: 62rem)").matches &&
      panel.classList.contains("is-menu-open")
    ) {
      const visibleFallback = root.querySelector(".c-site-header__brand") || root.querySelector("main");
      closeMenu({ restoreFocus: false, nextFocus: visibleFallback });
    }
  });
}
