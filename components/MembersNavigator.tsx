"use client"

import { Settings, ShieldAlert, Shield, User } from "lucide-react";
import { Label } from "./ui/label";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembers } from "@/types"
import { useSession } from "next-auth/react";

interface MembersNavigatorProps {
  server: ServerWithMembers;
  userRole: MemberRole;
}

export const MembersNavigator = ({ userRole, server }: MembersNavigatorProps) => {
  const router = useRouter()
  const { onOpen } = useModal()

  const roleIconsMap = {
    [MemberRole.ADMIN]: <ShieldAlert size={17} className="text-rose-600" />,
    [MemberRole.MODERATOR]: <Shield size={17} className="text-sky-600" />,
    [MemberRole.GUEST]: <User size={17} />
  }

  const session = useSession();
  const user = session.data?.user


  return (
    <div>
      <div className="w-full px-3" >
        <div className="py-1" >

          <div className="flex justify-between items-center text-zinc-700">
            <Label className="text-lg" >Members</Label>
            {
              userRole !== MemberRole.GUEST &&
              (<button onClick={() => onOpen("manageMembers", { server })}><Settings size={20} className="hover:text-emerald-500" /></button>)
            }
          </div>
        </div>

      </div>
      {server.members.map((member) =>
        member.user.id !== user?.id ? (
          <div
            className="flex items-center rounded-sm hover:shadow-sm hover:shadow-card my-1 px-3 py-2 cursor-default group w-full"
            key={member.id}
          >
            <div className="flex items-center gap-3 px-3">
              <div>{roleIconsMap[member.role]}</div>
              <p className="text-zinc-500 group-hover:text-emerald-500">{member.user.name}</p>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center rounded-sm hover:shadow-sm hover:shadow-card my-1 px-3 py-2 cursor-default group w-full"
            key={member.id}
          >
            <div className="flex items-center gap-3 px-3">
              <div className="h-[24px] w-[24px] bg-neutral-800 flex text-sm text-primary items-center justify-center rounded-full">{user.name?.slice(0, 1)}</div>
              <p className="text-zinc-500 group-hover:text-emerald-500">You</p>
            </div>
          </div>

        )
      )}
    </div >
  )
}

