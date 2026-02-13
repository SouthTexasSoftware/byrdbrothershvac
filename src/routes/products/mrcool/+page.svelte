<script lang="ts">
  import type { PageData } from "./$types";
  import type { BlogPost } from "$lib/stores";
  import BlogPostComponent from "$lib/components/blog/BlogPostComponent.svelte";
  import BlogSkeletonComponent from "$lib/components/blog/BlogSkeletonComponent.svelte";
  export let data: PageData;
  let blog: BlogPost = data.blogPost;
</script>

<svelte:head>
  <title>MRCOOL Minisplits | Byrd Brothers HVAC</title>
  {#if blog.description}
    <meta name="description" content={blog.description} />
  {/if}
  {#if blog.image}
    <meta property="og:image" content={blog.image} />
  {/if}
</svelte:head>
<div class="content-width max-w-2xl">
  {#if blog}
    <BlogPostComponent blogPost={blog} embeddedPost={false} />
  {:else}
    <div class="md:w-[1200px] mt-6">
      <BlogSkeletonComponent />
    </div>
  {/if}
</div>

<style>
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
  }
</style>
