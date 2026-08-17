<script lang="ts">
  import Container from "./Container.svelte";
  import type { ComponentProps } from "svelte";
  import { Image } from "@unpic/svelte";
  import { twMerge } from "tailwind-merge";

  let className: string = "";

  export { className as class };
  export let containerOptions: ComponentProps<Container> = {};
  export let classDescription = "";
  export let title = "Headline here";
  export let additionalLogo:
    | { src: string; href: string; alt: string }
    | undefined = undefined;
  export let strapline: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let center = false;
  export let splitColumns = false;
  export let justifyText = false;
  export let hyphenate = false;
  export let textStyle: "lighter" | "light" | "dark" = "dark";
  export let straplineStyle: "primary" = "primary";
</script>

<div class="mb-12">
  <Container {...containerOptions} class="gap-x-8">
    <hgroup
      class="{twMerge(
        center ? 'mx-auto text-center' : 'text-start',
        'w-full sm:w-auto sm:max-w-[66.6%] md:max-w-[50%] xl:max-w-[60%]',
        className
      )}"
    >
      {#if strapline}
        <h5
          class="{twMerge(
            straplineStyle === 'primary' ? 'text-primary' : 'text-ink-subtle'
          )}"
        >
          {strapline}
        </h5>
      {/if}
      {#if title}
        <h2
          class="{twMerge(
            textStyle === 'dark' ? 'text-ink' : 'text-white',
            strapline ? 'mt-3' : ''
          )}"
        >
          {title}
        </h2>
      {/if}
    </hgroup>
  </Container>
  {#if description}
    <Container {...containerOptions} class="flex-wrap">
      <div
        class="{twMerge(
          center ? 'sm:mx-auto text-center' : 'text-start',
          splitColumns ? 'sm:columns-2 !basis-full' : '',
          justifyText ? '!text-justify' : '',
          hyphenate ? '!hyphens-auto' : '',
          textStyle === 'light'
            ? '[&_p]:text-neutral-300'
            : textStyle === 'lighter'
              ? '[&_p]:text-white'
              : '',
          'mt-6 columns-1 basis-full text-lg sm:basis-2/3 md:basis-1/2 xl:basis-3/5',
          classDescription
        )}"
      >
        {@html description}
      </div>
      {#if additionalLogo && !center}
        <hr class="mt-6 mb-3 w-full sm:my-0 sm:mx-6 sm:hidden" />
        {#if additionalLogo.href}
          <a
            class="flex-1 place-self-center"
            rel="noreferrer"
            href="{additionalLogo.href}"
            target="_blank"
          >
            <Image
              src="{additionalLogo.src}"
              alt="{additionalLogo.alt}"
              width="{160}"
              aspectRatio="{4 / 3}"
              class="mx-auto h-16 w-auto !object-contain sm:ml-auto sm:!mr-0 sm:h-24"
            />
          </a>
        {:else}
          <div class="flex-1 place-self-center justify-end">
            <Image
              src="{additionalLogo.src}"
              alt="{additionalLogo.alt}"
              width="{160}"
              aspectRatio="{4 / 3}"
              class="mx-auto h-16 w-auto !object-contain sm:ml-auto sm:!mr-0 sm:h-24"
            />
          </div>
        {/if}
        <hr class="mt-3 w-full sm:my-0 sm:mx-6 sm:hidden" />
      {/if}
    </Container>
  {/if}
  {#if $$slots.default}
    <Container {...containerOptions}>
      <div
        class="{twMerge(
          center
            ? 'mx-auto basis-full text-center sm:basis-2/3 md:basis-1/2'
            : 'w-full'
        )}"
      >
        <slot />
      </div>
    </Container>
  {/if}
</div>
