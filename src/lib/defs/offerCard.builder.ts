import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import OfferCard from "$lib/components/OfferCard.svelte";

export const OfferCardDef: RegisteredComponent = {
  component: OfferCard,
  name: "OfferCard",
  noWrap: true,
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Offer Title",
      required: true,
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Offer Description",
      required: true,
    },
    {
      name: "img",
      friendlyName: "Pictogram",
      type: "object",
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
          defaultValue: "Offer Image",
          required: true,
        },
      ],
    },
  ],
  canHaveChildren: true,
};
