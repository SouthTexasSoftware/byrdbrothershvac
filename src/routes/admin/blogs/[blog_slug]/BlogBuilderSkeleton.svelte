<script lang="ts">
  import BlogCardSkeleton from "$lib/components/blog/BlogCardSkeleton.svelte";
</script>

<div class="px-10 py-6 md:p-6 max-w-6xl mx-auto">
  <!-- Header Skeleton -->
  <div
    class="flex flex-col md:flex-row justify-start items-center mb-6 space-y-2 md:space-y-0 mb-4"
  >
    <div class="skeleton h-12 w-72"></div>
    <!-- Title -->
    <div class="flex items-center space-x-1 ml-2">
      <div class="skeleton h-6 w-12"></div>
      <!-- Toggle label -->
      <div class="skeleton h-6 w-10 rounded-full"></div>
      <!-- Toggle switch -->
      <div class="skeleton h-6 w-16"></div>
      <!-- Toggle label -->
    </div>
    <div class="flex space-x-2 md:ml-auto">
      <div class="skeleton h-10 w-20 rounded-md"></div>
      <!-- Cancel button -->
      <div class="skeleton h-10 w-20 rounded-md"></div>
      <!-- Save button -->
    </div>
  </div>

  <!-- Form Section Skeleton (Two-column layout) -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <!-- Title -->
    <div class="mb-8 md:mb-0">
      <div class="skeleton h-4 w-16 mb-1"></div>
      <!-- Label -->
      <div class="skeleton h-10 w-full rounded-md"></div>
      <!-- Input -->
      <div class="skeleton h-4 w-48 mt-1"></div>
      <!-- URL Extension -->
    </div>
    <!-- Author -->
    <div class="mb-8 md:mb-0">
      <div class="skeleton h-4 w-16 mb-1"></div>
      <!-- Label -->
      <div class="skeleton h-10 w-full rounded-md"></div>
      <!-- Input -->
    </div>
    <!-- Summary/Description -->
    <div class="md:col-span-1 mb-8 md:mb-0">
      <div class="skeleton h-4 w-32 mb-1"></div>
      <!-- Label -->
      <div class="skeleton h-24 w-full rounded-md"></div>
      <!-- Textarea -->
    </div>
    <div class="flex justify-between">
      <!-- Keywords/Tags -->
      <div class="md:col-span-1">
        <div class="skeleton h-4 w-24 mb-1"></div>
        <!-- Label -->
        <div class="skeleton h-10 w-40 rounded-md"></div>
        <!-- Button -->
      </div>
      <!-- Quote Form -->
      <div class="md:col-span-1">
        <div class="skeleton h-4 w-24 mb-2 mx-auto"></div>
        <!-- Label -->
        <div class="flex items-center space-x-1 ml-2 mb-2">
          <div class="skeleton h-6 w-12"></div>
          <!-- Toggle label -->
          <div class="skeleton h-6 w-10 rounded-full"></div>
          <!-- Toggle switch -->
          <div class="skeleton h-6 w-16"></div>
          <!-- Toggle label -->
        </div>
        <div class="skeleton h-4 w-24 mb-1 mx-auto"></div>
      </div>
    </div>
  </div>

  <!-- Main Cover Photo -->
  <div class="md:col-span-1 max-w-md mx-auto mb-8 mt-24">
    <div class="skeleton h-4 w-24 mb-1"></div>
    <!-- Label -->
    <div class="flex items-center space-x-2">
      <div class="skeleton h-4 w-72"></div>
      <!-- Filename -->
      <div class="skeleton h-8 w-20 rounded-md"></div>
      <!-- Remove button -->
    </div>
    <div class="skeleton h-4 w-80 mt-1"></div>
    <!-- Help text -->
  </div>

  <!-- Card Preview Skeleton -->
  <div class="flex md:flex-row flex-col mb-4">
    <BlogCardSkeleton size="large" />
    <BlogCardSkeleton size="medium" />
  </div>
  <BlogCardSkeleton size="small" />
</div>
