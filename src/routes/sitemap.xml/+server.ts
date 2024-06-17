import { fetchEntries } from "@builder.io/sdk-svelte";
import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
import type { RequestHandler } from "@sveltejs/kit";

const baseUrl = "https://conceptiks.com";

const getAllCmsEntries = async (
  model: "page" | "portfolio-item",
  fetch: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>
) => {
  const res = await fetchEntries({
    model,
    apiKey: PUBLIC_BUILDER_API_KEY,
    cacheSeconds: 0,
    staleCacheSeconds: 0,
    includeUnpublished: false,
    fetch,
  });

  console.log(res);

  if (!res || !res.length) return [];

  return res.map((page) => {
    return page.data.url.slice(1);
  });
};

export const GET = (async ({ fetch }) => {
  const cmsPages = await getAllCmsEntries("page", fetch);
  const cmsPortfolioItems = await getAllCmsEntries("portfolio-item", fetch);

  const body = sitemap(["kontakt", ...cmsPages, ...cmsPortfolioItems]);

  const headers = {
    "Cache-Control": "max-age=0, s-maxage=3600",
    "Content-Type": "application/xml",
  };

  return new Response(body, { headers });
}) satisfies RequestHandler;

const sitemap = (pages: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"   
    >
      <url>
        <loc>${baseUrl}</loc>
        <xhtml:link rel="canonical" hreflang="de" href="${baseUrl}" />
        <changefreq>daily</changefreq>
        <priority>1.00</priority>
      </url>
      ${pages
        .map(
          (page) => `
                      <url>
                        <loc>${baseUrl}/${page}</loc>
                        <xhtml:link hreflang="de" href="${baseUrl}/${page}" />
                        <changefreq>daily</changefreq>
                        <priority>0.70</priority>
                      </url>
                      `
        )
        .join("")}
    </urlset>`;
};
