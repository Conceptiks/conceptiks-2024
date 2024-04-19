import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";

export const MasonryGridDef: RegisteredComponent = {
  component: MasonryGrid,
  name: "MasonryGrid",
  inputs: [
    {
      name: "items",
      type: "list",
      subFields: [
        {
          name: "reference",
          description: "Reference to a model instance",
          type: "reference",
          required: true,
        },
        {
          name: "aspectRatio",
          helperText: "Aspect ratio of the image as a fraction (e.g. 16/9)",
          type: "string",
          enum: ["1/1", "4/3", "16/9", "3/2", "9/16", "2/1", "3/4", "3/5"],
          defaultValue: "4/3",
        },
      ],
    },
  ],
};
