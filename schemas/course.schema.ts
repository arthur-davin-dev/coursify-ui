import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().optional().default(""),
  video_url: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Video URL must be a valid URL"
    )
    .default(""),
});

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .max(100, "Title must be under 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be under 2000 characters"),

  category_id: z
    .string()
    .min(1, "Please select a category"),

  thumbnail: z.string().optional().default(""),

  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      "Price must be a valid non-negative number"
    ),

  isPublished: z.boolean().default(false),

  tags: z.array(z.string()).default([]),

  lessons: z
    .array(lessonSchema)
    .min(1, "At least one lesson is required"),
});

export type CreateCourseFormValues = z.infer<typeof createCourseSchema>;