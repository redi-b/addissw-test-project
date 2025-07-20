import { toast } from "sonner";

export const updateToastToSuccess = (
  message: string,
  toastId?: string | number
): void => {
  if (toastId)
    toast.success(message, {
      id: toastId,
    });
};

export const updateToastToError = (
  message: string,
  toastId?: string | number
): void => {
  if (toastId)
    toast.error(message, {
      id: toastId,
    });
};
