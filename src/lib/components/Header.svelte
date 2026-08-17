<script lang="ts">
  import Container from "./Container.svelte";
  import HeroBackdrop from "./HeroBackdrop.svelte";

  export let title: string;
  export let description: string;
</script>

<!--
  surface-2 → surface-3 rather than surface → surface-2: the old pair differed by
  one value from white, so the band was invisible and content pulled up over it
  (the offer cards on /leistungen) appeared to sit on plain white.
-->
<!--
  pb-32 (128px) clears the -100px pull that CMS pages use to float content over
  the band; at pb-24 the offer cards on /leistungen cut into the description
  text on phones.
-->
<header
  class="relative overflow-clip bg-gradient-to-b from-surface-2 to-surface-3 pb-32 pt-20 lg:pb-36 lg:pt-32"
>
  <HeroBackdrop />

  <Container>
    <div class="relative grid grid-cols-12 gap-8">
      <div class="col-span-12 animate-fade-up text-ink md:col-span-8 lg:col-span-7">
        {@html title}
        {#if description}
          <p class="mt-6 text-lg text-ink-subtle xl:text-xl">
            {description}
          </p>
        {/if}
      </div>
    </div>
  </Container>
</header>
