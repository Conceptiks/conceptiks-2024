// Unsere Partner
// Experten, mit denen wir gerne zusammenarbeiten
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
      defaultValue: "Experten, mit denen wir gerne zusammenarbeiten",
    },
    {
      name: "description",
      type: "longText",
      defaultValue:
        "An dieser Stelle möchten wir ehrlich sein: Wir umgeben uns gerne mit Menschen und Unternehmen, die mehr können, als wir. Denn wir sind uns sicher, dass wir nur so gemeinsam Großes erreichen können. Hier findest du eine Auswahl an Experten, mit denen wir jederzeit gerne zusammenarbeiten.",
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
