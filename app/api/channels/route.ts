import { auth } from "@/auth";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get("serverId");

    if (!user || !user.id) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("serverId is missing", { status: 400 });
    }

    if (!name || !type) {
      return new NextResponse("Fields not passed", { status: 404 })
    }

    if (name === "general") {
      return new NextResponse("general name is not allowed", { status: 400 });
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
          create: {
            userId: user.id,
            name,
            type
          }
        }
      }
    });

    return NextResponse.json(server)


  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
