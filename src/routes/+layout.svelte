<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "../styles/app.css";
  import "iconify-icon";
  import Container from "$lib/components/Container.svelte";
</script>

<Nav />
<slot />
<footer class="bg-primary text-light mt-20 pt-28">
  <Container>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div class="">
        <!--  <div class="w-32">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets%2Fdb2c9de6bdf44847913d425128998cb3%2F2f14470cb59940ba887c8bc4af691d55"
            layout="fullWidth"
            alt="logo"
            objectFit="contain"
          />
        </div> -->
        <p class="font-bold uppercase text-white">Conceptiks</p>

        <ul class="mt-4 space-y-2 text-white">
          <li>c/o Maxim Tan</li>
          <li>Am Heidenhübel 6</li>
          <li>66424 Homburg</li>
        </ul>
      </div>
      <div class="">
        <p class="font-bold uppercase text-white">Über uns</p>
        <ul class="mt-4 space-y-2 text-white">
          <li><a href="/">Purpose und Motivation</a></li>
          <li><a href="/projekte">Partner</a></li>
          <li><a href="/ueber">Kundenstimmen</a></li>
          <li><a href="/leistungen">Leistungen</a></li>
          <li><a href="/kontakt">Kontakt</a></li>
        </ul>
      </div>
      <div class="">
        <p class="font-bold uppercase text-white">Leistungen</p>
        <ul class="mt-4 space-y-2 text-white">
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/datenschutz">Datenschutz</a></li>
          <li>Cookie-Einstellungen</li>
        </ul>
      </div>
    </div>
    <hr class="mt-20 border-white/20" />
    <ul class="flex gap-4 gap-x-8 text-sm py-20 text-white font-bold">
      <li><a href="/impressum">Impressum</a></li>
      <li><a href="/datenschutz">Datenschutz</a></li>
      <li>Cookie-Einstellungen</li>
    </ul>
  </Container>
</footer>
