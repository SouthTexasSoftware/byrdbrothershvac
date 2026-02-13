<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import type { BlogPost } from "$lib/stores";
  import { addToast } from "$lib/stores/toastStore";
  import BlogCard from "$lib/components/blog/BlogCard.svelte";
  import BlogCardSkeleton from "$lib/components/blog/BlogCardSkeleton.svelte";
  import { fade } from "svelte/transition";

  export let data: PageData;

  // ✅ Initial SSR data
  let blogs: BlogPost[] = data.initialBlogs ?? [];

  let loading = false; // first page already loaded
  let loadingMore = false;
  let hasMore = blogs.length >= 6;
  let sentinel: HTMLDivElement;
  let observer: IntersectionObserver;

  // Responsive card size
  let width = 0;
  $: cardSize = width < 768 ? "small" : width < 1280 ? "medium" : "large";

  // Tag filtering
  let selectedTags: string[] = [];
  let allTags: string[] = [];

  //Tag map
  $: if (!loading && blogs.length > 0 && allTags.length === 0) {
    // Initialize tags only once after first load
    allTags = [...new Set(blogs.flatMap((b) => b.tags ?? []))].sort();
  }

  $: if (!loading && !loadingMore && blogs.length > 0) {
    // Merge new tags without destroying the previous ones
    const newTags = blogs.flatMap((b) => b.tags ?? []);
    allTags = [...new Set([...allTags, ...newTags])].sort();
  }

  $: filteredBlogs =
    selectedTags.length === 0
      ? blogs
      : blogs.filter((b) => b.tags?.some((t) => selectedTags.includes(t)));

  const pageSize = 6;
  const skeletonCount = 12;

  // ✅ Infinite scroll loader
  async function loadBlogs() {
    if (loadingMore || !hasMore) return;

    loadingMore = true;

    try {
      const last = blogs[blogs.length - 1];

      const res = await fetch(
        `/api/blog?lastUpdated=${last?.lastUpdated ?? ""}`,
      );

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const result = await res.json();
      const newBlogs: BlogPost[] = result.blogs ?? [];

      if (newBlogs.length < pageSize) {
        hasMore = false;
      }

      blogs = [...blogs, ...newBlogs];
    } catch (err) {
      console.error("Blog pagination error:", err);
      addToast("Error", "Failed to load more blog posts.", "failure");
    } finally {
      loadingMore = false;
    }
  }

  onMount(() => {
    const handleResize = () => (width = window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    // IntersectionObserver
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadBlogs();
        }
      },
      { rootMargin: "400px" },
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      observer?.disconnect();
    };
  });

  // ✅ Observe sentinel when ready
  $: if (sentinel && observer) observer.observe(sentinel);

  // Asset loader
  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod?.default || "";
  };

  const heroBg = getAssetSrc("byrdbrothersbg.jpg");
</script>

<svelte:head>
  <title>Our Blog</title>

  <meta
    name="description"
    content="Insights, updates, and stories from our team."
  />

  <meta property="og:image" content={heroBg} />
</svelte:head>

<!-- Hero with background photo -->
<div
  class="hero min-h-[30vh] h-[15vh] md:h-[40vh] bg-cover bg-center bg-no-repeat"
  style="background-image: url({heroBg});"
>
  <div class="hero-overlay"></div>
  <div class="hero-content text-center text-neutral-content md:py-20">
    <div class="max-w-4xl">
      <h1 class="text-5xl font-bold mb-4 text-white">Our Blog</h1>
      <p class="text-xl text-white">
        Insights, updates, and stories from our team.
      </p>
    </div>
  </div>
</div>

<div class="p-6 max-w-8xl mx-auto">
  <!-- Loading state -->
  {#if loading}
    <div class="flex flex-wrap gap-3 justify-center mb-8">
      {#each Array(4) as _}
        <div class="skeleton h-6 rounded-xl w-12 ml-4"></div>
      {/each}
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-8"
    >
      {#each Array(skeletonCount) as _, i}
        <BlogCardSkeleton size={cardSize} />
      {/each}
    </div>
  {:else if filteredBlogs.length === 0}
    <div class="text-center py-20">
      {#if selectedTags.length > 0}
        <p class="text-2xl text-gray-600">
          No blog posts match the selected tags.
        </p>
      {:else}
        <p class="text-2xl text-gray-600">
          No blog posts yet. Check back soon!
        </p>
      {/if}
    </div>
  {:else}
    <!-- Blog grid -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-8"
    >
      {#each filteredBlogs as blog (blog.id)}
        <a
          href={`/blog/${blog.slug}`}
          class="block rounded-xl hover:shadow-xl h-fit w-fit transition-shadow duration-200"
        >
          <BlogCard blogData={blog} size={cardSize} />
        </a>
      {/each}

      <!-- Skeletons while loading more -->
      {#if loadingMore}
        {#each Array(pageSize) as _, i}
          <BlogCardSkeleton size={cardSize} />
        {/each}
      {/if}
    </div>

    <!-- Pagination / sentinel -->
    <div class="flex justify-center py-12">
      {#if loadingMore}
        <span class="loading loading-spinner loading-lg"></span>
      {:else if !hasMore && filteredBlogs.length > pageSize}
        <p class="text-gray-500 text-lg">That's all for now!</p>
      {/if}
      <div bind:this={sentinel} class="h-px"></div>
    </div>
  {/if}
</div>
