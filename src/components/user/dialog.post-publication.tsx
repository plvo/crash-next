// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";

// import { useState } from "react";
// import { $Enums, user } from "@prisma/client";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import useFormZod from "@/hooks/use-form-zod";
// import { Form } from "@/components/ui/form";
// import InputField from "@/components/global/form-fields/input.form-field";
// import ButtonSubmit from "@/components/global/form-fields/button.submit";
// import { useUser } from "@/hooks/use-user";
// import { getChangedFields } from "@/lib/form";

// const titleSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title must not exceed 50 characters"),
//   content: z
//     .string()
//     .min(1, "Content must be at least 1 character")
//     .max(250, "Content must not exceed 250 characters")
// });

// type TitleSchema = z.infer<typeof titleSchema>;

// export default function DialogPostPublication({ data }: { data: user }) {
//   const [open, setOpen] = useState(false);

//   const { form, control, handleSubmit, formState } = useFormZod(
//     titleSchema,
//     data
//   );

//   const { updateUser, isUpdating } = useUser(data.pseudo, true, true).mutation;

//   const onSubmit = async (newData: TitleSchema) => {
//     try {
//       if (!formState.isDirty) return; // check if form has been changed
//       const changedFields = getChangedFields(data, newData); // get changed fields
//       if (Object.keys(changedFields).length === 0) return; // check if there are changes

//       await updateUser(changedFields);
//       form.reset({ ...data, ...changedFields });
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Post</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <DialogHeader>
//               <DialogTitle>Post a publication</DialogTitle>
//               <DialogDescription>
//                 Share your thoughts with the community
//               </DialogDescription>
//             </DialogHeader>
//             <div className="flex flex-col gap-4">
//               <InputField
//                 control={control}
//                 name="title"
//                 label="Title"
//                 placeholder="Enter your title"
//                 type="text"
//                 autoComplete="title"
//               />
//             </div>
//             <DialogFooter className="mt-4">
//               <ButtonSubmit
//                 label="Post"
//                 disabled={!formState.isDirty}
//                 loading={isUpdating}
//               />
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
