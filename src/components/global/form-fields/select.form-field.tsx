'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control, Path, PathValue } from 'react-hook-form';

const SelectField = <
  TFieldValues extends Record<string, string>,
  UFieldDefaultValues extends PathValue<TFieldValues, Path<TFieldValues>>,
>({
  control,
  name,
  values,
  defaultValues,
  label,
  placeholder,
  description,
}: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  values: SelectOption[];
  defaultValues?: UFieldDefaultValues;
  label: string;
  placeholder: string;
  description?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValues}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
