import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import SectionIntro from "$lib/components/SectionIntro.svelte";
export const SectionIntroDef: RegisteredComponent = {
  component: SectionIntro,
  name: "SectionIntro",
  inputs: [
    {
      name: "title",
      friendlyName: "Section Intro Title",
      type: "string",
      required: true,
      defaultValue: "Section Intro Title",
    },
    {
      name: "textStyle",
      friendlyName: "Color style",
      type: "string",
      enum: ["lighter", "light", "dark"],
      defaultValue: "dark",
    },
    {
      name: "strapline",
      friendlyName: "Section Intro Strapline",
      type: "string",
      required: false,
      defaultValue: "Section Intro Strapline",
    },
    {
      name: "straplineStyle",
      friendlyName: "Strapline Text Color",
      type: "string",
      enum: ["primary"],
      defaultValue: "primary",
    },
    {
      name: "description",
      friendlyName: "Section Intro Description",
      type: "richText",
      required: false,
      defaultValue: "",
    },
    {
      name: "center",
      friendlyName: "Center align text",
      helperText:
        "Center align text in the section intro. This hides the additional logo image.",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "justifyText",
      friendlyName: "Justify description text",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "hyphenate",
      friendlyName: "Hyphenate description text",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "splitColumns",
      friendlyName: "Split columns",
      helperText:
        "Split the section intro description into two columns. Must be disabled to show logo image on the right.",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "additionalLogo",
      friendlyName: "Logo Image",
      helperText:
        "Optional logo image to display on the right side of the section intro, e.g. a brand logo. Only visible if text is not centered and correctly displayed without split columns.",
      type: "object",
      subFields: [
        {
          name: "src",
          required: false,
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "webp", "svg"],
        },
        {
          name: "alt",
          required: false,
          helperText: "Alt text of the image",
          type: "string",
        },
        {
          name: "href",
          required: false,
          helperText: "Add a link to the image",
          type: "string",
        },
      ],
    },
  ],
  canHaveChildren: true,
};
