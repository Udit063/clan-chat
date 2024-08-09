"use client";

import axios from "axios";
import { ChannelHeader } from "@/components/channels/ChannelHeader";
import { ChatInput } from "@/components/channels/ChatInput";
import { ChannelType } from "@prisma/client";
import { useEffect, useState, useCallback } from "react";
import { ChatsBody } from "./ChatsBody";
import { useWebSocket } from "../socket-provider";
import { MediaRoom } from "../media-room";

interface ChannelProps {
  channelName: string;
  channelType: ChannelType;
  channelId: string;
  userId: string;
  serverId: string;
  username: string;
}

export function Channel({ channelName, channelType, channelId, userId, serverId, username }: ChannelProps) {
  const [token, setToken] = useState("");
  const { ws } = useWebSocket();

  const sendJoinMessage = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN && token) {
      const joinMessage = {
        type: "join",
        token,
        serverId,
        channelId,
      };
      ws.send(JSON.stringify(joinMessage));
      console.log("server joined");
    }
  }, [ws, token, serverId, channelId]);

  useEffect(() => {
    const getToken = async () => {
      console.log("called===");
      const response = await axios.get("/api/get-token");
      if (response.data) {
        setToken(response.data);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    sendJoinMessage();
  }, [sendJoinMessage]);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        sendJoinMessage();
      };
    }
  }, [ws, sendJoinMessage]);

  return (
    <div className="h-full flex flex-col justify-between">
      <ChannelHeader name={channelName} type={channelType} />
      {channelType === ChannelType.TEXT ?
        (<ChatsBody channelId={channelId} serverId={serverId} activeUser={userId} />)
        : (
          channelType === ChannelType.AUDIO
            ? (<MediaRoom
              chatId={`${serverId}${channelId}`}
              audio={true}
              video={false}
              userId={userId}
            />)
            : (
              <MediaRoom
                chatId={`${serverId}${channelId}`}
                audio={true}
                video={true}
                userId={userId}
              />
            )
        )
      }
      {
        channelType === ChannelType.TEXT &&
        <ChatInput userId={userId} serverId={serverId} channelId={channelId} username={username} token={token} />
      }
    </div>
  );
}

