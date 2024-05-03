import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import OverflowScrollContainer from "$lib/components/OverflowScrollContainer.svelte";

export const OverflowScrollContainerDef: RegisteredComponent = {
  component: OverflowScrollContainer,
  name: "OverflowScrollContainer",
  inputs: [
    {
      name: "images",
      type: "list",
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["jpeg", "png", "svg", "webp"],
          required: true,
        },
        {
          name: "alt",
          type: "string",
          required: true,
        },
      ],
    },
  ],
  canHaveChildren: true,
};
