"use client"
import { Edit, Lock, Plus, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "./ActionTooltip";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

interface ChannelNavigatorProps {
  userRole: MemberRole;
  data: {
    label: string;
    channelType?: ChannelType;
    data: {
      name: string;
      icon: React.ReactNode;
      id: string;
    }[];
  }[];
}

export const ChannelsNavigator = ({ userRole, data }: ChannelNavigatorProps) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModal();

  const { channelId } = params;
  const [activeChannel, setActiveChannel] = useState(channelId);

  const handleRouting = (id: string) => {
    router.push(`/servers/${params.serverId}/channels/${id}`);
  };

  const handleDelete = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation();
    onOpen("deleteChannel", { channelId: id });
  };

  useEffect(() => {
    setActiveChannel(channelId);
  }, [channelId]);

  return (
    <div className="mt-3">
      {data.map(({ label, channelType, data }) => (
        <div key={label} className="w-full px-3">
          <div className="py-1">
            {channelType && (
              <div className="flex justify-between items-center text-zinc-700">
                <Label className="text-lg">{label}</Label>
                {userRole !== MemberRole.GUEST && (
                  <button onClick={() => onOpen("createChannels", { channelType })}>
                    <Plus size={20} className="hover:text-emerald-500" />
                  </button>
                )}
              </div>
            )}
          </div>
          {data.map(({ id, name, icon }) => (
            <div
              key={id}
              onClick={() => handleRouting(id)}
              className={cn(
                "flex justify-between items-center rounded-sm hover:shadow-sm hover:shadow-card my-1 px-3 py-2 cursor-pointer group w-full",
                activeChannel === id && "shadow-sm shadow-card bg-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="text-zinc-500 group-hover:text-emerald-500">{icon}</div>
                <p className="text-zinc-500 group-hover:text-emerald-500">{name}</p>
              </div>
              <div>
                {name === "general" ? (
                  <ActionTooltip align="center" side="top" label="cannot be changed">
                    <Lock size={15} className="text-zinc-700 group-hover:text-emerald-500" />
                  </ActionTooltip>
                ) : userRole !== MemberRole.GUEST ? (
                  <div className="flex gap-2">
                    <ActionTooltip align="center" side="top" label="Edit">
                      <Edit size={15} className="hidden group-hover:block text-emerald-800" />
                    </ActionTooltip>
                    <div onClick={(event) => handleDelete(event, id)}>
                      <ActionTooltip align="center" side="top" label="Delete">
                        <Trash2 size={15} className="hidden group-hover:block text-emerald-800" />
                      </ActionTooltip>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

