"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface ChatInputProps {
  userId: string;
  serverId: string;
  channelId: string;
  username: string;
}

export const ChatInput = ({ userId, username, serverId, channelId }: ChatInputProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectSocket = () => {
      const socket = new WebSocket(`ws://localhost:8080`);
      setWs(socket);

      socket.onmessage = (event) => {
        console.log("Message from server:", event.data);
      };

      return () => {
        socket.close();
      };
    };

    connectSocket();

    return () => {
      ws?.close();
    };
  }, []);

  const onClick = () => {
    if (ws) {
      const message = JSON.stringify({
        content: "Hello, this is a static test message!",
        userId,
        serverId,
        channelId,
        username
      });

      ws.send(message);
    }
  };

  return (
    <div>
      <Input placeholder="Send message" />
      <button onClick={onClick}>Send Message</button>
    </div>
  );
};

