<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="w-full p-16 bg-primary rounded-xl shadow-2xl">
  <h2 class="text-white">{title}</h2>
  <p class="!text-white">
    {description}
  </p>
  <slot />
</div>
