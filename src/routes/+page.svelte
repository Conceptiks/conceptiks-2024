<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import { Image } from "@unpic/svelte";
</script>

<nav>
  <Container>
    <div
      class="border-b py-6 gap-y-4 flex gap-x-16 flex-wrap items-center justify-between"
    >
      <div class="shrink-0 grow">
        <a href="/">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets%2Fdb2c9de6bdf44847913d425128998cb3%2Fc7e46329e7ab47958cb5ad0508146ad0"
            layout="fixed"
            alt="logo"
            height="{30}"
          />
        </a>
      </div>
      <ul class="justify-end grow flex gap-4 items-center">
        <li><a href="/">Über</a></li>
        <li><a href="/ueber">Leistungen</a></li>
        <li>
          <a
            href="/booking"
            class="rounded-full inline-block leading-none py-2 px-2 bg-black text-white font-semibold"
            >Kontakt</a
          >
        </li>
      </ul>
    </div>
  </Container>
</nav>
<header class="py-20">
  <Container>
    <h1>Design und Entwicklung aus einer Hand.</h1>
    <h2 class="mt-2 text-neutral-500">
      Von der ersten Idee bis technischen Umsetzung, wir stellen Marken in den
      digitalen Mittelpunkt.
    </h2>
  </Container>
</header>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
