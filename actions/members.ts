"use server"

import { getServerAllDetails } from "@/data/server";
import { db } from "@/lib/db";

interface KickOutMemberArgs {
  headId: string;
  memberId: string;
  serverId: string;
}

export const kickOutMember = async ({ headId, memberId, serverId }: KickOutMemberArgs) => {
  try {
    const headRoleStatus = await db.member.findFirst({
      where: {
        userId: headId,
        serverId,
      }
    })

    if (!headRoleStatus) return { error: "Not authorized" }

    if (headRoleStatus.role === "GUEST") {
      return { error: "You aren't verified to kick someone" }
    }
    const deletingUserStatus = await db.member.findFirst({
      where: {
        id: memberId,
        serverId
      }
    })
    if (!deletingUserStatus) return { error: "Not authorized" }

    if (deletingUserStatus.role !== "GUEST") {
      if (deletingUserStatus.role === headRoleStatus.role) {
        return { error: `${headRoleStatus.role} is not allowed to kick another ${headRoleStatus.role}` }
      } else if (headRoleStatus.role === "MODERATOR" && deletingUserStatus.role === "ADMIN") {
        return { error: "Moderators are not allowed to kick Admins" }
      }
    }

    const deletedUser = await db.member.delete({
      where: {
        id: memberId
      }
    })

    if (!deletedUser) return { error: "Sorry try again" }
    const server = await getServerAllDetails(serverId);

    return {
      success: {
        deletedUser,
        server
      }
    }

  } catch (err) {
    return { error: err }
  }
} 
