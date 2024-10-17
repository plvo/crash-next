"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, Path } from "react-hook-form";

export const InputField = <TFieldValues extends Record<string, string>>({
  control,
  name,
  label,
  description,
  ...props
}: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
} & React.ComponentProps<typeof Input>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (!field) {
          console.error("Field is missing for InputField", name);
          return <></>;
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} {...props} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
