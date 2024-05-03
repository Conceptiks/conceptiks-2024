<script lang="ts">
  import { enhance } from "$app/forms";
  import { PUBLIC_BUILDER_API_KEY } from "$env/static/public";
  import Container from "$lib/components/Container.svelte";
  import OverflowScrollContainer from "$lib/components/OverflowScrollContainer.svelte";
  import ProjectItemHeader2 from "$lib/components/ProjectItemHeader2.svelte";
  import Section from "$lib/components/Section.svelte";
  import { ContainerDef } from "$lib/defs/container.builder.js";
  import { HeaderDef } from "$lib/defs/header.builder.js";
  import { HRDef } from "$lib/defs/hr.builder.js";
  import { IconDef } from "$lib/defs/icon.builder.js";
  import { OverflowScrollContainerDef } from "$lib/defs/overflowScrollContainer.builder.js";
  import { SectionDef } from "$lib/defs/section.builder.js";
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";
  import { Image } from "@unpic/svelte";

  export let data;
  const { content } = data;
  const customComponents = [
    ContainerDef,
    HeaderDef,
    HRDef,
    SectionDef,
    IconDef,
    OverflowScrollContainerDef,
  ];

  const canShowContent = content || isPreviewing();

  $: console.log(content);
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
  />
  <main>
    <Content
      model="portfolio-item"
      {customComponents}
      {content}
      apiKey="{PUBLIC_BUILDER_API_KEY}"
    />
  </main>
  <Section id="test">
    <Container>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-br from-blue-500 to-blue-700"
      >
        <div class=" p-16 ,my-auto">
          <h2 class="text-white">Projektanfrage</h2>
          <p class="!text-white">
            Wir haben dein Interesse geweckt und du würdest uns gerne besser
            kennenlernen?
          </p>
        </div>
        <div class="p-16">
          <form use:enhance>
            <!-- request contact form -->
            <div class="mb-4 space-y-6">
              <div class="">
                <label for="name" class="block text-sm font-medium text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  class="mt-2 focus:ring-white focus:border-blue-500 block w-full shadow-sm sm:text-sm border-white/50 rounded bg-white/25 border-2 text-white"
                />
              </div>
              <div class="flex gap-x-2 gap-y-6 flex-wrap">
                <div class="flex-1 min-w-60">
                  <label
                    for="email"
                    class="block text-sm font-medium text-white"
                  >
                    Email-Adressse
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    class="mt-2 focus:ring-white focus:border-blue-500 block w-full shadow-sm sm:text-sm border-white/50 rounded bg-white/25 border-2 text-white"
                  />
                </div>
                <div class="flex-1 min-w-60">
                  <label
                    for="phone"
                    class="block text-sm font-medium text-white"
                  >
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    class="mt-2 focus:ring-white focus:border-blue-500 block w-full shadow-sm sm:text-sm border-white/50 rounded bg-white/25 border-2 text-white"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  </Section>
{:else}
  Content Not Found
{/if}
