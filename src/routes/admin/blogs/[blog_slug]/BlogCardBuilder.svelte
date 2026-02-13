<script lang="ts">
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  import { addToast } from "$lib/stores/toastStore";
  import { get } from "svelte/store";
  import { firebaseStore, blogBuilderStore } from "$lib/stores";
  import { doc, updateDoc } from "firebase/firestore"; // For updating Firestore
  import BlogCard from "$lib/components/blog/BlogCard.svelte";

  let imageFile: File | null = null;
  let imageFilename = ""; // To display filename
  let uploading = false;
  let removing = false;
  let imageLoaded = false;

  $: if ($blogBuilderStore.image) {
    // Parse filename from URL if not set (for edits)
    const parsed = new URL($blogBuilderStore.image);
    const decodedPath = decodeURIComponent(parsed.pathname);
    imageFilename = decodedPath.substring(decodedPath.lastIndexOf("/") + 1);
  }

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      imageFile = target.files[0];
      imageFilename = imageFile.name;
    }
  }

  async function uploadImage() {
    if (!imageFile) return;
    uploading = true;
    const fb = get(firebaseStore);
    if (fb) {
      const storage = getStorage(fb.app);
      const storageRef = ref(
        storage,
        `blog-images/${$blogBuilderStore.id}/main/${imageFile.name}`,
      );
      try {
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        blogBuilderStore.update((blog) => ({ ...blog, image: url }));
        // Update Firestore immediately
        await updateDoc(doc(fb.db, "blogs", $blogBuilderStore.id), {
          image: url,
        });
        addToast("Success", "Image uploaded and saved!", "success");
      } catch (err: any) {
        addToast("Error", err.message, "failure");
      }
    }
    uploading = false;
    imageFile = null; // Clear after upload
  }

  async function removeImage() {
    if ($blogBuilderStore.image) {
      removing = true;
      const fb = get(firebaseStore);
      if (fb) {
        const storage = getStorage(fb.app);
        const imageRef = ref(storage, $blogBuilderStore.image);
        try {
          await deleteObject(imageRef);
          blogBuilderStore.update((blog) => ({ ...blog, image: "" }));
          // Update Firestore immediately
          await updateDoc(doc(fb.db, "blogs", $blogBuilderStore.id), {
            image: "",
          });
          imageFilename = "";
          addToast("Success", "Image removed and updated!", "success");
        } catch (err: any) {
          addToast("Error", err.message, "failure");
        }
      }
      removing = false;
    }
  }
</script>

<div class="grid grid-cols-1 gap-8 items-center">
  <div id="main-img-input-container">
    <fieldset class="fieldset max-w-md mx-auto">
      <legend class="fieldset-legend font-semibold text-gray-600"
        >Main Cover Photo</legend
      >
      {#if $blogBuilderStore.image}
        <div class="card flex flex-row items-center py-2 px-4 border mt-1">
          <p class="text-sm text-gray-500">{imageFilename}</p>
          <button
            on:click={removeImage}
            disabled={removing}
            class="btn btn-error btn-sm ml-auto"
          >
            {#if removing}
              <span class="loading loading-spinner loading-xs"></span> Removing...
            {:else}
              Remove
            {/if}
          </button>
        </div>
      {:else}
        <input
          type="file"
          class="file-input border-gray-300 w-full text-sm file-input-primary"
          on:change={handleFileSelect}
        />
        {#if imageFile}
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-sm text-gray-500">Selected: {imageFilename}</p>
            <button
              on:click={uploadImage}
              disabled={uploading}
              class="btn btn-primary btn-sm"
            >
              {#if uploading}
                <span class="loading loading-spinner loading-xs"></span> Uploading...
              {:else}
                Upload
              {/if}
            </button>
          </div>
        {/if}
      {/if}
      <p class="label text-gray-500 text-xs -mt-1">
        Used in internal links as shown in the cards below and social media url
        sharing
      </p>
    </fieldset>
  </div>

  <!-- Card Preview Section -->
  <div class="flex md:flex-row flex-col gap-4">
    <BlogCard blogData={$blogBuilderStore} size="large" />

    <BlogCard blogData={$blogBuilderStore} size="medium" />
  </div>

  <BlogCard blogData={$blogBuilderStore} size="small" />
</div>
