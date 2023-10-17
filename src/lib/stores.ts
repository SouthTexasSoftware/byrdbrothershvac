import type { FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";
import { writable } from "svelte/store";

export const firebaseStore = writable<FirebaseStore>(undefined);

export interface FirebaseStore {
  app: FirebaseApp;

  db: Firestore;

  analytics?: Analytics;
}

// empty store - that will be used in the future for things like banners , form deactivation , etc.
export const globalStore = writable<{ [key: string]: any }>(undefined);
