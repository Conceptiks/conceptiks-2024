import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
import { fetchEntries } from "@builder.io/sdk-svelte";

/**
 * Builder injects a 1x1 tracking pixel as a block into the content it serves.
 * It is part of the document rather than something the SDK renders, so
 * `canTrack: false` does not remove it — we drop it here instead, otherwise
 * every page view still calls home to cdn.builder.io.
 */
const PIXEL_ID_PREFIX = "builder-pixel-";

const isPixelBlock = (value: unknown): boolean =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as { id?: unknown }).id === "string" &&
  (value as { id: string }).id.startsWith(PIXEL_ID_PREFIX);

const stripTrackingPixels = (node: unknown): unknown => {
  if (Array.isArray(node)) {
    return node.filter((child) => !isPixelBlock(child)).map(stripTrackingPixels);
  }

  if (typeof node === "object" && node !== null) {
    const record = node as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      record[key] = stripTrackingPixels(record[key]);
    }
  }

  return node;
};

export const fetchAndValidate = async (
  fetchMode: (opt: any) => Promise<any>,
  model: string,
  opts?: Record<string, any>
) => {
  const res = stripTrackingPixels(
    await fetchMode({
      model,
      apiKey: PUBLIC_BUILDER_API_KEY,
      ...opts,
    })
  ) as any;

  if (fetchMode === fetchEntries) {
    return res && res.length > 0
      ? res.map((item: { data: unknown }) => item.data)
      : [];
  }

  return res && res.data ? res : {};
};
