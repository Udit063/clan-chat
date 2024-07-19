import { db } from "@/lib/db"

export const isExistingUser = async ({ userId, inviteCode }: { userId: string, inviteCode: string }) => {
  try {

    const status = await db.server.findUnique({
      where: {
        inviteCode,
        members: {
          some: {
            userId
          }
        }
      }
    })
    return status;
  } catch (err) {
    console.error(err);
    return null
  }
}
