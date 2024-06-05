import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Picture from "$lib/components/Picture.svelte";

export const PictureDef: RegisteredComponent = {
  component: Picture,
  name: "Picture",
  description: "Simple Picture component",
  inputs: [
    {
      name: "src",
      type: "file",
      allowedFileTypes: ["png", "jpg", "webp", "svg"],
      required: true,
    },
    {
      name: "alt",
      type: "string",
      required: true,
    },
    {
      name: "caption",
      type: "string",
      required: false,
    }
  ],
  canHaveChildren: true,
};
