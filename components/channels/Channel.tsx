"use client"
import axios from "axios";
import { ChannelHeader } from "@/components/channels/ChannelHeader";
import { ChatInput } from "@/components/channels/ChatInput"
import { ChannelType } from "@prisma/client";
import { useEffect, useState } from "react";
import { ChatsBody } from "./ChatsBody";

interface ChannelProps {
  channelName: string;
  channelType: ChannelType
  channelId: string;
  userId: string;
  serverId: string;
  username: string;
}

export function Channel({ channelName, channelType, channelId, userId, serverId, username }: ChannelProps) {
  const [token, setToken] = useState("")

  useEffect(() => {
    const getToken = async () => {
      console.log("called===")
      const response = await axios.get("/api/get-token")
      if (response.data) {
        setToken(response.data)
      }
    }
    getToken()
  }, [])

  return (

    <div className="h-full flex flex-col justify-between">
      <ChannelHeader name={channelName} type={channelType} />
      <ChatsBody channelId={channelId} serverId={serverId} />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} username={username} token={token} />
    </div>

  )
}
