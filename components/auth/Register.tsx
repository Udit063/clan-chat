"use client"
import { useState } from "react"
import { CardWrapper } from "./CardWrapper"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { FormError } from "./FormError"

export const Register = () => {

  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setError("error in logging in, try again")
    console.log(values)
  }


  return (
    <div className="w-screen min-h-screen h-full flex justify-center items-center">
      <CardWrapper headerLabel="Join Now" backLabel="Already have an account, login now" backLabelHref="/login" description="create a new account to start exciting conversations">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="border-second_text bg-layer text-primary_text ring-offset-second_text" placeholder="Ankur Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="border-second_text bg-layer text-primary_text ring-offset-second_text" placeholder="ankursharma1493@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-second_text bg-layer text-primary_text ring-offset-second_text" placeholder="How dare you ask me my password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button className="w-full bg-gray-900 hover:bg-second_text hover:text-main duration-800 text-lg " type="submit">Register</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
