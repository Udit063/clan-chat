"use server"

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const updateServerInviteCode = async (serverId: string) => {
  console.log(`reached --  ${serverId}`)
  try {
    const newId = uuidv4();
    const updatedServer = await db.server.update({
      where: {
        id: serverId
      },
      data: {
        inviteCode: newId
      }
    })
    return updatedServer;
  } catch (err) {
    return err
  }
}
