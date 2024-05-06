<script>
  import Container from "$lib/components/Container.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<Header
  title="Unsere Leistungen"
  description="<strong>Wir schaffen digitale Marken, und unterstützen Unternehmen bei der digitalen Transformation.</strong> <br /> Mit analytischem Verstand und kreativer Leidenschaft entwickeln wir digitale Produkte, die begeistern."
></Header>
<Container>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-4 space-y-8">
      <div class="bg-black text-white p-8">
        <h3>Branding und Corporate Design</h3>
      </div>
      <div class="bg-black text-white p-8">
        <h3>User-Experience (UX) und User-Interface (UI) Design</h3>
      </div>
    </div>

    <div class="col-span-8 bg-black text-white p-8">
      <h3>Web-Entwicklung</h3>
    </div>
  </div>
</Container>
