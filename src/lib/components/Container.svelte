<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let slim: boolean = false;
</script>

<div
  class="{twMerge(
    'px-8 mx-auto',
    slim ? 'max-w-screen-lg' : 'max-w-screen-2xl'
  )}"
>
  <slot />
</div>
