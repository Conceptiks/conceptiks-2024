<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export { className as class };
  export let verticalGap: string = "my-4";

  let className = "";
</script>

<hr class="{twMerge('w-full border-line', className, verticalGap)}" />
