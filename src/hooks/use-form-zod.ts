import { z, ZodObject, ZodRawShape } from "zod";
import UseZodShape from "./use-zod-shape";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useFormZod<T extends ZodRawShape>(
    zodSchema: ZodObject<T>
  ) {
    const defaultValues = UseZodShape(zodSchema) as z.infer<typeof zodSchema>;
  
    const form = useForm<z.infer<typeof zodSchema>>({
      resolver: zodResolver(zodSchema),
      defaultValues: defaultValues as DefaultValues<z.infer<typeof zodSchema>>,
    });

    const { control, handleSubmit } = form;
    
    return {form, control, handleSubmit};
  }