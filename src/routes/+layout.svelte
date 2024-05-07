<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { Image } from "@unpic/svelte";
  import "../styles/app.css";
  import Container from "$lib/components/Container.svelte";
</script>

<Nav />
<slot />
<footer class="bg-neutral-100 mt-20 py-28">
  <Container>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div class="">
        <div class="w-32">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets%2Fdb2c9de6bdf44847913d425128998cb3%2Fc7e46329e7ab47958cb5ad0508146ad0"
            layout="fullWidth"
            alt="logo"
            objectFit="contain"
          />
        </div>
        <ul class="mt-4">
          <li>conceptiks</li>
          <li>c/o Maxim Tan</li>
          <li>Am Heidenhübel 6</li>
          <li>66424 Homburg</li>
        </ul>
      </div>
      <div class="">
        <p class="font-bold uppercase text-black">Quick Links</p>
        <ul class="mt-4">
          <li><a href="/">Home</a></li>
          <li><a href="/projekte">Projekte</a></li>
          <li><a href="/ueber">Über</a></li>
          <li><a href="/leistungen">Leistungen</a></li>
          <li><a href="/kontakt">Kontakt</a></li>
        </ul>
      </div>
      <div class="">
        <p class="font-bold uppercase text-black">Rechtliches</p>
        <ul class="mt-4">
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/datenschutz">Datenschutz</a></li>
          <li>Cookie-Einstellungen</li>
        </ul>
      </div>
    </div>
  </Container>
</footer>
