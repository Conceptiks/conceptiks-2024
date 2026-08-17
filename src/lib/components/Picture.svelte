<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let src: string;
  export let alt: string;
  export let caption: string = "";
</script>

<figure>
  <div class="overflow-clip rounded-2xl border border-line bg-surface-2">
    <Image
      layout="fullWidth"
      objectFit="contain"
      class="object-center"
      {src}
      {alt}
    />
  </div>
  {#if caption}
    <figcaption class="mt-4 text-sm text-ink-subtle">
      {caption}
    </figcaption>
  {/if}
</figure>
