"use server"

import { v4 as uuidv4 } from "uuid"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { serverSchema } from "@/schemas/server"
import { z } from "zod"
import { MemberRole } from "@prisma/client"
import { throws } from "assert"
import { error } from "console"

export const createServer = async (values: z.infer<typeof serverSchema>) => {

  try {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: "Unauthorized" }
    }

    const validatedFields = serverSchema.parse(values);
    if (!validatedFields) {
      return { error: "Invalidated Fields" }
    }
    const { name, imageUrl } = validatedFields;

    const server = await db.server.create({
      data: {
        userId,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general", userId }
          ]
        },
        members: {
          create: [
            { userId, role: MemberRole.ADMIN }
          ]
        }
      }
    })
    return { id: server.id }
  } catch (error) {
    return { error: "Try again, we had a problem" };
  }
}
