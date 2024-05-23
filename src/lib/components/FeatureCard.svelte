<script lang="ts">
  export let title: string = "";
  export let decorationString: string = "";
  export let description: string = "";
</script>

<div class="p-4 bg-white relative rounded-lg drop-shadow-xl overflow-clip">
  <div class="absolute -bottom-14 -right-2">
    <span class="text-[10rem] text-black/5 font-bold">{decorationString}</span>
  </div>
  <span class="block text-xl font-medium mb-2 text-primary">{title}</span>
  <p class="text-neutral-500">{description}</p>
</div>
