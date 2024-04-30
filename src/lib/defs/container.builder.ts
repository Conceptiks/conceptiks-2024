import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Container from "$lib/components/Container.svelte";

export const ContainerDef: RegisteredComponent = {
  component: Container,
  name: "Container",
  description:
    'Containers are used to wrap content and apply padding and margins. They "box" in the content. Should be used within a row.',
  inputs: [
    {
      name: "slim",
      type: "boolean",
      defaultValue: false,
      description: "Make the container more narrow",
    },
  ],
  canHaveChildren: true,
};
