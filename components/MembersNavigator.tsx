"use client"

import { Settings, ShieldAlert, Shield, User } from "lucide-react";
import { Label } from "./ui/label";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembers } from "@/types"

interface MembersNavigatorProps {
  server: ServerWithMembers;
  userRole: MemberRole;
}

export const MembersNavigator = ({ userRole, server }: MembersNavigatorProps) => {
  const router = useRouter()
  const { onOpen } = useModal()

  const roleIconsMap = {
    [MemberRole.ADMIN]: <ShieldAlert size={15} />,
    [MemberRole.MODERATOR]: <Shield size={15} />,
    [MemberRole.GUEST]: <User size={15} />
  }

  const handleRouting = (id: string) => {
    router.push(`users/conversations/${id}`)
  }

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
      {
        server.members.map((member) => (
          <div onClick={() => handleRouting(member.id)} className="flex items-center rounded-sm hover:shadow-sm hover:shadow-card my-1 px-3 py-2 cursor-pointer group w-full" key={member.id}>
            <div className="flex items-center gap-3 ">
              <div className="text-zinc-500 group-hover:text-emerald-500" >{roleIconsMap[member.role]}</div>
              <p className="text-zinc-500 group-hover:text-emerald-500">{member.user.name}</p>
            </div>
          </div>

        ))
      }
    </div>
  )
}

