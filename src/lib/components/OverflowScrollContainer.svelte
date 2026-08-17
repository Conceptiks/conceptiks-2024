<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { Image } from "@unpic/svelte";
  import { onMount } from "svelte";

  export let containerSize: "md" | "lg" = "md";
  export let className = "";
  export let images: {
    src: string;
    alt: string;
  }[] = [];
  export { className as class };

  /** Width of the centred reading rail; the strip bleeds past it on both sides. */
  const RAILS = { md: 980, lg: 1240 };
  $: rail = RAILS[containerSize] ?? RAILS.md;

  let el: HTMLDivElement;
  let dragging = false;
  let overflows = false;

  // Pointer-drag state.
  let activePointer: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let travelled = 0;
  let lastX = 0;
  let lastT = 0;
  let velocity = 0; // px per ms
  let glideFrame = 0;

  const DRAG_THRESHOLD = 5;

  // Snapping is switched off mid-gesture so it can't fight the drag, then
  // restored on release — which is what makes the strip settle onto a slide.
  $: interacting = dragging || glideFrame !== 0;

  const stopGlide = () => {
    if (glideFrame) {
      cancelAnimationFrame(glideFrame);
      glideFrame = 0;
    }
  };

  const measure = () => {
    if (el) overflows = el.scrollWidth > el.clientWidth + 1;
  };

  onMount(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  });

  const onPointerDown = (e: PointerEvent) => {
    // Touch and trackpad already scroll natively and do it better than we can.
    if (e.pointerType !== "mouse" || e.button !== 0 || !overflows) return;

    stopGlide();
    activePointer = e.pointerId;
    startX = lastX = e.clientX;
    startScroll = el.scrollLeft;
    travelled = 0;
    velocity = 0;
    lastT = e.timeStamp;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (activePointer !== e.pointerId) return;

    const dx = e.clientX - startX;

    // Don't hijack the gesture until it's clearly a drag, so plain clicks work.
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      dragging = true;
    }

    travelled = Math.max(travelled, Math.abs(dx));
    el.scrollLeft = startScroll - dx;

    const dt = e.timeStamp - lastT;
    if (dt > 0) {
      // Smoothed so a single jittery sample can't dominate the fling.
      velocity = velocity * 0.7 + ((e.clientX - lastX) / dt) * 0.3;
      lastX = e.clientX;
      lastT = e.timeStamp;
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    if (activePointer !== e.pointerId) return;

    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    activePointer = null;

    if (!dragging) return;
    dragging = false;

    // Carry the gesture on with friction rather than stopping dead.
    let v = velocity * 16;
    if (Math.abs(v) < 1.5) return;

    const glide = () => {
      v *= 0.94;
      el.scrollLeft -= v;

      const atEdge =
        el.scrollLeft <= 0 || el.scrollLeft >= el.scrollWidth - el.clientWidth;

      glideFrame =
        Math.abs(v) > 0.4 && !atEdge ? requestAnimationFrame(glide) : 0;
    };

    glideFrame = requestAnimationFrame(glide);
  };

  /** A gesture that scrolled must not also activate whatever it ended on. */
  const onClickCapture = (e: MouseEvent) => {
    if (travelled > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
    travelled = 0;
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (!overflows) return;
    const page = el.clientWidth;
    const steps: Record<string, number> = {
      ArrowRight: page * 0.5,
      ArrowLeft: page * -0.5,
      PageDown: page,
      PageUp: -page,
    };

    if (e.key in steps) {
      e.preventDefault();
      stopGlide();
      el.scrollBy({ left: steps[e.key], behavior: "smooth" });
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      stopGlide();
      el.scrollTo({
        left: e.key === "Home" ? 0 : el.scrollWidth,
        behavior: "smooth",
      });
    }
  };
</script>

<div class="mx-auto max-w-screen-lg px-0 lg:mx-0 lg:max-w-none">
  <!--
    A scrollable region has to be reachable by keyboard (WCAG 2.1.1), which
    means a labelled role plus tabindex="0" on the scroll container itself.
    Svelte's rules read that as "non-interactive element with handlers" and
    can't tell the difference, so both are silenced deliberately here.
  -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    bind:this="{el}"
    role="region"
    aria-label="Bildergalerie, horizontal scrollbar"
    tabindex="0"
    style="--rail-width: {rail}px"
    class="{twMerge(
      'rail flex max-w-none gap-8 overflow-x-auto overscroll-x-contain',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface',
      overflows ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : '',
      dragging ? 'select-none' : '',
      interacting ? 'snap-none' : 'snap-x snap-proximity',
      className
    )}"
    on:pointerdown="{onPointerDown}"
    on:pointermove="{onPointerMove}"
    on:pointerup="{onPointerUp}"
    on:pointercancel="{onPointerUp}"
    on:click|capture="{onClickCapture}"
    on:wheel="{stopGlide}"
    on:keydown="{onKeydown}"
    on:dragstart|preventDefault
  >
    {#if images.length}
      {#each images as { src, alt }}
        <!-- Explicit basis: without it the slide width falls out of the
             browser's automatic-minimum-size rules and varies per image. -->
        <div class="w-full flex-none snap-start">
          <Image layout="fullWidth" {src} {alt} draggable="{false}" />
        </div>
      {/each}
    {:else}
      <slot />
    {/if}
  </div>
</div>

<style lang="postcss">
  /*
   * Keeps the strip's content aligned with the page rail while it bleeds to the
   * viewport edges. max() stops the gutter going negative on narrow screens,
   * and using % rather than vw keeps the scrollbar out of the maths.
   */
  .rail {
    --gutter: max(1.5rem, calc((100% - var(--rail-width)) / 2));
    padding-inline: var(--gutter);
    scroll-padding-inline: var(--gutter);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .rail::-webkit-scrollbar {
    display: none;
  }

  /*
   * Snap points for slotted children too. Their flex sizing is deliberately
   * left alone — the cards on /leistungen size themselves via a min-width set
   * in the CMS, and forcing flex-shrink here would blow them out to max-content.
   */
  .rail > :global(*) {
    scroll-snap-align: start;
  }

  .rail :global(img) {
    -webkit-user-drag: none;
    user-select: none;
  }
</style>
