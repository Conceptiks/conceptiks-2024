<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Section from "./Section.svelte";
  import Container from "./Container.svelte";

  export let title: string = "";
  export let customers: { img: { src: string; alt: string } }[] = [];
</script>

<Section>
  <Container>
    {#if title}
      <h5 class="text-ink-subtle">
        {title}
      </h5>
    {/if}

    <div
      class="mx-auto mt-12 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5"
    >
      {#each customers as { img }}
        <div class="col-span-2 max-h-12 w-full object-contain lg:col-span-1">
          <Image
            objectFit="contain"
            class="object-left opacity-70 transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert"
            width="{150}"
            src="{img.src}"
            alt="{img.alt}"
            height="{48}"
          />
        </div>
      {/each}
    </div>
  </Container>
</Section>

<hr class="border-line" />
