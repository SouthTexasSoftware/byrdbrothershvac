<script lang="ts">
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";
  import { parseMarkdown, type BlogBlock } from "$lib/markdown/parser";
  import type { BlogPost } from "$lib/stores";
  import ArticleTitleBar from "../layout/ArticleTitleBar.svelte";
  import RequestAQuote from "../forms/RequestAQuote.svelte";
  // NEW: Import page store to detect route
  import { page } from "$app/stores";
  // NEW: Client-side only imports for view increment
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { firebaseStore } from "$lib/stores";
  import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

  export let blogPost: BlogPost;
  export let embeddedPost: boolean = false;

  let isMobile = false;
  $: isMobile = windowWidth < 768;
  let windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  let blocks: BlogBlock[] = [];
  $: if (blogPost) {
    blocks = parseMarkdown(blogPost.content);
  }

  // Reorder blocks for mobile
  function reorderForMobile(blocks: BlogBlock[]) {
    const reordered = [...blocks];
    let i = 0;
    while (i < reordered.length - 1) {
      const current = reordered[i];
      const next = reordered[i + 1];
      // If current is second consecutive image and next is a section, swap them
      if (
        current.type === "image" &&
        current.isSecondConsecutive &&
        next?.type === "section"
      ) {
        // Swap
        reordered[i] = next;
        reordered[i + 1] = current;
        // Skip the next index since we just swapped
        i += 2;
      } else {
        i++;
      }
    }
    return reordered;
  }

  let displayBlocks: BlogBlock[] = [];
  $: {
    displayBlocks = isMobile ? reorderForMobile(blocks) : blocks;
    console.log(displayBlocks);
  }

  // Increment views client-side, once per session, only for public full posts
  onMount(() => {
    if (
      !browser ||
      !blogPost.id ||
      blogPost.status !== "public" ||
      $page.url.pathname.startsWith("/admin") ||
      embeddedPost
    ) {
      return;
    }

    const viewedKey = `blog_viewed_${blogPost.id}`;
    if (sessionStorage.getItem(viewedKey)) {
      return;
    }

    let hasIncremented = false; // Prevent double-increment

    const unsub = firebaseStore.subscribe((fb) => {
      // Only run once when Firebase is ready
      if (!fb?.db || hasIncremented) {
        return;
      }

      hasIncremented = true;
      const postRef = doc(fb.db, "blogs", blogPost.id);

      updateDoc(postRef, { views: increment(1) })
        .then(() => {
          sessionStorage.setItem(viewedKey, "true");
        })
        .catch((err) => {
          console.error("Failed to increment view count:", err);
          hasIncremented = false; // Allow retry on next mount if it failed
        });
    });

    // Cleanup on component destroy
    return () => unsub();
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if $page.url.pathname.startsWith("/admin") || blogPost.status === "public"}
  <!-- Normal full post rendering (unchanged) -->
  <ArticleTitleBar
    title={blogPost.title}
    machineDate={new Date(blogPost.lastUpdated * 1000).toISOString()}
    date={new Date(blogPost.lastUpdated * 1000).toLocaleDateString()}
    articleOwner={blogPost.author}
  />

  {#if displayBlocks.length === 0}
    <div class="opacity-50 italic p-4">Start writing to see a preview…</div>
  {:else}
    <div class="mt-8 flex flex-wrap gap-y-12">
      {#each displayBlocks as block}
        {#if block.type === "section"}
          <SectionContainer
            bannerContent={block.title}
            bannerScreenSide={block.position}
          >
            <div class="section-content px-4 text-lg">
              {@html block.content}
            </div>
          </SectionContainer>
        {:else if block.type === "image"}
          <!-- Handle image links and normal images -->
          {#if block.link}
            <a href={block.link} target="_blank">
              <PhotoSingleBlock
                photoSrc={block.src}
                photoCaption={block.caption}
                backgroundSide={block.position}
              />
            </a>
          {:else}
            <PhotoSingleBlock
              photoSrc={block.src}
              photoCaption={block.caption}
              backgroundSide={block.position}
            />
          {/if}
        {:else if block.type === "sectionBreak"}
          <SectionBreak />
        {/if}
      {/each}
    </div>

    {#if blogPost.includeQuote && !embeddedPost}
      <div class="mt-12 max-w-xl mx-auto">
        <SectionContainer
          bannerContent="GET A QUOTE!"
          bannerScreenSide="left"
          bannerDescription="Free estimates for any size job."
        >
          <RequestAQuote />
        </SectionContainer>
      </div>
    {/if}
  {/if}
{:else}
  <!-- Unavailable message for public routes only -->
  <div class="py-32 px-6 text-center">
    <h1 class="text-4xl md:text-4xl font-bold mb-12 leading-tight">
      Uh Oh - This post is unavailable right now
    </h1>
  </div>
{/if}

<!-- STYLING FOR @html rendered content -->
<style>
  .section-content :global(strong) {
    font-family: font-semibold;
    font-size: 1.15rem;
    line-height: 1.5;
  }
  .section-content :global(em) {
    font-style: italic;
    color: #4a4a4a;
  }
  .section-content :global(ul) {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  .section-content :global(li) {
    margin-bottom: 0.5rem;
    font-size: 1.15rem;
    line-height: 1.5;
  }
  .section-content :global(li::marker) {
    color: var(--banner-primary);
  }
  .section-content :global(p) {
    margin-bottom: 1.125rem;
    font-size: 1.15rem;
    line-height: 1.5;
  }
  .section-content :global(a) {
    color: var(--banner-primary);
    font-size: 1.15rem;
    text-decoration: underline;
  }
  .section-content :global(a:hover) {
    color: #0052a3;
  }
</style>
