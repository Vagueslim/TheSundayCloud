import { posix } from "node:path";

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function relativeHref(fromPath, target) {
  if (/^(?:https?:|mailto:|tel:)/.test(target)) return target;

  const [targetPathRaw, hash = ""] = target.split("#");
  const targetPath = targetPathRaw || fromPath;

  if (targetPath === fromPath) return hash ? `#${hash}` : "./";

  const relative = posix.relative(fromPath, targetPath) || ".";
  const withSlash = targetPath.endsWith("/") && !relative.endsWith("/") ? `${relative}/` : relative;
  const normalized = withSlash.startsWith(".") ? withSlash : `./${withSlash}`;

  return hash ? `${normalized}#${hash}` : normalized;
}

export function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function paragraphs(items, className = "") {
  return items
    .map((item) => `<p${className ? ` class="${escapeHtml(className)}"` : ""}>${escapeHtml(item)}</p>`)
    .join("\n");
}

export function list(items, className = "") {
  return `<ul${className ? ` class="${escapeHtml(className)}"` : ""}>${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}
