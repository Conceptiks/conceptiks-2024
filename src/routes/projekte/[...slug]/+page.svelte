<script lang="ts">
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import ProjectItemHeader2 from "$lib/components/ProjectItemHeader2.svelte";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { GridDef } from "$lib/defs/grid.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { HRDef } from "$lib/defs/hr.builder.js";
  import { IconDef } from "$lib/defs/icon.builder.js";
  import { OverflowScrollContainerDef } from "$lib/defs/overflowScrollContainer.builder.js";
  import { PictureDef } from "$lib/defs/picture.builder.js";
  import { SectionDef } from "$lib/defs/section.builder.js";
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";

  export let data;
  const { content } = data;
  const customComponents = [
    ContainerDef,
    HeaderDef,
    HRDef,
    SectionDef,
    IconDef,
    GridDef,
    OverflowScrollContainerDef,
    PictureDef,
  ];

  const canShowContent = content || isPreviewing();
</script>

<svelte:head>
  {#if content && content.data}
    <title>{content.data.title} | Projects | conceptiks</title>
    <meta name="description" content="{content.data.description}" />
  {/if}
</svelte:head>

{#if canShowContent}
  <ProjectItemHeader2
    img="{{
      src: content.data.thumbnail,
      alt: content.data.title,
    }}"
    title="{content.data.title}"
    description="{content.data.description}"
    categories="{content.data.category}"
    brandColor="{content.data.brandColor}"
    projectUrl="{content.data.projectUrl}"
  />
  <main>
    <Content
      canTrack="{false}"
      model="portfolio-item"
      {customComponents}
      {content}
      apiKey="{PUBLIC_BUILDER_API_KEY}"
    />
  </main>
{:else}
  Content Not Found
{/if}
