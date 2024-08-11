"use client";

import { ChannelType } from "@prisma/client";
import { Hash, Headset, Video } from "lucide-react";
import { useWebSocket } from "../socket-provider";
import { useEffect } from "react";
import { Badge } from "../ui/badge";

interface ChannelHeaderProps {
  name: string;
  type: ChannelType;
}

const iconsMap = {
  [ChannelType.TEXT]: <Hash size={30} className="hidden sm:inline" />,
  [ChannelType.AUDIO]: <Headset size={30} className="hidden sm:inline" />,
  [ChannelType.VIDEO]: <Video size={30} className="hidden sm:inline" />
};

export const ChannelHeader: React.FC<ChannelHeaderProps> = ({ name, type }) => {
  const { ws } = useWebSocket();

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (response) => {
      console.log(response.data)
    };
  }, [ws]);

  return (
    <div className="w-full h-16 flex items-center justify-between shadow-lg shadow-[#05040F] border-main py-3 px-8">
      <div className="flex items-center gap-2">
        {iconsMap[type]}
        <h1 className="text-xl ml-2 sm:text-3xl">{name}</h1>
      </div>
      {
        type === ChannelType.TEXT &&
        <div >
          <Badge className="text-md sm:text-lg">Realtime Updates</Badge>
        </div>
      }
    </div>
  );
};

