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
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    {#each reviews as { logo, quote, reviewer }}
      <figure
        class="flex flex-col rounded-2xl border border-line bg-surface p-8 shadow-card transition-shadow duration-300 ease-out hover:shadow-card-hover sm:p-10"
      >
        <Image
          layout="fixed"
          objectFit="contain"
          width="{128}"
          height="{48}"
          class="self-start object-left dark:brightness-0 dark:invert"
          src="{logo.src}"
          alt="{logo.alt}"
        />
        <blockquote class="mt-8 flex-auto text-lg leading-relaxed text-ink">
          <p class="!text-ink">
            {quote}
          </p>
        </blockquote>
        <figcaption class="mt-8 flex items-center gap-x-4 border-t border-line pt-6">
          <Image
            layout="fixed"
            objectFit="cover"
            width="{56}"
            height="{56}"
            class="h-14 w-14 rounded-full bg-surface-3"
            src="{reviewer.photo.src}"
            alt="{reviewer.photo.alt}"
          />
          <div class="text-base">
            <div class="font-semibold text-ink">{reviewer.name}</div>
            <div class="mt-0.5 text-ink-subtle">{reviewer.title}</div>
          </div>
        </figcaption>
      </figure>
    {/each}
  </div>
{/if}
