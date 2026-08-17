<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Icon from "./Icon.svelte";
  import { slide } from "svelte/transition";

  export let icon: ComponentProps<Icon> | undefined = undefined;
  export let title: string = "";
  export let description: string | undefined = undefined;
  export let optional: boolean = false;

  let open = false;
</script>

<details
  on:toggle="{(e) => (open = e.currentTarget.open)}"
  class="group relative w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 ease-out hover:border-line-strong hover:shadow-card-hover"
  class:cursor-pointer="{!!description}"
>
  <summary
    class="flex list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden"
    class:cursor-default="{!description}"
  >
    {#if icon}
      <Icon {...icon} />
    {/if}
    <p class="flex-1 font-semibold !text-ink">
      {title}
    </p>
    {#if optional}
      <span
        class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium leading-normal text-primary-700 dark:bg-primary/15 dark:text-primary-300"
      >
        optional
      </span>
    {/if}
    {#if description}
      <span
        class="shrink-0 text-ink-subtle transition-transform duration-300 ease-out group-open:rotate-180"
      >
        <Icon iconClass="carbon:chevron-down" color="currentColor" size="sm" />
      </span>
    {/if}
  </summary>
  {#if description && open}
    <div
      transition:slide="{{ duration: 250 }}"
      class="border-t border-line bg-surface-2 px-4 py-4"
    >
      <p>{description}</p>
    </div>
  {/if}
</details>
