<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Section from "./Section.svelte";
  import Container from "./Container.svelte";
  export let title: string = "";
  export let customers: { img: { src: string; alt: string } }[] = [];
</script>

<Section>
  <Container
    ><h6 class="font-bold text-black">
      {title}
    </h6>

    <div
      class="mx-auto mt-16 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5"
    >
      {#each customers as { img }, i}
        <div class="col-span-2 max-h-12 object-contain lg:col-span-1 w-full">
          <Image
            objectFit="contain"
            class="object-left"
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

<hr class="border-neutral-200" />
