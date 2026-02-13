<!-- BlogCardSkeleton.svelte -->
<script lang="ts">
  export let size: string = "medium";

  // Size-specific classes
  $: cardClasses = {
    small: "card-side w-full max-w-2xl min-h-32 mb-4",
    medium: "md:w-80 min-h-80",
    large: "md:w-96 min-h-96",
  }[size];

  $: imageClasses = {
    small: "w-32 min-h-32 rounded-r-none",
    medium: "w-full h-48 rounded-t-md",
    large: "w-full h-56 rounded-t-md",
  }[size];
</script>

<div class="card bg-base-100 shadow-md mx-auto {cardClasses}">
  <figure class="relative {size === 'small' ? 'flex-shrink-0' : ''}">
    <div class="skeleton {imageClasses}"></div>
  </figure>

  <div class="card-body {size === 'small' ? 'px-4 py-3' : 'px-6 py-4'}">
    <!-- Title skeleton -->
    <div class="skeleton h-6 w-3/4 mb-2"></div>

    {#if size !== "small"}
      <!-- Description skeleton (2-3 lines) -->
      <div class="skeleton h-4 w-full mb-2"></div>
      <div class="skeleton h-4 w-5/6 mb-2"></div>
      {#if size === "large"}
        <div class="skeleton h-4 w-4/6 mb-2"></div>
      {/if}
    {/if}

    <!-- Author/date skeleton -->
    <div class="skeleton h-3 w-2/3 {size === 'small' ? 'mt-1' : 'mb-2'}"></div>

    <!-- Tags and views skeleton -->
    <div class="mt-2 flex flex-wrap gap-2 items-center">
      {#if size !== "small"}
        <div class="skeleton h-6 w-16 rounded-md"></div>
        <div class="skeleton h-6 w-20 rounded-md"></div>
        <div class="skeleton h-6 w-14 rounded-md"></div>
      {:else}
        <div class="skeleton h-6 w-12 rounded-md"></div>
        <div class="skeleton h-6 w-16 rounded-md"></div>
      {/if}

      <div class="ml-auto flex gap-1 items-center">
        <div class="skeleton h-4 w-4 rounded-full"></div>
        <div class="skeleton h-5 w-8 rounded-md"></div>
      </div>
    </div>
  </div>
</div>
