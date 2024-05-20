<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let title: string;
  export let description: string;
  export let value: string;
  export let name: string;
  export let group: string;
</script>

<label class="">
  <input type="radio" {name} {value} class="peer group hidden" bind:group />
  <div
    role="radio"
    on:keypress="{(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.currentTarget.click();
      }
    }}"
    tabindex="0"
    class="group p-4 flex gap-4 border shadow-sm bg-neutral-50 transition-all hover:bg-neutral-100 border-neutral-200 group peer-checked:border-primary peer-checked:border outline outline-4 outline-transparent focus:outline-primary/20 focus:ring-primary focus-visible:ring-black ring-1 ring-transparent rounded-lg cursor-pointer"
  >
    <div class="">
      <div
        class="{twMerge(
          'rounded-full  border-[3px] w-5 h-5 border-white ring-2 ',
          group === value
            ? 'bg-primary ring-primary'
            : 'group-hover:bg-neutral-300 bg-neutral-200 ring-neutral-300'
        )}"
      ></div>
    </div>
    <div class="">
      <span class="block font-semibold">{title}</span>
      <span class="text-neutral-500">{description}</span>
    </div>
  </div>
</label>
