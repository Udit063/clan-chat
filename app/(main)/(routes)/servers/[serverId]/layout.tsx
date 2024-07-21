import { auth } from "@/auth";
import { ServerSidebar } from "@/components/bars/ServerSidebar";
import { getServer } from "@/data/server";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params
}: {
  children: React.ReactNode,
  params: { serverId: string }
}) => {
  const session = await auth();
  const userId = session?.user?.id as string
  const server = await getServer({ serverId: params.serverId, userId: userId });
  if (!server) {
    redirect("/home")
  }

  return (
    <div className="h-screen w-screen">
      <div className="hidden h-full w-[300px] md:flex flex-col ">
        <ServerSidebar serverId={server.id} userId={userId} />
      </div>
      {children}
    </div>
  );
}

export default ServerIdLayout;

