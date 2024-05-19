<script lang="ts">
  export let title: string = "";
  export let description: string = "";
</script>

<div class="p-4 bg-primary rounded-lg shadow-xl">
  <span class="block font-bold text-white">{title}</span>
  <p class="text-white">{description}</p>
</div>
