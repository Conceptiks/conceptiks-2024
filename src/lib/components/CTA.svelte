<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="w-full p-16 bg-gradient-to-br from-blue-500 to-blue-700">
  <h2 class="text-white">{title}</h2>
  <p class="!text-white">
    {description}
  </p>
  <slot />
</div>
