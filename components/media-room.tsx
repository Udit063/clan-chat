"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  userId: string;
}

export function MediaRoom({ chatId, video, audio, userId }: MediaRoomProps) {

  const [token, setToken] = useState("");

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await axios.get(`/api/get-participant-token?room=${chatId}&username=${userId}`);
        const data = response.data;

        setToken(data.token);
      } catch (err) {
        console.log(err);
      }
    };

    fn();
  }, [userId, chatId]);

  if (token === "") {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Skeleton className="w-1/2 h-1/2 rounded-3xl" />
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}

