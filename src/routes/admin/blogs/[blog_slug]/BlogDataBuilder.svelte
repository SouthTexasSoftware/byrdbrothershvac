<!-- src/lib/components/BlogDataInput.svelte -->
<script lang="ts">
  import { blogBuilderStore } from "$lib/stores";
  import { Info } from "lucide-svelte";
  import KeywordTagsModal from "./KeywordTagsModal.svelte";

  let uniqueCategories: string[] = [];
  let showTagsModal = false;

  //   TODO: needs to be changed to pull down categories from config/blogs and not all the blogs

  function generateSlug() {
    blogBuilderStore.update((blog) => {
      if (blog.title) {
        blog.slug = blog.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      }
      return blog;
    });
  }

  function handleTagsSave(e: CustomEvent<string[]>) {
    blogBuilderStore.update((blog) => ({ ...blog, tags: e.detail }));
    showTagsModal = false;
  }

  function handleTagsCancel() {
    showTagsModal = false;
  }

  function handleQuoteChange(event: Event) {
    const target = event.target as HTMLInputElement;
    blogBuilderStore.update((blog) => ({
      ...blog,
      includeQuote: target.checked ? true : false,
    }));
  }
</script>

<div
  id="data-builder-container"
  class="grid grid-cols-1 md:grid-cols-2 md:gap-y-2 gap-8 bg-base-100 p-6"
>
  <div id="title-input-container">
    <fieldset class="fieldset">
      <div class="title-row relative">
        <legend class="fieldset-legend font-semibold text-gray-600"
          >Title</legend
        >
        <Info
          class="info-icon w-4 h-4 stroke-gray-500 ml-2 self-center absolute left-10 top-2"
        />
        <div
          class="absolute left-16 top-0 overflow-x-scroll w-52 md:w-80 max-w-80 h-8"
        >
          <p class="label text-gray-500 text-xs whitespace-nowrap">
            Changing the title breaks all previously shared links/URLs!
          </p>
        </div>
      </div>

      <input
        id="title"
        bind:value={$blogBuilderStore.title}
        on:blur={generateSlug}
        type="text"
        class="input border-gray-300 w-full mt-1"
        placeholder="Blog Title"
      />
      <p class="label text-gray-500 text-xs -mt-1">
        URL Extension: {$blogBuilderStore.slug}
      </p>
    </fieldset>
  </div>

  <div id="author-input-container">
    <fieldset class="fieldset">
      <legend class="fieldset-legend font-semibold text-gray-600">Author</legend
      >
      <input
        id="author"
        bind:value={$blogBuilderStore.author}
        type="text"
        class="input border-gray-300 w-full mt-1"
        placeholder="Full Name"
      />
    </fieldset>
  </div>

  <div id="description-input-container">
    <fieldset class="fieldset">
      <legend class="fieldset-legend font-semibold text-gray-600"
        >Summary/Description</legend
      >
      <textarea
        class="textarea h-24 w-full border-gray-300 mt-1"
        placeholder="Your brief explanation of the blog post goes here, and is shared only in links to the post."
        required
        bind:value={$blogBuilderStore.description}
      ></textarea>
    </fieldset>
  </div>

  <!-- TODO: We could have this link to the contact us section for the author -->

  <div id="tags-and-quote-form" class="flex justify-between">
    <div id="seo-tags-input-container">
      <fieldset class="fieldset w-full">
        <legend class="fieldset-legend font-semibold text-gray-600"
          >Keywords/Tags</legend
        >
        <!-- Button to open -->
        <button
          on:click={() => {
            showTagsModal = true;
          }}
          class="btn btn-outline btn-primary mt-1">Select Keywords/Tags</button
        >
        <p class="label text-gray-500 text-xs -mt-1">
          Tags show up in the blog post and are used for SEO.
        </p>
      </fieldset>
      <KeywordTagsModal
        visible={showTagsModal}
        initialTags={$blogBuilderStore.tags}
        on:save={handleTagsSave}
        on:cancel={handleTagsCancel}
      />
    </div>

    <div id="include-quote-input-container">
      <fieldset
        class="fieldset w-full flex justify-center flex-col items-center"
      >
        <legend
          class="fieldset-legend text-center w-full flex items-center justify-center font-semibold text-gray-600"
          >Quote Form</legend
        >
        <div class="flex items-center justify-center space-x-4 ml-6">
          <label class="cursor-pointer label">
            <span class="label-text mr-2">No</span>
            <input
              type="checkbox"
              checked={$blogBuilderStore.includeQuote === true}
              on:change={handleQuoteChange}
              class="toggle toggle-primary"
            />
            <span class="label-text ml-2">Yes</span>
          </label>
        </div>
        <p class="label text-gray-500 text-xs -mt-1 max-w-[190px] text-center">
          Standard quote form is included at the end of the blog.
        </p>
      </fieldset>
    </div>
  </div>
</div>
