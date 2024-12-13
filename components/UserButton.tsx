"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ActionTooltip } from "./ActionTooltip";

interface UserButtonProps {
  id: string;
  name: string;
}

export function UserButton({ id, name }: UserButtonProps) {
  const router = useRouter();

  const handleEditProfle = () => {
    router.push(`/user/${id}`);
  };
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Dialog>
      <ActionTooltip side="right" label={`Hello ${name}`} align="start">
        <DialogTrigger asChild>
          <button className="h-[48px] w-[48px] bg-neutral-800 flex text-xl text-primary items-center justify-center rounded-full">
            {name?.slice(0, 1)}
          </button>
        </DialogTrigger>
      </ActionTooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hello {name}</DialogTitle>
          <DialogDescription>
            I am Udit, and just wanted to thank you for using this application.{" "}
          </DialogDescription>
        </DialogHeader>
        {/* <Button
          onClick={handleEditProfle}
          className="bg-neutral-700 text-white hover:bg-neutral-800 duration-500"
        >
          Edit Profile
        </Button> */}
        <Button onClick={handleSignOut}>Sign Out</Button>
      </DialogContent>
    </Dialog>
  );
}
