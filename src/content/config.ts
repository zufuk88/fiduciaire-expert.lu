// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform((str) => new Date(str)),
    modified: z.string().transform((str) => new Date(str)).optional(),
    category: z.string(),
    draft: z.boolean().optional().default(false),
    author: z.string().optional().default('Fiduciaire Expert'),
    translations: z.object({
      fr: z.string().optional(),
      en: z.string().optional(),
    }).optional(),
    // Utilisation du helper image() d'Astro pour l'optimisation
    image: image().optional(), 
  }),
});

export const collections = {
  'blog': blogCollection,
};