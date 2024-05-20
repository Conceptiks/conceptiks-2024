<script lang="ts">
  export let title, description: string;
</script>

<div
  class="relative h-auto p-8 border-b border-black/10 drop-shadow-sm bg-white"
>
  <p
    class="font-semibold text-transparent bg-gradient-to-br inline-block from-purple-500 to-primary bg-clip-text"
  >
    {title}
  </p>
  <span class="text-xl font-bold mt-2 block">{description}</span>
</div>
