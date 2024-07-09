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
import { loginSchema } from "@/schemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { FormError } from "./FormError"

export const Login = () => {

  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setError("error in logging in, try again")
    console.log(values)
  }


  return (
    <div className="w-screen min-h-screen h-full flex justify-center items-center z-10">
      <CardWrapper headerLabel="Welcome Back" backLabel="Don't have an account, register now" backLabelHref="/register" description="Login to your account to get back to your conversation">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="w-full bg-gray-900 hover:bg-second_text hover:text-main duration-800 text-lg " type="submit">Login</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
