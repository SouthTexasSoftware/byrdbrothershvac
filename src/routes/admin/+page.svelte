<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { firebaseStore, type BlogPost } from "$lib/stores";
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
  import BlogCard from "$lib/components/blog/BlogCard.svelte";
  import BlogCardSkeleton from "$lib/components/blog/BlogCardSkeleton.svelte";
  import RequestCard from "$lib/components/requests/RequestCard.svelte";
  import RequestCardSkeleton from "$lib/components/requests/RequestCardSkeleton.svelte";

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
      {#each Array(5) as _}
        <BlogCardSkeleton size="small" />
      {/each}
    {:else}
      {#each blogs as blog}
        <div class="mb-4">
          <a href={`/admin/blogs/${blog.slug}`}>
            <BlogCard blogData={blog} size="small" />
          </a>
        </div>
      {/each}
    {/if}
    <div class="flex justify-center">
      <a
        href="/admin/blogs"
        class="text-orange-600 hover:underline font-semibold"
        >See All Blog Posts</a
      >
    </div>
  </div>

  <!-- Requests Column -->
  <div class="w-full md:w-1/2">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">
      Recent Quote Requests
    </h2>
    {#if loadingRequests}
      {#each Array(5) as _}
        <RequestCardSkeleton />
      {/each}
    {:else}
      {#each requests as request}
        <a href={`/admin/requests/${request.id}`}>
          <RequestCard {request} />
        </a>
      {/each}
    {/if}
    <div class="flex justify-center">
      <a
        href="/admin/requests"
        class="text-orange-600 hover:underline font-semibold"
        >See All Requests</a
      >
    </div>
  </div>
</div>
