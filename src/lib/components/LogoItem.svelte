<script lang="ts">
  import { Image } from "@unpic/svelte";
  import { twMerge } from "tailwind-merge";

  export let href: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let border: boolean = true;
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
  class="{twMerge(
    'w-full  rounded flex flex-col gap-x-4 gap-y-2 items-center justify-center',
    border ? 'border border-neutral-200 py-6 px-4 ' : ''
  )}"
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
