import { getServerAllDetails } from "@/data/server";
import { ServerButtons } from "../ServerButtons"
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

interface ServerSidebarProps {
  serverId: string;
  userId: string;
}

export const ServerSidebar = async ({ serverId, userId }: ServerSidebarProps) => {

  const server = await getServerAllDetails(serverId)
  if (!server) {
    redirect("/")
  }

  const textChannels = server?.channels.filter((channel) => { channel.type === ChannelType.TEXT });
  const audioChannels = server?.channels.filter((channel) => { channel.type === ChannelType.AUDIO });
  const videoChannels = server?.channels.filter((channel) => { channel.type === ChannelType.VIDEO });

  const members = server.members.filter((member) => member.userId !== userId);

  const userRole = server.members.find((member) => member.userId === userId)?.role

  if (userRole !== "ADMIN" && userRole !== "MODERATOR" && userRole !== "GUEST") {
    redirect("/")
  }
  console.log(server)
  return (
    <div className="w-[300px] bg-[#08061A] h-screen">
      <div className="w-full flex items-center justify-center">
        <ServerButtons server={server} userRole={userRole} />
      </div>
      {`userRole -- ${userRole}`}
    </div>
  )
}
