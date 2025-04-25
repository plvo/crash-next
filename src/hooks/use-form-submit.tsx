import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { getChangedFields } from 'shext';

interface UseFormSubmitOptions<TData, TSubmit> {
  // The original data to compare against
  originalData: TData;
  // The function to call with the changed fields
  onSubmit: (changedFields: Partial<TSubmit>) => void | Promise<void>;
  // Optional error handler
  onError?: (error: unknown) => void;
}

/**
 * Hook for managing form submissions with change detection
 * @param options - Configuration options
 * @returns Submit handler that only submits changed fields
 * @example
 * ```tsx
 * const onSubmit = useFormSubmit({
 *   originalData: user,
 *   onSubmit: (changes) => updateUser(user.id, changes)
 * });
 * ```
 */
export function useFormSubmit<TData, TFormValues extends FieldValues, TSubmit = TFormValues>({
  originalData,
  onSubmit,
  onError,
}: UseFormSubmitOptions<TData, TSubmit>) {
  return async (formValues: TFormValues, formState: UseFormReturn<TFormValues>['formState']) => {
    try {
      // Check if form has been changed
      if (!formState.isDirty) return;

      // Get only the changed fields
      const changedFields = getChangedFields(originalData as any, formValues);
      if (Object.keys(changedFields).length === 0) return;

      await onSubmit(changedFields as Partial<TSubmit>);
    } catch (error) {
      console.error('Form submission error:', error);
      onError?.(error);
    }
  };
}
