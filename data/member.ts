import { db } from "@/lib/db";

export const createNewMember = async ({ inviteCode, userId }: { inviteCode: string, userId: string }) => {
  try {
    const createMember = await db.server.update({
      where: {
        inviteCode
      },
      data: {
        members: {
          create: [
            { userId }
          ]
        }
      }
    })

    if (createMember) {
      return createMember
    }

  } catch (err) {
    console.error(err);
    return null;
  }
}
