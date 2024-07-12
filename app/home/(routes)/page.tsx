import { auth } from "@/auth";
import { CreateServer } from "@/components/modals/CreateServer";
import { ModeToggle } from "@/components/toggle";
import { getUserServer } from "@/data/server";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth()
  const userId = session?.user?.id as string;
  if (!session) {
    redirect("/login")
  }

  const server = await getUserServer(userId)

  if (server == null) {
    return (<div className="w-full min-h-screen h-full flex justify-center items-center"> <CreateServer /> <ModeToggle /> </div>)
  }

  return <div className="h-full">Welcome back</div>

}
export default HomePage;
