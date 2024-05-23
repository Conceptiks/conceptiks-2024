<script>
  import Container from "./Container.svelte";
  import Form from "./form/Form.svelte";

  //get pointer position
  let x = 0;
  let y = 0;
</script>

<header
  on:mousemove="{(e) => {
    x = e.clientX;
    y = e.clientY;
  }}"
  class="pt-40 py-20 md:pt-64 md:py-32 relative bg-gradient-to-b from-white to-neutral-100"
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
  <Container class="relative">
    <div class="z-10 w-full grid grid-cols-12 gap-y-8 items-center">
      <div class="col-span-12 md:col-span-6">
        <h1 class="text-4xl md:text-7xl text-black">
          Wir entwickeln digitale Produkte.
          <span class="highlight">
            <br />
            <span> Nutzerzentriert. </span>
            <br />
            <span> Analytisch. </span>
            <br />
            <span> Konversionsstark. </span>
          </span>
        </h1>
        <p class="text-xl md:text-2xl mt-8">
          Von der ersten Idee bis hin zur technischen Umsetzung, wir entwickeln
          nutzerorientierte Lösungen für digitale Welten
        </p>
      </div>
      <div class="col-span-12 md:col-span-5 md:col-start-8">
        <Form />
      </div>
    </div>
  </Container>
</header>

<style lang="postcss">
  .container {
    width: 100%;
    height: 60vh;
    overflow: hidden;
    position: relative;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  .line {
    fill: none;
    stroke: #ff0000;
    stroke-width: 2;
  }
</style>
