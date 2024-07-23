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

import { useParams, useRouter } from "next/navigation";
import { CircleAlert } from 'lucide-react';
import { toast } from "sonner";
import axios from "axios";
import qs from "query-string"


export function DeleteChannel() {

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteChannel"
  const params = useParams();
  const router = useRouter();
  if (!data.channelId) {
    router.push("/")
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${data.channelId}`,
        query: {
          serverId: params?.serverId
        }
      })
      const response = await axios.delete(url)
      onClose();
      toast.success("Deleted channel successfully")
      router.refresh()
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
          <DialogTitle className="font-bold text-4xl text-center flex justify-center items-center gap-3 "><CircleAlert size={30} />Are you Sure?</DialogTitle>
          <DialogDescription>
            Do you really want to delete your server, remember this action is not reversible. Other members will be permanently deleted too
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mx-0 px-0 flex justify-start">
          <Button onClick={onDelete} disabled={isLoading} className="w-full text-lg font-semibold bg-rose-600 hover:bg-red-700 ring-0 focus:ring-0 focus:ring-offset-0 text-white "><p>{isLoading ? "Deleting" : `Delete This channel`}</p></Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
