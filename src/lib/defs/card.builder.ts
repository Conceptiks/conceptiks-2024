import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Card from "$lib/components/Card.svelte";

export const CardDef: RegisteredComponent = {
  component: Card,
  name: "Card",
  description: "Simple Section Container",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "longText",
      required: false,
    },
    {
      name: "optional",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "icon",
      type: "object",
      subFields: [
        {
          name: "iconClass",
          type: "string",
          required: true,
        },
        {
          name: "color",
          type: "color",
          required: true,
        },
        {
          name: "size",
          type: "string",
          enum: ["sm", "md", "lg", "xl"],
          required: true,
        },
      ],
    },
  ],
  canHaveChildren: true,
};
