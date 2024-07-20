"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/hooks/use-modal-store"

import { ServerSettings } from "./modals/ServerSettings";
import { InviteModal } from "./modals/InviteModal";
import { CustomizeServer } from "@/components/modals/CustomizeServer"

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
      {isOpen && type === "inviteModal" && <InviteModal />}
      {isOpen && type === "serverSettings" && <ServerSettings />}
    </>
  )
}
