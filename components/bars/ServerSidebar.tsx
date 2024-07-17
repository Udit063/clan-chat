import { ServerButtons } from "../ServerButtons"

interface ServerSidebarProps {
  server: string;
}

export const ServerSidebar = ({ server }: ServerSidebarProps) => {
  return (
    <div className="w-[300px] bg-[#08061A] h-screen">
      <div className="w-full flex items-center justify-center">
        <ServerButtons server={server} />
      </div>
    </div>
  )
}
