import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
import { fetchEntries } from "@builder.io/sdk-svelte";

export const fetchAndValidate = async (
  fetchMode: (opt: any) => Promise<any>,
  model: string,
  opts?: Record<string, any>
) => {
  const res = await fetchMode({
    model,
    apiKey: PUBLIC_BUILDER_API_KEY,
    ...opts,
  });

  if (fetchMode === fetchEntries) {
    return res && res.length > 0 ? res.map((item) => item.data) : [];
  } else {
    return res && res.data ? res : {};
  }
};
