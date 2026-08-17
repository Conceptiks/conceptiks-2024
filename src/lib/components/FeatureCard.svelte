<script lang="ts">
  export let title: string = "";
  export let decorationString: string = "";
  export let description: string = "";
</script>

<div
  class="group relative h-full overflow-clip rounded-2xl border border-line bg-surface p-6 shadow-card transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
>
  {#if decorationString}
    <span
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-12 -right-3 select-none text-[9rem] font-bold leading-none text-ink/[0.04] transition-colors duration-300 group-hover:text-primary/[0.07]"
    >
      {decorationString}
    </span>
  {/if}
  <div class="relative">
    <span class="mb-2 block text-lg font-semibold text-primary">{title}</span>
    <p>{description}</p>
  </div>
</div>
