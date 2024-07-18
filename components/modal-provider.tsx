"use client"

import { CustomizeServer } from "@/components/modals/CustomizeServer"
import { useEffect, useState } from "react"

export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomizeServer />
    </>
  )
}
