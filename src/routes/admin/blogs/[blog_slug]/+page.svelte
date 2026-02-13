<!-- src/routes/admin/blogs/[blog_slug]/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { get } from "svelte/store";
  import { firebaseStore, blogBuilderStore, type BlogPost } from "$lib/stores";
  import {
    collection,
    doc,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
  } from "firebase/firestore";
  import { addToast } from "$lib/stores/toastStore";
  import { page } from "$app/stores"; // For slug
  import BlogDataBuilder from "./BlogDataBuilder.svelte";
  import BlogCardBuilder from "./BlogCardBuilder.svelte";
  import BlogContentBuilder from "./BlogContentBuilder.svelte";
  import BlogSaveComponent from "./BlogSave.svelte";
  import { goto } from "$app/navigation";
  import BlogSave from "./BlogSave.svelte";
  import { fade } from "svelte/transition";
  import BlogBuilderSkeleton from "./BlogBuilderSkeleton.svelte";

  const slug = $page.params.blog_slug;
  let isCreate = slug === "create";

  let loading = true;

  onMount(async () => {
    const fb = get(firebaseStore);
    if (fb && fb.db && !isCreate) {
      try {
        const blogDocs = await getDocs(collection(fb.db, "blogs"));
        let blogDoc: QueryDocumentSnapshot | null = null;
        blogDocs.forEach((doc) => {
          if (doc.data().slug === slug) {
            blogDoc = doc;
          }
        });
        if (blogDoc !== null) {
          //@ts-ignore
          blogBuilderStore.set(blogDoc.data() as BlogPost);
        } else {
          addToast("Error", "Blog post not found.", "failure");
          goto("/admin");
        }
      } catch (err: any) {
        addToast("Error", err.message, "failure");
        goto("/admin");
      }
    } else {
      // reset store for a new blog
      blogBuilderStore.set({
        id: "",
        title: "",
        slug: "",
        description: "",
        content: "",
        author: "",
        tags: [],
        image: "",
        status: "private",
        views: 0,
        created: 0,
        lastUpdated: 0,
        includeQuote: false,
      });
    }
    loading = false;
  });

  function handleVisibilityChange(event: Event) {
    const target = event.target as HTMLInputElement;
    blogBuilderStore.update((blog) => ({
      ...blog,
      status: target.checked ? "public" : "private",
    }));
  }

  function handleCreateSave() {
    isCreate = false;
  }
</script>

{#if loading}
  <BlogBuilderSkeleton />
{:else}
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex md:flex-row flex-col items-center mb-0">
      <h1 class="text-3xl font-semibold text-gray-800">
        {isCreate ? "Create Blog Post" : "Edit Blog Post"}
      </h1>
      <div class="flex items-center space-x-4 ml-6">
        <label class="cursor-pointer label">
          <span class="label-text mr-2">Private</span>
          <input
            type="checkbox"
            checked={$blogBuilderStore.status === "public"}
            on:change={handleVisibilityChange}
            class="toggle toggle-primary"
          />
          <span class="label-text ml-2">Public (Publish)</span>
        </label>
      </div>
      <div class="md:ml-auto">
        <BlogSaveComponent on:create={handleCreateSave} />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-12" in:fade>
      <BlogDataBuilder />
      {#if isCreate}
        <p class="w-full text-center text-gray-500">
          Please save the draft blog data to continue.
        </p>
      {:else}
        <BlogCardBuilder />
        <BlogContentBuilder />
        <BlogSaveComponent />
      {/if}
    </div>
  </div>
{/if}
