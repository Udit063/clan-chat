import { auth } from "@/auth";
import { ServerSidebar } from "@/components/bars/ServerSidebar";
import { getServer } from "@/data/server";
import Link from "next/link";

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
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-9xl">You are not authorized</p>
        <Link href="/login" className="w-[300px] h-[300px] rounded-2xl bg-blue-600">Go to login</Link>
      </div>
    )
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

