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
</script>

<header class="relative flex flex-wrap items-stretch">
  <div class="w-full lg:w-1/2 bg-neutral-200">
    <div style="{`background-color: ${brandColor ?? '#111111'}`}">
      <div
        class="aspect-w-6 aspect-h-6 sm:aspect-h-4 lg:aspect-h-5 xl:aspect-h-4 bg-neutral-200"
      >
        <Image
          layout="fullWidth"
          objectFit="cover"
          src="{img.src}"
          alt="{img.alt}"
        />
      </div>
    </div>
  </div>
  <div
    style="{`background-color: ${brandColor ?? '#111111'}`}"
    class="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-20 inline-flex lg:flex flex-col items-start justify-end w-auto mx-8 lg:mx-0 -mt-20 z-10 lg:mt-0 lg:w-1/2 max-h-max text-white"
  >
    <h1 class="grow-0">
      {title}
    </h1>
    <h6 class="mt-1 sm:mt-2 max-w-sm text-pretty">
      {description}
    </h6>
    {#if categories.length > 0 || projectUrl}
      <div class="flex overflow-x-auto gap-2 mt-8 -mx-6 px-6">
        {#if categories.length}
          {#each categories as category}
            <span
              style="{`background-color: ${brandColor ?? '#111111'}`}"
              class="shrink-0 border border-white/25 text-white text-xs font-semibold uppercase py-1 px-2"
              aria-hidden="true"
              role="presentation">{category}</span
            >
          {/each}
        {/if}
        {#if projectUrl}
          <a
            href="{projectUrl}"
            target="_blank"
            referrerpolicy="no-referrer"
            style="{`background-color: ${brandColor ?? '#111111'}`}"
            class="shrink-0 border border-white/25 text-white text-xs font-semibold uppercase py-1 px-2"
            aria-hidden="true"
            role="presentation"
            >Live ansehen <Icon
              size="sm"
              color="#ffffff"
              iconClass="carbon:arrow-up-right"
            /></a
          >
        {/if}
      </div>
    {/if}
  </div>
</header>
