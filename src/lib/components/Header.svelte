<script lang="ts">
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";

  export let title: string;
  export let description: string;
</script>

<header
  class="pb-24 pt-32 lg:pb-44 lg:pt-64 bg-gradient-to-b from-white to-neutral-100"
>
  <Container>
    <div class="grid grid-cols-12 gap-8 relative">
      <div class="col-span-12 md:col-span-6 text-black">
        {@html title}
        <p class="mt-4 text-lg text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  </Container>
</header>
