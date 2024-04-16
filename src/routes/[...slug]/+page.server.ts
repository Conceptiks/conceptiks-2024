import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
import type { EntryGenerator, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
  fetchOneEntry,
  isEditing,
  type BuilderContent,
} from "@builder.io/sdk-svelte";
import type { Nullable } from "@builder.io/sdk-svelte/lib/browser/types/typescript";

const shouldPreRender =
  (process.env.NETLIFY === "true" &&
    (process.env.CONTEXT === "production" || process.env.branch === "main")) ||
  process.env.FORCE_PRERENDERING === "true"
    ? true
    : false;
console.log("shouldPreRender", shouldPreRender);
export const prerender = shouldPreRender;

export const load: PageServerLoad = async ({ url, params }) => {
  let content: Nullable<BuilderContent> = undefined;
  let canShowContent = false;

  async function fetchContent() {
    content = await fetchOneEntry({
      model: "page",
      apiKey: PUBLIC_BUILDER_API_KEY,
      userAttributes: {
        urlPath: url.pathname,
      },
    });
    canShowContent = Boolean(content || isEditing());
  }

  try {
    await fetchContent();

    if (!content || !canShowContent) {
      error(404, {
        message: "Page not found",
      });
    }

    return { content, canShowContent };
  } catch (err) {
    console.error("Failed to fetch content for page", err);
    error(404, err);
  }
};

export const entries: EntryGenerator = async () => {
  const pageModelUrl = `https://cdn.builder.io/api/v3/content/page?apiKey=${PUBLIC_BUILDER_API_KEY}&cacheSeconds=0`;

  try {
    const response = await fetch(pageModelUrl);
    const data = await response.json();
    const { results } = data;

    let pageUrls = results.map((singlePage: { data: { url: string } }) => {
      return {
        slug: singlePage.data.url.split("/")[1],
      };
    });

    // manually add to the pageUrls array
    pageUrls.push([
      {
        slug: "__builder_editing__",
      },
    ]);

    // flatten the array of arrays
    pageUrls = pageUrls.flat();

    if (!pageUrls || pageUrls.length === 0) {
      return [];
    }

    return pageUrls;
  } catch (error) {
    throw new Error("Failed to fetch pageModel urls for prerendering.");
  }
};
