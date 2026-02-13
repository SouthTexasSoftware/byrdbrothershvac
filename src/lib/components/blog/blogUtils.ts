// src/lib/utils/blogUtils.ts  (updated version)

import { get } from 'svelte/store'; // NEW: Import Svelte's get() utility
import { firebaseStore } from '$lib/stores';
import type { BlogPost } from '$lib/stores';
import { collection, query, where, getDocs, limit, Firestore } from 'firebase/firestore';

/**
 * Waits for the Firebase Firestore instance to be available in firebaseStore.
 * Fixed TDZ issue with unsubscribe by checking synchronously first.
 */
async function getFirestoreDb(): Promise<Firestore> {
  // First: Check if it's already available synchronously
  const current = get(firebaseStore);
  if (current?.db) {
    return current.db;
  }

  // If not, subscribe and wait for it to become available
  return new Promise((resolve) => {
    const unsubscribe = firebaseStore.subscribe((store) => {
      if (store?.db) {
        unsubscribe();
        resolve(store.db);
      }
    });
  });
}

/**
 * Fetch a single blog post by slug.
 * Returns null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;

  const db = await getFirestoreDb();
  const q = query(
    collection(db, 'blogs'),
    where('slug', '==', slug),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data() as BlogPost;
}

/**
 * Fetch multiple blog posts by an array of slugs.
 * Returns results in the same order as the input array.
 * Missing posts will be null.
 */
export async function getBlogPostsBySlugs(slugs: string[]): Promise<(BlogPost | null)[]> {
  if (!slugs || slugs.length === 0) return [];

  const db = await getFirestoreDb();

  // Optimize for small arrays (<=10) using Firestore 'in' operator
  if (slugs.length <= 10) {
    const q = query(
      collection(db, 'blogs'),
      where('slug', 'in', slugs)
    );
    const snapshot = await getDocs(q);

    const foundMap = new Map<string, BlogPost>();
    snapshot.forEach((doc) => {
      const data = doc.data() as BlogPost;
      foundMap.set(data.slug, data);
    });

    return slugs.map((s) => foundMap.get(s) ?? null);
  } else {
    // Fallback: individual queries (still fast for reasonable numbers)
    const promises = slugs.map((slug) =>
      getBlogPostBySlug(slug) // reuses the single-slug logic
    );
    return await Promise.all(promises);
  }
}