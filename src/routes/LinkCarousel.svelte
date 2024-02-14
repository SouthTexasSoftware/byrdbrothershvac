<script lang="ts">
  import Carousel from "svelte-carousel";

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<div class="carousel-wrapper">
  <Carousel autoplay>
    <a class="carousel-card" href="/about/partners#ruud">
      <img
        src={getAssetSrc("ruud-pro-partner.png")}
        alt="RUUD Pro Partner"
        class="ghost"
      />
    </a>
    <a class="carousel-card" href="/about/partners#generac">
      <img
        src={getAssetSrc("generac-authorized-dealer-logo-nobg.png")}
        alt="Generac Sales & Service"
        class="ghost"
      />
    </a>
    <a class="carousel-card" href="/about/partners#mrcool">
      <img src={getAssetSrc("mrcool-logo.png")} alt="MRCOOL AC" class="ghost" />
    </a>
    <a class="carousel-card" href="/products/air_scrubber">
      <img src={getAssetSrc("aerus-logo.png")} alt="Aerus Air Scrubber" class="ghost" />
    </a>
  </Carousel>
  <h3 class="carousel-label">Explore our Partners and Products!</h3>
</div>

<style>
  .carousel-wrapper {
    position: absolute;
    width: 350px;
    left: 5vw;
    bottom: 50px;
  }
  .carousel-label {
    color: white;
    font-family: font-semibold;
    text-align: center;
  }
  .carousel-card {
    height: 150px !important;
    border-radius: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: auto;
  }
  .ghost {
    background-color: rgba(255, 255, 255, 0.522);
    padding: 0 20px;
    border-radius: 8px;
  }
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
    .carousel-wrapper {
      width: 300px;
      left: unset;
      right: 5vw;
      bottom: 125px;
    }
    .carousel-card {
      height: 125px !important;
    }
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .carousel-wrapper {
      width: 60vw;
      left: unset;
      right: 10vw;
      bottom: 90px;
    }
    .carousel-card {
      height: 20vw !important;
    }
    .carousel-label {
      display: none;
    }
  }
</style>
