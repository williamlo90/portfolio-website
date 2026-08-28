import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  url: z.url(),
  label: z.string(),
  public: z.boolean(),
  accessNote: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      schemaVersion: z.literal(2),
      slug: z.string(),
      title: z.string(),
      descriptor: z.string(),
      summary: z.string(),
      publicationState: z.enum(["draft", "published"]),
      featured: z.boolean(),
      featuredOrder: z.number(),
      status: z.object({
        label: z.string(),
        detail: z.string(),
        tone: z.enum(["verified", "active"]),
      }),
      timeline: z.string(),
      role: z.string(),
      repository: linkSchema,
      liveDemo: linkSchema.optional(),
      media: z.object({
        hero: image(),
        alt: z.string(),
        caption: z.string(),
        gallery: z.array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string(),
          }),
        ),
      }),
      intendedUsers: z.array(z.string()),
      stack: z.array(z.string()),
      metrics: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
            note: z.string().optional(),
          }),
        )
        .min(3),
      highlights: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .min(3),
      workflow: z.array(z.string()).min(3),
      productionBoundary: z.object({
        label: z.string(),
        detail: z.string(),
      }),
      verification: z.object({
        date: z.string(),
        contentCommit: z.string(),
        evidenceCommit: z.string(),
        source: z.string(),
      }),
    }),
});

const experience = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/experience",
  }),
  schema: z.object({
    schemaVersion: z.number(),
    featured: z.boolean(),
    featuredOrder: z.number(),
    role: z.string(),
    organization: z.string(),
    employmentType: z.string(),
    location: z.string(),
    workMode: z.string(),
    yearsLabel: z.string(),
    durationLabel: z.string(),
    periodLabel: z.string(),
    summary: z.string(),
    engagements: z.array(
      z.object({
        label: z.string(),
        title: z.string(),
        bullets: z.array(z.string()),
        technologies: z.array(z.string()),
      }),
    ),
  }),
});

export const collections = { projects, experience };
