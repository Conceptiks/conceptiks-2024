<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Image } from "@unpic/svelte";

  export let containerSize: "md" | "lg" = "md";

  export let className = "";
  export let images: {
    src: string;
    alt: string;
  }[] = [];
  export { className as class };

  onMount(() => {
    getScrollPaddings();
  });

  let timelineScrollContainer: HTMLDivElement;
  let innerWidth: number;

  const getScrollPaddings = () => {
    // Inner Width of scrollable container should always be 1280px and this should only apply on lg viewports or above
    if (!timelineScrollContainer || !browser) {
      return {};
    }

    const targetWidth = `calc((100vw - ${containerSize === "md" ? "980px" : "1240px"}) / 2)`;

    timelineScrollContainer.style.scrollPaddingLeft = targetWidth;
    timelineScrollContainer.style.scrollPaddingRight = targetWidth;
    timelineScrollContainer.style.paddingLeft = targetWidth;
    timelineScrollContainer.style.paddingRight = targetWidth;
  };

  $: innerWidth, getScrollPaddings();

  let mouseDown = false;
  let startX: number, scrollLeft: number;

  const handleMouseDown = function (e) {
    mouseDown = true;
    startX = e.pageX - timelineScrollContainer.offsetLeft;
    scrollLeft = timelineScrollContainer.scrollLeft;
  };
  const handleMouseUp = function (e) {
    mouseDown = false;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - timelineScrollContainer.offsetLeft;
    const scroll = x - startX;
    timelineScrollContainer.scrollLeft = scrollLeft - scroll;
  };
</script>

<svelte:body on:mouseleave="{handleMouseUp}" />
<svelte:window bind:innerWidth />

<div class="!max-w-screen-lg px-0 mx-auto lg:mx-0 lg:!max-w-none">
  <div
    bind:this="{timelineScrollContainer}"
    class="{twMerge(
      ' gap-8 mx-0 max-w-none flex overflow-x-auto snap-always snap-proximity gradient-container',
      mouseDown ? 'cursor-grabbing' : 'cursor-grab',
      className
    )}"
    on:mousedown="{handleMouseDown}"
    on:mousemove="{handleMouseMove}"
    on:mouseup="{handleMouseUp}"
  >
    {#if images.length}
      {#each images as { src, alt }}
        <Image layout="fullWidth" {src} {alt}></Image>
      {/each}
    {:else}
      <slot />
    {/if}
  </div>
</div>

<style lang="postcss">
  .gradient-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb:active {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: transparent;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-button:start:decrement,
    &::-webkit-scrollbar-button:end:increment {
      display: none;
    }

    &::-webkit-scrollbar-button:horizontal:decrement,
    &::-webkit-scrollbar-button:horizontal:increment {
      display: none;
    }

    &::-webkit-scrollbar-button:vertical:decrement,
    &::-webkit-scrollbar-button:vertical:increment {
      display: none;
    }

    &::-webkit-scrollbar-button:horizontal:decrement:active,
    &::-webkit-scrollbar-button:horizontal:increment:active {
      display: none;
    }

    &::-webkit-scrollbar-button:vertical:decrement:active,
    &::-webkit-scrollbar-button:vertical:increment:active {
      display: none;
    }

    &::-webkit-scrollbar-button:horizontal:decrement:hover,
    &::-webkit-scrollbar-button:horizontal:increment:hover {
      display: none;
    }

    &::-webkit-scrollbar-button:vertical:decrement:hover,
    &::-webkit-scrollbar-button:vertical:increment:hover {
      display: none;
    }
  }
</style>
