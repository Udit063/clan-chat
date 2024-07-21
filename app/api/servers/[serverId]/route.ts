import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {

    const session = await auth()
    const user = session?.user

    if (!user || !user.id) {
      return new NextResponse("Not authorized", { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse("server id is missing", { status: 401 })
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        userId: user.id
      }
    })

    return NextResponse.json(server)

  } catch (err) {
    console.log(err)
    return new NextResponse("Internal error", { status: 500 })
  }

}
