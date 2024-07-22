"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { channelSchema } from "@/schemas/channels"

import { useModal } from "@/hooks/use-modal-store"
import { toast } from "sonner"
import { ChannelType } from "@prisma/client"
import axios from "axios";
import qs from "query-string"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export function CreateChannels() {

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createChannels";
  const params = useParams()
  const router = useRouter();

  const form = useForm<z.infer<typeof channelSchema>>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    },
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof channelSchema>) => {
    try {

      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params.serverId
        }
      })
      const response = await axios.post(url, values)
      if (response.data) {
        toast.success("Channel created")
      }
      form.reset()
      onClose()
      router.refresh()
    } catch (err) {
      console.log(err);
      toast.error("try again")
    }
  };

  const handleClose = () => {
    form.reset();
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
      <DialogContent className="w-[350px] sm:w-[550px] flex flex-col items-center border-secondary">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl text-center">Create Channels</DialogTitle>
          <DialogDescription>
            You can create different type of channels texts,video or audio for different purposes
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col justify-center items-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="uppercase" htmlFor="name">Channel Name</FormLabel>
                    <FormControl>
                      <Input className="w-full focus:ring-0 ring-offset-0 focus:ring-offset-0 outline-none focus:border-none " disabled={isLoading} placeholder="Name of your channel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="uppercase" htmlFor="name">Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full focus:ring-0 ring-offset-0 focus:ring-offset-0 outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent side="bottom" className="border-secondary">
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem key={type} value={type}>{type.toLowerCase()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full text-lg font-semibold" disabled={isLoading} type="submit">Create</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog >
  )
}

