import { z } from "zod";

export const linkInBioSchema = z.object({
    photo: z.string(),
    name: z.string(),
    email: z.string(),
    description: z.string(),
    portfolio: z.string(),
    linkedin: z.string(),
    github: z.string(),
    facebook: z.string(),
    twitter: z.string(),
    instagram: z.string(),
    whatsApp: z.string(),
    telegram: z.string(),
    youtube: z.string(),
});
