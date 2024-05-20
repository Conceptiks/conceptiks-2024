<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import Radio from "../inputs/Radio.svelte";
  import StepHeader from "./StepHeader.svelte";
  let challenges = [
    {
      title: "Mein Unternehmen/Angebot wird nicht gefunden",
      description:
        "Du kennst deine Zielgruppe, hast ein passendes Produkt, findest aber nur wenige Kunden.",
      value: "not_visible",
    },
    {
      title: "Repetitive, analoge Prozesse sorgen für Ineffizienz",
      description:
        "Du oder deine Mitarbeiter beschäftigen sich häufig mit repetitiven Aufgaben, die eigentlich automatisch ablaufen könnten.",
      value: "inefficient_processes",
    },
    {
      title: "Veraltete Inhalte und unpassende (digitale) Selbstdarstellung",
      description:
        "Du denkst und handelst modern, der (digitale) Auftritt deines Unternehmens ist allerdings aus der Zeit gefallen.",
      value: "oudated_branding",
    },
    {
      title:
        "Meine Website hat viele Besucher, aber wenige Zielabschlüsse (Conversions)",
      description:
        "Deine Website wird häufig besucht, aber nur wenige Besucher nutzen deine Webseite, um einen Kauf, eine Bestellung oder Buchung abzuschließen.",
      value: "low_conversions",
    },
    {
      title:
        "Ich bin mir nicht sicher, ob meine neue digitale Geschäftsidee Potenzial hat",
      description:
        "Du hast eine Idee für ein digitales Produkt oder eine digitale Dienstleistung, bist dir aber unsicher, ob diese Idee auch wirklich erfolgreich sein kann.",
      value: "unsure_idea",
    },
  ];

  let selected: string;
  $: console.log(selected);
</script>

<form class="relative border overflow-clip rounded-lg drop-shadow-xl">
  <StepHeader
    title="Lösungsfinder"
    description="Welche Herausforderung willst du meistern?"
  />
  <div class="bg-white h-[600px] relative">
    <div
      class="fixed w-full bg-gradient-to-b from-white to-transparent h-12 z-10"
    ></div>
    <div
      class="fixed bottom-0 w-full bg-gradient-to-t from-white to-transparent h-44 z-10 pointer-events-none"
    ></div>
    <div class="p-8 pb-28 overflow-y-auto h-full box-border">
      <div class="grid grid-cols-1 gap-4 relative">
        {#each challenges as challenge}
          <Radio
            bind:group="{selected}"
            title="{challenge.title}"
            description="{challenge.description}"
            value="{challenge.value}"
            name="challenge"
          />
        {/each}
      </div>
    </div>
    <div class="w-full px-8 absolute bottom-8 z-20">
      <button type="submit" disabled="{!selected}"> Lösung finden </button>
    </div>
  </div>
</form>

<style lang="postcss">
  button {
    @apply w-full px-8 py-4 font-bold drop-shadow-lg transition-all rounded-lg bg-primary hover:bg-secondary text-white hover:border-black/50;
    &:disabled {
      @apply bg-neutral-300 text-neutral-600 cursor-not-allowed;
    }
  }
</style>
