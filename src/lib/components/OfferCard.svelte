<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Button from "./Button.svelte";

  export let title: string = "";
  export let description: string = "";
  export let img: {
    src: string;
    alt: string;
  };
  export let button: {
    text: string;
    href: string;
  };
  export let backgroundColor: string = "#0000ff";
</script>

<div
  class="text-white p-8 w-full grow flex flex-col justify-end rounded-lg drop-shadow-lg border-white/10 border"
  style="background-color:{backgroundColor}"
>
  <div class="w-10 h-10 mb-5">
    {#if img}
      <Image layout="fullWidth" {...img} />
    {/if}
  </div>
  <h3 class="mb-3">{title}</h3>
  <p class="!text-white">
    {description}
  </p>
  {#if button}
    <div class="mt-4">
      <Button href="{button.href}">{button.text}</Button>
    </div>
  {/if}
</div>
