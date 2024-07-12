import { db } from "@/lib/db"

export const getUserServer = async (userId: string) => {
  try {

    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            userId
          }
        }
      }
    })
    return server
  } catch (err) {
    return null
  }
}
