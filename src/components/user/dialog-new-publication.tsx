/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useNewPublication } from '@/hooks/use-publication';
import type { BaseUser } from '@/types/api';
import { useState } from 'react';
import { getChangedFields, useZodForm } from 'shext';
import { z } from 'zod';
import { ButtonSubmit } from '../ui/shuip/button.submit';
import InputField from '../ui/shuip/input.form-field';
import TextareaField from '../ui/shuip/textarea-field';

const titleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(50, 'Title must not exceed 50 characters'),
  content: z.string().min(1, 'Content must be at least 1 character').max(250, 'Content must not exceed 250 characters'),
});

type TitleSchema = z.infer<typeof titleSchema>;

interface DialogPostPublicationProps {
  data: BaseUser;
}

export default function DialogNewPublication({ data }: DialogPostPublicationProps) {
  const [open, setOpen] = useState(false);

  const { form, control, handleSubmit, formState } = useZodForm(titleSchema, data);

  const { mutate, isPending } = useNewPublication({
    invalidateQueries: [['publications']],
    onSuccess: (_res, _vars) => {
      form.reset();
      setOpen(false);
    },
  });

  const onSubmit = async (newPublication: TitleSchema) => {
    try {
      if (!formState.isDirty) return; // check if form has been changed
      const changedFields = getChangedFields(data, newPublication as any); // get changed fields
      if (Object.keys(changedFields).length === 0) return; // check if there are changes
      mutate({ ...newPublication, authorId: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>+ New Publication</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <DialogHeader>
              <DialogTitle>Post a publication</DialogTitle>
              <DialogDescription>Share your thoughts with the community</DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
              <InputField
                control={control}
                name='title'
                label='Title'
                placeholder='Enter your title'
                type='text'
                autoComplete='title'
              />
              <TextareaField
                control={control}
                name='content'
                label='Content'
                placeholder='Enter your content'
                autoComplete='content'
                rows={4}
                className='resize-none'
                description='Content must be at least 1 character and not exceed 250 characters'
              />
            </div>
            <DialogFooter className='mt-4'>
              <ButtonSubmit label='Post' disabled={!formState.isDirty} loading={isPending} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
