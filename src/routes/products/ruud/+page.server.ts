import { db } from '$lib/server/firebase-admin.server';
import type { BlogPost } from '$lib/stores.js';
import { error } from '@sveltejs/kit';

export async function load() {
  const snapshot = await db.collection('blogs')
    .where('slug', '==', 'ruud')
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw error(404, 'Page not found');
  }

  const doc = snapshot.docs[0];
  const post = doc.data() as BlogPost;

  return {
    blogPost: {
      ...post
    }
  };
}