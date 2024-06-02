<script lang="ts">
  import InputError from "./InputError.svelte";

  export let context: {
    [key: string]: any;
  };
  export let props: {
    name: {
      value: string;
      error: string | undefined;
    };
    email: {
      value: string;
      error: string | undefined;
    };
    phone: {
      value: string;
      error: string | undefined;
    };
    companyName: {
      value: string;
      error: string | undefined;
    };
    privacy: {
      value: boolean;
      error: string | undefined;
    };
    captchaToken: {
      value: string;
      error: string | undefined;
    };
  };

  export let valid: boolean;

  $: valid =
    props.name.value &&
    props.email.value &&
    props.companyName.value &&
    props.privacy.value
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
      bind:value="{props.name.value}"
      name="name"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="Max Mustermann"
      required
    />
    {#if props.name.error && !valid}
      <InputError>
        {props.name.error}
      </InputError>
    {/if}
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
      bind:value="{props.email.value}"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="mail@adresse.de"
      required
    />
    {#if props.email.error && !valid}
      <InputError>
        {props.email.error}
      </InputError>
    {/if}
  </label>
  <label>
    <p class="font-bold text-black flex justify-between">Deine Telefonnummer</p>
    <input
      type="tel"
      name="phone"
      bind:value="{props.phone.value}"
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
      bind:value="{props.companyName.value}"
      class="w-full py-3 px-3 border border-black/10 rounded-lg"
      placeholder="Musterfirma"
      required
    />
    {#if props.companyName.error && !valid}
      <InputError>
        {props.companyName.error}
      </InputError>
    {/if}
  </label>
  <!-- data privacy -->
  <div class="bg-neutral-100 rounded-lg p-4">
    <p class="text-black font-bold">Datenschutz</p>
    <label>
      <input
        type="checkbox"
        name="privacy"
        bind:checked="{props.privacy.value}"
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
    {#if props.privacy.error && !valid}
      <InputError>
        {props.privacy.error}
      </InputError>
    {/if}
  </div>
  <div class="">
    <label for="captchaWidget">
      <p class="font-bold text-black flex justify-between">
        Ich bin kein Roboter <span class="text-sm text-neutral-500 font-normal"
          >Pflichtangabe</span
        >
      </p>
      <div id="captchaWidget"></div>
    </label>
    <input
      id="captchaToken"
      type="text"
      bind:value="{props.captchaToken.value}"
      class="!invisible -z-50 !hidden"
      name="captchaToken"
    />
    {#if props.captchaToken.error}
      <div class="mt-4">
        <InputError>
          {props.captchaToken.error}
        </InputError>
      </div>
    {/if}
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
