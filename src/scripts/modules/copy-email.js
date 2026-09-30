function fallbackCopy(value) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();

  const copied = document.execCommand("copy");
  input.remove();
  return copied;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  return fallbackCopy(value);
}

export function initCopyEmail(root = document) {
  root.querySelectorAll("[data-copy-email-root]").forEach((container) => {
    const button = container.querySelector("[data-copy-email]");
    const value = container.querySelector("[data-copy-email-value]")?.textContent?.trim();
    const status = container.querySelector("[data-copy-email-status]");

    if (!button || !value || !status) return;

    button.addEventListener("click", async () => {
      const defaultLabel = button.dataset.copyLabel || button.textContent;

      try {
        const copied = await copyText(value);
        if (!copied) throw new Error("Copy command was rejected");

        const successLabel = button.dataset.copiedLabel || defaultLabel;
        button.textContent = successLabel;
        status.textContent = successLabel;
      } catch {
        const failedLabel = button.dataset.failedLabel || defaultLabel;
        button.textContent = failedLabel;
        status.textContent = `${failedLabel}: ${value}`;
      }

      window.setTimeout(() => {
        button.textContent = defaultLabel;
      }, 1800);
    });
  });
}
