<script lang="ts">
  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<video
  id="my-player"
  controls
  playsinline
  preload="auto"
  poster={getAssetSrc("byrdbrothersvideoposter.png")}
>
  <source
    src="https://firebasestorage.googleapis.com/v0/b/byrd-brothers-hvac.appspot.com/o/byrdbrothersvideo1.webm?alt=media&token=ce9ef7cd-d0e3-4aca-be7c-afd78eb7fa5c"
    type="video/webm"
  />
  <track kind="captions" />
  <p>
    Your browser does not support HTML5 video. Please use the latest version of
    a modern browser to view.
  </p>
</video>

<style>
  video {
    width: 80%;
    margin-top: 25px;
    border-radius: 6px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    video {
      width: 90vw;
    }
  }
</style>
