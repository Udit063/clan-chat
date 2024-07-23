import { auth } from "@/auth";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {

    const session = await auth();
    const user = session?.user
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    const { channelId } = params

    if (!user || !user.id) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("No server id passed", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel Id is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          delete: {
            id: channelId
          }
        }
      }
    })
    if (!server) {
      return new NextResponse("Try again failed to delete the channel", { status: 500 })
    }

    return NextResponse.json(server)

  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error try again", { status: 500 });
  }
} 
