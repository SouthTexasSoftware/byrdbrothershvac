import { writable } from "svelte/store";

interface Toast {
  id: number;
  title: string;
  description: string;
  type: "success" | "warning" | "failure" | "processing";
}

let nextId = 0;

export const toasts = writable<Toast[]>([]);

export function addToast(
  title: string,
  description: string,
  type: Toast["type"] = "success",
) {
  const id = nextId++;
  const newToast: Toast = { id, title, description, type };

  toasts.update((current) => [...current, newToast]);

  setTimeout(() => {
    toasts.update((current) => current.filter((t) => t.id !== id));
  }, 4000); // Auto-remove after 4 seconds
}

/**
 * Adds a processing toast with a loader and returns a completer function.
 * @param message The message to display in the processing toast.
 * @returns A function to complete the processing: complete(success: boolean, successMessage?: string, failureMessage?: string)
 */
export function addProcessingToast(message: string): (success: boolean, successMessage?: string, failureMessage?: string) => void {
  const id = nextId++;
  const processingToast: Toast = { id, title: 'Processing', description: message, type: 'processing' };

  toasts.update((current) => [...current, processingToast]);

  // No auto-remove for processing toasts; they stay until completed

  return (success: boolean, successMessage: string = 'Operation successful!', failureMessage: string = 'Operation failed.') => {
    // Remove the processing toast
    toasts.update((current) => current.filter((t) => t.id !== id));

    // Add result toast
    if (success) {
      addToast('Success', successMessage, 'success');
    } else {
      addToast('Error', failureMessage, 'failure');
    }
  };
}