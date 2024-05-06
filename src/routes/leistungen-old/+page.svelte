<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import { Image } from "@unpic/svelte";
</script>

<Header
  title="Unsere Leistungen."
  description="Einzigartige Webpräsenzen, individuell gestaltet: Unsere Leistungen reichen von Webdesign und -entwicklung bis hin zum Aufbau Ihrer Marke."
></Header>
<Container>
  <Section id="leistungen">
    <div class="grid grid-cols-12 -mt-20 gap-8 items-stretch">
      <div class="col-span-4 space-y-8">
        <div class="bg-blue-600 text-white p-8 pb-24">
          <div
            class="
          w-10 h-10"
          >
          </div>
          <h3>Branding und Corporate Design</h3>
          <p class="!text-white">
            Optimierung oder Neugestaltung des eigenen Markenauftritts.
            Bild-/Wortmarke (Logo), Farbgebung und Typographie (Schriftstil).
          </p>
        </div>
        <div class="bg-blue-600 text-white p-8 pb-24">
          <h3>User-Experience (UX) und User-Interface (UI) Design</h3>
        </div>
      </div>

      <div class="col-span-8 bg-blue-600 text-white p-8 pb-24">
        <h3 class="">Web-Entwicklung</h3>
        <p></p>
      </div>
    </div>
  </Section>
  <Section id="tools"></Section>
</Container>
