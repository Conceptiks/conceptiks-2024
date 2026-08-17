<script lang="ts">
  import Container from "./Container.svelte";
  import HeroBackdrop from "./HeroBackdrop.svelte";

  export let title: string;
  export let description: string;
</script>

<header
  class="relative overflow-clip bg-gradient-to-b from-surface to-surface-2 pb-24 pt-20 lg:pb-36 lg:pt-32"
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
