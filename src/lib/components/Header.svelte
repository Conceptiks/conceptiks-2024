<script lang="ts">
  import Container from "./Container.svelte";

  export let title: string;
  export let description: string;
</script>

<header
  class="pb-32 pt-44 lg:pb-52 lg:pt-72 bg-gradient-to-br from-primary-400 to-secondary-500"
>
  <Container>
    <div class="lg:w-1/2 md:w-2/3 sm:w-4/5">
      <h1 class="text-white">{title}</h1>
      <p class="mt-4 text-lg text-white">
        {description}
      </p>
    </div>
  </Container>
</header>
