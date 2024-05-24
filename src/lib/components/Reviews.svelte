<script lang="ts">
  import { Image } from "@unpic/svelte";

  interface ImageProps {
    src: string;
    alt: string;
  }

  interface ReviewProps {
    logo: ImageProps;
    quote: string;
    reviewer: {
      name: string;
      title: string;
      photo: ImageProps;
    };
  }

  export let reviews: ReviewProps[] = [];
</script>

{#if reviews.length}
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    {#each reviews as { logo, quote, reviewer }, i}
      <div class="flex flex-col shadow-lg bg-white p-10 rounded-lg">
        <Image
          layout="fixed"
          objectFit="contain"
          width="{128}"
          height="{48}"
          class="self-start object-left"
          src="{logo.src}"
          alt="{logo.alt}"
        />
        <figure class="mt-10 flex flex-auto flex-col justify-between">
          <blockquote class="text-lg leading-8 text-neutral-900">
            <p>
              {quote}
            </p>
          </blockquote>
          <figcaption class="mt-10 flex items-center gap-x-6">
            <Image
              layout="fixed"
              objectFit="cover"
              width="{56}"
              height="{56}"
              class="h-14 w-14 rounded-full bg-neutral-50"
              src="{reviewer.photo.src}"
              alt="{reviewer.photo.alt}"
            />

            <div class="text-base">
              <div class="font-semibold text-neutral-900">{reviewer.name}</div>
              <div class="mt-1 text-neutral-500">{reviewer.title}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    {/each}
  </div>
{/if}
