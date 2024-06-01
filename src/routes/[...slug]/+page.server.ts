import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-svelte";
import { fetchAndValidate } from "$lib/utils/validateAndFetch";
import type { PageServerLoad } from "./$types";

import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { PRIVATE_PIPEDRIVE_API_KEY } from "$env/static/private";
import { z } from "zod";
import { Pipedrive } from "$lib/services/pipedrive.adapter";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { firebase } from "$lib/services/firebase";
import { verifyCaptcha } from "$lib/services/verifyCaptcha";

const schema = z.object({
  challenge: z.enum(
    [
      "not_visible",
      "inefficient_processes",
      "outdated_branding",
      "low_conversions",
      "unsure_idea",
      "other",
    ],
    {
      required_error: "Bitte wählen Sie eine Herausforderung aus",
    }
  ),
  details: z.string({
    required_error: "Bitte geben Sie Details an",
  }),
  idea: z.string().optional(),
  name: z.string({
    required_error: "Ein Name ist erforderlich",
  }),
  email: z
    .string({
      required_error: "Eine gültige E-Mail-Adresse ist erforderlich",
    })
    .email({
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    }),
  phone: z.string().optional(),
  companyName: z.string({
    required_error: "Ein Unternehmensname ist erforderlich",
  }),
  privacy: z.literal("on", {
    required_error: "Bitte akzeptieren Sie die Datenschutzrichtlinien",
    invalid_type_error: "Bitte akzeptieren Sie die Datenschutzrichtlinien",
  }),
  captchaToken: z.string({
    required_error: "Bitte bestätigen Sie, dass Sie kein Roboter sind",
  }),
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
  default: async ({ request, url, fetch }) => {
    const data = await request.formData();

    // convert FormData to object
    const dto = Object.fromEntries(data.entries());

    const validation = schema.safeParse(dto);
    if (!validation.success) {
      return fail(400, { errors: validation.error.issues });
    }

    const captchaResponse = await verifyCaptcha({
      formData: data,
      errorMessages: {
        rejected:
          "Leider konnte Ihre Anfrage nicht verarbeitet werden. Bitte versuchen Sie es erneut.",
        fetch:
          "Leider konnte Ihre Anfrage nicht verarbeitet werden. Bitte versuchen Sie es erneut.",
      },
    });

    if (captchaResponse.status !== 200) {
      return fail(captchaResponse.status, {
        errors: [{ path: ["captchaToken"], message: captchaResponse.message }],
      });
    }

    const db = getFirestore(firebase);

    // write dto to lead collection
    try {
      const leadCollection = collection(db, "leads");
      const docRef = await addDoc(leadCollection, dto);
    } catch (err) {
      console.error(err);
    }

    const pd = new Pipedrive(PRIVATE_PIPEDRIVE_API_KEY, "conceptiks", fetch);

    try {
      const leadRes = await pd.submit(dto);
      return;
    } catch (err) {
      return err;
    }
  },
} satisfies Actions;
