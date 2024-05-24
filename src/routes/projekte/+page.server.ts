import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-svelte";
import { fetchAndValidate } from "$lib/utils/validateAndFetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const content = await fetchAndValidate(fetchOneEntry, "page", {
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  return { content };
};
