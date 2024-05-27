<script lang="ts">
  import { flip } from "svelte/animate";
  import { crossfade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import Icon from "../Icon.svelte";
  import { twMerge } from "tailwind-merge";
  export let selectedValue: string;
  export let nextStep: () => void;

  const [send, receive] = crossfade({
    duration: 1500,
    easing: cubicInOut,
  });
</script>

<div class="h-[600px] relative">
  <div
    class="fixed w-full bg-gradient-to-b from-white to-transparent h-12 z-10"
  ></div>
  <div
    class="fixed bottom-0 w-full bg-gradient-to-t from-white to-transparent h-44 z-10 pointer-events-none"
  ></div>
  <div class="p-8 pb-28 overflow-y-auto h-full"><slot /></div>
  <div class="w-full px-8 absolute bottom-8 z-20">
    <button
      type="button"
      class="justify-center flex items-center gap-x-2"
      on:click="{nextStep}"
      disabled="{!selectedValue}"
    >
      Weiter <Icon
        iconClass="carbon:arrow-right"
        color="{twMerge(!selectedValue ? 'rgb(82,82,82)' : '#ffffff')}"
      />
    </button>
  </div>
</div>

<style lang="postcss">
  button {
    @apply w-full px-8 py-4 font-bold drop-shadow-lg transition-all rounded-lg bg-primary hover:bg-secondary text-white hover:border-black/50;
    &:disabled {
      @apply bg-neutral-300 text-neutral-600 cursor-not-allowed;
    }
  }
</style>
