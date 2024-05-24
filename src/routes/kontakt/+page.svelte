<script>
  import Container from "$lib/components/Container.svelte";
  import HomeHeader from "$lib/components/HomeHeader.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<HomeHeader
  title="<h1><span class='highlight'>Kontaktiere</span> uns."
  highlight="{null}"
  description="Wenn du nach einer Lösung für Herausforderungen in deinem Unternehmen suchst, nutze unseren Lösungsfinder. Wenn du andere Fragen oder Anregungen hast, dann kontaktiere uns über unser Kontaktformular."
></HomeHeader>

<div class="my-40">
  <Section id="kontakt">
    <Container class="text-center">
      <a
        href="mailto:kontakt@conceptiks.com"
        class="text-7xl font-medium bg-gradient-to-br from-purple-500 to-primary bg-clip-text text-transparent"
        >kontakt@conceptiks.com</a
      >
      <p class="mt-4 text-lg">
        Wenn du Fragen hast oder uns einfach nur kennenlernen möchtest, schreib
        uns eine Mail. Wir freuen uns auf deine Nachricht.
      </p>
    </Container>
  </Section>
</div>

<style lang="postcss">
  input,
  textarea {
    @apply rounded-md text-base border border-neutral-300 px-4 py-3 w-full;
  }
</style>
