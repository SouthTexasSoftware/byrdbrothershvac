import { writable } from "svelte/store";

interface Toast {
  id: number;
  title: string;
  description: string;
  type: "success" | "warning" | "failure";
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
