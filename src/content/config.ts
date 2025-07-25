// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform((str) => new Date(str)), // Transforme la date en objet Date
    category: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};