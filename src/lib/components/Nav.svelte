<script>
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  import Button from "./Button.svelte";
</script>

<nav>
  <Container>
    <div
      class="py-6 gap-y-4 flex gap-x-16 flex-wrap items-center justify-between"
    >
      <a href="/" class="shrink-0 grow">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fdb2c9de6bdf44847913d425128998cb3%2Fc7e46329e7ab47958cb5ad0508146ad0"
          layout="fixed"
          alt="logo"
          height="{30}"
        />
      </a>
      <ul class="justify-end flex gap-6 md:gap-8 items-center">
        <li><a href="/ueber">Über</a></li>
        <li><a href="/leistungen">Leistungen</a></li>
        <li>
          <Button href="/kontakt" size="sm">Kontakt</Button>
        </li>
      </ul>
    </div>
  </Container>
</nav>

<style lang="postcss">
  li {
    @apply font-normal;
  }
</style>
