<script lang="ts">
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;

  let serviceAreaMapFilename = "service-area-map.png";

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<!-- <ArticleTitleBar
    title="AIR CONDITIONING INSTALLATION"
    machineDate="2023-10-16"
    date="10/16/2023"
    articleOwner="Brady Byrd, Owner"
  /> -->
<div class="article-content content-width">
  <p class="section-content">
    As mentioned on our <a href="/about">About Us</a> page, we were born and
    raised in the crazy climate of <span class="semibold">South Texas</span>
    and proudly serve the Brazoria County and Matagorda County areas of the Gulf
    Coast. Based out of Sweeny, TX - we are uniquely positioned between Lake Jackson
    and Bay City, with service calls down to Sargent and up to Damon. Scroll down
    to see our service map and a list of towns, cities, and areas that we include
    in the Byrd Brothers Family! <a href="tel:+19794808444">Give us a call</a>
    today to schedule a visit.

  </p>
  <img
    class="service-area-map"
    src={getAssetSrc(serviceAreaMapFilename)}
    alt="Service Area Map"
  />
  <div class="service-area-list">
    <a href="/about/service_area" class="cities-button">All Areas We Service</a>
    <div class="breaker-bar" />
    <ul class="list-items">
      <li>Angleton</li>
      <li>Bailey's Prairie</li>
      <li>Bay City</li>
      <li>Brazoria</li>
      <li>Caney</li>
      <li>Cedar Lake</li>
      <li>Cedar Lane</li>
      <li>Chenango</li>
      <li>Churchill</li>
      <li>Clute</li>
      <li>Damon</li>
      <li>Danbury</li>
      <li>Freeport</li>
      <li>Hawkinsville</li>
      <li>Holiday Lakes</li>
      <li>Jones Creek</li>
      <li>Lake Jackson</li>
      <li>Old Ocean</li>
      <li>Oyster Creek</li>
      <li>Quintana</li>
      <li>Richwood</li>
      <li>Sugar Valley</li>
      <li>Surfside Beach</li>
      <li>Sweeny</li>
      <li>Van Vleck</li>
      <li>West Columbia</li>
      <li>Wild Peach</li>
    </ul>
  </div>

  <div />
</div>

<style>
  .article-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  li {
    margin-bottom: 10px;
    position: relative;
    font-family: font-regular;
    font-size: 20px;
  }
  li::before {
    content: "";
    position: absolute;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: var(--banner-primary);
    left: -15px;
    top: 11px;
  }
  .section-content {
    font-family: font-regular;
    font-size: 20px;
    margin-top: 10px;
    padding: 0 20px;
  }

  a {
    text-decoration: underline;
    font-family: font-regular;
    font-size: 19px;
  }
  .cities-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-family: font-semibold;
    font-size: 24px;
    padding: 0 20px;
    margin-top: 25px;
    margin-left: 20%;
  }
  .breaker-bar {
    width: 10%;
    height: 3px;
    background-color: var(--primary);
    border-radius: 3px;
    margin: 8px 0;
    margin-left: 22%;
  }
  .list-items {
    display: flex;
    flex-wrap: wrap;
    padding: 0 100px;
    margin-left: 20%;
  }
  .list-items li {
    flex: 50%;
  }
  .service-area-map {
    width: 80%;
    height: 80%;
    margin-top: 40px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .article-content {
      flex-direction: column;
    }
    .section-content {
      padding: 0;
    }
    .cities-button {
      width: 100%;
    }
    .service-area-map {
      margin-top: 25px;
      width: 100%;
    }
    .list-items {
      margin-left: 0%;
      padding: 0 20px;
    }
    .cities-button {
    font-size: 24px;
    padding: 0 20px;
    margin-top: 25px;
    margin-left: 0%;
  }
  .breaker-bar {
    width: 10%;
    height: 3px;
    background-color: var(--primary);
    border-radius: 3px;
    margin: 8px 0;
    margin-left: 6%;
  }
  }
</style>
