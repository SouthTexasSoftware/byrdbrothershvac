<script lang="ts">
  export let photoFilename: string | undefined = undefined;
  export let backgroundSide: "left" | "right" | "none" | "full" = "none";
  export let photoCaption: string;
  export let photoSrc: string | undefined = undefined;

  let src = "";
  let loaded = false;

  $: if (photoSrc || photoFilename) {
    getAssetSrc();
  }

  function getAssetSrc() {
    if (photoSrc) {
      src = photoSrc;
      return;
    }

    if (!photoFilename) return;

    const path = `/src/lib/photos/${photoFilename}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    src = mod?.default || "";
  }
</script>

<div
  class="photo-container md:basis-1/2 flex justify-center items-center w-full"
>
  <div class="relative">
    <!-- Aspect-square wrapper reserves space immediately (prevents CLS) -->
    <div class="aspect-square w-[80vw] md:w-[21rem] mx-auto">
      <div class="relative w-full h-full">
        <img
          {src}
          alt="Byrd Brothers HVAC"
          class="absolute inset-0 w-full h-full object-cover"
          on:load={() => (loaded = true)}
        />

        {#if !loaded}
          <div class="absolute inset-0 skeleton rounded-none"></div>
        {/if}

        <!-- Colored background square (offset) -->
        {#if backgroundSide !== "none"}
          <div
            class="absolute bg-[var(--banner-primary)] w-full h-full z-[-1]
              {backgroundSide === 'right'
              ? 'top-[20px] left-[20px]'
              : 'top-[20px] right-[20px]'}"
          />
        {/if}
      </div>
    </div>

    <!-- Caption (positioned to match offset background) -->
    <p
      class="caption text-center italic text-sm mt-[20px]
        {backgroundSide === 'right'
        ? 'ml-[20px]'
        : backgroundSide === 'left'
          ? 'mr-[20px]'
          : ''}"
    >
      {photoCaption}
    </p>
  </div>
</div>
