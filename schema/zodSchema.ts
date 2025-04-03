import { z } from "zod";

export const LinkInBioSchema = z.object({
    photo: z.string(),
    name: z.string().min(1, "What's your name?"),
    email: z.string().email().min(1, "Please enter an email"),
    description: z.string().min(1, "Describe yourself"),
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
