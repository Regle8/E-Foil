// Stand-ins for the server actions in src/app/actions.ts, swapped in for the static GitHub Pages
// demo (see next.config.ts). Nothing is sent anywhere; visitors are pointed to the phone/email.
// Call sites are type-checked against the real actions, so these ignore their arguments.
import { site } from "@/lib/site";
import type { FormState } from "@/lib/types";

const demo: FormState = {
  ok: false,
  message: `This is a demo preview, so forms and checkout aren't connected. To book or order, call ${site.phone.display} or email ${site.email}.`,
};

export async function subscribe(): Promise<FormState> {
  return demo;
}

export async function sendEnquiry(): Promise<FormState> {
  return demo;
}

export async function placeOrder(): Promise<FormState> {
  return demo;
}

export async function getPaymentStatus(): Promise<boolean> {
  return false;
}
