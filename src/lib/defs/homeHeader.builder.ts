import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import HomeHeader from "$lib/components/HomeHeader.svelte";

export const HomeHeaderDef: RegisteredComponent = {
  component: HomeHeader,
  name: "HomeHeader",
  noWrap: true,
};
