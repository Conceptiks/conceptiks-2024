import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";

export const MasonryGridDef: RegisteredComponent = {
  component: MasonryGrid,
  name: "MasonryGrid",
  inputs: [
    {
      name: "imageRatio",
      friendlyName: "Bildformat",
      helperText:
        "Einheitlicher Zuschnitt für alle Vorschaubilder. Die Originale sind 3:2, dieses Format schneidet also nichts ab — 4:3 beschneidet die Seiten leicht, 16:9 oben und unten, 1:1 am stärksten seitlich. Leer lassen, um das Format je Eintrag zu verwenden.",
      type: "string",
      enum: ["16:9", "3:2", "4:3", "1:1"],
      defaultValue: "3:2",
    },
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
