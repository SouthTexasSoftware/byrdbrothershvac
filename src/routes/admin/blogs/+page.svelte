<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { firebaseStore, type BlogPost } from "$lib/stores";
  import { addToast } from "$lib/stores/toastStore";
  import { collection, getDocs, query, orderBy } from "firebase/firestore";
  import type { Firestore } from "firebase/firestore";
  import { goto } from "$app/navigation";
  import BlogCard from "$lib/components/blog/BlogCard.svelte";
  import BlogCardSkeleton from "$lib/components/blog/BlogCardSkeleton.svelte";

  let blogs: BlogPost[] = [];
  let loading = true;
  let unsubscribeStore: () => void;

  onMount(() => {
    unsubscribeStore = firebaseStore.subscribe((fb) => {
      if (fb && fb.db) {
        fetchData(fb.db);
      }
    });
  });

  async function fetchData(db: Firestore) {
    const startTime = performance.now();
    console.log("Starting data fetch with initialized db...");
    try {
      console.time("Blogs Query");
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("lastUpdated", "desc"),
      );
      const blogsSnapshot = await getDocs(blogsQuery);
      blogs = blogsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as BlogPost,
      );
      console.timeEnd("Blogs Query");
      loading = false;
    } catch (err: any) {
      console.error("Data Fetch Error:", err.code, err.message, err.stack);
      addToast("Error", "Failed to load blogs. Please try again.", "failure");
      loading = false;
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
</script>

<div class="p-6 max-w-7xl mx-auto">
  <div class="flex items-center mb-8">
    <h1 class="text-3xl font-bold text-gray-800">All Blog Posts</h1>
    <a
      href="/admin/blogs/create"
      class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 ml-auto"
      >Create Blog Post</a
    >
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each Array(8) as _}
        <BlogCardSkeleton size="small" />
      {/each}
    </div>
  {:else if blogs.length === 0}
    <div class="text-center py-20">
      <p class="text-xl text-gray-600 mb-8">No blog posts yet.</p>
      <a
        href="/admin/blogs/create"
        class="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 text-lg"
        >Create Your First Blog Post</a
      >
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each blogs as blog}
        <a href={`/admin/blogs/${blog.slug}`} class="block">
          <BlogCard blogData={blog} size="small" />
        </a>
      {/each}
    </div>
  {/if}
</div>
