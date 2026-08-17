<script lang="ts" context="module">
  export type ImageRatio = "16:9" | "3:2" | "4:3" | "1:1";

  export interface MasonryItem {
    aspectRatio:
      | "1/1"
      | "4/3"
      | "16/9"
      | "3/2"
      | "9/16"
      | "2/1"
      | "3/4"
      | "3/5"
      | string;

    reference: {
      id: string;
      value: {
        lastUpdated: number;
        data: {
          thumbnail: string;
          title: string;
          description?: string;
          url: string;
          category: string[];
        };
      };
    };
  }
</script>

<script lang="ts">
  import { Image } from "@unpic/svelte";
  import Container from "./Container.svelte";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";

  export let items: MasonryItem[] = [];

  /**
   * One ratio for every thumbnail — the even crop is what makes the grid read as
   * set rather than assembled. 3:2 matches the source images, so nothing is
   * cropped. Falls back to each item's own `aspectRatio` when cleared in the
   * editor.
   */
  export let imageRatio: ImageRatio | "" = "3:2";

  let selectedCategory: string | null = null;

  // The CMS stores categories as slugs; these are how they should read.
  const CATEGORY_LABELS: Record<string, string> = {
    development: "Development",
    "ui-design": "UI Design",
    "ux-design": "UX Design",
    branding: "Branding",
    ausstellungsdesign: "Ausstellungsdesign",
  };

  const labelFor = (slug: string) =>
    CATEGORY_LABELS[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  /** Accepts "16:9" and "16/9" alike. */
  const toRatio = (value: string, fallback = 4 / 3): number => {
    const [w, h] = value.split(/[:/]/);
    const ratio = Number(w) / Number(h);
    return Number.isFinite(ratio) && ratio > 0 ? ratio : fallback;
  };

  // A reference pointing at an unpublished or deleted entry resolves to no
  // value, so skip those instead of letting the grid throw reading `.data`.
  $: mappedItems = items
    .filter((item) => item?.reference?.value?.data?.thumbnail)
    .map((item) => ({
      ...item,
      id: item.reference.id,
      ratio: imageRatio
        ? toRatio(imageRatio)
        : toRatio(item.aspectRatio ?? "4/3"),
    }));

  $: categories = [
    ...new Set(
      mappedItems.flatMap((item) => item.reference.value.data.category ?? [])
    ),
  ].map((slug) => ({
    slug,
    label: labelFor(slug),
  }));

  $: filteredItems = ((active: string | null) =>
    active
      ? mappedItems.filter((item) =>
          item.reference.value.data.category?.includes(active)
        )
      : mappedItems)(selectedCategory);

  let reduceMotion = false;

  onMount(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (reduceMotion = query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  });
</script>

<Container>
  <!--
    The track scrolls to the screen edges on phones rather than being boxed in
    by the container padding — the negative margin cancels Container's px-8.
  -->
  <div class="scroller -mx-8 mb-8 px-8 sm:mx-0 sm:px-0">
    <fieldset class="segmented">
      <legend class="sr-only">Projekte nach Disziplin filtern</legend>

      <div class="seg">
        <input
          type="radio"
          name="categories"
          id="category-all"
          value="{null}"
          class="peer sr-only"
          bind:group="{selectedCategory}"
        />
        <label for="category-all">Alle</label>
      </div>

      {#each categories as { slug, label }}
        <div class="seg">
          <input
            type="radio"
            name="categories"
            id="category-{slug}"
            value="{slug}"
            class="peer sr-only"
            bind:group="{selectedCategory}"
          />
          <label for="category-{slug}">{label}</label>
        </div>
      {/each}
    </fieldset>
  </div>

  {#if !filteredItems.length}
    <div class="rounded-xl border border-line py-16 text-center">
      <p>Keine Projekte in dieser Disziplin.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
      {#each filteredItems as item, i (item.id)}
        {@const project = item.reference.value.data}
        <a
          href="{project.url}"
          animate:flip="{{ duration: reduceMotion ? 0 : 260 }}"
          class="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
        >
          <!--
            translateZ(0) forces its own compositing layer — without it Safari
            lets the scaling image bleed past the rounded corners on hover.
          -->
          <div
            class="overflow-hidden rounded-xl bg-surface-3 [transform:translateZ(0)]"
          >
            <Image
              objectFit="cover"
              layout="constrained"
              width="{800}"
              aspectRatio="{item.ratio}"
              class="saturate-[.92] motion-safe:transition-[transform,filter] motion-safe:duration-500 motion-safe:ease-out group-hover:saturate-100 motion-safe:group-hover:scale-[1.03]"
              src="{project.thumbnail}"
              alt="{project.title} mockup"
            />
          </div>

          <!-- Meta block: title left, running number right, marks below. -->
          <div
            class="mt-4 grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1"
          >
            <h3
              class="text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-primary sm:text-xl"
            >
              {project.title}
            </h3>
            <span class="pt-1 font-mono text-xs tabular-nums text-ink-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>

            {#if project.category?.length}
              <div class="col-span-2 mt-1 flex flex-wrap gap-1.5">
                {#each project.category as category}
                  <span class="mark">{labelFor(category)}</span>
                {/each}
              </div>
            {/if}

            {#if project.description}
              <p class="col-span-2 mt-2 text-[0.95rem] leading-relaxed">
                {project.description}
              </p>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</Container>

<style lang="postcss">
  .scroller {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scroller::-webkit-scrollbar {
    display: none;
  }

  .segmented {
    @apply inline-flex gap-0.5 rounded-full bg-surface-3 p-1;
    /*
     * A fieldset defaults to min-inline-size: min-content, which beats any
     * max-width and was pushing the whole page sideways on phones. Reset it and
     * let the wrapper do the scrolling.
     */
    min-inline-size: 0;
  }

  .seg label {
    @apply inline-flex cursor-pointer select-none whitespace-nowrap rounded-full px-3.5 py-1.5;
    @apply text-sm font-medium text-ink-muted transition-colors duration-200 ease-out;
  }

  .seg label:hover {
    @apply text-ink;
  }

  .seg input:checked + label {
    @apply bg-surface text-ink shadow-card;
  }

  .seg input:focus-visible + label {
    @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-surface-3;
  }

  .mark {
    @apply rounded-sm border border-line px-1.5 py-0.5;
    @apply font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink-subtle;
  }
</style>
