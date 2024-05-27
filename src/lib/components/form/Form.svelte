<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import StepHeader from "./StepHeader.svelte";
  import Icon from "../Icon.svelte";
  import { crossfade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import Step0 from "./Step0.svelte";
  import { flip } from "svelte/animate";
  import Step1 from "./Step1.svelte";
  import Step2 from "./Step2.svelte";

  let data = [
    {
      title: "Lösungsfinder",
      description: "Welche Herausforderung willst du meistern?",
      props: {
        selected: "",
        valid: false,
      },
      component: Step0,
    },
    {
      title: "Schritt 2/3",
      description: "Beschreibe deine Herausforderung im Detail",
      props: {
        selected: "",
        valid: false,
        details: "",
        idea: "",
      },
      component: Step1,
    },
    {
      title: "Schritt 3/3",
      description: "Kontaktdaten",
      props: {
        selected: "",
        valid: false,
      },
      component: Step2,
    },
  ];

  $: console.log(data);

  const [send, receive] = crossfade({
    duration: 300,
    easing: cubicInOut,
  });

  let currentStep = 0;

  const nextStep = () => {
    currentStep++;
  };

  const previousStep = () => {
    currentStep--;
  };
</script>

<form
  class="relative border overflow-clip !max-h-[757px] rounded-lg drop-shadow-xl bg-white"
>
  <StepHeader
    title="{data[currentStep].title}"
    description="{data[currentStep].description}"
    numberOfSteps="{data.length}"
    {currentStep}
    {previousStep}
  />
  {#each data as { props, component }, i (i)}
    <div
      class="{twMerge(
        'h-[600px] relative',
        currentStep === i ? 'block ' : ' absolute opacity-0'
      )}"
      in:send="{{ key: i }}"
      out:receive="{{ key: i }}"
      animate:flip="{{ duration: 300 }}"
    >
      <div
        class="fixed w-full bg-gradient-to-b from-white to-transparent h-12 z-10 pointer-events-none"
      ></div>
      <div
        class="fixed bottom-0 w-full bg-gradient-to-t from-white to-transparent h-44 z-10"
      ></div>
      <div class="p-8 pb-28 overflow-y-auto h-full">
        <svelte:component this="{component}" bind:props context="{data}" />
      </div>
      <div class="w-full px-8 absolute bottom-8 z-20">
        {#if data.length > currentStep + 1}
          <button
            type="button"
            class="justify-center flex items-center gap-x-2"
            on:click="{nextStep}"
            disabled="{!props.valid}"
          >
            Weiter <Icon
              iconClass="carbon:arrow-right"
              color="{twMerge(!props.valid ? 'rgb(82,82,82)' : '#ffffff')}"
            />
          </button>
        {:else}
          <button
            type="submit"
            class="justify-center flex items-center gap-x-2"
            disabled="{!props.valid}"
          >
            Absenden <Icon
              iconClass="carbon:arrow-right"
              color="{twMerge(!props.valid ? 'rgb(82,82,82)' : '#ffffff')}"
            />
          </button>
        {/if}
      </div>
    </div>
  {/each}
</form>

<style lang="postcss">
  button {
    @apply w-full px-8 py-4 font-bold drop-shadow-lg transition-all rounded-lg bg-primary hover:bg-secondary text-white hover:border-black/50;
    &:disabled {
      @apply bg-neutral-300 text-neutral-600 cursor-not-allowed;
    }
  }
</style>
