<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  export let img: {
    src: string;
    alt: string;
  };
  export let title: string;
  export let description: string;
  export let brandColor: string | undefined = undefined;
</script>

<header class="relative">
  <div class="aspect-w-6 aspect-h-6 sm:aspect-h-4 lg:aspect-h-2 bg-neutral-200">
    <Image
      layout="fullWidth"
      objectFit="cover"
      src="{img.src}"
      alt="{img.alt}"
    />
  </div>
  <div class="z-10 relative -mt-14">
    <Container>
      <div
        style="{`background-color: ${brandColor ?? '#111111'}`}"
        class="inline-flex flex-col items-start text-white p-6 sm:p-8"
      >
        <h1 class="grow-0">
          {title}
        </h1>
        <h6 class="mt-1 sm:mt-2 max-w-sm text-pretty">
          {description}
        </h6>
      </div>
    </Container>
  </div>
</header>
