"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"

import { useRouter } from "next/navigation";
import { CircleAlert } from 'lucide-react';
import { toast } from "sonner";
import axios from "axios";


export function LeaveServer() {

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "leaveServer"

  const router = useRouter();
  if (!data.server) {
    router.push("/")
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${data.server?.id}/leave`)
      onClose();
      router.refresh()
      router.push("/home")
    } catch (err) {
      toast.error("Sorry, try again")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>

      <DialogContent className="w-[350px] sm:w-[500px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-4xl text-center flex justify-center items-center gap-3 "><CircleAlert size={30} />Leave Server</DialogTitle>
          <DialogDescription>
            Do you really want to leave <span className="text-white">{data.server?.name}</span>, remember you will need to ask for invite link again to join.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mx-0 px-0 flex justify-start">
          <Button onClick={onDelete} disabled={isLoading} className="w-full text-lg font-semibold bg-rose-600 hover:bg-red-700 ring-0 focus:ring-0 focus:ring-offset-0 text-white "><p>{isLoading ? "Leaving" : `Leave ${data.server?.name}`}</p></Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
