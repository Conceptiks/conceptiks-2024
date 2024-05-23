<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let title: string = "";
  export let customers: { img: { src: string; alt: string } }[] = [];
</script>

<h6 class="font-bold text-black">
  {title}
</h6>

<div
  class="mx-auto mt-16 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
>
  {#each customers as { img }, i}
    <div class="col-span-2 max-h-12 object-contain lg:col-span-1 w-full">
      <Image
        objectFit="contain"
        class="  "
        width="{150}"
        src="{img.src}"
        alt="{img.alt}"
        height="{48}"
      />
    </div>
  {/each}
</div>
