<script lang="ts">
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";

  export let data;
  const { content } = data;
  const customComponents = [ContainerDef, HeaderDef];

  const canShowContent = content || isPreviewing();
</script>

<svelte:head>
  {#if content && content.data}
    <title>{content.data.title} | Projects | conceptiks</title>
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
