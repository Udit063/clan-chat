"use client"
import useTimestamp from "@/hooks/useTimestamp";
import { cn } from "@/lib/utils";

interface MessageBarProps {
  id: string;
  message: string;
  userId: string;
  username: string;
  activeUser: string;
  time: number;
}

export function MessageBar({ id, username, message, userId, activeUser, time }: MessageBarProps) {
  const timeAgo = useTimestamp({ timestamp: time });
  return (
    <div
      key={id}
      className={cn("w-fit my-2 min-w-[75px] px-3 py-2  rounded-lg  bg-gray-900 sm:max-w-[80%]",
        activeUser === userId ? "rounded-tr-none ml-auto border-r border-r-gray-700" : "rounded-tl-none border-l border-l-gray-700 "
      )}
    >
      {userId !== activeUser &&
        (<div className="text-sm text-gray-400">{username}</div>)
      }
      <div className="text-md">
        {message}
      </div>
      <div className="text-[12px] text-gray-600" >{timeAgo}</div>
    </div>
  )
}
