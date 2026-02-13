<!-- BlogSave.svelte -->
<script lang="ts">
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import { addProcessingToast, addToast } from "$lib/stores/toastStore";
  import { firebaseStore, blogBuilderStore, type BlogPost } from "$lib/stores";
  import { collection, setDoc, doc } from "firebase/firestore";
  import { createEventDispatcher } from "svelte";
  import type { FirebaseApp } from "firebase/app";
  import { deleteObject, getStorage, listAll, ref } from "firebase/storage";
  import { dev } from "$app/environment";

  let dispatch = createEventDispatcher();

  let saving = false;

  const emptyBlog: BlogPost = {
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
  };

  function generateSlug(title: string): string {
    if (title) {
      return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }
    return "";
  }

  async function saveBlog() {
    if (saving) return;
    saving = true;
    let blog = $blogBuilderStore;
    if (!blog.title) {
      addToast("Error", "Title is required.", "failure");
      saving = false;
      return;
    }
    if (!blog.slug) {
      blog.slug = generateSlug(blog.title);
    }
    const now = Math.floor(Date.now() / 1000);
    blog.lastUpdated = now;
    if (!blog.created) {
      blog.created = now;
    }
    const fb = get(firebaseStore);
    if (fb && fb.db) {
      try {
        let docRef;
        if (!blog.id) {
          // Create new: Generate ID client-side
          docRef = doc(collection(fb.db, "blogs"));
          blog.id = docRef.id;
          await setDoc(docRef, blog);
          blogBuilderStore.set(blog);
          dispatch("create", blog);
          goto(`/admin/blogs/${blog.slug}`);
        } else {
          // Update existing
          docRef = doc(fb.db, "blogs", blog.id);
          await setDoc(docRef, blog);
        }
        addToast("Success", "Blog post saved!", "success");

        // NEW: Ping Google and Bing if the post is public
        if (blog.status === "public" && !dev) {
          const sitemapUrl = `${location.origin}/sitemap.xml`; // Dynamically uses current domain

          // Ping Google
          fetch(
            `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
          )
            .then(() => console.log("Google sitemap ping sent"))
            .catch((err) => console.error("Google ping failed:", err));

          // Ping Bing
          fetch(
            `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
          )
            .then(() => console.log("Bing sitemap ping sent"))
            .catch((err) => console.error("Bing ping failed:", err));
        }

        // Existing image purge code continues here...
        if (blog.id && fb.app) {
          const completer = addProcessingToast("Cleaning up unused images...");
          purgeUnusedImages(blog.id, blog.content, fb.app)
            .then((deleted) => {
              let message =
                deleted > 0
                  ? `Removed ${deleted} unused image${deleted > 1 ? "s" : ""}.`
                  : "No unused images found.";
              completer(true, message);
            })
            .catch(() => {
              completer(
                false,
                undefined,
                "Failed to clean up unused images. Check console for details.",
              );
            });
        }
      } catch (err: any) {
        console.error(err);
        addToast(
          "Error",
          err.message || "Failed to save blog post.",
          "failure",
        );
      }
    }
    saving = false;
  }

  // Updated helper function to return the number of successfully deleted images
  // Updated helper function with improved regex and same toast integration
  async function purgeUnusedImages(
    blogId: string,
    content: string,
    app: FirebaseApp,
  ): Promise<number> {
    try {
      const storage = getStorage(app);

      // Step 1: Collect all used image paths from the Markdown content
      const usedPaths = new Set<string>();

      // IMPROVED REGEX:
      // Handles:
      // - Optional whitespace around the URL
      // - URLs with no spaces (standard)
      // - Optional quoted title ( "title" or 'title' ) with whitespace before it
      // - Common in Milkdown/ProseMirror-generated Markdown where images often have a title attribute like "[none]"
      const imageRegex =
        /!\[[^\]]*\]\(\s*([^)\s]+)\s*(?:(["][^"]*["])|(['][^']*[']))?\s*\)/g;

      let match;
      while ((match = imageRegex.exec(content)) !== null) {
        const url = match[1]; // This is now the clean URL without the title part

        // Only process Firebase Storage URLs
        if (url.startsWith("https://firebasestorage.googleapis.com/")) {
          try {
            const parts = url.split("/o/");
            if (parts.length > 1) {
              const encodedPath = parts[1].split("?")[0];
              const path = decodeURIComponent(encodedPath);

              // Only include images that belong to this exact blog post folder
              if (path.startsWith(`blog-images/${blogId}/post/`)) {
                usedPaths.add(path);
                console.log("Found used image:", path); // Helpful for debugging
              }
            }
          } catch (e) {
            console.warn("Failed to parse image URL:", url);
          }
        }
      }

      console.log(`Found ${usedPaths.size} used image(s) in content.`);

      // Step 2: List all files in this blog post's image folder
      const folderRef = ref(storage, `blog-images/${blogId}/post/`);
      const listResult = await listAll(folderRef);

      // Step 3: Delete any files that are no longer referenced
      let deletedCount = 0;
      const deletePromises: Promise<void>[] = [];

      for (const itemRef of listResult.items) {
        if (!usedPaths.has(itemRef.fullPath)) {
          console.log("Deleting unused image:", itemRef.fullPath);
          deletePromises.push(
            deleteObject(itemRef)
              .then(() => {
                deletedCount++;
              })
              .catch((err) => {
                console.error("Failed to delete:", itemRef.fullPath, err);
              }),
          );
        } else {
          console.log("Keeping used image:", itemRef.fullPath);
        }
      }

      await Promise.all(deletePromises);
      return deletedCount;
    } catch (err) {
      console.error("Error during image cleanup:", err);
      throw err; // Propagate to trigger failure toast
    }
  }
  function cancel() {
    blogBuilderStore.set(emptyBlog);
    goto("/admin");
  }
</script>

<div class="flex justify-end space-x-4">
  <button on:click={cancel} class="btn btn-outline w-20">Cancel</button>
  <button on:click={saveBlog} class="btn btn-primary w-20" disabled={saving}>
    {#if saving}
      <span class="loading loading-dots loading-sm"></span>
    {:else}
      Save
    {/if}
  </button>
</div>
