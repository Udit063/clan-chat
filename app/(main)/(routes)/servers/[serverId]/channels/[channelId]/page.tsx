import { auth } from "@/auth";
import { Channel } from "@/components/channels/Channel";
import { ChannelHeader } from "@/components/channels/ChannelHeader";
import { ChatInput } from "@/components/channels/ChatInput"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface ChannelsPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelsPage = async ({ params }: ChannelsPageProps) => {

  const session = await auth();
  const user = session?.user

  if (!user || !user.id || !user.name) {
    return redirect("/login")
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
      serverId: params.serverId
    }
  })

  if (!channel) {
    return redirect(`/servers/${params.serverId}`)
  }

  return (
    <div className="h-full w-full">
      <Channel
        channelName={channel.name}
        channelType={channel.type}
        channelId={channel.id}
        userId={user.id}
        username={user.name}
        serverId={params.serverId}
      />
    </div>
  )
}

export default ChannelsPage
