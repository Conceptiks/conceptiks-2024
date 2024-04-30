import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import HR from "$lib/components/HR.svelte";

export const HRDef: RegisteredComponent = {
  component: HR,
  name: "Horizontal Rule",
  description: "Simple horizontal rule",
  inputs: [
    {
      name: "verticalGap",
      type: "string",
      enum: [
        {
          label: "16px",
          value: "my-4",
        },
        {
          label: "24px",
          value: "my-6",
        },
        {
          label: "32px",
          value: "my-8",
        },
        {
          label: "48px",
          value: "my-12",
        },
        {
          label: "64px",
          value: "my-16",
        },
      ],
      required: true,
    },
  ],
};
