"use client"
import { useModal } from "@/hooks/use-modal-store"
import { Plus } from "lucide-react"

export const NavigationAction = () => {

  const { onOpen } = useModal()
  const openCustomizeServer = () => {
    onOpen("customizeServer")
  }

  return (
    <button onClick={openCustomizeServer} className="group flex items-center justify-center">
      <div className="flex mx-3 mt-3 h-[48px] w-[48px] rounded-[24px] 
          group-hover:rounded-[16px] transition-all overflow-hidden 
          items-center justify-center bg-neutral-800 
           group-hover:bg-emerald-800 ">
        <Plus className="group-hover:text-primary text-emerald-400 transition " />
      </div>
    </button>
  )
}
