"use client"

import { useUserInfo } from "@/hooks/useUser";
import { FormNameAndUsernameProps } from "./FormNameAndUsername.types";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { formSchema } from "./FormNameAndUsername.form";
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function FormNameAndUsername(props: FormNameAndUsernameProps) {
  const { setOpenDialog } = props;
  const { user, reloadUser } = useUserInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      bio: user?.bio || "",
      name: user?.name || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/update-user", {
        name: values.name,
        username: values.username,
        bio: values.bio
      })
      setOpenDialog(false)
      reloadUser()
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="@profile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-purple-600 text-white rounded-full w-full py-2
          text-sm hover:bg-purple-800"
            type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}
