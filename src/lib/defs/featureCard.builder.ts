import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import FeatureCard from "$lib/components/FeatureCard.svelte";

export const FeatureCardDef: RegisteredComponent = {
  component: FeatureCard,
  name: "FeatureCard",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "decorationString",
      type: "string",
      required: false,
    },
    {
      name: "description",
      type: "string",
      required: false,
    },
  ],
};
