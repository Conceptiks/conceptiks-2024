import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import LogoCloud1 from "$lib/components/LogoCloud1.svelte";

export const LogoCloud1Def: RegisteredComponent = {
  component: LogoCloud1,
  name: "LogoCloud1",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Our customers",
      required: true,
    },
    {
      name: "customers",
      type: "list",
      subFields: [
        {
          name: "img",
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
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
