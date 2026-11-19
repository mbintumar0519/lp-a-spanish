import "server-only";
import { siteConfig } from "@/config/site";

type CrioLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export async function submitToCrio({ firstName, lastName, email, phone }: CrioLead) {
  const body = new URLSearchParams({
    id: siteConfig.crio.formId,
    first_name: firstName,
    last_name: lastName,
    email,
    mobile_phone: phone,
  });

  const response = await fetch(siteConfig.crio.saveUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`CRIO submission failed: ${response.status} ${await response.text()}`);
  }
}
