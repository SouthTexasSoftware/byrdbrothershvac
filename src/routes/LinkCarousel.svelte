<script lang="ts">
  import Carousel from "svelte-carousel";

  type CarouselItem = {
    href: string;
    imageName: string;
    alt: string;
    padding?: string; // Optional padding override
  };

  const carouselItems: CarouselItem[] = [
    {
      href: "/financing",
      imageName: "synchrony-financing.png",
      alt: "Financing Available",
      padding: "25px 0px", // Custom padding
    },
    {
      href: "/services/maintenance_program",
      imageName: "annual-maintenance-logo.png",
      alt: "Annual Maintenance Program",
    },
    {
      href: "/products/ruud",
      imageName: "ruud-pro-partner.png",
      alt: "RUUD Pro Partner",
    },
    {
      href: "/products/generac",
      imageName: "generac-authorized-dealer-logo-nobg.png",
      alt: "Generac Sales & Service",
      padding: "20px 0px",
    },
    {
      href: "/products/mrcool",
      imageName: "mrcool-logo.png",
      alt: "MRCOOL AC",
      padding: "40px 0px",
    },
    {
      href: "/products/air_scrubber",
      imageName: "aerus-logo.png",
      alt: "Aerus Air Scrubber",
    },
  ];

  const getAssetSrc = (name: string): string => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<div class="carousel-wrapper">
  <Carousel autoplay>
    {#each carouselItems as item}
      <a class="carousel-card" href={item.href}>
        <img
          src={getAssetSrc(item.imageName)}
          alt={item.alt}
          class="ghost"
          style={item.padding ? `padding: ${item.padding}` : ""}
        />
      </a>
    {/each}
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
    height: 150px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .ghost {
    background-color: rgba(255, 255, 255, 0.522);
    padding: 0 20px; /* Default padding */
    border-radius: 8px;
  }

  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
    .carousel-wrapper {
      width: 300px;
      left: unset;
      right: 5vw;
      bottom: 125px;
    }

    .carousel-card {
      height: 125px;
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
      height: 20vw;
    }

    .carousel-label {
      display: none;
    }
  }
</style>
