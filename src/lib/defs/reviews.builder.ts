import type { RegisteredComponent } from "@builder.io/sdk-svelte";
import Reviews from "$lib/components/Reviews.svelte";

export const ReviewsDef: RegisteredComponent = {
  component: Reviews,
  name: "Reviews",
  inputs: [
    {
      name: "reviews",
      type: "list",
      subFields: [
        {
          name: "logo",
          type: "object",
          subFields: [
            {
              name: "src",
              type: "file",
              allowedFileTypes: ["svg", "png", "jpg", "webp"],
              description: "Logo",
            },
            {
              name: "alt",
              type: "string",
              required: true,
              description: "Logo alt text",
            },
          ],
        },
        {
          name: "quote",
          type: "longText",
          required: true,
          description: "Quote",
        },
        {
          name: "reviewer",
          type: "object",
          required: true,
          subFields: [
            {
              name: "name",
              type: "string",
              required: true,
            },
            {
              name: "title",
              type: "string",
              required: true,
            },
            {
              name: "photo",
              type: "object",
              subFields: [
                {
                  name: "src",
                  type: "file",
                  allowedFileTypes: ["png", "jpg", "webp"],
                  description: "Photo",
                },
                {
                  name: "alt",
                  type: "string",
                  required: true,
                  description: "Photo alt text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  canHaveChildren: true,
};
