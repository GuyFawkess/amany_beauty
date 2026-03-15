import { defineCollection, z } from 'astro:content';

const treatmentSchema = z.object({
  name: z.string(),
  name_en: z.string(),
  description: z.string().optional(),
  description_en: z.string().optional(),
  duration: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    title_en: z.string(),
    slug_es: z.string(),
    slug_en: z.string(),
    description: z.string(),
    description_en: z.string(),
    coverImage: z.string().optional(),
    sortOrder: z.number(),
    treatments: z.array(treatmentSchema),
    body_es: z.string().optional(),
    body_en: z.string().optional(),
  }),
});

const siteCollection = defineCollection({
  type: 'content',
  schema: z.object({
    businessName: z.string().optional(),
    fullName: z.string().optional(),
    tagline: z.string().optional(),
    tagline_en: z.string().optional(),
    about: z.string().optional(),
    about_en: z.string().optional(),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    location: z.string().optional(),
  }),
});

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          alt_en: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  site: siteCollection,
  gallery: galleryCollection,
};
