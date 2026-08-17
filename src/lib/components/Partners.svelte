<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let strapline: string = "";
  export let title: string = "";
  export let description: string = "";

  export let logos: {
    src: string;
    alt: string;
    href: string;
    description?: string;
  }[] = [];
</script>

<div class="grid grid-cols-1 items-center gap-x-20 gap-y-10 md:grid-cols-2">
  <div>
    {#if strapline}
      <h5 class="text-primary">{strapline}</h5>
    {/if}
    <h2 class="mt-3 text-ink">
      {title}
    </h2>
    {#if description}
      <p class="mt-4 text-lg">
        {description}
      </p>
    {/if}
  </div>

  <div class="grid grid-cols-2 items-start gap-3">
    {#each logos as { src, alt, href, description }}
      <a
        {href}
        target="_blank"
        rel="noreferrer"
        class="group relative rounded-xl border border-line bg-surface-2 px-10 py-12 transition-colors duration-300 hover:border-line-strong"
      >
        {#if description}
          <span
            class="absolute bottom-2 left-2 inline rounded-full border border-line bg-surface px-2 py-1 text-xs leading-none text-ink-muted"
          >
            {description}
          </span>
        {/if}
        <Image
          {src}
          class="object-center transition-transform duration-300 ease-out group-hover:scale-105"
          layout="fullWidth"
          height="{60}"
          objectFit="contain"
          {alt}
        />
      </a>
    {/each}
  </div>
</div>
