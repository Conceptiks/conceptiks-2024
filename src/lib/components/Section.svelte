<script lang="ts">
  export let id: string = "";
</script>

<!--
  Vertical space is padding rather than margin so that sections which carry a
  background colour (set per-block in Builder) keep breathing room inside the
  tint instead of hugging their content.
-->
<section {id} class="py-12 sm:py-14 lg:py-16">
  <slot />
</section>
