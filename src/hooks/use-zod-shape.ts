import { ZodObject, ZodRawShape } from "zod";

export default function UseZodShape<T extends ZodRawShape>(
  zodSchema: ZodObject<T>
) {
  const defaultValues = Object.keys(zodSchema.shape).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

  console.log("zodSchema", zodSchema.shape);
  console.log(defaultValues);

  return defaultValues;
}
