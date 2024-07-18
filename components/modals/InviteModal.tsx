import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"

//interface InviteModalProps {
//  children: React.ReactNode;
// inviteCode: string;
//}

export function InviteModal() {
  return (
    <Dialog open>
      <DialogTrigger>
        {/*Trigger button*/}
      </DialogTrigger>
      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
