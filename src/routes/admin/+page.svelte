<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { firebaseStore } from "$lib/stores";
  import { addToast } from "$lib/stores/toastStore";
  import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
  } from "firebase/firestore";
  import type { Firestore } from "firebase/firestore"; // Import type
  import { goto } from "$app/navigation";

  interface BlogPost {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string; // Markdown content
    views: number;
    created: number; // Unix timestamp (seconds)
    lastUpdated: number; // Unix timestamp (seconds)
    status: "public" | "private";
    image?: string; // Optional for future photo
  }

  interface QuoteRequest {
    id: string;
    name: string;
    location: string;
    created: number; // Unix timestamp (seconds)
  }

  let blogs: BlogPost[] = [];
  let requests: QuoteRequest[] = [];
  let loadingBlogs = true;
  let loadingRequests = true;
  let unsubscribeStore: () => void;

  onMount(() => {
    unsubscribeStore = firebaseStore.subscribe((fb) => {
      if (fb && fb.db) {
        fetchData(fb.db);
        // Optionally unsubscribe after first fetch if no need for ongoing updates
        // unsubscribeStore();
      }
    });
  });

  async function fetchData(db: Firestore) {
    const startTime = performance.now();
    console.log("Starting data fetch with initialized db...");
    try {
      // Fetch blogs
      console.time("Blogs Query");
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("lastUpdated", "desc"),
        limit(5),
      );
      const blogsSnapshot = await getDocs(blogsQuery);
      blogs = blogsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as BlogPost,
      );
      console.timeEnd("Blogs Query");
      loadingBlogs = false;

      // Fetch requests
      console.time("Requests Query");
      const requestsQuery = query(
        collection(db, "quote-forms-2"),
        orderBy("created", "desc"),
        limit(5),
      );
      const requestsSnapshot = await getDocs(requestsQuery);
      requests = requestsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as QuoteRequest,
      );
      console.timeEnd("Requests Query");
      loadingRequests = false;
    } catch (err: any) {
      console.error("Data Fetch Error:", err.code, err.message, err.stack);
      addToast("Error", "Failed to load data. Please try again.", "failure");
    }
    const endTime = performance.now();
    console.log(
      `Data fetch completed in ${(endTime - startTime) / 1000} seconds.`,
    );
  }

  onDestroy(() => {
    if (unsubscribeStore) {
      unsubscribeStore();
    }
  });

  function navigateToBlog(slug: string) {
    goto(`/admin/blogs/${slug}`);
  }

  function navigateToRequest(id: string) {
    goto(`/admin/requests/${id}`); // Assuming a details route for requests
  }

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(); // Convert Unix seconds to date
  }
</script>

<div class="flex flex-col md:flex-row gap-6 p-6">
  <!-- Blogs Column -->
  <div class="w-full md:w-1/2">
    <div class="flex">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">
        Recent Blog Posts
      </h2>
      <a
        href="/admin/blogs/create"
        class="bg-orange-600 text-white px-2 py-1 h-min ml-auto rounded-md hover:bg-orange-700"
        >Create Blog Post</a
      >
    </div>

    {#if loadingBlogs}
      {#each Array(3) as _}
        <!-- Skeleton for 3 items -->
        <div class="bg-white p-4 rounded-lg shadow mb-4 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div class="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      {/each}
    {:else}
      {#each blogs as blog}
        <div
          class="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-md transition-shadow"
          on:click={() => navigateToBlog(blog.slug)}
        >
          <div class="flex items-center">
            {#if blog.image}
              <img
                src={blog.image}
                alt="Blog image"
                class="w-10 h-10 rounded-full mr-4"
              />
            {/if}
            <div>
              <h3 class="font-bold text-gray-900">{blog.title}</h3>
              <p class="text-sm text-gray-600">{blog.description}</p>
              <p class="text-xs text-gray-500">
                Views: {blog.views} | Last Updated: {formatTimestamp(
                  blog.lastUpdated,
                )}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Requests Column -->
  <div class="w-full md:w-1/2">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">
      Recent Quote Requests
    </h2>
    {#if loadingRequests}
      {#each Array(3) as _}
        <!-- Skeleton for 3 items -->
        <div class="bg-white p-4 rounded-lg shadow mb-4 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div class="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      {/each}
    {:else}
      {#each requests as request}
        <div
          class="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-md transition-shadow"
          on:click={() => navigateToRequest(request.id)}
        >
          <h3 class="font-bold text-gray-900">{request.name}</h3>
          <p class="text-sm text-gray-600">Location: {request.location}</p>
          <p class="text-xs text-gray-500">
            Created: {formatTimestamp(request.created)}
          </p>
        </div>
      {/each}
    {/if}
  </div>
</div>
