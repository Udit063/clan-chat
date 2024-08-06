"use client"
import axios from "axios";
import { ChannelHeader } from "@/components/channels/ChannelHeader";
import { ChatInput } from "@/components/channels/ChatInput"
import { ChannelType } from "@prisma/client";
import { useEffect, useState } from "react";
import { useWebSocket } from "../socket-provider";
import { useRouter } from "next/navigation";
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
  const { ws } = useWebSocket()
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    if (!ws) {
      router.push("/home");
    }
  }, [ws, router]);

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
      <ChatsBody />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} username={username} token={token} />
    </div>

  )
}
