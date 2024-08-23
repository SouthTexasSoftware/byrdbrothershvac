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
  <title>Our Services | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="We offer installation, repair, and maintenance of air conditioning, heating, and insulation for homes and businesses."
  />
</svelte:head>

<ViewTitleBar title="Our Services" />

<div class="card-container">
  {#if displayCards}
    <div class="service-card" in:fly={{ x: 50, duration: 500 }}>
      <a href="/services/air_conditioning">
        <img
          src={getAssetSrc("ruud-outdoor-unit.png")}
          alt="Air Conditioning Services"
        />
      </a>
      <div class="card-info-block">
        <a href="/services/air_conditioning"
          ><h3 class="card-title">AIR CONDITIONING</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          Being located in <span class="semibold">South Texas</span>, our
          specialty is everything <span class="cool">air conditioning</span>
          related. Is your air conditioning completely broken? Just not cooling like
          it used too? Or maybe you’d just like a tune up inspection while it’s comfortable
          enough to shut the system down!
          <br /><br />
          Please give us a <a href="tel:+19794808444">Call</a> or submit a
          <a href="/contact/quote_form">Quote Form</a> and become part of the growing
          number of satisfied customers in the Byrd Brothers Family.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 100 }}>
      <a href="/services/heating">
        <img src={getAssetSrc("ruud-furnace.png")} alt="Heating Services" />
      </a>
      <div class="card-info-block">
        <a href="/services/heating"><h3 class="card-title">HEATING</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          We are happy to help keep your home <span class="warm">warm</span> in the
          winter. Are you interested in a high efficiency heat pump? We service and
          install traditional furnaces as well as heat pump systems that keep our
          customers cool in the summer and warm in the cold months!
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 200 }}>
      <a href="/services/maintenance_program">
        <img
          src={getAssetSrc("servicing-outdoor-unit-SQUARE.png")}
          alt="Annual Maintenance Program"
        />
      </a>
      <div class="card-info-block">
        <a href="/services/maintenance_program"
          ><h3 class="card-title">Annual Maintenance Program</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          <span class="semibold">Be Prepared:</span> Don't wait until a
          breakdown occurs—our program keeps your HVAC system prepared for the
          demands of every season. Our skilled technicians will identify and
          address potential issues before they escalate, ensuring your home
          comfort remains uninterrupted.
          <br /><br />
          <span class="semibold">Save Money:</span> Regular maintenance not only
          extends the lifespan of your HVAC equipment but also helps you save on
          energy costs. A well-maintained system operates more efficiently, reducing
          energy consumption and lowering your utility bills.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 300 }}>
      <a href="/services/insulation">
        <img
          src={getAssetSrc("byrdbrothers-insulation-after-blown-in.png")}
          alt="Insulation Services"
        />
      </a>
      <div class="card-info-block">
        <a href="/services/insulation"><h3 class="card-title">INSULATION</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          Your first line of defense against high energy bills and low comfort!
          Traveled into your attic and noticed something not quite right with
          your
          <span class="semibold">ducting </span> or
          <span class="semibold">attic insulation</span>? We can help you beat
          the heat! See how we can help lower your utility bills with new or
          improved insulation.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 400 }}>
      <a href="/services/air_quality">
        <img
          src={getAssetSrc("ruud-air-filter-cartridge.png")}
          alt="Air Quality Services"
        />
      </a>
      <div class="card-info-block">
        <a href="/services/air_quality"
          ><h3 class="card-title">AIR QUALITY</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          Sneezing and congested from the ever changing allergy seasons here in
          Texas? We offer a full range of air quality solutions to help filter
          the air in your home. Not sure of the last time your air filter or
          furnace filter was changed? We can help you get back on track - our
          knowledgeable technicians can explain all the options available for
          keeping your home air clean!
        </p>
      </div>
    </div>
  {/if}
</div>

<div class="article-content content-width center-child">
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
