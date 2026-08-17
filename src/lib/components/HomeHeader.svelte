<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import Container from "./Container.svelte";
  import Form from "./form/Form.svelte";
  import HeroBackdrop from "./HeroBackdrop.svelte";

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
    'relative overflow-clip bg-gradient-to-b from-surface to-surface-2 pb-16 pt-16 md:pb-24 md:pt-24'
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
        <Form />
      </div>
    </div>
  </Container>
</header>
