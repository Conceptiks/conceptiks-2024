<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Icon from "./Icon.svelte";
  import { fade } from "svelte/transition";

  export let icon: ComponentProps<Icon> | undefined = undefined;
  export let title: string = "";
  export let description: string | undefined = undefined;
  export let optional: boolean = false;

  let open = false;
</script>

<details
  on:toggle="{(e) => {
    if (!e.target) return;
    open = e.target.open;
  }}"
  class="rounded relative w-full border border-neutral-200 transition-all hover:border-neutral-400 cursor-pointer"
>
  <summary class="group p-4 flex gap-2 items-center">
    {#if icon}
      <Icon {...icon} />
    {/if}
    <p class="flex-1 font-bold text-black">
      {title}
    </p>
    {#if optional}
      <span
        class="text-white px-1.5 py-0.5 leading-normal bg-blue-600 rounded text-xs"
        >optional</span
      >
    {/if}
    {#if description}
      {#if open}
        <Icon iconClass="carbon:chevron-up" color="#888888" />
      {:else}
        <Icon iconClass="carbon:chevron-down" color="#888888" />
      {/if}
    {/if}
  </summary>
  {#if description}
    <div class="bg-neutral-100 p-4">
      <p transition:fade="{{ duration: 300 }}">
        {description}
      </p>
    </div>
  {/if}
</details>
