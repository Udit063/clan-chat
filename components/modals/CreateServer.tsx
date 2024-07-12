"use client"
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

export function CreateServer() {


  const form = useForm<z.infer<typeof serverSchema>>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    },
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof serverSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-[350px] sm:w-[550px]">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Customize your Server</CardTitle>
        <CardDescription>Embark on an exciting journey by giving an interesting name and image to your server</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="picture">Picture</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
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
    </Card>);
};
