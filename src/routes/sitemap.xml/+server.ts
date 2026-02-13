import { db } from '$lib/server/firebase-admin.server';
import type { BlogPost } from '$lib/stores';

const url = "https://www.byrdbrothershvac.com";

// Static routes with their last modified dates
const staticRoutes = [
  { path: '/', lastmod: '2023-10-22', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', lastmod: '2024-02-07', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/air_conditioning', lastmod: '2023-10-22', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['emergency-hvac', 'air-conditioning-installation', 'air-conditioning-maintenance', 'air-conditioning-repair'] },
  { path: '/services/air_conditioning/emergency', lastmod: '2023-10-16', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['emergency-hvac'] },
  { path: '/services/air_conditioning/installation', lastmod: '2023-10-16', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-installation'] },
  { path: '/services/air_conditioning/maintenance', lastmod: '2023-10-18', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-maintenance'] },
  { path: '/services/air_conditioning/repair', lastmod: '2023-10-18', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-repair'] },
  { path: '/services/air_quality', lastmod: '2023-10-22', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['air-quality'] },
  { path: '/services/heating', lastmod: '2023-10-22', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['heating'] },
  { path: '/services/insulation', lastmod: '2023-10-22', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['insulation'] },
  { path: '/services/maintenance_program', lastmod: '2024-02-07', priority: '0.8', changefreq: 'monthly', embeddedSlugs: ['hvac-maintenance-program'] },
  { path: '/contact', lastmod: '2023-10-22', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/front_desk', lastmod: '2023-10-22', priority: '0.6', changefreq: 'monthly', embeddedSlugs: ['front-desk'] },
  { path: '/contact/quote_form', lastmod: '2023-10-22', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', lastmod: '2023-10-22', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/meet_team', lastmod: '2023-10-22', priority: '0.6', changefreq: 'monthly', embeddedSlugs: ['meet-the-team']  },
  { path: '/about/service_area', lastmod: '2023-10-22', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/service_area/sweeny', lastmod: '2024-02-07', priority: '0.6', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-installation']},
  { path: '/about/service_area/brazoria', lastmod: '2024-02-07', priority: '0.6', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-installation'] },
  { path: '/about/service_area/lake_jackson', lastmod: '2024-02-07', priority: '0.6', changefreq: 'monthly', embeddedSlugs: ['air-conditioning-installation'] },
  { path: '/about/partners', lastmod: '2024-02-07', priority: '0.6', changefreq: 'monthly' , embeddedSlugs: ['our-partners']},
  { path: '/products', lastmod: '2024-02-07', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/ruud', lastmod: '2024-02-07', priority: '0.7', changefreq: 'monthly', embeddedSlugs: ['ruud'] },
  { path: '/products/mrcool', lastmod: '2024-02-07', priority: '0.7', changefreq: 'monthly', embeddedSlugs: ['mrcool-'] },
  { path: '/products/generac', lastmod: '2024-02-07', priority: '0.7', changefreq: 'monthly' , embeddedSlugs: ['generac-home-generators']},
  { path: '/products/attic_tent', lastmod: '2024-02-07', priority: '0.7', changefreq: 'monthly' , embeddedSlugs: ['attic-door-tents']},
  { path: '/products/air_scrubber', lastmod: '2024-02-07', priority: '0.7', changefreq: 'monthly', embeddedSlugs: ['air-scrubber-by-aerus'] },
  { path: '/blog', lastmod: '2024-02-07', priority: '0.9', changefreq: 'daily' },
];

function formatDate(timestamp: any): string {
  if (!timestamp) return new Date().toISOString().split('T')[0];

  // Handle Firestore Timestamp object
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toISOString().split('T')[0];
  }

  // Handle native Date object
  if (timestamp instanceof Date) {
    return timestamp.toISOString().split('T')[0];
  }

  // Handle numeric Unix timestamp (seconds) – this is your main case
  if (typeof timestamp === 'number') {
    return new Date(timestamp * 1000).toISOString().split('T')[0];
  }

  // Fallback for strings or anything else (e.g., ISO string)
  try {
    return new Date(timestamp).toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

export async function GET() {
  try {
    // Fetch all published blog posts from Firestore
    const snapshot = await db
      .collection('blogs')
      .where('status', '==', "public")
      .orderBy('lastUpdated', 'desc')
      .get();

    const blogPosts: BlogPost[] = snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as BlogPost[];

    // Build lookup map: slug (or id if no slug) → formatted lastmod date
    const blogLastmodMap = new Map<string, string>();
    blogPosts.forEach((blog) => {
      const key = blog.slug || blog.id;
      blogLastmodMap.set(key, formatDate(blog.lastUpdated));
    });

    // Build static URLs with dynamic lastmod where applicable
    const staticUrls = staticRoutes.map((route) => {
      let lastmod = route.lastmod; // default fallback

      // Special case for the blog list page – use the most recent post's date
      if (route.path === '/blog' && blogPosts.length > 0) {
        const latestKey = blogPosts[0].slug || blogPosts[0].id;
        const latest = blogLastmodMap.get(latestKey);
        if (latest) lastmod = latest;
      }
      // General case for pages that embed specific post(s)
      else if (route.embeddedSlugs && route.embeddedSlugs.length > 0) {
        const candidateDates = route.embeddedSlugs
          .map((slug) => blogLastmodMap.get(slug))
          .filter((d): d is string => d !== undefined);

        if (candidateDates.length > 0) {
          // String comparison works for YYYY-MM-DD format
          lastmod = candidateDates.sort((a, b) => b.localeCompare(a))[0];
        }
      }

      return `
    <url>
        <loc>${url}${route.path}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`;
    }).join('');

    const blogUrls = blogPosts.map(blog => `
    <url>
        <loc>${url}/blog/${blog.slug || blog.id}</loc>
        <lastmod>${formatDate(blog.lastUpdated)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>${staticUrls}${blogUrls}
</urlset>`;

    return new Response(xml.trim(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600, s-maxage=3600' // Cache for 1 hour
      }
    });
  }  catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to static sitemap if there's an error
    const staticUrls = staticRoutes.map(route => `
    <url>
        <loc>${url}${route.path}</loc>
        <lastmod>${route.lastmod}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}
</urlset>`;

    return new Response(xml.trim(), {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
}