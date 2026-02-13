import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/firebase-admin.server';
import type { BlogPost } from '$lib/stores';

export const load: LayoutServerLoad = async () => {
  const snapshot = await db
    .collection('blogs')
    .orderBy('lastUpdated', 'desc')
    .limit(4)
    .get();
  
  const latestBlogs: BlogPost[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
  
  return {
    latestBlogs
  };
};