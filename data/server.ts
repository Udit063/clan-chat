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

export const getUserEntireServers = async (userId: string) => {
  try {
    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            userId
          }
        }
      }
    })
    return servers
  } catch (err) {
    return null;
  }
}

export const getServer = async ({ serverId, userId }: { serverId: string, userId: string }) => {
  try {
    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            userId: userId
          }
        }
      }
    })
    return server
  } catch (err) {
    return null
  }
}

export const getServerAllDetails = async (serverId: string) => {
  try {
    const server = await db.server.findUnique({
      where: {
        id: serverId
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc"
          }
        },
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    })
    return server
  } catch (err) {
    return null
  }
}
