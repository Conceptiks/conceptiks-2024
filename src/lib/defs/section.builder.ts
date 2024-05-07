import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Section from "$lib/components/Section.svelte";

export const SectionDef: RegisteredComponent = {
  component: Section,
  name: "Section",
  description: "Simple Section Container",
  inputs: [
    {
      name: "id",
      type: "string",
      required: true,
    },
  ],
  canHaveChildren: true,
};
