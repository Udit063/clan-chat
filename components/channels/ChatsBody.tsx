"use client"

import { useEffect, useState } from "react"
import qs from "query-string"
import axios from "axios"

interface ChatsBodyProps {
  serverId: string;
  channelId: string;
}

export function ChatsBody({ serverId, channelId }: ChatsBodyProps) {

  const [messages, setMessages] = useState([])


  useEffect(() => {
    const getAllMessages = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/api/messages/${serverId}/${channelId}`)
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

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className="h-full w-full text-4xl">
      Hello Messages
    </div>
  )


}
