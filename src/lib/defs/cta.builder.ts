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
        "Wir haben dein Interesse geweckt und du würdest uns gerne besser kennenlernen?",
    },
  ],
  canHaveChildren: true,
};
