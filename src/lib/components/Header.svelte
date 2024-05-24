<script lang="ts">
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";

  export let title: string;
  export let description: string;

  let x = 0;
  let y = 0;
</script>

<header
  on:mousemove="{(e) => {
    x = e.clientX;
    y = e.clientY;
  }}"
  class="pb-24 pt-32 lg:pb-44 lg:pt-64 bg-gradient-to-b from-white to-neutral-100 relative"
>
  <div class="absolute overflow-clip inset-0 z-0 w-full h-full">
    <div class="-bottom-1/3 absolute inset-0">
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        style="width: 100%; height: 100%;"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#a855f788"></stop>
            <stop offset="100%" stop-color="#EB451155"></stop>
          </linearGradient>
        </defs>
        {#each Array(20) as _, i}
          {@const baseHeight = 250 + 5 * (i + 1) * y * 0.01}
          {@const baseX = 1 + 5 * i + 1 * x}
          <path
            id="path1"
            d="M {i * -10} {baseHeight} Q {baseX} {baseHeight - 50 * 1} {baseX +
              320} {baseHeight + 60 * i} T 1500 {baseHeight} V 600 H 0 Z"
            style="fill: none; stroke: url(#gradient); stroke-width: 0.5;"
            class=""
          >
          </path>
        {/each}
      </svg>
    </div>
  </div>
  <Container>
    <div class="grid grid-cols-12 gap-8 relative">
      <div class="col-span-12 md:col-span-6 text-black">
        {@html title}
        <p class="mt-4 text-xl xl:text-2xl mt-8 text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  </Container>
</header>
