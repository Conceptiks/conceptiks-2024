<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let href: string | undefined = undefined;
  export let size: string = "md";
  export { className as class };
  let as = "button";
  let className = "";

  if (href) as = "a";
</script>

<svelte:element
  this="{as}"
  href="{href ?? undefined}"
  class="{twMerge(
    'inline-flex items-center gap-x-2 bg-primary-400 hover:bg-primary-700 transition-all rounded-md shadow-sm text-white border hover:border-black/35 border-transparent',
    size,
    className
  )}"
>
  <slot />
</svelte:element>

<style lang="postcss">
  .sm {
    @apply py-1 px-2.5;
  }
  .md {
    @apply py-3 px-5;
  }
</style>
