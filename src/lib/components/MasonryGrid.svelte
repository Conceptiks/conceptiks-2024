<script lang="ts" context="module">
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
          url: string;
          category: string[];
        };
      };
    };
  }
</script>

<script lang="ts">
  import { Image } from "@unpic/svelte";
  import { Masonry } from "svelte-bricks";
  import Container from "./Container.svelte";
  export let items: MasonryItem[] = [];
  let [minColWidth, maxColWidth, gap] = [300, 800, 24];
  let width: number, height: number;
  let selectedCategory: string | null = null;

  // map items to new array with aspectRatio as a number
  $: mappedItems = items.map((item) => ({
    ...item,
    id: item.reference.id,
    aspectRatio: item.aspectRatio.split("/").reduce((a, b) => a / b),
  }));

  const createFilters = (
    mappedItems: MasonryItem[],
    selectedCategory: string | null
  ) => {
    if (!mappedItems) return [];

    return mappedItems.filter((item) => {
      if (selectedCategory === null) {
        return item;
      } else {
        return item.reference.value.data.category.includes(selectedCategory);
      }
    });
  };

  const createCateogries = (items: MasonryItem[], itemsw) => {
    if (!items) return [];

    return items.reduce((acc, item) => {
      item.reference.value.data.category.forEach((category) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
      });
      return acc;
    }, []);
  };

  $: categories = createCateogries(mappedItems, items);
  $: filteredItems = createFilters(mappedItems, selectedCategory);
</script>

<Container>
  <fieldset class="flex flex-wrap gap-y-1 gap-x-2 lg:gap-3 mb-8 lg:mb-4">
    <legend aria-label="Filter" class="sr-only hidden">Filter</legend>
    <div class="">
      <input
        type="radio"
        name="categories"
        id="all"
        value="{null}"
        class="peer hidden"
        bind:group="{selectedCategory}"
      />
      <!-- label styling based on peer state -->
      <label
        for="all"
        class="text-sm peer-checked:font-bold capitalize py-1 px-2 hover:cursor-pointer rounded-md bg-neutral-100 hover:bg-neutral-200 transition-all peer-checked:bg-gradient-to-br from-purple-500 to-primary peer-checked:text-white"
        >Alle</label
      >
    </div>
    <!-- {#if categories.length > 0} -->
    {#each categories as category}
      <!-- <span
        class="last:hidden text-neutral-300"
        aria-hidden="true"
        role="presentation">/</span
      > -->
      <div class="">
        <input
          type="radio"
          name="categories"
          id="{category}"
          value="{category}"
          class="peer hidden"
          bind:group="{selectedCategory}"
        />
        <!-- label styling based on peer state -->
        <label
          for="{category}"
          class="text-sm peer-checked:font-bold capitalize py-1 px-2 hover:cursor-pointer rounded-md bg-neutral-100 hover:bg-neutral-200 transition-all peer-checked:bg-gradient-to-br from-purple-500 to-primary peer-checked:text-white"
          >{category}</label
        >
      </div>
    {/each}
    <!-- {/if} -->
  </fieldset>
  {#if !filteredItems || filteredItems.length === 0}
    <p>Loading...</p>
  {:else}
    <Masonry
      animate="{true}"
      idKey="id"
      let:item
      items="{filteredItems}"
      {minColWidth}
      {maxColWidth}
      {gap}
      bind:masonryWidth="{width}"
      bind:masonryHeight="{height}"
    >
      <a
        class="block relative overflow-clip group shadow-neutral-100 drop-shadow-xl rounded-lg"
        href="{item.reference.value.data.url}"
      >
        <div class=" overflow-clip block w-full bg-white">
          <Image
            objectFit="cover"
            layout="constrained"
            width="{800}"
            aspectRatio="{parseFloat(item.aspectRatio)}"
            class="hover:scale-105 scale-100 transition-transform duration-300 ease-in-out"
            src="{item.reference.value.data.thumbnail}"
            alt="{item.reference.value.data.title} mockup"
          />
        </div>
        <div
          class="bg-white/75 border border-white/10 backdrop-blur-sm group-hover:bg-black rounded-md transition-all group-hover:text-white drop-shadow-md absolute bottom-4 left-4 z-10 py-2 px-4"
        >
          <h5>{item.reference.value.data.title}</h5>
        </div>
      </a>
    </Masonry>
  {/if}
</Container>
