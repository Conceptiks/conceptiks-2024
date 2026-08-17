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

  $: as = href ? "a" : "div";
</script>

<svelte:element
  this="{as}"
  href="{href ?? undefined}"
  class="{twMerge(
    'flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 rounded-xl',
    border
      ? 'border border-line bg-surface px-4 py-6 transition-colors duration-300 hover:border-line-strong'
      : '',
    href ? 'group' : ''
  )}"
>
  <div class="flex h-12 w-1/2 items-center">
    <Image
      {...img}
      layout="fullWidth"
      height="{48}"
      objectFit="contain"
      class="transition-transform duration-300 ease-out group-hover:scale-105"
    />
  </div>
  {#if title}
    <h6 class="mt-2 font-semibold text-ink">{title}</h6>
    {#if description}
      <p class="text-center text-sm">{description}</p>
    {/if}
  {/if}
</svelte:element>
