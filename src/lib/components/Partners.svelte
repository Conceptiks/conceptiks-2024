<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let strapline,
    title,
    description = "";

  export let logos: {
    src: string;
    alt: string;
    href: string;
    description?: string;
  }[] = [];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 items-center gap-x-24 gap-y-8">
  <div class="">
    <h4 class="text-primary">{strapline}</h4>
    <h2 class="text-black mt-2">
      {title}
    </h2>
    <p>
      {description}
    </p>
  </div>

  <div class="grid grid-cols-2 gap-1 items-start">
    {#each logos as { src, alt, href, description }}
      <a
        {href}
        target="_blank"
        class="relative px-12 py-12 bg-neutral-100 rounded-md"
      >
        {#if description}
          <div
            class="inline py-1 px-2 leading-none rounded-full bg-white border absolute left-2 bottom-2 text-xs"
          >
            {description}
          </div>
        {/if}
        <Image
          {src}
          class="scale-100 hover:scale-105 object-center transition-all"
          layout="fullWidth"
          height="{60}"
          objectFit="contain"
          {alt}
        />
      </a>
    {/each}
  </div>
</div>
