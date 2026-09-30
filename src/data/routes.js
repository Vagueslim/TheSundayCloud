export const locales = ["en", "th"];

export const workSlugs = [
  "smart-asset-sa-ai",
  "wcf-digital",
  "rescheduling-pain",
  "maxi-task",
  "asean-summit-2019",
  "lccs-personal-research",
  "redesign-landing-v1-5",
  "buddy-app-2-0",
  "intergold",
  "my-exim",
  "oil-reserve-reporting-system"
];

export function routePath(locale, page, slug = "") {
  const localePrefix = locale === "th" ? "/th" : "";

  if (page === "home") return `${localePrefix}/` || "/";
  if (page === "about") return `${localePrefix}/about/`;
  if (page === "work-index") return `${localePrefix}/work/`;
  if (page === "work-detail") return `${localePrefix}/work/${slug}/`;

  throw new Error(`Unknown page type: ${page}`);
}

export function routeFile(pathname) {
  const normalized = pathname.replace(/^\//, "");
  return normalized ? `${normalized}index.html` : "index.html";
}

export const routes = locales.flatMap((locale) => {
  const core = [
    { locale, page: "home", slug: "", key: `${locale}-home` },
    { locale, page: "about", slug: "", key: `${locale}-about` },
    { locale, page: "work-index", slug: "", key: `${locale}-work` }
  ];
  const details = workSlugs.map((slug, index) => ({
    locale,
    page: "work-detail",
    slug,
    key: `${locale}-work-${String(index + 1).padStart(2, "0")}`
  }));

  return [...core, ...details].map((route) => {
    const path = routePath(route.locale, route.page, route.slug);
    return { ...route, path, file: routeFile(path) };
  });
});

export function findRoute(locale, page, slug = "") {
  return routes.find(
    (route) => route.locale === locale && route.page === page && route.slug === slug
  );
}

export function alternateRoute(route) {
  return findRoute(route.locale === "en" ? "th" : "en", route.page, route.slug);
}
