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
  export let backgroundColor: string = "#0E0004";
</script>

<div
  class="flex h-full w-full grow flex-col justify-end rounded-2xl border border-white/10 p-8 text-white shadow-card transition-shadow duration-300 ease-out hover:shadow-card-hover sm:p-10"
  style="background-color:{backgroundColor}"
>
  {#if img}
    <div class="mb-6 h-10 w-10">
      <Image layout="fullWidth" {...img} />
    </div>
  {/if}
  <h3 class="mb-3 text-white">{title}</h3>
  <p class="!text-white/75">
    {description}
  </p>
  {#if button}
    <div class="mt-8">
      <Button href="{button.href}">{button.text}</Button>
    </div>
  {/if}
</div>
