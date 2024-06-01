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
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";

  let formData = [
    {
      title: "Lösungsfinder",
      description: "Welche Herausforderung willst du meistern?",
      props: {
        challenge: {
          value: "",
          error: undefined,
        },
      },
      valid: false,
      component: Step0,
    },
    {
      title: "Schritt 2/3",
      description: "Beschreibe deine Herausforderung im Detail",
      props: {
        details: {
          value: "",
          error: undefined,
        },
        idea: {
          value: "",
          error: undefined,
        },
      },
      valid: false,
      component: Step1,
    },
    {
      title: "Schritt 3/3",
      description: "Kontaktaufnahme",
      props: {
        name: {
          value: "",
          error: undefined,
        },
        email: {
          value: "",
          error: undefined,
        },
        phone: {
          value: "",
          error: undefined,
        },
        companyName: {
          value: "",
          error: undefined,
        },
        privacy: {
          value: false,
          error: undefined,
        },
        captchaToken: {
          value: "",
          error: undefined,
        },
      },
      valid: false,
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

  let finished = false;
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

    formData.forEach((step, i) => {
      for (const prop in step.props) {
        if (step.props[prop].error) {
          currentStep = i;
          break;
        }
      }
    });
  };

  onDestroy(() => {
    // destroy turnstile
    if (browser && window.turnstile) {
      window.turnstile.remove();
    }
  });

  $: if ($page.status === 406) {
    console.error("Captcha failed, resetting");
    formData[2].props.captchaToken.value = null;
    if (browser && window.turnstile) {
      window.turnstile.reset("#captchaWidget");
    }
  }

  onMount(() => {
    // try to check if window.turnstile is present and if so, run the code below. otherwise, retry every 100ms for 5s.
    let tries = 0;
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        window.turnstile.render("#captchaWidget", {
          sitekey: PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            formData[2].props.captchaToken.value = token;
          },
        });
      } else {
        tries++;
        if (tries >= 50) {
          clearInterval(interval);
        }
      }
    }, 100);
  });
</script>

<svelte:head>
  <script
    src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
  ></script>
</svelte:head>

<form
  action="/"
  method="POST"
  use:enhance="{({ formElement, formData, action, cancel, submitter }) => {
    loading = true;

    return async ({ result, update }) => {
      console.log('result is', result);
      loading = false;

      if (!result.data) {
        update({
          invalidateAll: true,
          reset: true,
        });
        finished = true;
      } else {
        handleError(result.data);
      }
    };
  }}"
  class="relative border overflow-clip !max-h-[757px] rounded-lg drop-shadow-xl bg-white"
>
  {#if finished}
    <div
      class="p-8 text-center h-[728px] relative flex flex-col items-center justify-center"
    >
      <Icon iconClass="carbon:email" color="#EB4511" customSize="100px" />
      <h2 class="text-2xl font-bold">Vielen Dank für deine Anfrage!</h2>
      <p
        class="text-lg mt
      -4"
      >
        Wir melden uns in Kürze bei dir.
      </p>
    </div>
  {:else}
    <StepHeader
      title="{formData[currentStep].title}"
      description="{formData[currentStep].description}"
      numberOfSteps="{formData.length}"
      {currentStep}
      {previousStep}
    />

    {#each formData as { props, component, valid }, i (i)}
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
          <svelte:component
            this="{component}"
            bind:props
            bind:valid
            context="{formData}"
          />
        </div>
        <div class="w-full px-8 absolute bottom-8 z-20">
          {#if formData.length > currentStep + 1}
            <button
              type="button"
              class="justify-center flex items-center gap-x-2"
              on:click="{nextStep}"
              disabled="{!valid}"
            >
              Weiter <Icon
                iconClass="carbon:arrow-right"
                color="{twMerge(!valid ? 'rgb(82,82,82)' : '#ffffff')}"
              />
            </button>
          {:else if !loading}
            <button
              type="submit"
              class="justify-center flex items-center gap-x-2"
              disabled="{!valid}"
            >
              Absenden <Icon
                iconClass="carbon:arrow-right"
                color="{twMerge(!valid ? 'rgb(82,82,82)' : '#ffffff')}"
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
  {/if}
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
