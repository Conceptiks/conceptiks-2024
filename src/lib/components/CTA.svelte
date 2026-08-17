<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div
  class="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-secondary p-10 shadow-panel sm:p-14 lg:p-16"
>
  <!-- Soft highlight so the flat gradient reads with a little depth. -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
  ></div>

  <div class="relative max-w-2xl">
    <h2 class="text-white">{title}</h2>
    <p class="mt-4 !text-white/80 text-lg">
      {description}
    </p>
    <div class="mt-8">
      <slot />
    </div>
  </div>
</div>
