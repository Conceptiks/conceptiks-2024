import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Icon from "$lib/components/Icon.svelte";

export const IconDef: RegisteredComponent = {
  component: Icon,
  name: "Icon",
  description:
    "Generic icon component that can be used to render any icon from the Carbon icon library",
  docsLink: "https://icon-sets.iconify.design/carbon/",
  inputs: [
    {
      name: "iconClass",
      type: "string",
      helperText: "See here https://icon-sets.iconify.design/carbon/",
      defaultValue: "carbon:arrow-right",
    },
    {
      name: "size",
      type: "string",
      helperText: "Size of the icon",
      enum: ["sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    {
      name: "color",
      type: "color",
      helperText: "Color of the icon",
      defaultValue: "#004fff",
      required: false,
    },
  ],
};
