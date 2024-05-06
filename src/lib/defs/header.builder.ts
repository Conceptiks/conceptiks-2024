import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Header from "$lib/components/Header.svelte";

export const HeaderDef: RegisteredComponent = {
  component: Header,
  name: "Header",
  inputs: [
    {
      name: "title",
      type: "longText",
      defaultValue: "Hello, world!",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "This is a description.",
    },
  ],
};
