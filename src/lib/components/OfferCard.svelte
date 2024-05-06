<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let title: string = "";
  export let description: string = "";
  export let img: {
    src: string;
    alt: string;
  };
</script>

<div class="bg-blue-600 text-white p-8 pb-24 w-full grow">
  <div class="w-10 h-10 mb-5">
    {#if img}
      <Image layout="fullWidth" {...img} />
    {/if}
  </div>
  <h3 class="mb-3">{title}</h3>
  <p class="!text-white">
    {description}
  </p>
</div>
