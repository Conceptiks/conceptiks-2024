import { PRIVATE_TURNSTILE_SECRET } from "$env/static/private";

export const verifyCaptcha = async ({
  formData,
  errorMessages,
}: {
  formData: FormData;
  errorMessages: {
    rejected: string;
    fetch: string;
  };
}) => {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const data = Object.fromEntries(formData.entries());

  const turnstilePayload = new FormData();
  turnstilePayload.append("secret", PRIVATE_TURNSTILE_SECRET);
  turnstilePayload.append("response", data["cf-turnstile-response"]);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: turnstilePayload,
    });

    // Response not ok (e.g. 400, 500) doesn't mean that the captcha is invalid, but we return status OK, so users don't get stuck because of internal errors
    if (!response.ok) {
      console.error(
        "Internal server error while verifying captcha:",
        response.status,
        response.statusText
      );

      return {
        message: "Ok",
        status: 200,
        validationError: null,
      };
    }

    // Parse response to check for success bool
    const json = await response.json();
    if (!json.success) {
      console.log("Error while verifying captcha:", json);
      return {
        values: {
          ...data,
        },
        status: 406,
        message: errorMessages.rejected,
        validationError: null,
      };
    }

    console.log("Captcha solution verified");
    return {
      message: "Ok",
      status: 200,
      validationError: null,
    };
  } catch (error) {
    console.log("Error while trying to verify captcha:", error);
    return {
      values: {
        ...data,
      },
      status: 500,
      message: errorMessages.fetch,
      validationError: null,
    };
  }
};
