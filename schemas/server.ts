import { z } from "zod"

export const serverSchema = z.object({
  name: z.string().min(5, { message: "minimum 5 characters" }),
  imageUrl: z.string().min(1, { message: "image is required" })
})
