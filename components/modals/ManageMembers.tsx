"use client"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { useSession } from 'next-auth/react';

import { ServerWithMembers } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

import { EllipsisVerticalIcon, Loader, Shield, ShieldAlertIcon, Trash, User, UserRoundCog, UserRoundPen } from "lucide-react";
import { kickOutMember, memberRolesUpdate } from "@/actions/members";
import { toast } from "sonner";
import { MemberRole } from "@prisma/client";

export function ManageMembers() {

  const { isOpen, onOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "manageMembers"
  const { server } = data as { server: ServerWithMembers }
  const [isLoading, setIsLoading] = useState("")
  const router = useRouter();
  if (!data.server) {
    router.push("/")
  }
  const { data: session } = useSession();
  const user = session?.user
  if (!user) redirect("/")

  const members = server.members.map((member) => {
    return {
      id: member.id,
      name: member.user.name,
      email: member.user.email,
      userId: member.userId,
      role: member.role
    }
  })

  const membersRole = [
    {
      icon: <User size={15} />,
      role: "Guest",
      value: MemberRole.GUEST
    },
    {
      icon: <UserRoundCog size={15} />,
      role: "Moderator",
      value: MemberRole.MODERATOR
    }]

  const handleRoleUpdates = async ({ memberId, role, errorStateId }: { memberId: string, role: MemberRole, errorStateId: string }) => {
    try {
      setIsLoading(errorStateId)
      const response = await memberRolesUpdate({ headId: user.id as string, serverId: server.id, memberId, role })
      if (response.success) {
        toast.success(`Role Updated`)
      }
      if (response.error) {
        const errorMessage = typeof response.error === "string" ? response.error : "Error hogya oh raba raba";
        toast.error(errorMessage)
        return;
      }
      router.refresh()
      onClose()

    } catch (err) {
      toast.error("Try again")
    } finally {
      setIsLoading("")
    }
  }

  const handleKickoutMember = async (memberId: string) => {
    try {
      setIsLoading(memberId);
      const response = await kickOutMember({ headId: user.id as string, serverId: server.id, memberId })
      if (response.success) {
        toast.success(`deleted ${response.success?.deletedUser.role}`)
      }
      if (response.error) {
        const errorMessage = typeof response.error === "string" ? response.error : "Error hogya oh raba raba";
        toast.error(errorMessage)
        return;
      }

      router.refresh()
      onOpen("manageMembers", { server: response.success?.server })

    } catch (error) {
      toast.error("try again")
      console.log(error)
    } finally {
      setIsLoading("")
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>

      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">Manage Members</DialogTitle>
          <DialogDescription>
            <p>Number of members in {server.name} are - {server.members.length}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <ScrollArea className="rounded-lg h-48 w-full">
            {members.map((member) => (
              <div key={member.id} className="w-full h-[60px] flex justify-between items-center px-6 bg-main my-2 rounded-sm ">
                <div className="flex gap-5">
                  <div className="h-[48px] w-[48px] bg-emerald-800 flex text-xl text-white items-center justify-center rounded-full">
                    {member.name?.slice(0, 1)}
                  </div>
                  <div className="flex flex-col justify-evenly h-full">
                    <div className="flex gap-2 items-center">
                      <h3>{member.name}</h3>
                      {member.role === "ADMIN"
                        ? (<ShieldAlertIcon size={15} className="text-red-500" />)
                        : member.role === "MODERATOR" && (<Shield size={15} className="text-muted-foreground" />)
                      }
                    </div>
                    <p className="text-muted-foreground text-sm">{member.email}</p>
                  </div>
                </div>
                <div>
                  {
                    member.userId !== user.id &&
                    <DropdownMenu>
                      <DropdownMenuTrigger>{isLoading === member.id ? <Loader /> : <EllipsisVerticalIcon />}</DropdownMenuTrigger>
                      <DropdownMenuContent side="left" className="border-secondary" >
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="gap-2"><UserRoundPen size={15} />Role</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="border-secondary">
                              {
                                membersRole.map((item) => (
                                  <DropdownMenuItem key={item.value} className="gap-2"
                                    onClick={() => handleRoleUpdates({ memberId: member.userId, role: item.value, errorStateId: member.id })} >
                                    {item.icon}{item.role}
                                  </DropdownMenuItem>
                                ))
                              }
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem onClick={() => handleKickoutMember(member.id)} className="gap-2"><Trash size={15} />Kick</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
