"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { useToast } from "@/components/ui/use-toast"

export function CreateServer() {

  const [error, setError] = useState("")
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast()

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
            router.refresh();
            window.location.reload()
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
    <Card className="w-[350px] sm:w-[550px]">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Create New Server</CardTitle>
        <CardDescription>Embark on an exciting journey by giving an interesting name and image to your server</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center">
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
                <FormItem>
                  <FormLabel className="uppercase" htmlFor="name">Server Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Name of your server" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full text-lg font-semibold" disabled={isLoading} type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <span className="text-blue-900 dark:text-blue-400" >Fun Fact - {" "}</span> <p className="text-sm">This app is inspired by discord{" "}!</p>
      </CardFooter>
    </Card>);
};
