import { db } from '$lib/server/firebase-admin.server';
import type { BlogPost } from '$lib/stores.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const snapshot = await db
    .collection('blogs')
    .where('slug', '==', params.slug)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw error(404, 'Post not found');
  }

  const doc = snapshot.docs[0];
  const post = doc.data() as BlogPost;

  return {
    blogPost: {
      ...post
    }
  };
}
