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
  DialogTrigger,
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
import { useToast } from "../ui/use-toast"

import { ReactNode } from "react"

export function CustomizeServer({ children }: { children: ReactNode }) {

  const [error, setError] = useState("")
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

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
            toast({
              description: data.error
            })
          } else {
            if (data.id) {
              router.push(data.id);
              window.location.reload()
            }
          }
          form.reset()
        })
        .catch((err) => {
          toast({
            description: err
          })
        });
    });
  };



  return (
    <Dialog >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Customize your Server</DialogTitle>
          <DialogDescription>
            Embark on an exciting journey by giving an interesting name and image to your server
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full justify-center items-center">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
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

