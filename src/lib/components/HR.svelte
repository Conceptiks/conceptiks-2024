<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export { className as class };
  export let verticalGap: string = "my-4";

  let className = "";
</script>

<hr class="{twMerge('border-neutral-200 w-full', className, verticalGap)}" />
