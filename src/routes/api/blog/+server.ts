// src/routes/api/blog/+server.ts
import admin from 'firebase-admin';
import { json, error } from '@sveltejs/kit';
import type { BlogPost } from '$lib/stores';

const db = admin.firestore();
const pageSize = 6;

export async function GET({ url }) {
  try {
    const lastUpdatedParam = url.searchParams.get('lastUpdated');

    let queryRef = db.collection('blogs')
      .orderBy('lastUpdated', 'desc') // newest first
      .limit(pageSize);

    // Apply cursor if provided
    if (lastUpdatedParam) {
      const lastUpdated = Number(lastUpdatedParam);
      if (isNaN(lastUpdated)) throw error(400, 'Invalid lastUpdated');

      // Start after the last post’s timestamp
      queryRef = queryRef.startAfter(lastUpdated);
    }

    const snapshot = await queryRef.get();

    const blogs: BlogPost[] = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        lastUpdated: Number(data.lastUpdated), // ensure it's a number
      };
    });

    return json({ blogs });
  } catch (err) {
    console.error('Blog API Error:', err);
    throw error(500, 'Failed to fetch blog posts');
  }
}
