<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import StepHeader from "./StepHeader.svelte";
  import Icon from "../Icon.svelte";
  import { crossfade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import Step0 from "./Step0.svelte";
  import Step1 from "./Step1.svelte";
  import Step2 from "./Step2.svelte";
  import { enhance } from "$app/forms";

  let formData = [
    {
      title: "Lösungsfinder",
      description: "Welche Herausforderung willst du meistern?",
      props: {
        challenge: {
          value: "",
          error: undefined,
        },
        valid: false,
      },
      component: Step0,
    },
    {
      title: "Schritt 2/3",
      description: "Beschreibe deine Herausforderung im Detail",
      props: {
        valid: false,
        details: "",
        idea: "",
      },
      component: Step1,
    },
    {
      title: "Schritt 3/3",
      description: "Kontaktaufnahme",
      props: {
        valid: false,
        name: "",
        email: "",
        phone: "",
        companyName: "",
        privacy: "",
      },
      component: Step2,
    },
  ];

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

  let loading = false;

  const handleError = (err) => {
    const errors: {
      expected: any;
      path: string[];
      message: string;
    }[] = err.errors;

    errors.forEach((error) => {
      const path = error.path[0];
      const message = error.message;

      formData.forEach(({ props }) => {
        console.log(props);
        if (props[path]) {
          props[path].error = message;
        }
      });

      formData = formData;
    });
  };

  $: console.log(formData);
</script>

<form
  action="/"
  method="POST"
  use:enhance="{({ formElement, formData, action, cancel, submitter }) => {
    // `formElement` is this `<form>` element
    // `formData` is its `FormData` object that's about to be submitted
    // `action` is the URL to which the form is posted
    // calling `cancel()` will prevent the submission
    // `submitter` is the `HTMLElement` that caused the form to be submitted

    loading = true;

    return async ({ result, update }) => {
      console.log('result is', result);
      loading = false;
      handleError(result.data);
      // `result` is an `ActionResult` object
      // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
    };
  }}"
  class="relative border overflow-clip !max-h-[757px] rounded-lg drop-shadow-xl bg-white"
>
  <StepHeader
    title="{formData[currentStep].title}"
    description="{formData[currentStep].description}"
    numberOfSteps="{formData.length}"
    {currentStep}
    {previousStep}
  />
  {#each formData as { props, component }, i (i)}
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
        class="fixed bottom-0 w-full bg-gradient-to-t from-white to-transparent h-20 z-10"
      ></div>
      <div class="p-8 pb-28 overflow-y-auto h-full">
        <svelte:component this="{component}" bind:props context="{formData}" />
      </div>
      <div class="w-full px-8 absolute bottom-8 z-20">
        {#if formData.length > currentStep + 1}
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
        {:else if !loading}
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
        {:else}
          <button
            type="button"
            class="justify-center flex items-center gap-x-2"
            disabled
          >
            Lädt...
            <Icon iconClass="carbon:loading" color="#ffffff" />
          </button>
        {/if}
      </div>
    </div>
  {/each}
</form>

<style lang="postcss">
  @keyframes send {
    0% {
      transform: translateX(-400px);
    }
    50% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(400px);
    }
  }

  .send-animation {
    animation: send 2s ease-in-out infinite;
  }

  button {
    @apply w-full px-8 py-4 font-bold drop-shadow-lg transition-all rounded-lg bg-primary hover:bg-secondary text-white hover:border-black/50;
    &:disabled {
      @apply bg-neutral-300 text-neutral-600 cursor-not-allowed;
    }
  }
</style>
