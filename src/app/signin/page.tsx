"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { InputField } from "@/components/input.form-field";
import ButtonSubmit from "@/components/button.submit";
import { Form } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useFormZod from "@/hooks/use-form-zod";

const signinSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .strict();

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const {form, control, handleSubmit} = useFormZod(signinSchema);

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      setLoading(true);
      
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(response);

      if (response?.ok) {
        router.push("/publications");
        return router.refresh();
      }

      toast({
        title: "Sign In Failed",
        description: response?.error || "Internal server error",
        variant: "destructive",
      });
    } catch (error) {
      console.error("error", error);
      toast({
        title: "Sign In Failed",
        description: "Internal server error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <InputField
            control={control}
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            type="email"
            autoComplete="email"
          />
          <InputField
            control={control}
            name="password"
            label="Password"
            placeholder="password123"
            type="password"
            autoComplete="current-password"
          />
          <ButtonSubmit label="Sign In" disabled={Loading} />
        </form>
      </Form>
    </main>
  );
}
