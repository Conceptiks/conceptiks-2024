<script>
  import Container from "$lib/components/Container.svelte";
  import HomeHeader from "$lib/components/HomeHeader.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<svelte:head>
  <title>Kontakt | Maxim Tan</title>
  <meta
    name="description"
    content="Nimm Kontakt mit Maxim Tan auf – per Projektanfrage-Tool oder direkt per E-Mail."
  />
</svelte:head>

<HomeHeader
  title="<span class='highlight'>Kontaktiere</span> mich."
  highlight="{null}"
  description="Wenn du nach einer Lösung für Herausforderungen in deinem Unternehmen suchst, nutze das Projektanfrage-Tool. Bei allen anderen Fragen und Anregungen schreib mir einfach direkt."
></HomeHeader>

<Section id="kontakt">
  <Container class="text-center">
    <h2 class="sr-only">E-Mail</h2>
    <a
      href="mailto:hallo@maximtan.de"
      class="highlight inline-block break-words text-3xl font-semibold tracking-tightest sm:text-5xl lg:text-6xl"
    >
      hallo@maximtan.de
    </a>
    <p class="mx-auto mt-6 max-w-xl text-lg">
      Wenn du Fragen hast oder mich einfach nur kennenlernen möchtest, schreib
      mir eine Mail. Ich freue mich auf deine Nachricht.
    </p>
  </Container>
</Section>
