import { auth } from "@/auth";
import { isExistingUser } from "@/data/invite";
import { createNewMember } from "@/data/member";
import { redirect } from "next/navigation";

const InvitePage = async ({ params }: { params: { inviteCode: string } }) => {

  const session = await auth();
  const user = session?.user

  if (!user || !user.id) {
    return redirect("/login");
  }
  const existing = await isExistingUser({ inviteCode: params.inviteCode, userId: user.id })

  if (existing) {
    return redirect(`/servers/${existing?.id}`)
  }

  const newMember = await createNewMember({ inviteCode: params.inviteCode, userId: user.id })

  if (newMember) {
    return redirect(`/servers/${newMember.id}`)
  }


  return null
}

export default InvitePage;
