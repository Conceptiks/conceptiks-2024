// Unsere Partner
// Experten, mit denen ich gerne zusammenarbeite
import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Partners from "$lib/components/Partners.svelte";

export const PartnersDef: RegisteredComponent = {
  component: Partners,
  name: "Partners",
  inputs: [
    {
      name: "strapline",
      type: "string",
      defaultValue: "Unsere Partner",
    },
    {
      name: "title",
      type: "string",
      defaultValue: "Experten, mit denen ich gerne zusammenarbeite",
    },
    {
      name: "description",
      type: "longText",
      defaultValue:
        "An dieser Stelle möchte ich ehrlich sein: Ich umgebe mich gerne mit Menschen und Unternehmen, die mehr können als ich. Denn nur so lässt sich gemeinsam Großes erreichen. Hier findest du eine Auswahl an Experten, mit denen ich jederzeit gerne zusammenarbeite.",
    },
    {
      name: "logos",
      type: "list",
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["svg", "png", "jpg", "webp"],
          description: "Logo",
        },
        {
          name: "alt",
          type: "string",
          required: true,
          description: "Logo alt text",
        },
        {
          name: "href",
          type: "url",
          description: "Link to partner",
          required: true,
        },
        {
          name: "description",
          type: "string",
          description: "Partner description",
          required: false,
        },
      ],
    },
  ],
};
