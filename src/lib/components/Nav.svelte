<script>
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  import Button from "./Button.svelte";
  import { twMerge } from "tailwind-merge";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";

  let scrollY = 0;
  let open = false;

  $: navBarFixed = scrollY > 40;

  afterNavigate(() => {
    open = false;
  });
</script>

<svelte:window bind:scrollY />

<nav
  class="{twMerge(
    ' w-full z-50 backdrop-blur-xl filter transition-colors',
    navBarFixed
      ? '!top-0 fixed border-b bg-white md:bg-white/50 shadow-sm'
      : '!top-0 md:top-10 absolute bg-white'
  )}"
>
  <Container>
    <div class="py-6 gap-y-4 flex gap-x-8 items-center justify-between">
      <a href="/" class="shrink-0 grow">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fdb2c9de6bdf44847913d425128998cb3%2Fc7e46329e7ab47958cb5ad0508146ad0"
          layout="fixed"
          alt="logo"
          height="{30}"
        />
      </a>
      <ul class="justify-end md:gap-6 items-center hidden md:flex">
        <li class="{twMerge($page.url.pathname === '/' ? 'font-bold' : '')}">
          <a href="/">Home</a>
        </li>
        <li
          class="{twMerge(
            $page.url.pathname === '/projekte' ? 'font-bold' : ''
          )}"
        >
          <a href="/projekte">Projekte</a>
        </li>
        <li
          class="{twMerge($page.url.pathname === '/ueber' ? 'font-bold' : '')}"
        >
          <a href="/ueber">Über</a>
        </li>
        <li
          class="{twMerge(
            $page.url.pathname === '/leistungen' ? 'font-bold' : ''
          )}"
        >
          <a href="/leistungen">Leistungen</a>
        </li>
      </ul>
      <div class="inline-flex justify-end gap-x-2">
        <Button href="/kontakt" size="sm">Kontakt</Button>
        <button
          class="md:hidden bg-neutral-200 border text-black w-10 h-10 flex items-center justify-center rounded-md"
          on:click="{() => (open = !open)}"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </Container>
  {#if open}
    <div
      class="md:hidden bg-white border-t t z-50 relative top-0 left-0 w-full h-full py-8"
    >
      <Container>
        <ul class="justify-end gap-6 md:items-center flex flex-col">
          <li class="{twMerge($page.url.pathname === '/' ? 'font-bold' : '')}">
            <a href="/">Home</a>
          </li>
          <li
            class="{twMerge(
              $page.url.pathname === '/projekte' ? 'font-bold' : ''
            )}"
          >
            <a href="/projekte">Projekte</a>
          </li>
          <li
            class="{twMerge(
              $page.url.pathname === '/ueber' ? 'font-bold' : ''
            )}"
          >
            <a href="/ueber">Über</a>
          </li>
          <li
            class="{twMerge(
              $page.url.pathname === '/leistungen' ? 'font-bold' : ''
            )}"
          >
            <a href="/leistungen">Leistungen</a>
          </li>
        </ul>
      </Container>
    </div>
  {/if}
</nav>

{#if open}
  <div
    on:click="{() => (open = !open)}"
    class="fixed bg-black/20 inset-0 top-[82px] w-full h-full z-10"
  ></div>
{/if}

<style lang="postcss">
  li {
    a {
      @apply px-2 py-1  rounded-md hover:underline;
    }
  }
</style>
