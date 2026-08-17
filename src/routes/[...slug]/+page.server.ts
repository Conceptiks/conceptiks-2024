import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-svelte";
import { fetchAndValidate } from "$lib/utils/validateAndFetch";
import type { PageServerLoad } from "./$types";

import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { z } from "zod";
import { verifyCaptcha } from "$lib/services/verifyCaptcha";
import { sendMail } from "$lib/services/sendMail";

const CONTACT_INBOX = "hallo@maximtan.de";

const schema = z.object({
  name: z
    .string({ required_error: "Bitte gib deinen Namen an" })
    .trim()
    .min(1, "Bitte gib deinen Namen an"),
  email: z
    .string({ required_error: "Eine gültige E-Mail-Adresse ist erforderlich" })
    .trim()
    .email("Bitte gib eine gültige E-Mail-Adresse ein"),
  companyName: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  message: z
    .string({ required_error: "Bitte schreib mir eine Nachricht" })
    .trim()
    .min(1, "Bitte schreib mir eine Nachricht"),
  privacy: z.literal("on", {
    required_error: "Bitte akzeptiere die Datenschutzerklärung",
    invalid_type_error: "Bitte akzeptiere die Datenschutzerklärung",
  }),
  captchaToken: z
    .string({ required_error: "Bitte bestätige, dass du kein Roboter bist" })
    .min(1, "Bitte bestätige, dass du kein Roboter bist"),
});

export const load: PageServerLoad = async ({ url }) => {
  const content = await fetchAndValidate(fetchOneEntry, "page", {
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  return { content };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const validation = schema.safeParse(Object.fromEntries(data.entries()));
    if (!validation.success) {
      return fail(400, { errors: validation.error.issues });
    }

    const { name, email, companyName, phone, message } = validation.data;

    const captchaResponse = await verifyCaptcha({
      formData: data,
      errorMessages: {
        rejected:
          "Deine Anfrage konnte nicht verarbeitet werden. Bitte versuch es erneut.",
        fetch:
          "Deine Anfrage konnte nicht verarbeitet werden. Bitte versuch es erneut.",
      },
    });

    if (captchaResponse.status !== 200) {
      return fail(captchaResponse.status, {
        errors: [{ path: ["captchaToken"], message: captchaResponse.message }],
      });
    }

    const lines = [
      `Name:        ${name}`,
      `E-Mail:      ${email}`,
      companyName ? `Unternehmen: ${companyName}` : null,
      phone ? `Telefon:     ${phone}` : null,
      "",
      "Nachricht:",
      message,
    ].filter((line) => line !== null);

    try {
      const response = await sendMail({
        to: CONTACT_INBOX,
        replyTo: email,
        subject: `Kontaktanfrage von ${name}`,
        text: lines.join("\n"),
      });

      if (response.statusCode >= 400) {
        return fail(502, {
          errors: [
            {
              path: ["form"],
              message:
                "Deine Nachricht konnte nicht zugestellt werden. Bitte versuch es später erneut.",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Contact form delivery failed:", error);
      return fail(502, {
        errors: [
          {
            path: ["form"],
            message:
              "Deine Nachricht konnte nicht zugestellt werden. Bitte versuch es später erneut.",
          },
        ],
      });
    }

    return { success: true };
  },
} satisfies Actions;
