<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let className = "";
  export { className as class };
  export let iconClass: string;
  export let color: string | undefined = "#000000";
  export let customSize: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" | "xl" = "md";

  let fontSize = "1px";

  $: switch (size) {
    case "sm":
      fontSize = "16px";
      break;
    case "md":
      fontSize = "24px";
      break;
    case "lg":
      fontSize = "30px";
      break;
    case "xl":
      fontSize = "36px";
      break;
  }

  $: if (customSize) {
    fontSize = customSize;
  }
</script>

<span
  class="{twMerge('flex items-center', className)}"
  style="width: {fontSize}; height: {fontSize}"
>
  <iconify-icon
    icon="{iconClass}"
    style="color: {color}; font-size: {fontSize}; line-height: none;"
  ></iconify-icon>
</span>

<style lang="postcss">
  .i {
    &.sm {
      @apply text-base;
    }
    &.md {
      @apply text-2xl;
    }
    &.lg {
      @apply text-3xl;
    }
    &.xl {
      @apply text-4xl;
    }
  }
</style>
