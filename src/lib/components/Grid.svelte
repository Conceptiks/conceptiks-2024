<script context="module" lang="ts">
  export type ColCount =
    | "grid-cols-1"
    | "grid-cols-2"
    | "grid-cols-3"
    | "grid-cols-4"
    | "grid-cols-5"
    | "grid-cols-6"
    | "grid-cols-7"
    | "grid-cols-8"
    | "grid-cols-9"
    | "grid-cols-10"
    | "grid-cols-11"
    | "grid-cols-12";

  export type ColSpan =
    | "col-span-full"
    | "col-span-1"
    | "col-span-2"
    | "col-span-3"
    | "col-span-4"
    | "col-span-5"
    | "col-span-6"
    | "col-span-7"
    | "col-span-8"
    | "col-span-9"
    | "col-span-10"
    | "col-span-11"
    | "col-span-12";
</script>

<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let verticalGap = 8;
  export let horizontalGap = 8;

  let defaultGridColCount = {
    defaultColCount: "grid-cols-1",
    smColCount: "grid-cols-2",
    lgColCount: "grid-cols-3",
  };

  export let gridColCount: {
    defaultColCount?: ColCount;
    smColCount?: ColCount;
    lgColCount?: ColCount;
  };

  // this allows to set only one value and the rest will be set to the default
  $: gridColCountMerged = { ...defaultGridColCount, ...gridColCount };

  let defaultGridColSpan = {
    defaultColSpan: "col-span-full",
    smColSpan: "col-span-1",
    lgColSpan: "col-span-1",
  };

  export let gridColSpan: {
    defaultColSpan?: ColSpan;
    smColSpan?: ColSpan;
    lgColSpan?: ColSpan;
  };

  // this allows to set only one value and the rest will be set to the default
  $: gridColSpanMerged = { ...defaultGridColSpan, ...gridColSpan };
</script>

<div
  class="{twMerge(
    '!grid w-full',
    gridColCountMerged.defaultColCount,
    `sm:${gridColCountMerged.smColCount}`,
    `lg:${gridColCountMerged.lgColCount}`,
    `[&>div]:${gridColSpanMerged.defaultColSpan}`,
    `sm:[&>div]:${gridColSpanMerged.smColSpan}`,
    `lg:[&>div]:${gridColSpanMerged.lgColSpan}`
  )}"
  style="{`gap: ${verticalGap * 4}px ${horizontalGap * 4}px`}"
>
  <slot />
</div>
