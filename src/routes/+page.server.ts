import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-svelte";
import type { PageServerLoad } from "./$types";
import { fetchAndValidate } from "$lib/utils/validateAndFetch";

export const load: PageServerLoad = async ({ url }) => {
  const content = await fetchAndValidate(fetchOneEntry, "page", {
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  return { content };
};
