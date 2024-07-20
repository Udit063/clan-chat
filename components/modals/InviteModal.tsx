"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"

import { RotateCw, Copy, CopyCheck } from "lucide-react";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { updateServerInviteCode } from "@/actions/inviteCode";
import { Input } from "../ui/input";

import { Server } from "@prisma/client"

export function InviteModal() {

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, data } = useModal();

  const router = useRouter();
  if (!data.server) {
    router.push("/")
  }

  const inviteCode = data?.server?.inviteCode || ""
  const inviteUrl = `http://localhost:3000/invite/${inviteCode}`

  const handleCopyCode = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(inviteCode)
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleGenerationNewCode = async () => {
    const serverId = data.server?.id as string;
    try {
      setIsLoading(true)
      const response = await updateServerInviteCode(serverId);
      onOpen("inviteModal", { server: response as Server })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>

      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">Invite your Friends</DialogTitle>
          <DialogDescription>
            Share this link with the person you want to invite in this server on Clan-Chat
          </DialogDescription>
        </DialogHeader>
        <Label className="text-start w-full" >Server Invite Code</Label>
        <div className="flex  w-full   ">
          <Input className=" py-1 px-4 rounded-xl  focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0" disabled={true} value={inviteUrl} />
          <button onClick={handleCopyCode} disabled={isLoading} className="focus:outline-none ml-3">{isCopied
            ? <CopyCheck size={30} />
            : <Copy size={30} />}
          </button>
        </div>
        <div className="w-full mx-0 px-0 flex justify-start">
          <Button disabled={isLoading} onClick={handleGenerationNewCode} variant="link" className="flex gap-1 px-0 text-rose-500 hover:text-rose-900 hover:no-underline"><p>{isLoading ? "Generating" : "Generate New Link"}</p><RotateCw size={15} /></Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
