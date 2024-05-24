<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let href: string | undefined = undefined;
  export let size: string = "md";
  export let style: "primary" | "black" = "primary";
  export { className as class };
  let as = "button";
  let className = "";

  if (href) as = "a";
</script>

<svelte:element
  this="{as}"
  href="{href ?? undefined}"
  class="{twMerge(
    'inline-flex items-center gap-x-2  transition-all rounded-md shadow-sm border',
    size,
    style,
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

  .primary {
    @apply bg-primary text-white hover:border-black/35 border-transparent;
  }

  .black {
    @apply bg-black text-white hover:border-white/35 border-transparent;
  }
</style>
