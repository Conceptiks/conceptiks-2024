<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export { className as class };
  export let slim: boolean = false;
  let className = "";
</script>

<!--
  `relative` matters: headers are positioned, so a statically-positioned
  container that overlaps one (e.g. the offer cards pulled up over the
  /leistungen header) would be painted underneath it.
-->
<div
  class="{twMerge(
    'relative px-8 mx-auto w-full',
    slim ? 'max-w-screen-lg' : 'max-w-screen-xl',
    className
  )}"
>
  <slot />
</div>
