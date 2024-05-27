<script lang="ts">
  import Icon from "../Icon.svelte";

  export let title, description: string;
  export let currentStep: number;
  export let numberOfSteps: number;
  export let previousStep: () => void;

  $: stepProgress = currentStep / numberOfSteps;
</script>

<div
  class="relative h-auto p-8 border-b border-black/10 drop-shadow-sm bg-white"
>
  <div
    style="{'width: ' + stepProgress * 100 + '%;'}"
    class="absolute inset-0 h-1 bg-gradient-to-r from-purple-500 to-primary transition-all"
  ></div>
  <div class="flex items-center justify-between gap-x-2">
    {#if currentStep > 0}
      <button
        on:click="{previousStep}"
        class="rounded-full flex items-center gap-x-1 bg-neutral-100 py-1.5 text-sm leading-none px-2 border border-neutral-200"
      >
        <Icon iconClass="carbon:arrow-left" size="sm" /> Zurück
      </button>
    {/if}
    <p
      class="font-semibold text-transparent bg-gradient-to-br inline-block from-purple-500 to-primary bg-clip-text"
    >
      {title}
    </p>
  </div>
  <span class="text-xl font-bold mt-2 block">{description}</span>
</div>
