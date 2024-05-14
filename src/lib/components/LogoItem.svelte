<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let href: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let img: {
    alt: string;
    src: string;
  };

  let as = "div";

  $: if (href) {
    as = "a";
  }
</script>

<svelte:element
  this="{as}"
  href="{href ?? undefined}"
  class="py-6 w-full px-4 border border-neutral-200 rounded flex flex-col gap-x-4 gap-y-2 items-center justify-center"
>
  <div class="flex items-center h-12 w-1/2">
    <Image {...img} layout="fullWidth" height="{48}" objectFit="contain" />
  </div>
  {#if title}
    <h6 class="font-bold mt-2">{title}</h6>
    {#if description}
      <p>{description}</p>
    {/if}
  {/if}
</svelte:element>
