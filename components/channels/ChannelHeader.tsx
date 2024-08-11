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
  [ChannelType.TEXT]: <Hash size={30} />,
  [ChannelType.AUDIO]: <Headset size={30} />,
  [ChannelType.VIDEO]: <Video size={30} />
};

export const ChannelHeader: React.FC<ChannelHeaderProps> = ({ name, type }) => {
  const { ws, isConnected } = useWebSocket();

  useEffect(() => {
    if (ws) {
      console.log('WebSocket instance:', ws);
      console.log('WebSocket readyState:', ws.readyState);

      if (ws.readyState === WebSocket.OPEN) {
        ws.onmessage = (response) => {
          console.log('Received message:', response.data);
        };
      }

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        ws.onmessage = null;
        ws.onclose = null;
        ws.onerror = null;
      };
    }
  }, [ws]);

  return (
    <div className="w-full h-16 flex items-center justify-between shadow-lg shadow-[#05040F] border-main py-3 px-8">
      <div className="flex items-center gap-2">
        {iconsMap[type]}
        <h1 className="text-3xl">{name}</h1>
      </div>
      {
        type === ChannelType.TEXT &&
        <div >
          {
            isConnected
              ? (<Badge>Realtime Updates</Badge>)
              : (<Badge variant="destructive">No realtime updates</Badge>)
          }
        </div>
      }
    </div>
  );
};

