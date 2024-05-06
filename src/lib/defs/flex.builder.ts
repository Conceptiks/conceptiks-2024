import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Flex from "$lib/components/Flex.svelte";

export const FlexDef: RegisteredComponent = {
  component: Flex,
  name: "Flex",
  canHaveChildren: true,
  noWrap: true,
};
