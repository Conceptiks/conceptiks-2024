import sgMail from "@sendgrid/mail";
import { PRIVATE_SENDGRID_API_KEY } from "$env/static/private";

interface Options {
  from?: {
    email: string;
    name: string;
  };
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendMail = async ({
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: Options) => {
  sgMail.setApiKey(PRIVATE_SENDGRID_API_KEY);

  const [response] = await sgMail.send({
    from: {
      email: from?.email || "hallo@maximtan.de",
      name: from?.name || "maximtan.de",
    },
    to,
    replyTo,
    subject,
    text,
    html: html ?? text.replace(/\n/g, "<br />"),
  });

  return response;
};
