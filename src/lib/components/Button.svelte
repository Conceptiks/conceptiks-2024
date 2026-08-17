<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let href: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" = "md";
  export let style: "primary" | "black" | "outline" | "ghost" = "primary";
  export { className as class };

  let className = "";

  $: as = href ? "a" : "button";

  const sizes = {
    sm: "text-sm px-3.5 py-1.5 gap-x-1.5",
    md: "text-base px-5 py-2.5 gap-x-2",
    lg: "text-lg px-7 py-3.5 gap-x-2.5",
  };

  const styles = {
    primary:
      "bg-primary text-white border-transparent hover:bg-primary-600 active:bg-primary-700",
    black:
      "bg-ink text-surface border-transparent hover:bg-ink/90 active:bg-ink/80",
    outline:
      "bg-transparent text-ink border-line-strong hover:border-ink hover:bg-surface-2",
    ghost:
      "bg-transparent text-ink-muted border-transparent hover:text-ink hover:bg-surface-2",
  };
</script>

<svelte:element
  this="{as}"
  href="{href ?? undefined}"
  class="{twMerge(
    'inline-flex items-center justify-center rounded-lg border font-medium',
    'transition-colors duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:opacity-50 disabled:pointer-events-none',
    sizes[size] ?? sizes.md,
    styles[style] ?? styles.primary,
    className
  )}"
>
  <slot />
</svelte:element>
