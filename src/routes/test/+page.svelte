<script>
  import Container from "$lib/components/Container.svelte";
</script>

<header class="h-full flex flex-col items-center justify-center min-h-screen">
  <Container>
    <div class="my-auto">
      <h1 class="text-7xl text-black font-medium">
        Wir entwickeln <span class="highlight">digitale Produkte.</span> Nutzerzentriert,
        Analytisch, Konversionsstark.
      </h1>
    </div>
  </Container>
</header>

<style lang="postcss">
  .highlight {
    @apply bg-gradient-to-br font-semibold from-purple-500 to-primary bg-clip-text text-transparent;
  }
</style>
