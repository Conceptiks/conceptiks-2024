<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let src: string;
  export let alt: string;
  export let caption: string;
</script>

<figure class="">
  <div class="border overflow-clip rounded-2xl">
    <Image
      layout="fullWidth"
      objectFit="contain"
      class="object-center"
      {src}
      {alt}
    />
  </div>
  {#if caption}
    <figcaption class="italic text-neutral-500 my-4">
      {caption}
    </figcaption>
  {/if}
</figure>
