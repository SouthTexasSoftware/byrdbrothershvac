<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { firebaseStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { addToast } from "$lib/stores/toastStore";
  import { marked } from "marked"; // For preview: npm i marked
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition"; // For modal animation
  import { browser } from "$app/environment";

  interface BlogPost {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string; // Markdown content
    author: string;
    category: string; // e.g., 'HVAC Tips', 'News', etc.
    tags: string[]; // Array of tags for SEO/search
    image?: string; // Main image URL
    seoKeywords?: string; // Comma-separated for meta tags
    status: "public" | "private";
    views: number;
    created: number; // Unix timestamp (seconds)
    lastUpdated: number; // Unix timestamp (seconds)
    publishDate?: number; // Optional scheduled publish timestamp
  }

  let blog: BlogPost = {
    id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    author: "", // Default to current user? Or input
    category: "",
    tags: [],
    image: "",
    seoKeywords: "",
    status: "private",
    views: 0,
    created: Math.floor(Date.now() / 1000),
    lastUpdated: Math.floor(Date.now() / 1000),
    publishDate: undefined,
  };

  let showPreview = false;
  let showMarkdownHelp = false; // For modal
  let tagsInput = ""; // Temp for comma-separated tags
  let loading = false;

  $: blogStatusBool = blog.status === "public" ? true : false;
  console.log("blog status=", blogStatusBool);

  let easyMDE: EasyMDE;
  let md_textarea: HTMLTextAreaElement;

  onMount(async () => {
    if (browser) {
      const EasyMDE = (await import("easymde")).default;
      easyMDE = new EasyMDE({
        element: md_textarea,
      });
    }
  });

  function generateSlug() {
    if (blog.title) {
      blog.slug = blog.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }
  }

  function updateTags() {
    blog.tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  }

  async function saveBlog() {
    loading = true;
    const fb = get(firebaseStore);
    if (fb && fb.db) {
      try {
        blog.lastUpdated = Math.floor(Date.now() / 1000);
        if (!blog.slug) generateSlug();
        await setDoc(doc(fb.db, "blogs", blog.slug), blog);
        addToast("Success", "Blog post saved!", "success");
        goto("/admin/blogs");
      } catch (err: any) {
        addToast("Error", err.message, "failure");
      }
    }
    loading = false;
  }

  function togglePreview() {
    showPreview = !showPreview;
  }

  function toggleMarkdownHelp() {
    showMarkdownHelp = !showMarkdownHelp;
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-3xl font-semibold mb-6 text-gray-800">Create Blog Post</h1>

  <!-- Metadata Section -->
  <section class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 class="text-2xl font-semibold mb-4 text-gray-700">Metadata</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          id="title"
          bind:value={blog.title}
          on:blur={generateSlug}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>
      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700"
          >Slug (Auto-generated)</label
        >
        <input
          id="slug"
          bind:value={blog.slug}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Short Summary (Description)</label
        >
        <textarea
          id="description"
          bind:value={blog.description}
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700"
          >Written By (Author)</label
        >
        <input
          id="author"
          bind:value={blog.author}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700"
          >Category</label
        >
        <select
          id="category"
          bind:value={blog.category}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Category</option>
          <option value="HVAC Tips">HVAC Tips</option>
          <option value="News">News</option>
          <option value="Maintenance">Maintenance</option>
          <!-- Add more as needed -->
        </select>
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Main Image URL</label
        >
        <input
          id="image"
          bind:value={blog.image}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags (comma-separated)</label
        >
        <input
          id="tags"
          bind:value={tagsInput}
          on:blur={updateTags}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          placeholder="tag1, tag2, tag3"
        />
      </div>
      <div>
        <label for="seoKeywords" class="block text-sm font-medium text-gray-700"
          >SEO Keywords (comma-separated)</label
        >
        <input
          id="seoKeywords"
          bind:value={blog.seoKeywords}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          placeholder="keyword1, keyword2"
        />
      </div>

      <div class="flex items-center">
        <label for="status" class="block text-sm font-medium text-gray-700 mr-4"
          >Status</label
        >
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            type="checkbox"
            id="status"
            bind:checked={blogStatusBool}
            on:change={() =>
              (blog.status = blog.status === "public" ? "private" : "public")}
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            for="status"
            class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <span>{blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}</span
        >
      </div>
      <!-- Analytics (views) - Read-only for create/edit -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Views</label>
        <p class="mt-1 text-gray-500">{blog.views}</p>
      </div>
    </div>
  </section>

  <!-- Content Editor Section -->
  <section class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-gray-700">Content Editor</h2>
    <div class="flex justify-between mb-4">
      <button
        on:click={toggleMarkdownHelp}
        class="text-orange-600 hover:text-orange-700">Markdown Help ?</button
      >
      <button
        on:click={togglePreview}
        class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >{showPreview ? "Hide Preview" : "Show Preview"}</button
      >
    </div>
    <textarea bind:this={md_textarea} bind:value={blog.content}></textarea>

    {#if showPreview}
      <div class="mt-6 border-t border-gray-200 pt-4">
        <h3 class="text-xl font-semibold mb-2 text-gray-700">Live Preview</h3>
        <div class="prose max-w-none">
          {@html marked(blog.content)}
        </div>
      </div>
    {/if}
  </section>

  <!-- Save Button -->
  <div class="mt-6 flex justify-end">
    <button
      on:click={saveBlog}
      disabled={loading}
      class="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save Post"}
    </button>
  </div>
</div>

<!-- Markdown Help Modal -->
{#if showMarkdownHelp}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    transition:fade={{ duration: 200 }}
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h3 class="text-lg font-bold mb-4">Markdown Quick Guide</h3>
      <ul class="space-y-2 text-sm text-gray-700">
        <li><strong># Heading 1</strong> - Largest heading</li>
        <li><strong>## Heading 2</strong> - Subheading</li>
        <li><strong>*Italic*</strong> or <strong>_Italic_</strong></li>
        <li><strong>**Bold**</strong> or <strong>__Bold__</strong></li>
        <li><strong>[Link](https://example.com)</strong> - Hyperlink</li>
        <li>
          <strong>![Image](https://example.com/image.jpg)</strong> - Embed image
        </li>
        <li><strong>- List item</strong> - Unordered list</li>
        <li><strong>1. Numbered item</strong> - Ordered list</li>
        <li><strong>```code block```</strong> - Code</li>
      </ul>
      <button
        on:click={toggleMarkdownHelp}
        class="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >Close</button
      >
    </div>
  </div>
{/if}

<style>
  /* Toggle switch styles (SHADCN-like) */
  .toggle-checkbox:checked + .toggle-label {
    background-color: #f97316; /* orange-600 */
  }
  .toggle-checkbox:checked {
    right: 0;
  }
  .toggle-label {
    background-color: #d1d5db; /* gray-300 */
  }
  .toggle-checkbox {
    right: 1.25rem;
  }
</style>
