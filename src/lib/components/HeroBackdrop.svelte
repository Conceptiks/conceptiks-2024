<script lang="ts">
  import { onMount } from "svelte";

  // Unique per instance so two heroes on one page don't collide on the gradient id.
  const gradientId = `hero-gradient-${Math.random().toString(36).slice(2, 9)}`;

  const LINES = 20;

  let x = 0;
  let y = 0;
  let animate = true;

  onMount(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (animate = !query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  });

  // Frozen at a neutral resting position when the visitor prefers reduced motion.
  $: px = animate ? x : 240;
  $: py = animate ? y : 320;
</script>

<svelte:window
  on:mousemove="{(e) => {
    if (!animate) return;
    x = e.clientX;
    y = e.clientY;
  }}"
/>

<div
  class="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-clip"
  aria-hidden="true"
>
  <div class="absolute inset-0 -bottom-1/3">
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      style="width: 100%; height: 100%;"
      focusable="false"
    >
      <defs>
        <linearGradient id="{gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6F3C" stop-opacity="0.28"></stop>
          <stop offset="55%" stop-color="#EB4511" stop-opacity="0.45"></stop>
          <stop offset="100%" stop-color="#B02E0C" stop-opacity="0.22"></stop>
        </linearGradient>
      </defs>
      {#each Array(LINES) as _, i}
        {@const baseHeight = 250 + 5 * (i + 1) * py * 0.01}
        {@const baseX = 1 + 5 * i + px}
        <path
          d="M {i * -10} {baseHeight} Q {baseX} {baseHeight - 50} {baseX +
            320} {baseHeight + 60 * i} T 1500 {baseHeight} V 600 H 0 Z"
          style="fill: none; stroke: url(#{gradientId}); stroke-width: 0.5;"
        ></path>
      {/each}
    </svg>
  </div>
</div>
