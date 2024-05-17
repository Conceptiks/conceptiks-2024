<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export { className as class };
  export let slim: boolean = false;
  let className = "";
</script>

<div
  class="{twMerge(
    'px-8 mx-auto',
    slim ? 'max-w-screen-lg' : 'max-w-screen-xl',
    className
  )}"
>
  <slot />
</div>
