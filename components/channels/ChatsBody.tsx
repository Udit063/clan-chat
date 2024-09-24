"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBar } from "../MessageBar";
import { useWebSocket } from "../socket-provider";

interface ChatsBodyProps {
  serverId: string;
  channelId: string;
  activeUser: string;
}

interface Message {
  _id: string;
  content: string;
  userId: string;
  username: string;
  serverId: string;
  channelId: string;
  timestamp: number;
  __v: number;
}

export function ChatsBody({ serverId, channelId, activeUser }: ChatsBodyProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { ws } = useWebSocket();

  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  }, [])

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await axios.get(`https://clan-chat-five.vercel.app/api/messages/${serverId}/${channelId}`);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    getAllMessages();
  }, [serverId, channelId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full w-full flex flex-col gap-6 px-3 justify-center overflow-hidden">
        <Skeleton className="h-6 w-2/3 sm:w-3/4" />
        <Skeleton className="h-10 w-2/3 sm:w-1/2" />
        <Skeleton className="h-6 w-2/3 sm:w-3/4 ml-auto" />
        <Skeleton className="h-6 w-1/3 sm:w-3/4 ml-auto" />
        <Skeleton className="h-6 w-2/3 sm:w-3/4" />
        <Skeleton className="h-10 w-2/3 sm:w-1/2" />
        <Skeleton className="h-6 w-2/3 sm:w-3/4 ml-auto" />
        <Skeleton className="h-6 w-1/3 sm:w-3/4 ml-auto" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-10 w-2/3 sm:w-3/5" />
        <Skeleton className="h-6 w-2/3 sm:w-3/5 ml-auto" />
        <Skeleton className="h-12 w-2/3 ml-auto" />
        <Skeleton className="h-6 w-2/3 ml-auto" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-10 w-2/3 ml-auto" />
        <Skeleton className="h-6 w-2/3 ml-auto" />
      </div>
    );
  }

  return (
    <div className="h-5/6 w-full flex flex-col">
      <ScrollArea className="mt-auto px-8">
        {messages.map((message) => (
          <MessageBar
            key={message._id}
            id={message._id}
            message={message.content}
            userId={message.userId}
            username={message.username}
            time={message.timestamp}
            activeUser={activeUser}
          />
        ))}
        <div ref={chatContainerRef} />
      </ScrollArea>
    </div>
  );
}

