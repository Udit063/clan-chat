import { auth } from "@/auth"
import { getUserEntireServers } from "@/data/server";
import { getUserById } from "@/data/user";
import { NavigationAction } from "@/components/bars/NavigationAction";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItems } from "./NavigationItems";
import { UserButton } from "../UserButton";
import { redirect } from "next/navigation";

export const NavigationSidebar = async () => {

  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  if (!user) {
    redirect("/login")
  }
  const servers = await getUserEntireServers(user?.id as string)

  return (
    <div className="w-full pb-4 h-full space-y-4 flex flex-col items-center text-primary dark:bg-card">
      <NavigationAction />
      <Separator className="bg-emerald-700 h-[2px] w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers && servers.map((server) => {
          return (
            <NavigationItems key={server.id} id={server.id} name={server.name} imageUrl={server.imageUrl} />
          )
        })
        }
      </ScrollArea>
      <UserButton id={user?.id || ""} name={user?.name || ""} />
    </div>
  )
}

