<script lang="ts">
  import InputError from "./InputError.svelte";

  export let context: {
    [key: string]: any;
  };
  export let props: {
    details: {
      value: string;
      error: string | undefined;
    };
    idea: {
      value: string;
      error: string | undefined;
    };
  };
  export let valid: boolean;

  $: valid = props.details.value ? true : false;
</script>

<div class="grid grid-cols-1 items-start gap-4 relative">
  <div class="bg-blue-500/10 p-4 rounded-lg">
    <p class="font-bold text-blue-500">Lösungsansatz</p>
    {#if context[0].props.challenge.value === "not_visible"}
      <p>
        Wenn du Probleme mit der Auffindbarkeit deines Angebotes hast, könntest
        du von einer Suchmaschinen-Optimierung profitieren.
      </p>
    {/if}
    {#if context[0].props.challenge.value === "inefficient_processes"}
      <p>
        Heute sind weitaus mehr Prozesse digitalisierbar, als noch vor einigen
        Jahren. In einem Beratungsgespräch mit uns könnten wir gemeinsam
        herausfinden, welche Prozesse in deinem Unternehmen digitalisiert werden
        können.
      </p>
    {/if}
    {#if context[0].props.challenge.value === "oudated_branding"}
      <p>
        Es gibt nur einen ersten Eindruck. Umso wichtiger also, dass dieser
        Eindruck perfekt vermittelt wird. Wir helfen dir dabei, deinen
        Internetauftritt oder dein Branding zu modernisieren, sowohl inhaltlich
        als auch optisch.
      </p>
    {/if}
    {#if context[0].props.challenge.value === "low_conversions"}
      <p>
        Wenn deine Website/App viele Besucher hat, aber nur wenige davon zu
        Kunden macht, könnte es an der Benutzerfreundlichkeit oder dem Design
        liegen. Wir helfen dir dabei, deine Website zu optimieren.
      </p>
    {/if}
    {#if context[0].props.challenge.value === "unsure_idea"}
      <p>
        Mit Hilfe von Design Thinking und klickbaren Prototypen lässt sich dein
        zukünftigen Produktes unaufwändig simulieren. So kannst du frühzeitig
        erkennen, ob deine Idee Potenzial hat.
      </p>
    {/if}
  </div>
  <label>
    <p class="font-bold text-black flex justify-between">
      Erzähle uns mehr von deiner Herausforderung <span
        class="text-sm text-neutral-500 font-normal">Pflichtangabe</span
      >
    </p>

    <textarea
      bind:value="{props.details.value}"
      name="details"
      class="w-full h-32 p-4 border border-black/10 rounded-lg"
      placeholder="Beschreibe uns dein Problem"
      required
    ></textarea>
    {#if props.details.error && !valid}
      <InputError>
        {props.details.error}
      </InputError>
    {/if}
  </label>
  <label>
    <p class="font-bold text-black">
      Hast du bereits eine konkrete Idee, wie wir dir helfen können?
    </p>
    <textarea
      bind:value="{props.idea.value}"
      name="idea"
      class="w-full h-32 p-4 border border-black/10 rounded-lg"
      placeholder="Ich möchte ein neues Logo, eine neue Webseite, etc."
    ></textarea>
    {#if props.idea.error && !valid}
      <InputError>
        {props.idea.error}
      </InputError>
    {/if}
  </label>
</div>
