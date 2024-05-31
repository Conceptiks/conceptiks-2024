<script lang="ts">
  export let context: {
    [key: string]: any;
  };
  export let props: {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    privacy: boolean;
    valid: boolean;
  };

  $: props.valid =
    props.name && props.email && props.companyName && props.privacy
      ? true
      : false;
</script>

<div class="grid grid-cols-1 items-start gap-8 relative">
  <label>
    <p class="font-bold text-black flex justify-between">
      Dein Name <span class="text-sm text-neutral-500 font-normal"
        >Pflichtangabe</span
      >
    </p>
    <input
      bind:value="{props.name}"
      name="name"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="Max Mustermann"
      required
    />
  </label>
  <label>
    <p class="font-bold text-black flex justify-between">
      Deine E-Mail-Adresse <span class="text-sm text-neutral-500 font-normal"
        >Pflichtangabe</span
      >
    </p>
    <input
      type="email"
      name="email"
      bind:value="{props.email}"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="mail@adresse.de"
      required
    />
  </label>
  <label>
    <p class="font-bold text-black flex justify-between">Deine Telefonnummer</p>
    <input
      type="tel"
      name="phone"
      bind:value="{props.phone}"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="+49 176 12345678"
    />
  </label>
  <label>
    <p class="font-bold text-black flex justify-between">
      Name deines Unternehmens <span
        class="text-sm text-neutral-500 font-normal">Pflichtangabe</span
      >
    </p>
    <input
      type="text"
      name="companyName"
      bind:value="{props.companyName}"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="Musterfirma"
      required
    />
  </label>
  <!-- data privacy -->
  <div class="bg-neutral-100 rounded-lg p-4">
    <p class="text-black font-bold">Datenschutz</p>
    <label>
      <input
        type="checkbox"
        name="privacy"
        bind:checked="{props.privacy}"
        required
        class="rounded border-neutral-400"
      />
      <span class="ml-1"
        >Ich habe die <a
          href="/datenschutz"
          class="text-primary hover:underline"
          target="_blank">Datenschutzerklärung</a
        > gelesen und erkläre mich mit der dort genannten Speicherung und Verarbeitung
        meiner Daten einverstanden.</span
      >
    </label>
  </div>

  <!-- <div class="bg-neutral-100 rounded-lg p-4">
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
  </div> -->
</div>
