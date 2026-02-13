<script lang="ts">
  import type { PageData } from "./$types";
  import type { BlogPost } from "$lib/stores";
  import BlogPostComponent from "$lib/components/blog/BlogPostComponent.svelte";
  import { goto } from "$app/navigation";
  import BlogSkeletonComponent from "$lib/components/blog/BlogSkeletonComponent.svelte";
  export let data: PageData;
  let blog: BlogPost = data.blogPost;
</script>

<svelte:head>
  {#if blog}
    <title>Blog Post - {blog.title}</title>
    {#if blog.description}
      <meta name="description" content={blog.description} />
    {/if}
    {#if blog.image}
      <meta property="og:image" content={blog.image} />
    {/if}
  {:else}
    <title>Blog Post - Our Blog</title>
  {/if}
</svelte:head>

<div class="min-h-screen">
  <div class="flex justify-center py-4">
    <a
      href="/blog"
      class="font-semibold underline decoration-[var(--banner-primary)]"
      >Back to all Blog Posts</a
    >
  </div>
  <div class="content-width max-w-2xl">
    {#if !blog}
      <div class="text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Post Not Found</h1>
        <p class="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find that blog post.
        </p>
        <button class="btn btn-primary" on:click={() => goto("/blog")}>
          Back to Blog
        </button>
      </div>
    {:else}
      <BlogPostComponent blogPost={blog} embeddedPost={false} />
    {/if}
  </div>
</div>
