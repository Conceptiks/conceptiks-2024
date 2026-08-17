<script lang="ts">
  import Container from "./Container.svelte";
  import Button from "./Button.svelte";
  import Wordmark from "./Wordmark.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import { twMerge } from "tailwind-merge";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";

  const links = [
    { href: "/", label: "Home" },
    { href: "/projekte", label: "Projekte" },
    { href: "/ueber", label: "Über" },
    { href: "/leistungen", label: "Leistungen" },
  ];

  let scrollY = 0;
  let open = false;

  $: scrolled = scrollY > 24;
  $: currentPath = $page.url.pathname;

  const isActive = (href: string, path: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  afterNavigate(() => {
    open = false;
  });
</script>

<svelte:window
  bind:scrollY
  on:keydown="{(e) => {
    if (e.key === 'Escape') open = false;
  }}"
/>

<nav
  aria-label="Hauptnavigation"
  class="{twMerge(
    'fixed top-0 left-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ease-out',
    'border-b',
    scrolled || open
      ? 'border-line bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70'
      : 'border-transparent bg-surface'
  )}"
>
  <Container>
    <div class="flex h-[72px] items-center justify-between gap-x-8">
      <Wordmark class="shrink-0" />

      <ul class="hidden items-center gap-x-1 md:flex">
        {#each links as { href, label }}
          {@const active = isActive(href, currentPath)}
          <li>
            <a
              {href}
              aria-current="{active ? 'page' : undefined}"
              class="{twMerge(
                'relative rounded-md px-3 py-2 text-[0.95rem] transition-colors duration-200',
                'after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out',
                'hover:after:scale-x-100',
                active
                  ? 'font-semibold text-ink after:scale-x-100'
                  : 'text-ink-muted hover:text-ink'
              )}"
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="flex items-center justify-end gap-x-2">
        <ThemeToggle />
        <Button href="/kontakt" size="sm" class="hidden sm:inline-flex">
          Kontakt
        </Button>
        <button
          type="button"
          aria-label="{open ? 'Menü schließen' : 'Menü öffnen'}"
          aria-expanded="{open}"
          aria-controls="mobile-menu"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:hidden"
          on:click="{() => (open = !open)}"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {#if open}
              <path d="M6 6l12 12M18 6L6 18"></path>
            {:else}
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </Container>

  {#if open}
    <div id="mobile-menu" class="border-t border-line bg-surface md:hidden">
      <Container>
        <ul class="flex flex-col py-4">
          {#each links as { href, label }}
            {@const active = isActive(href, currentPath)}
            <li>
              <a
                {href}
                aria-current="{active ? 'page' : undefined}"
                class="{twMerge(
                  'block rounded-md px-2 py-3 text-lg transition-colors',
                  active
                    ? 'font-semibold text-ink'
                    : 'text-ink-muted hover:text-ink'
                )}"
              >
                {label}
              </a>
            </li>
          {/each}
          <li class="mt-2 sm:hidden">
            <Button href="/kontakt" class="w-full">Kontakt</Button>
          </li>
        </ul>
      </Container>
    </div>
  {/if}
</nav>

<!-- Backdrop: a plain button keeps the dismiss target keyboard-reachable. -->
{#if open}
  <button
    type="button"
    tabindex="-1"
    aria-hidden="true"
    on:click="{() => (open = false)}"
    class="fixed inset-0 z-40 h-full w-full cursor-default bg-ink/20 backdrop-blur-[2px] md:hidden"
  ></button>
{/if}

<!-- Reserves the space the fixed navigation occupies. -->
<div class="h-[72px]" aria-hidden="true"></div>
