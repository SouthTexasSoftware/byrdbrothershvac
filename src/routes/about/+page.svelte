<script lang="ts">
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
  <title>About Us | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Local family-owned HVAC business with primary operations in Sweeny, Brazoria, and Lake Jackson. Meet the team, check out our partners, and give us a call today!"
  />
</svelte:head>

<ViewTitleBar title="About Us" />

<div class="card-container">
  {#if displayCards}
    <div class="service-card" in:fly={{ x: 50, duration: 500 }}>
      <a href="/about/service_area">
        <img src={getAssetSrc("service-area-map.png")} alt="Service Area Map" />
      </a>
      <div class="card-info-block">
        <a href="/about/service_area"
          ><h3 class="card-title">SERVICE AREA</h3></a
        >
        <div class="card-title-underline" />
        <p class="card-description">
          We were born and raised in the crazy climate of <span class="semibold"
            >South Texas</span
          >
          and proudly serve the Brazoria County and Matagorda County areas of the
          Gulf Coast. Based out of Sweeny, TX - we are uniquely positioned in between
          Lake Jackson and Bay City, with service calls down to Sargent and up to
          Damon. Please <a href="/about/service_area">click the map</a> to get a
          clearer view and longer list of the towns, cities, and areas we include
          in the Byrd Brothers Family!
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 100 }}>
      <a href="/about/meet_team">
        <img src={getAssetSrc("home-page-owners.png")} alt="Meet The Team" />
      </a>
      <div class="card-info-block">
        <a href="/about/meet_team"><h3 class="card-title">MEET THE TEAM</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          Family owned and operated, owners Brady and Randy Byrd were raised in
          Sweeny, TX and were both Bulldog athletes. They were also active in 4H
          - raising chickens and competing in archery and shotgun events. Please
          <a href="/about/meet_team">click the photo</a> to meet the expanding Byrd
          Brothers Team and see who will be helping you today and in the future!
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 200 }}>
      <a href="/about/partners">
        <img
          src={getAssetSrc("ruud-pro-partner.png")}
          alt="RUUD Pro Partner"
        />
      </a>
      <div class="card-info-block">
        <a href="/about/partners"><h3 class="card-title">PARTNERS</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          Whatever equipment you have or prefer, we are here to help! Our
          techicians are trained and certified on all HVAC equipement. With that
          in mind, we also analyze and select key business partners to help
          provide our customers with superior pricing, products, and services -
          and continue to evaluate the best options available. We recommend our
          partners with full transparency! Please <a href="/about/partners">click</a> to see the full list of
          companies helping us serve you better.
        </p>
      </div>
    </div>

  {/if}
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
