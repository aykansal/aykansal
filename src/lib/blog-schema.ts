import { z } from "zod";

const parseableDate = z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'date must be parseable (e.g. "April 19, 2026")',
    });

export const blogPostSchema = z.object({
    id: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    date: parseableDate,
    tags: z.array(z.string()),
    show: z.boolean(),
    featured: z.boolean().optional(),
    priority: z.number().int().optional(),
    markdownFile: z.string().min(1),
});

export const blogConfigSchema = z.array(blogPostSchema);

export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogConfig = z.infer<typeof blogConfigSchema>;

/** JSON Schema (draft 2020-12) for `src/content/blog-config.json`. */
export const blogConfigJsonSchema = z.toJSONSchema(blogConfigSchema);

export function parseBlogConfig(input: unknown): BlogConfig {
    return blogConfigSchema.parse(input);
}
