import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import CTA from "$lib/components/CTA.svelte";

export const CTADef: RegisteredComponent = {
  component: CTA,
  name: "CTA",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Projektanfrage",
    },
    {
      name: "description",
      type: "string",
      defaultValue:
        "Ich habe dein Interesse geweckt und du würdest mich gerne besser kennenlernen?",
    },
  ],
  canHaveChildren: true,
};
