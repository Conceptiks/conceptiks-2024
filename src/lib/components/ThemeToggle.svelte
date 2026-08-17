<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { twMerge } from "tailwind-merge";

  export { className as class };
  let className = "";
</script>

<button
  type="button"
  on:click="{theme.toggle}"
  aria-label="{$theme === 'dark'
    ? 'Zur hellen Ansicht wechseln'
    : 'Zur dunklen Ansicht wechseln'}"
  aria-pressed="{$theme === 'dark'}"
  title="{$theme === 'dark' ? 'Helle Ansicht' : 'Dunkle Ansicht'}"
  class="{twMerge(
    'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
    'text-ink-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    className
  )}"
>
  {#if $theme === "dark"}
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path
        d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      ></path>
    </svg>
  {:else}
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
    </svg>
  {/if}
</button>
