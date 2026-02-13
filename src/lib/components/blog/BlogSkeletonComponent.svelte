<script lang="ts">
  export let sections = 4;
</script>

<div class="w-full py-0 mt-0">
  <!-- Centered Title -->
  <div class="flex flex-col items-center text-center mb-6">
    <div class="skeleton h-10 w-3/4 md:w-1/2 mb-4"></div>

    <!-- Metadata -->
    <div class="flex flex-wrap justify-center gap-6">
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-24"></div>
      <div class="skeleton h-4 w-20"></div>
    </div>
  </div>

  <!-- Content Sections -->
  {#each Array(sections) as _, i}
    <div class="mb-16 mt-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        {#if i % 2 === 0}
          <!-- TEXT LEFT / IMAGE RIGHT -->
          <div>
            <div class="skeleton rounded-md h-8 w-full mx-auto mb-6"></div>
            <div class="space-y-4 px-4">
              <div class="skeleton h-4 w-full rounded-md"></div>
              <div class="skeleton h-4 w-5/6 rounded-md"></div>
              <div class="skeleton h-4 w-4/6 rounded-md"></div>
              <div class="skeleton h-4 w-5/6 rounded-md"></div>
              <div class="skeleton h-4 w-4/6 rounded-md"></div>
              <div class="skeleton h-4 w-full rounded-md"></div>
            </div>
          </div>

          <div
            class="skeleton aspect-square w-[80vw] md:w-[21rem] mx-auto rounded-none"
          ></div>
        {:else}
          <!-- IMAGE LEFT / TEXT RIGHT -->
          <div
            class="skeleton aspect-square w-[80vw] md:w-[21rem] mx-auto rounded-none"
          ></div>

          <div>
            <div class="skeleton rounded-md h-8 w-full mx-auto mb-6"></div>
            <div class="space-y-4 px-4">
              <div class="skeleton h-4 w-full rounded-md"></div>
              <div class="skeleton h-4 w-5/6 rounded-md"></div>
              <div class="skeleton h-4 w-4/6 rounded-md"></div>
              <div class="skeleton h-4 w-5/6 rounded-md"></div>
              <div class="skeleton h-4 w-4/6 rounded-md"></div>
              <div class="skeleton h-4 w-full rounded-md"></div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style></style>
