<script lang="ts">
  import SectionBanner from "./SectionBanner.svelte";

  export let bannerContent: string = "none";
  export let bannerScreenSide: string = "left";
  export let bannerDescription: string | undefined = undefined;
  export let id: string = "";
</script>

{#if bannerScreenSide !== "full"}
  <div
    class="section-container md:basis-1/2 md:mx-auto w-[100%] leading-7"
    {id}
  >
    <SectionBanner
      content={bannerContent}
      mobileScreenSide={bannerScreenSide}
      description={bannerDescription}
    />
    <slot />
  </div>
{:else}
  <div class="section-container basis-full leading-7" {id}>
    <SectionBanner
      content={bannerContent}
      mobileScreenSide={bannerScreenSide}
      description={bannerDescription}
    />
    <slot />
  </div>
{/if}

<style>
</style>
