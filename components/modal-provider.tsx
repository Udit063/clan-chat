"use client"

import { CustomizeServer } from "@/components/modals/CustomizeServer"
import { useEffect, useState } from "react"
import { InviteModal } from "./modals/InviteModal";
import { useModal } from "@/hooks/use-modal-store"

export const ModalProvider = () => {

  const { type, isOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isOpen && type === "customizeServer" && <CustomizeServer />}
      {isOpen && type === "inviteModal" && <InviteModal />}    </>
  )
}
