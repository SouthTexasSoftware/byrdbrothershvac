import { db } from '$lib/server/firebase-admin.server';
import type { BlogPost } from '$lib/stores.js';
import { error } from '@sveltejs/kit';

const pageSize = 6;

export async function load() {
  const snapshot = await db
    .collection('blogs')
    .where('status', '==', 'public')
    .orderBy('lastUpdated', 'desc')
    .limit(pageSize)
    .get();

  const blogs: BlogPost[] = snapshot.docs.map((doc) => ({
    ...doc.data() as BlogPost
  }));

  return {
    initialBlogs: blogs
  };
}