import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Grid from "$lib/components/Grid.svelte";

const gridColCount = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10",
  "grid-cols-11",
  "grid-cols-12",
];

const gridColSpan = [
  "col-span-full",
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
  "col-span-8",
  "col-span-9",
  "col-span-10",
  "col-span-11",
  "col-span-12",
];

export const GridDef: RegisteredComponent = {
  component: Grid,
  name: "Grid",
  description:
    "Grid layout with customizable column count, column span and gap between items.",
  inputs: [
    {
      name: "gridColCount",
      friendlyName: "Column count",
      description: "Customize column count for each breakpoint",
      type: "object",
      defaultValue: {
        defaultColCount: "grid-cols-1",
        smColCount: "grid-cols-2",
        lgColCount: "grid-cols-3",
      },
      subFields: [
        {
          name: "defaultColCount",
          friendlyName: "Mobile",
          type: "enum",
          defaultValue: "grid-cols-1",
          enum: gridColCount,
        },
        {
          name: "smColCount",
          friendlyName: "Tablet",
          type: "enum",
          defaultValue: "grid-cols-2",
          enum: gridColCount,
        },
        {
          name: "lgColCount",
          friendlyName: "Desktop",
          type: "enum",
          defaultValue: "grid-cols-3",
          enum: gridColCount,
        },
      ],
    },
    {
      name: "gridColSpan",
      friendlyName: "Column span",
      description: "Customize column span for each breakpoint",
      helperText:
        "Change the column span for each breakpoint. The column count must be larger than the column span.",
      type: "object",
      defaultValue: {
        defaultColSpan: "col-span-full",
        smColSpan: "col-span-1",
        lgColSpan: "col-span-1",
      },
      subFields: [
        {
          name: "defaultColSpan",
          friendlyName: "Mobile",
          type: "enum",
          enum: gridColSpan,
          defaultValue: "col-span-full",
        },
        {
          name: "smColSpan",
          friendlyName: "Tablet",
          type: "enum",
          enum: gridColSpan,
          defaultValue: "col-span-1",
        },
        {
          name: "lgColSpan",
          friendlyName: "Desktop",
          type: "enum",
          enum: gridColSpan,
          defaultValue: "col-span-1",
        },
      ],
    },
    {
      name: "verticalGap",
      friendlyName: "Vertical gap (multiplied by 4px)",
      type: "number",
      defaultValue: 16,
    },
    {
      name: "horizontalGap",
      friendlyName: "Horizontal gap (multiplied by 4px)",
      type: "number",
      defaultValue: 16,
    },
  ],
  defaultStyles: {
    width: "100%",
  },
  canHaveChildren: true,
  // only allow components that have been tested within this component (feature, accordionItem)
};
