import { z } from "zod";

const optionalText = z.string().trim().max(2048).nullish();

export const facebookUserDataSchema = z.object({
  email: optionalText,
  phone: optionalText,
  firstName: optionalText,
  lastName: optionalText,
  city: optionalText,
  state: optionalText,
  zipCode: optionalText,
  country: optionalText,
  dateOfBirth: optionalText,
});

export const facebookBrowserContextSchema = z.object({
  fbp: optionalText,
  fbc: optionalText,
  url: optionalText,
  userAgent: optionalText,
  referrer: optionalText,
});

export const facebookConversionSchema = facebookBrowserContextSchema.extend({
  eventName: z.string().trim().min(1).max(100),
  event_id: optionalText,
  userData: facebookUserDataSchema.nullish(),
  eventData: z
    .object({
      value: z.number().nonnegative().optional(),
      currency: z.string().trim().max(10).optional(),
      content_category: z.string().trim().max(200).optional(),
      content_name: z.string().trim().max(200).optional(),
    })
    .nullish(),
});

export const facebookLeadSchema = facebookBrowserContextSchema.extend(facebookUserDataSchema.shape).extend({
  eventId: optionalText,
});

export const facebookPageViewSchema = facebookBrowserContextSchema.extend(facebookUserDataSchema.shape);

export type FacebookUserData = z.infer<typeof facebookUserDataSchema>;
export type FacebookBrowserContext = z.infer<typeof facebookBrowserContextSchema>;
