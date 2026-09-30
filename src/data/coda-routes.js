import { locales, routeFile } from "./routes.js";
import { codaProjects } from "./coda-projects.js";

// One ordered selection drives cards, case navigation, and the Coda route set.
export const codaWorkSlugs = codaProjects.map((project) => project.slug);

export function codaRoutePath(locale, page, slug = "") {
  const prefix = locale === "th" ? "/th/coda" : "/coda";
  if (page === "home") return `${prefix}/`;
  if (page === "about") return `${prefix}/about/`;
  if (page === "work-index") return `${prefix}/work/`;
  if (page === "work-detail") {
    if (!codaWorkSlugs.includes(slug)) throw new Error(`Unknown Coda work: ${slug}`);
    return `${prefix}/work/${slug}/`;
  }
  throw new Error(`Unknown Coda page type: ${page}`);
}

export const codaRoutes = locales.flatMap((locale) => {
  const core = [
    { locale, page: "home", slug: "", key: `coda-${locale}-home` },
    { locale, page: "about", slug: "", key: `coda-${locale}-about` },
    { locale, page: "work-index", slug: "", key: `coda-${locale}-work` }
  ];
  const details = codaWorkSlugs.map((slug, index) => ({
    locale,
    page: "work-detail",
    slug,
    key: `coda-${locale}-work-${String(index + 1).padStart(2, "0")}`
  }));
  return [...core, ...details].map((route) => {
    const path = codaRoutePath(route.locale, route.page, route.slug);
    return { ...route, edition: "coda", path, file: routeFile(path) };
  });
});

export function findCodaRoute(locale, page, slug = "") {
  return codaRoutes.find((route) => route.locale === locale && route.page === page && route.slug === slug);
}

export function alternateCodaRoute(route) {
  return findCodaRoute(route.locale === "en" ? "th" : "en", route.page, route.slug);
}
