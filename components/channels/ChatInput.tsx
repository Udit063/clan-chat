"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useWebSocket } from "../socket-provider";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface ChatInputProps {
  userId: string;
  serverId: string;
  channelId: string;
  username: string;
  token: string;
}

export const ChatInput = ({ userId, username, serverId, channelId, token }: ChatInputProps) => {

  const [message, setMessage] = useState<string>("")
  const { ws } = useWebSocket();



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };


  const sendMessage = () => {
    if (message.trim().length === 0) {
      toast.info("Type a message");
      return;
    }
    if (!token) {
      toast.error("Try again in some time")
    }

    const payload = {
      token,
      userId,
      username,
      serverId,
      channelId,
      content: message,
    };
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
      setMessage("");
    }
  };

  return (
    <div className="h-14 flex items-center rounded-md border-none bg-background  ">
      <Input type="text"
        className="h-full border-none  bg-neutral-950 rounded-r-none w-full  focus-visible:ring-transparent "
        placeholder="Type your message"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessage(e.target.value)} />
      <Button type="submit" className="bg-neutral-950 h-full rounded-l-none" onClick={sendMessage} variant="link"><Send className="text-white " /></Button>
    </div>
  );
};

