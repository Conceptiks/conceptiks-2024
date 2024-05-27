<script lang="ts">
  import Radio from "../inputs/Radio.svelte";

  export let props: { valid: boolean; selected: string };

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

  $: props.valid = props.selected ? true : false;
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-1 gap-4 relative"
>
  {#each challenges as challenge}
    <Radio
      bind:group="{props.selected}"
      title="{challenge.title}"
      description="{challenge.description}"
      value="{challenge.value}"
      name="challenge"
    />
  {/each}
</div>
