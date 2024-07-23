import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  }
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {

  const session = await auth();
  const user = session?.user

  if (!user) {
    return redirect("/login")
  }
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${server?.id}/channels/${initialChannel?.id}`)
}


export default ServerIdPage
