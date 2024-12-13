import { getServerAllDetails } from "@/data/server";
import Link from "next/link";
import { ServerButtons } from "../ServerButtons";
import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerSearch } from "../ServerSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Headset, ShieldAlert, Shield, Video, User } from "lucide-react";
import { ChannelsNavigator } from "../ChannelsNavigator";
import { MembersNavigator } from "../MembersNavigator";

interface ServerSidebarProps {
  serverId: string;
  userId: string;
}

export const ServerSidebar = async ({
  serverId,
  userId,
}: ServerSidebarProps) => {
  const server = await getServerAllDetails(serverId);
  if (!server) {
    redirect("/");
  }
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.members.filter((member) => member.userId !== userId);

  const userRole = server.members.find(
    (member) => member.userId === userId
  )?.role;

  const iconsMap = {
    [ChannelType.TEXT]: <Hash size={17} />,
    [ChannelType.AUDIO]: <Headset size={17} />,
    [ChannelType.VIDEO]: <Video size={17} />,
  };

  const roleIconsMap = {
    [MemberRole.ADMIN]: <ShieldAlert size={17} />,
    [MemberRole.MODERATOR]: <Shield size={17} />,
    [MemberRole.GUEST]: <User size={17} />,
  };

  if (
    userRole !== "ADMIN" &&
    userRole !== "MODERATOR" &&
    userRole !== "GUEST"
  ) {
    redirect("/");
  }
  return (
    <div className="w-[300px] bg-[#05040F] h-screen gap-3">
      <div className="w-full flex items-center justify-center">
        <ServerButtons server={server} userRole={userRole} />
      </div>
      <ScrollArea className="px-3 h-[90%] ">
        <div className="mt-3">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  name: member.user.name,
                  id: member.id,
                  icon: roleIconsMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <div className="border-t mt-4 border-t-zinc-700">
          <ChannelsNavigator
            userRole={userRole}
            data={[
              {
                label: "Text Channels",
                channelType: ChannelType.TEXT,
                data: textChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                channelType: ChannelType.AUDIO,
                data: audioChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                channelType: ChannelType.VIDEO,
                data: videoChannels.map((channel) => ({
                  name: channel.name,
                  id: channel.id,
                  icon: iconsMap[channel.type],
                })),
              },
            ]}
          />
        </div>
        <div className="border-t my-4  border-t-zinc-700">
          <MembersNavigator server={server} userRole={userRole} />
        </div>
      </ScrollArea>
    </div>
  );
};
