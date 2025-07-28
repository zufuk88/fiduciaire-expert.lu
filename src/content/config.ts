// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform((str) => new Date(str)),
    category: z.string(),
    // Utilisation du helper image() d'Astro pour l'optimisation
    image: image().optional(), 
  }),
});

export const collections = {
  'blog': blogCollection,
};