import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import LogoItem from "$lib/components/LogoItem.svelte";

export const LogoItemDef: RegisteredComponent = {
  component: LogoItem,
  name: "LogoItem",
  description:
    'Containers are used to wrap content and apply padding and margins. They "box" in the content. Should be used within a row.',
  inputs: [
    {
      name: "title",
      type: "string",
      required: false,
    },
    {
      name: "border",
      type: "boolean",
      required: false,
      defaultValue: true,
    },
    {
      name: "description",
      type: "string",
      required: false,
    },
    {
      name: "href",
      type: "url",
      required: false,
    },
    {
      name: "img",
      type: "object",
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["jpeg", "png", "svg", "webp"],
        },
        {
          name: "alt",
          type: "string",
        },
      ],
    },
  ],
  noWrap: true,
};
