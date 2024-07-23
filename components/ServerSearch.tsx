"use client"


import { useState, useEffect } from "react"
import { CommandIcon, Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      name: string;
      icon: React.ReactNode;
      id: string;
    }[];
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const itemClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
    setOpen(false)
    if (type === "member") {
      return router.push(`/users/conversations/${id}`)
    }

    if (type === "channel") {
      return router.push(`/servers/${params.serverId}/channels/${id}`)
    }

  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="group w-full gap-x-2 px-2 py-2 shadow-lg shadow-card rounded-md flex transition duration-200 items-center">
        <Search className="text-zinc-700 group-hover:text-zinc-500" />
        <p className="text-zinc-700 group-hover:text-zinc-500">Search</p>
        <kbd className="ml-auto gap-1 flex items-center justify-center bg-card font-medium px-2 text-sm text-zinc-500"><CommandIcon size={13} className="text-sm" />K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput placeholder="Search all channels and members" />
        <CommandList >
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <div key={label}>
                <CommandSeparator />
                <CommandGroup key={label} heading={label}>
                  {data.map(({ id, name, icon }) => (
                    <CommandItem key={id} className="gap-2" onSelect={() => itemClick({ id, type })} >
                      {icon}
                      {name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}

