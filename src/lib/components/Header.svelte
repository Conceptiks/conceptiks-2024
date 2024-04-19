<script lang="ts">
  import Container from "./Container.svelte";

  export let title: string;
  export let description: string;
</script>

<header class="py-20 lg:py-32">
  <Container>
    <h1>{title}</h1>
    <p class="mt-4 text-lg text-neutral-500">
      {description}
    </p>
  </Container>
</header>
