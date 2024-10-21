"use client";

import { user } from "@prisma/client";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import useFormZod from "@/hooks/use-form-zod";
import { Form } from "../ui/form";
import { InputField } from "../input.form-field";
import ButtonSubmit from "../button.submit";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  pseudo: z
    .string()
    .min(3, "Pseudo must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Pseudo must not contain spaces or special characters"
    ),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(3, "Phone number must be 10 digits"),
  //   profile_img: z.string().url(),
  role: z.enum(["USER", "VIP"]),
});

export default function DialogEditProfile({ data }: { data: user }) {
  const { form, control, handleSubmit } = useFormZod(userSchema, data);

  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <InputField
                control={control}
                name="name"
                label="Name"
                placeholder="Francis Ngannou"
                type="text"
                autoComplete="name"
              />
              <InputField
                control={control}
                name="pseudo"
                label="Pseudo"
                placeholder="thepredator"
                type="text"
                autoComplete="username"
              />
              <InputField
                control={control}
                name="email"
                label="Email"
                placeholder="example@email.com"
                type="email"
                autoComplete="email"
              />
              <InputField
                control={control}
                name="phone"
                label="Phone"
                placeholder="1234567890"
                type="tel"
                autoComplete="tel"
              />
              <InputField
                control={control}
                name="role"
                label="Role"
                placeholder="USER"
                type="text"
                autoComplete="role"
              />
            </div>
            <DialogFooter>
              <ButtonSubmit label="Edit" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
