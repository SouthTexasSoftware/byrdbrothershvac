<script lang="ts">
  import { page } from "$app/stores";

  export let photoFilename: String;
  export let backgroundSide: string;
  export let photoCaption: string;

  let photoFilepath = $page.url.origin + "/src/lib/photos/" + photoFilename;

</script>

<div class="photo-container left right">
  <picture>
    <img src={photoFilepath} alt="Byrd Brothers HVAC" />
    {#if backgroundSide != "none"}
    <div class="block-photo-background {backgroundSide}" />
    {/if}
    <p class="caption {backgroundSide}">{photoCaption}</p>
  </picture>
</div>

<style>
  .photo-container {
    position: relative;
    width: 30vw;
    max-width: 600px;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  picture {
    position: relative;
    width: 80%;
    max-width: 400px;
    max-height: 400px;
    z-index: 1;
    overflow: visible;
  }
  img {
    width: 100%;
  }
  .block-photo-background {
    position: absolute;
    z-index: -1;
    top: 20px;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    background-color: var(--banner-primary);
  }
  .block-photo-background.right {
    right: -20px;
  }
  .block-photo-background.left {
    left: -20px;
  }
  .caption {
    position: absolute;
    bottom: -40px;
    width: 100%;
    font-size: 14px;
    font-family: font-italic;
    text-align: center;
  }
  .caption.right {
    left: 20px;
  }
  .caption.left {
    left: -20px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .photo-container {
      width: 100%;
      min-width: 0;
      margin-top: 40px;
    }
    picture {
      width: 80vw;
      height: 80vw;
    }
    .block-photo-background {
      width: 80vw;
      height: 80vw;
    }
    .caption {
      top: 106%;
    }
  }
</style>
