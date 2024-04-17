<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { Content } from "@builder.io/sdk-svelte";

  export let data;

  const { content, canShowContent } = data;

  const customComponents = [ContainerDef, HeaderDef];
</script>

<svelte:head>
  {#if $page.params.slug === "__builder_editing__"}
    <!-- no index, no robots -->
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  {#if content}
    <title>{content.data.title}</title>
    <meta name="description" content="{content.data.description}" />
  {/if}
</svelte:head>

<Content
  canTrack="{false}"
  model="page"
  {customComponents}
  {content}
  apiKey="{PUBLIC_BUILDER_API_KEY}"
/>

{#if !canShowContent}
  Page content can't load.
{/if}
