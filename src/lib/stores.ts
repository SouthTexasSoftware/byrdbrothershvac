import type { FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { Firestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import { writable } from "svelte/store";

export const firebaseStore = writable<FirebaseStore>(undefined);

export interface FirebaseStore {
  app: FirebaseApp;

  db: Firestore;
  auth: Auth;

  analytics?: Analytics;
}

// empty store - that will be used in the future for things like banners , form deactivation , etc.
export const globalStore = writable<{ [key: string]: any }>(undefined);


export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string; // Markdown content
    author: string;
    
    tags: string[]; // Array of tags for SEO/search
    image?: string; // Main image URL
    status: "public" | "private";
    views: number;
    created: number; // Unix timestamp (seconds)
    lastUpdated: number; // Unix timestamp (seconds)
    includeQuote: boolean;
    
  }

export const blogBuilderStore = writable<BlogPost>({
    id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    author: "",
    
    tags: [],
    image: "",
    status: "private",
    views: 0,
    created: Math.floor(Date.now() / 1000),
    lastUpdated: Math.floor(Date.now() / 1000),
    includeQuote: false
  });