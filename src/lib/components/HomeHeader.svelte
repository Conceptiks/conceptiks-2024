<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { tick } from "svelte";
  import Container from "./Container.svelte";
  import Form from "./form/Form.svelte";
  import HeroBackdrop from "./HeroBackdrop.svelte";

  /**
   * On phones the form runs about 1.4 screens tall, which pushes the first
   * project nearly three screens down the page. So it starts as a card there
   * and opens in place. From lg up it sits beside the headline and costs
   * nothing, so it stays open — the toggle never applies.
   */
  let formOpen = false;
  let formWrapper: HTMLDivElement;

  const openForm = async () => {
    formOpen = true;
    await tick();
    formWrapper?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  export let title: string = "Ich entwickle <br /> digitale Produkte.";
  export let highlight: string | null = `<span class="highlight">
            <br />
            <span> Nutzerzentriert. </span>
            <br />
            <span> Analytisch. </span>
            <br />
            <span> Konversionsstark. </span>
          </span>`;
  export let description: string =
    "Von der ersten Idee bis zur technischen Umsetzung entwickle ich nutzerorientierte Lösungen für digitale Welten.";
</script>

<header
  class="{twMerge(
    'relative overflow-clip bg-gradient-to-b from-surface-2 to-surface-3 pb-16 pt-16 md:pb-24 md:pt-24'
  )}"
>
  <HeroBackdrop />

  <Container class="relative">
    <div class="grid w-full grid-cols-12 items-center gap-y-12">
      <div class="col-span-12 animate-fade-up lg:col-span-6 xl:mt-8">
        <h1 class="text-ink">
          {@html title}
          {#if highlight}
            {@html highlight}
          {/if}
        </h1>
        <p class="mt-8 max-w-xl text-lg xl:text-xl">
          {@html description}
        </p>
      </div>
      <div class="col-span-12 lg:col-span-6 xl:col-span-5 xl:col-start-8">
        {#if !formOpen}
          <div
            class="rounded-2xl border border-line bg-surface p-6 shadow-panel sm:p-8 lg:hidden"
          >
            <h2 class="text-2xl font-semibold text-ink">Projekt anfragen</h2>
            <p class="mt-2">
              Erzähl mir kurz, worum es geht — ich melde mich zeitnah zurück.
            </p>

            <button
              type="button"
              on:click="{openForm}"
              aria-expanded="false"
              class="mt-6 flex w-full items-center justify-center gap-x-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition-colors duration-200 ease-out hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Anfrage starten
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>

            <p class="mt-4 text-center text-sm">
              oder direkt an
              <a
                href="mailto:hallo@maximtan.de"
                class="font-medium text-primary underline-offset-2 hover:underline"
                >hallo@maximtan.de</a
              >
            </p>
          </div>
        {/if}

        <!-- One Form instance: rendering a second would duplicate the
             Turnstile widget's element id. -->
        <div bind:this="{formWrapper}" class:hidden="{!formOpen}" class="lg:block">
          <Form />
        </div>
      </div>
    </div>
  </Container>
</header>
