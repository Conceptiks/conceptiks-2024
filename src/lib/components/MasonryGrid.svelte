<script lang="ts">
  import { Image } from "@unpic/svelte";
  import { Masonry } from "svelte-bricks";
  import Container from "./Container.svelte";
  export let items: {
    aspectRatio:
      | "1/1"
      | "4/3"
      | "16/9"
      | "3/2"
      | "9/16"
      | "2/1"
      | "3/4"
      | "3/5";

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
  }[];
  let [minColWidth, maxColWidth, gap] = [400, 800, 24];
  let width: number, height: number;

  // map items to new array with aspectRatio as a number
  $: mappedItems = items.map((item) => ({
    ...item,
    id: item.reference.id,
    aspectRatio: item.aspectRatio.split("/").reduce((a, b) => a / b),
  }));

  $: console.log(items);

  const categories = items.reduce((acc, item) => {
    item.reference.value.data.category.forEach((category) => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  let selectedCategory = categories[0];

  $: console.log(selectedCategory);
</script>

<Container>
  <fieldset class="flex gap-3 -mx-2 mb-4">
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
        class="text-sm peer-checked:bg-primary-500 peer-checked:font-bold uppercase py-1 px-2 hover:cursor-pointer"
        >Alle</label
      >
    </div>
    {#each categories as category}
      <span
        class="last:hidden text-neutral-300"
        aria-hidden="true"
        role="presentation">/</span
      >
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
          class="text-sm peer-checked:bg-primary-500 peer-checked:font-bold uppercase py-1 px-2 hover:cursor-pointer"
          >{category}</label
        >
      </div>
    {/each}
  </fieldset>
  <Masonry
    animate="{true}"
    idKey="id"
    let:item
    items="{mappedItems}"
    {minColWidth}
    {maxColWidth}
    {gap}
    bind:masonryWidth="{width}"
    bind:masonryHeight="{height}"
  >
    <a class="block" href="{item.reference.value.data.url}">
      <div
        class="overflow-clip border-neutral-200 border block w-full bg-white shadow-neutral-100 shadow-lg"
      >
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
      <h5 class="mt-3">{item.reference.value.data.title}</h5>
    </a>
  </Masonry>
</Container>
