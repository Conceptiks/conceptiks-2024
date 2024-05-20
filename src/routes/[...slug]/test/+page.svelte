<script>
  import Container from "$lib/components/Container.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import { Image } from "@unpic/svelte";
</script>

<header class="pt-40 py-20 md:pt-64 md:py-32">
  <Container>
    <div class="w-full grid grid-cols-12 gap-y-8 items-center">
      <div class="col-span-12 md:col-span-6">
        <h1 class="text-4xl md:text-7xl text-black">
          Wir entwickeln digitale Produkte.
          <span class="highlight">
            <br />
            <span> Nutzerzentriert. </span>
            <br />
            <span> Analytisch. </span>
            <br />
            <span> Konversionsstark. </span>
          </span>
        </h1>
        <p class="text-xl md:text-2xl mt-8">
          Von der ersten Idee bis hin zur technischen Umsetzung, wir entwickeln
          nutzerorientierte Lösungen für digitale Welten
        </p>
      </div>
      <div class="col-span-12 md:col-span-5 md:col-start-8">
        <Form />
      </div>
    </div>
  </Container>
</header>

<style lang="postcss">
  .highlight {
    @apply bg-gradient-to-br  from-purple-500 to-primary bg-clip-text text-transparent;
  }
</style>
