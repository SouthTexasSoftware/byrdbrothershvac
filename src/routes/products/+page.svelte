<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";

  let displayCards = false;

  onMount(() => {
    displayCards = true;
  });

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<svelte:head>
  <title>Products | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="We partner with product suppliers to give you the highest quality equipment at the best price. Check out the Products we stand behind!"
  />
</svelte:head>

<ViewTitleBar title="Products" />

<div class="card-container">
  {#if displayCards}
    <div class="service-card" in:fly={{ x: 50, duration: 500 }}>
      <a href="/products/ruud">
        <img src={getAssetSrc("ruud-outdoor-unit.png")} alt="RUUD HVAC" />
      </a>
      <div class="card-info-block">
        <a href="/products/ruud"
          ><h3 class="card-title">RUUD HVAC EQUIPMENT</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          We're proud to offer RUUD's top-of-the-line products, delivering
          unmatched performance and comfort for your home.
          <br /><br />
          Whether you're in need of a new air conditioner, furnace, heat pump, or
          indoor air quality solution, RUUD has the perfect solution to meet your
          needs and exceed your expectations. Trust Byrd Brothers HVAC to install,
          service, and maintain your RUUD equipment with precision and expertise.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 100 }}>
      <a href="/products/mrcool">
        <img
          src={getAssetSrc("mrcool-indoor-minisplit.png")}
          alt="MRCOOL AC Units"
        />
      </a>
      <div class="card-info-block">
        <a href="/products/mrcool"><h3 class="card-title">MRCOOL</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          Revolutionize your home comfort with MRCOOL's state-of-the-art
          mini-split and ductless HVAC equipment. At Byrd Brothers HVAC, we're
          thrilled to offer MRCOOL's cutting-edge solutions, delivering
          unmatched performance, energy efficiency, and versatility for your
          heating and cooling needs.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 200 }}>
      <a href="/products/generac">
        <img
          src={getAssetSrc("generac-by-home.jpg")}
          alt="Generac Power Services"
        />
      </a>
      <div class="card-info-block">
        <a href="/products/generac"><h3 class="card-title">GENERAC POWER</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          You can't heat or cool your home without power! We understand the
          importance of uninterrupted power supply for your home and comfort
          needs. That's why we're excited to offer comprehensive Generac home
          generator sales and service to keep your lights on and your family
          safe, no matter what.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 300 }}>
      <a href="/products/air_scrubber">
        <img
          src={getAssetSrc("air_scrubber.jpg")}
          alt="Air Scrubber by AERUS"
        />
      </a>
      <div class="card-info-block">
        <a href="/products/air_scrubber"
          ><h3 class="card-title">AIR SCRUBBER</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          <span class="semibold">Upfront Pricing:</span> $950 installed!
          <br />
          <span class="semibold">30 Day</span> Money Back Guarantee
          <br /><br />
          The AirScrubber by Aerus® attaches directly to the HVAC system ductwork
          to reduce viruses, bacteria, and other contaminants in the ambient air
          and on surfaces while the HVAC fan is running. Patented ActivePure is an
          advanced surface and air purification technology. It has been proven to
          reduce up to 99.9% of many common airborne and surface contaminants.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 400 }}>
      <a href="/products/attic_tent">
        <img
          src={getAssetSrc("attic-tent-personal-demo.png")}
          alt="Attic Door Tent"
        />
      </a>
      <div class="card-info-block">
        <a href="/products/attic_tent"><h3 class="card-title">ATTIC TENT</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          <span class="semibold">Upfront Pricing:</span> $150 installed!
          <br /><br />
          Seal in Comfort with Attic Door Tents! Are you tired of feeling drafts
          and losing valuable energy through your attic access door? Say goodbye
          to wasted energy and hello to year-round comfort with our innovative attic
          door tents! We're proud to offer a simple yet effective solution to seal
          off your attic access and keep conditioned air where it belongs—in your
          home.
        </p>
      </div>
    </div>
  {/if}
</div>

<div class="article-content content-width">
  <SectionContainer
    bannerContent="GET A QUOTE!"
    bannerScreenSide="left"
    bannerDescription="Free estimates for any size job."
  >
    <RequestAQuote />
  </SectionContainer>
</div>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
  .service-card {
    display: flex;
    width: 900px;
    border: 1px solid var(--input-border);
    border-radius: 15px;
    margin: 25px 0;
    padding: 10px;
    transition: all 0.3s ease;
  }
  .service-card:hover {
    border-color: var(--primary);
    transform: translateX(2px);
  }
  a img {
    min-width: 200px;
    height: 200px;
    border-radius: 15px;
  }
  .service-card a {
    margin: auto 0;
  }
  .card-info-block {
    padding: 5px 25px;
  }
  .card-title {
    font-family: font-regular;
    font-size: 24px;
  }
  .card-title-underline {
    width: 20px;
    height: 2px;
    background-color: var(--primary);
    border-radius: 2px;
    margin: 5px 0;
  }
  .card-description {
    font-family: font-regular;
    font-size: 18px;
  }
  .card-description a {
    text-decoration: underline;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
    .service-card {
      width: 545px;
      flex-direction: column;
    }
    .service-card a {
      margin: 0 auto;
    }
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .service-card {
      width: 90vw;
      flex-direction: column;
    }
    .service-card a {
      margin: 15px auto;
    }
    .card-description {
      text-align: justify;
    }
    a img {
      height: auto;
      max-width: 73vw;
    }
  }
</style>
