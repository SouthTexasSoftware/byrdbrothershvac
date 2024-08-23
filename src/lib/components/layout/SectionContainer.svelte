<script lang="ts">
  import SectionBanner from "./SectionBanner.svelte";

  export let bannerContent: string = "none";
  export let bannerScreenSide: string = "left";
  export let bannerDescription: string | undefined = undefined;
  export let id: string = "";
</script>

<div class="section-container" {id}>
  <SectionBanner
    content={bannerContent}
    mobileScreenSide={bannerScreenSide}
    description={bannerDescription}
  />
  <slot />
</div>

<style>
  .section-container {
    display: flex;
    flex-direction: column;
    width: 30vw;
    max-width: 600px;
    min-width: 400px;
    margin-bottom: 25px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 850px) {
    .section-container {
      width: auto;
      min-width: 0px;
      margin-top: 25px;
    }
  }
  /* Very Small / Zoomed in Screens */
  @media only screen and (max-width: 400px) {
  }
</style>
