import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown, PlusCircle, Settings, Trash2, UserRoundPlus, Users } from "lucide-react";

interface ServerButtonsProps {
  server: string;
}

export const ServerButtons = ({ server }: ServerButtonsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl font-bold flex w-full justify-around items-center bg-card py-4 focus:border-none active:border-none hover:border-none">
        <div>{server}</div> <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-neutral-800 w-[250px]">
        <DropdownMenuItem className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group">
          <div className="group-hover:text-blue-500">Invite People</div>
          <UserRoundPlus size={20} className="group-hover:text-blue-500" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group">
          <div className="group-hover:text-blue-500">Server Settings</div>
          <Settings size={20} className="group-hover:text-blue-500" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group">
          <div className="group-hover:text-blue-500">Manage Members</div>
          <Users size={20} className="group-hover:text-blue-500" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex w-full justify-between items-center p-2 my-1 cursor-pointer group ">
          <div className="group-hover:text-blue-500">Create Channel</div>
          <PlusCircle size={20} className="group-hover:text-blue-500" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-rose-500" />
        <DropdownMenuItem className=" text-rose-500 flex w-full justify-between items-center p-2 my-1 cursor-pointer focus:bg-rose-500">
          <div>Delete Server</div>
          <Trash2 size={20} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
