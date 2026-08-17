<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Icon from "./Icon.svelte";

  export let img: {
    src: string;
    alt: string;
  };
  export let projectUrl: string | undefined = undefined;
  export let title: string;
  export let description: string;
  export let brandColor: string | undefined = undefined;
  export let categories: string[] = [];

  $: panelColor = brandColor ?? "#0E0004";
</script>

<header class="relative mt-8 flex flex-wrap items-start">
  <div class="w-full bg-surface-3 lg:w-1/2">
    <div
      class="aspect-w-6 aspect-h-6 sm:aspect-h-4 lg:aspect-h-5 xl:aspect-h-4"
    >
      <Image
        layout="fullWidth"
        objectFit="cover"
        src="{img.src}"
        alt="{img.alt}"
      />
    </div>
  </div>
  <div
    style="background-color: {panelColor}"
    class="z-10 -mt-20 mx-6 inline-flex w-auto max-w-[calc(100%-3rem)] min-w-0 flex-col items-start justify-end rounded-2xl p-8 text-white sm:mx-8 sm:max-w-[calc(100%-4rem)] sm:p-10 md:p-12 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:mx-0 lg:mt-0 lg:flex lg:w-1/2 lg:max-w-none lg:rounded-none lg:p-16 xl:p-20"
  >
    <h1 class="grow-0 text-white">
      {title}
    </h1>
    {#if description}
      <p class="mt-3 max-w-md !text-white/75 text-lg">
        {description}
      </p>
    {/if}
    {#if categories.length > 0 || projectUrl}
      <!-- min-w-0 so this scroller can shrink instead of widening the panel. -->
      <div class="-mx-6 mt-8 flex min-w-0 max-w-full gap-2 overflow-x-auto px-6">
        {#each categories as category}
          <span
            class="shrink-0 rounded-full border border-white/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white/90"
          >
            {category}
          </span>
        {/each}
        {#if projectUrl}
          <a
            href="{projectUrl}"
            target="_blank"
            rel="noreferrer"
            class="flex shrink-0 items-center gap-x-1.5 rounded-full border border-white/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Live ansehen
            <Icon size="sm" color="currentColor" iconClass="carbon:arrow-up-right" />
          </a>
        {/if}
      </div>
    {/if}
  </div>
</header>
