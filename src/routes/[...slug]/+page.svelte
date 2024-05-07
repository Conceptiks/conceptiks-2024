<script lang="ts">
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import Icon from "$lib/components/Icon.svelte";
  import { ButtonDef } from "$lib/defs/button.builder.js";
  import { CardDef } from "$lib/defs/card.builder.js";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { CTADef } from "$lib/defs/cta.builder.js";
  import { FlexDef } from "$lib/defs/flex.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { IconDef } from "$lib/defs/icon.builder.js";
  import { MasonryGridDef } from "$lib/defs/masonryGrid.builder.js";
  import { OfferCardDef } from "$lib/defs/offerCard.builder.js";
  import { SectionDef } from "$lib/defs/section.builder.js";
  import { SectionIntroDef } from "$lib/defs/sectionIntro.builder.js";
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";

  // this data comes from the function in `+page.server.js`, which runs on the server only
  export let data;
  $: ({ content } = data);
  const customComponents = [
    ContainerDef,
    HeaderDef,
    MasonryGridDef,
    CTADef,
    ButtonDef,
    IconDef,
    OfferCardDef,
    SectionDef,
    FlexDef,
    SectionIntroDef,
    CardDef,
  ];

  // show unpublished content when in preview mode.
  $: canShowContent = content || isPreviewing();
</script>

<svelte:head>
  {#if content && content.data}
    <title>{content.data.title}</title>
    <meta name="description" content="{content.data.description}" />
  {/if}
</svelte:head>

<main>
  {#if canShowContent}
    <Content
      model="page"
      {content}
      {customComponents}
      apiKey="{PUBLIC_BUILDER_API_KEY}"
    />
  {:else}
    Content Not Found
  {/if}
</main>
