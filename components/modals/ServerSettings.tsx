"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { serverSchema } from "@/schemas/server"
import { useModal } from "@/hooks/use-modal-store"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/FileUpload"
import { updateServer } from "@/actions/server"
import { toast } from "sonner"
export const ServerSettings = () => {

  const [error, setError] = useState("")
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, data } = useModal()

  const form = useForm<z.infer<typeof serverSchema>>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: data.server?.name,
      imageUrl: data.server?.imageUrl
    },
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof serverSchema>) => {
    setError('');

    startTransition(() => {
      updateServer(data.server?.id as string, values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
            return;
          }
          form.reset()
          router.refresh();
          onClose()
          toast.success("Updated successfully")
        })
        .catch((err) => {
          toast.error(err)
        });
    });
  };

  const handleClose = () => {
    form.reset();
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">Server Settings</DialogTitle>
          <DialogDescription>
            You can customize your server as you want, Go ahead
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col justify-center items-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full" >
                    <FormLabel className="uppercase" htmlFor="name">Server Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="uppercase" htmlFor="name">Server Name</FormLabel>
                    <FormControl>
                      <Input className="w-full active:outline-none active:border-none" disabled={isLoading} placeholder="Name of your server" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full text-lg font-semibold" disabled={isLoading} type="submit">Save</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>

  )
}

