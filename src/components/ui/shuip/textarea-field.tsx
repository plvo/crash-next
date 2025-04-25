'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Control, Path } from 'react-hook-form';
import { Textarea } from '../textarea';

interface TextareaFieldProps extends React.ComponentProps<typeof Textarea> {
  control: Control<any>;
  name: Path<any>;
  label: string;
  description?: string;
  [key: string]: any;
}

const TextareaField = ({ control, name, label, description, ...props }: TextareaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (!field) {
          console.error('Field is missing for InputField', name);
          return <></>;
        }

        return (
          <FormItem className='space-y-1.5'>
            <FormLabel className='flex items-center justify-between'>
              {label}
              <FormMessage className='max-sm:hidden text-sm' />
            </FormLabel>
            <FormControl>
              <Textarea {...field} {...props} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className='sm:hidden text-xs text-left' />
          </FormItem>
        );
      }}
    />
  );
};

export default TextareaField;
