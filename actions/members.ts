"use server"

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { getServerAllDetails } from "@/data/server";

type KickOutMemberArgs = {
  headId: string;
  memberId: string;
  serverId: string;
}

interface MemberRolesUpdateArgs extends KickOutMemberArgs {
  role: MemberRole;
};

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

    if (deletingUserStatus.id === headRoleStatus.id) {
      return { error: "You can't kick yourself" }
    }

    if (deletingUserStatus.role !== "GUEST") {
      if (deletingUserStatus.role === headRoleStatus.role) {
        return { error: `${headRoleStatus.role} is not allowed to kick another ${headRoleStatus.role}` }
      } else if (deletingUserStatus.role === "ADMIN") {
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
    if (!server) return { error: "Try again" }

    return {
      success: {
        deletedUser,
        server
      }
    }

  } catch (err) {
    console.log(err)
    return { error: "it's an issue from our side, try again" }
  }
}

export const memberRolesUpdate = async ({ headId, memberId, serverId, role }: MemberRolesUpdateArgs) => {

  try {

    if (headId === memberId) {
      return { error: "You can't change your own role" }
    }

    const headMember = await db.member.findFirst({
      where: {
        userId: headId,
        serverId,
      }
    })

    if (!headMember) return { error: "Not authorized" }

    if (headMember.role === "GUEST") {
      return { error: "You aren't verified to change someone role" }
    }


    const secondMember = await db.member.findFirst({
      where: {
        userId: memberId,
        serverId
      }
    })
    if (!secondMember) return { error: "Not authorized" }

    if (secondMember.role === "ADMIN") {
      return { error: "You can not change role of an ADMIN" }
    }

    if (headMember.role === secondMember.role) {
      return { error: "you can't change the role of someone with same level" }
    }

    const updatedServer = await db.server.update({
      where: {
        id: serverId
      },
      data: {
        members: {
          update: [{
            where: {
              id: secondMember.id
            },
            data: {
              role
            }
          }]
        }
      },
      include: {
        members: {
          include: {
            user: true
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    })

    if (!updatedServer) return { error: "Try again" }

    return { success: { updatedServer } }

  } catch (err) {
    console.log(err)
    return { error: "it's an issue from our side, try again" }
  }

}

