<script lang="ts">
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { MasonryGridDef } from "$lib/defs/masonryGrid.builder.js";
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";

  // this data comes from the function in `+page.server.js`, which runs on the server only
  export let data;
  const { content } = data;
  const customComponents = [ContainerDef, HeaderDef, MasonryGridDef];

  // show unpublished content when in preview mode.
  const canShowContent = content || isPreviewing();
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
