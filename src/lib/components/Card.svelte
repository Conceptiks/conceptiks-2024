<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Icon from "./Icon.svelte";

  export let icon: ComponentProps<Icon> | undefined = undefined;
  export let title: string = "";
  export let description: string | undefined = undefined;
  export let optional: boolean = false;
</script>

<div class="p-4 rounded relative w-full border border-neutral-200">
  <div class="inline-flex gap-2 items-center">
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
  </div>
  {#if description}
    <p class="mt-2">{description}</p>
  {/if}
</div>
