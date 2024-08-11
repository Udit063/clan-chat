import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ServerSidebar } from "./ServerSidebar";
import { ChevronRight } from "lucide-react";

interface SheetSidebarProps {
  userId: string;
  serverId: string;
}

export function SheetSidebar({ userId, serverId }: SheetSidebarProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed top-4 ml-4"><ChevronRight /></button>
      </SheetTrigger>
      <SheetContent side={"right"} className="border-none bg-[#05040F]">
        <ServerSidebar serverId={serverId} userId={userId} />
      </SheetContent>
    </Sheet>
  );
}

