<script>
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  import Section from "./Section.svelte";
  import Form from "./form/Form.svelte";
</script>

<header
  class="pt-40 py-20 md:pt-64 md:py-32 relative bg-gradient-to-b from-white to-neutral-100"
>
  <div class="absolute overflow-clip inset-0 z-0 w-full h-full">
    <div class="-bottom-1/3 absolute inset-0">
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        style="width: 100%; height: 100%;"
      >
        <rect width="1440" height="600" fill="url(#gradient)"></rect>
        <path
          id="path1"
          d="M0,300 Q360,240 720,320 T1440,300 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,300 Q360,240 720,320 T1440,300 V600 H0 Z;
              M0,300 Q360,220 720,340 T1440,300 V600 H0 Z;
              M0,300 Q360,240 720,320 T1440,300 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path2"
          d="M0,320 Q340,260 720,340 T1440,330 V600 H0 Z"
          style="fill: none; stroke: #EB451122; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,320 Q340,260 720,340 T1440,330 V600 H0 Z;
              M0,320 Q340,240 720,360 T1440,330 V600 H0 Z;
              M0,320 Q340,260 720,340 T1440,330 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path3"
          d="M0,340 Q380,280 720,360 T1440,360 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,340 Q380,280 720,360 T1440,360 V600 H0 Z;
              M0,340 Q380,260 720,380 T1440,360 V600 H0 Z;
              M0,340 Q380,280 720,360 T1440,360 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path4"
          d="M0,360 Q360,300 720,380 T1440,390 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,360 Q360,300 720,380 T1440,390 V600 H0 Z;
              M0,360 Q360,280 720,400 T1440,390 V600 H0 Z;
              M0,360 Q360,300 720,380 T1440,390 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path5"
          d="M0,380 Q340,320 720,400 T1440,420 V600 H0 Z"
          style="fill: none; stroke: #EB451122; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,380 Q340,320 720,400 T1440,420 V600 H0 Z;
              M0,380 Q340,300 720,420 T1440,420 V600 H0 Z;
              M0,380 Q340,320 720,400 T1440,420 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path6"
          d="M0,400 Q380,340 720,420 T1440,450 V600 H0 Z"
          style="fill: none; stroke: #EB451122; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,400 Q380,340 720,420 T1440,450 V600 H0 Z;
              M0,400 Q380,320 720,440 T1440,450 V600 H0 Z;
              M0,400 Q380,340 720,420 T1440,450 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path7"
          d="M0,420 Q360,360 720,440 T1440,480 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,420 Q360,360 720,440 T1440,480 V600 H0 Z;
              M0,420 Q360,340 720,460 T1440,480 V600 H0 Z;
              M0,420 Q360,360 720,440 T1440,480 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path8"
          d="M0,440 Q340,380 720,460 T1440,510 V600 H0 Z"
          style="fill: none; stroke: #EB451122; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,440 Q340,380 720,460 T1440,510 V600 H0 Z;
              M0,440 Q340,360 720,480 T1440,510 V600 H0 Z;
              M0,440 Q340,380 720,460 T1440,510 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path9"
          d="M0,460 Q380,400 720,480 T1440,540 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,460 Q380,400 720,480 T1440,540 V600 H0 Z;
              M0,460 Q380,380 720,500 T1440,540 V600 H0 Z;
              M0,460 Q380,400 720,480 T1440,540 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path10"
          d="M0,480 Q360,420 720,500 T1440,570 V600 H0 Z"
          style="fill: none; stroke: #EB451122; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,480 Q360,420 720,500 T1440,570 V600 H0 Z;
              M0,480 Q360,400 720,520 T1440,570 V600 H0 Z;
              M0,480 Q360,420 720,500 T1440,570 V600 H0 Z"
          ></animate>
        </path>
        <path
          id="path11"
          d="M0,500 Q340,440 720,520 T1440,600 V600 H0 Z"
          style="fill: none; stroke: #a855f722; stroke-width: 1;"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,500 Q340,440 720,520 T1440,600 V600 H0 Z;
              M0,500 Q340,420 720,540 T1440,600 V600 H0 Z;
              M0,500 Q340,440 720,520 T1440,600 V600 H0 Z"
          ></animate>
        </path>
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
  .highlight {
    @apply bg-gradient-to-br  from-purple-500 to-primary bg-clip-text text-transparent;
  }
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
  @keyframes wave {
    0% {
      d: path("M0,300 Q360,240 720,320 T1440,300 V600 H0 Z");
    }
    50% {
      d: path("M0,300 Q360,220 720,340 T1440,300 V600 H0 Z");
    }
    100% {
      d: path("M0,300 Q360,240 720,320 T1440,300 V600 H0 Z");
    }
  }
</style>
