<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  import Section from "./Section.svelte";

  export let strapline,
    title,
    description = "";

  export let logos: {
    src: string;
    alt: string;
    href: string;
  }[] = [];
</script>

<div class="grid grid-cols-2 items-center gap-x-24">
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
    {#each logos as { src, alt, href }}
      <a {href} target="_blank" class="px-12 py-6 bg-neutral-100 rounded-md">
        <Image
          {src}
          layout="fullWidth"
          height="{60}"
          class="object-center"
          objectFit="contain"
          {alt}
        />
      </a>
    {/each}
  </div>
</div>
