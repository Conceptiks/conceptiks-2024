<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export { className as class };
  export let href: string | undefined = "/";
  /** Renders the mark without the surrounding link — for use inside the footer. */
  export let asLink: boolean = true;

  let className = "";
</script>

{#if asLink && href}
  <a
    {href}
    aria-label="Maxim Tan — zur Startseite"
    class="{twMerge(
      'group inline-flex items-baseline gap-x-1 rounded-sm',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface',
      className
    )}"
  >
    <span class="font-semibold tracking-tightest text-[1.3rem] leading-none">
      Maxim Tan
    </span>
    <span
      aria-hidden="true"
      class="h-[0.3rem] w-[0.3rem] rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-150"
    ></span>
  </a>
{:else}
  <span class="{twMerge('inline-flex items-baseline gap-x-1', className)}">
    <span class="font-semibold tracking-tightest text-[1.3rem] leading-none">
      Maxim Tan
    </span>
    <span
      aria-hidden="true"
      class="h-[0.3rem] w-[0.3rem] rounded-full bg-primary"
    ></span>
  </span>
{/if}
