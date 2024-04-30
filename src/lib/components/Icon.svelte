<script lang="ts">
  import { twMerge } from "tailwind-merge";
  export let iconClass: string;
  export let color: string = "#000000";
  export let size: "sm" | "md" | "lg" | "xl" = "md";
</script>

<span
  class="{twMerge(iconClass, size, 'i !leading-none')}"
  style="color: {color}"
></span>

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
