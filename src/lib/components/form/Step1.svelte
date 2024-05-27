<script lang="ts">
  export let props: { valid: boolean; details: string; idea: string };

  $: props.valid = props.details && props.idea ? true : false;
</script>

<div class="grid grid-cols-1 items-start gap-4 relative">
  <label>
    <p class="font-bold text-black">
      Erzähle uns mehr von deiner Herausforderung
    </p>
    <textarea
      bind:value="{props.details}"
      name="details"
      class="w-full h-32 p-4 border border-black/10 rounded-lg"
      placeholder="Beschreibe uns dein Problem"
    ></textarea>
  </label>
  <label>
    <p class="font-bold text-black">
      Hast du bereits eine konkrete Idee, wie wir dir helfen können?
    </p>
    <textarea
      bind:value="{props.idea}"
      name="idea"
      class="w-full h-32 p-4 border border-black/10 rounded-lg"
      placeholder="Ich möchte ein neues Logo, eine neue Webseite, etc."
    ></textarea>
  </label>
</div>
