<script lang="ts">
  import { Eye } from "lucide-svelte";
  import type { BlogPost } from "$lib/stores";

  // NEW: Import page store for route detection
  import { page } from "$app/stores";

  export let blogData: BlogPost;
  export let size: string = "medium";

  let imageLoaded = false;

  // Size-specific classes
  $: cardClasses = {
    small: "card-side w-full max-w-2xl min-h-32",
    medium: "md:w-80 min-h-80",
    large: "md:w-96 min-h-96",
  }[size];

  $: imageClasses = {
    small: "w-[30vw] min-h-32 md:h-32 md:w-32 h-full object-cover rounded-l-md",
    medium: "w-full h-48 object-cover rounded-t-md",
    large: "w-full h-56 object-cover rounded-t-md",
  }[size];

  $: placeholderClasses = {
    small: "w-32 min-h-32 bg-gray-200 rounded-l-md",
    medium: "w-full h-48 bg-gray-200 rounded-t-md",
    large: "w-full h-56 bg-gray-200 rounded-t-md",
  }[size];

  $: skeletonClasses = {
    small: "absolute inset-0 skeleton w-32 min-h-32 !rounded-r-none",
    medium: "absolute inset-0 skeleton w-full h-48 !rounded-b-none",
    large: "absolute inset-0 skeleton w-full h-56 !rounded-b-none",
  }[size];
</script>

{#if $page.url.pathname.startsWith("/admin") || blogData.status === "public"}
  <div class="card bg-base-100 shadow-md mx-auto {cardClasses}">
    <figure class="relative {size === 'small' ? 'flex-shrink-0' : ''}">
      {#if blogData.image}
        <img
          src={blogData.image}
          alt="Cover/Main"
          class={imageClasses}
          on:load={() => (imageLoaded = true)}
        />
        {#if !imageLoaded}
          <div class={skeletonClasses}></div>
        {/if}
      {:else}
        <div
          class="flex flex-col justify-center items-center {placeholderClasses}"
        >
          <svg
            class="{size === 'small' ? 'w-8 h-8' : 'w-12 h-12'} text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          {#if size !== "small"}
            <p class="mt-2 text-gray-500 text-sm">No Image</p>
          {/if}
        </div>
      {/if}
    </figure>
    <div class="card-body {size === 'small' ? 'px-4 py-3' : 'px-6 py-4'}">
      <h2 class="card-title {size === 'small' ? 'text-base' : 'text-lg'}">
        {blogData.title || "Create a Title"}
      </h2>

      {#if size !== "small"}
        <p class={size === "medium" ? "text-sm" : ""}>
          {blogData.description || "Write a short summary/description."}
        </p>
      {/if}

      <p
        class="text-xs font-light text-gray-500 {size === 'small'
          ? 'mt-1'
          : ''}"
      >
        By {blogData.author || "Author"} | {new Date(
          blogData.lastUpdated * 1000,
        ).toLocaleDateString()}
      </p>

      <div
        class="mt-2 flex flex-wrap gap-1 {size === 'small'
          ? 'items-center'
          : ''}"
      >
        {#if size !== "small"}
          {#each blogData.tags as tag}
            <span
              class="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs"
              >{tag}</span
            >
          {/each}
        {:else}
          <!-- Show only first 2 tags for small -->
          {#each blogData.tags.slice(0, 2) as tag}
            <span
              class="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs"
              >{tag}</span
            >
          {/each}
          {#if blogData.tags.length > 2}
            <span class="text-xs text-gray-500"
              >+{blogData.tags.length - 2}</span
            >
          {/if}
        {/if}

        <div id="views-container" class="flex gap-1 w-min ml-auto items-center">
          <Eye class="w-4 h-4 stroke-gray-500" />
          <p class="badge text-xs text-gray-500">{blogData.views}</p>
        </div>
      </div>
    </div>
  </div>
{/if}
