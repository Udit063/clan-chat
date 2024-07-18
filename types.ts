import { Server, Member, User } from "@prisma/client"

export type ServerWithMembers = Server & {
  members: (Member & { user: User })[]
}
