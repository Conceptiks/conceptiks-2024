import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import RichText from "$lib/components/RichText.svelte";

export const RichTextDef: RegisteredComponent = {
  component: RichText,
  name: "RichText",
  canHaveChildren: true,
};
