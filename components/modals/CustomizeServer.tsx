"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { serverSchema } from "@/schemas/server"
import { FileUpload } from "@/components/FileUpload"
import { createServer } from "@/actions/server"

import { useModal } from "@/hooks/use-modal-store"
import { toast } from "sonner"

export function CustomizeServer() {

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "customizeServer";

  const [error, setError] = useState("")
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof serverSchema>>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    },
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof serverSchema>) => {
    setError('');

    startTransition(() => {
      createServer(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
            return;
          }
          form.reset()
          router.refresh();
          onClose()
          toast.success("Created successfully")
        })
        .catch((err) => {
          toast.error(err)
          setError(err)
        });
    });
  };

  const handleClose = () => {
    form.reset();
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">Customize your Server</DialogTitle>
          <DialogDescription>
            Embark on an exciting journey by giving an interesting name and image to your server
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
                    <FormLabel className="uppercase" htmlFor="name">Server Name</FormLabel>
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
                      <Input className="w-full" disabled={isLoading} placeholder="Name of your server" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full text-lg font-semibold" disabled={isLoading} type="submit">Create</Button>
            </form>
          </Form>
        </div>

        <DialogFooter>
          {error}
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

