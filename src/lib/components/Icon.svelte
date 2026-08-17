<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let className = "";
  export { className as class };
  export let iconClass: string;
  /** Defaults to the inherited text colour so icons follow the active theme. */
  export let color: string | undefined = "currentColor";
  export let customSize: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" | "xl" = "md";

  const sizes = {
    sm: "16px",
    md: "24px",
    lg: "30px",
    xl: "36px",
  };

  $: fontSize = customSize ?? sizes[size] ?? sizes.md;
</script>

<span
  class="{twMerge('flex shrink-0 items-center', className)}"
  style="width: {fontSize}; height: {fontSize}"
>
  <iconify-icon
    icon="{iconClass}"
    aria-hidden="true"
    style="color: {color}; font-size: {fontSize}; line-height: 1;"
  ></iconify-icon>
</span>
