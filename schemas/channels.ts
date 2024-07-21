import { z } from "zod"

import { ChannelType } from "@prisma/client"

export const channelSchema = z.object({
  name: z.string().min(5, { message: "minimum 5 characters" }).refine(name => name !== "general", { message: "name cannot be 'general'" }),
  type: z.nativeEnum(ChannelType)
})
