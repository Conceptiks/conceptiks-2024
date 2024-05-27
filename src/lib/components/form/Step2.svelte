<script lang="ts">
  export let context: {
    [key: string]: any;
  };
  export let props: {
    name: string;
    valid: boolean;
  };

  $: props.valid = props.name ? true : false;
</script>

<div class="grid grid-cols-1 items-start gap-4 relative">
  <div class="bg-neutral-100 rounded-lg p-4">
    <p class="text-black font-bold">Deine Herausforderung</p>
    <p>
      {#if context[0].props.selected === "not_visible"}
        Dein Unternehmen/Angebot wird nicht gefunden
      {/if}
      {#if context[0].props.selected === "inefficient_processes"}
        Zeitraubende, repetitive Prozesse
      {/if}
      {#if context[0].props.selected === "oudated_branding"}
        Alte/Unpassende Selbstdarstellung
      {/if}
      {#if context[0].props.selected === "low_conversions"}
        Wenige Zielabschlüsse (Conversions)
      {/if}
      {#if context[0].props.selected === "unsure_idea"}
        Geschäftsidee mit unklarem Potenzial
      {/if}
    </p>
  </div>
  <div class="bg-blue-500/10 p-4 rounded-lg">
    <p class="font-bold text-blue-500">Lösungsansatz</p>
    {#if context[0].props.selected === "not_visible"}
      <p>
        Wenn du Probleme mit der Auffindbarkeit deines Angebotes hast, könntest
        du von einer Suchmaschinen-Optimierung profitieren.
      </p>
    {/if}
    {#if context[0].props.selected === "inefficient_processes"}
      <p>
        Heute sind weitaus mehr Prozesse digitalisierbar, als noch vor einigen
        Jahren. In einem Beratungsgespräch mit uns könnten wir gemeinsam
        herausfinden, welche Prozesse in deinem Unternehmen digitalisiert werden
        können.
      </p>
    {/if}
    {#if context[0].props.selected === "oudated_branding"}
      <p>
        Es gibt nur einen ersten Eindruck. Umso wichtiger also, dass dieser
        Eindruck perfekt vermittelt wird. Wir helfen dir dabei, deinen
        Internetauftritt oder dein Branding zu modernisieren, sowohl inhaltlich
        als auch optisch.
      </p>
    {/if}
    {#if context[0].props.selected === "low_conversions"}
      <p>
        Wenn deine Website/App viele Besucher hat, aber nur wenige davon zu
        Kunden macht, könnte es an der Benutzerfreundlichkeit oder dem Design
        liegen. Wir helfen dir dabei, deine Website zu optimieren.
      </p>
    {/if}
    {#if context[0].props.selected === "unsure_idea"}
      <p>
        Mit Hilfe von Design Thinking und klickbaren Prototypen lässt sich dein
        zukünftigen Produktes unaufwändig simulieren. So kannst du frühzeitig
        erkennen, ob deine Idee Potenzial hat.
      </p>
    {/if}
  </div>
  <label>
    <p class="font-bold text-black">Dein Name</p>
    <input
      bind:value="{props.name}"
      name="name"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="Max Mustermann"
      required
    />
  </label>
  <label>
    <p class="font-bold text-black">Deine E-Mail-Adresse</p>
    <input
      type="email"
      name="email"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="mail@adresse.de"
      required
    />
  </label>
</div>
