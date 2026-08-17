import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Button from "$lib/components/Button.svelte";

export const ButtonDef: RegisteredComponent = {
  component: Button,
  name: "Button",
  inputs: [
    {
      name: "href",
      type: "url",
      defaultValue: "",
      description: "Link to navigate to",
    },
    {
      name: "style",
      type: "string",
      enum: ["primary", "black", "outline", "ghost"],
      defaultValue: "primary",
    },
    {
      name: "size",
      type: "string",
      enum: ["sm", "md", "lg"],
      defaultValue: "md",
    },
  ],
  canHaveChildren: true,
};
