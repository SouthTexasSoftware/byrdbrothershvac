<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;
</script>

<!-- <ArticleTitleBar
    title="AIR CONDITIONING INSTALLATION"
    machineDate="2023-10-16"
    date="10/16/2023"
    articleOwner="Brady Byrd, Owner"
  /> -->
<div class="article-content content-width">
  <SectionContainer
    bannerContent="ActivePure Technology"
    bannerScreenSide="left"
  >
    <p class="section-content">
      <span class="semibold">Upfront Pricing:</span> $950 installed!
      <br />
      <span class="semibold">30 Day Money Back Guarantee</span>
      <br /><br />
      Are you looking for a powerful solution to purify the air in your home and
      protect your family's health? Look no further than the
      <a class="paragraph-link" href="https://www.airscrubberbyaerus.com/"
        >Air Scrubber by Aerus</a
      >—a cutting-edge air purification system that harnesses the power of
      ActivePure technology to create a cleaner and healthier indoor
      environment. At Byrd Brothers HVAC, we're proud to offer this
      revolutionary product to our valued customers.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="air-scrubber-chart-1.png"
    photoCaption="Bacteria Reduction over 24 hours"
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="air_scrubber.jpg"
      photoCaption="Installed in existing ductwork"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer bannerContent="LEARN MORE" bannerScreenSide="right">
    <p class="section-content">
      The AirScrubber by Aerus® attaches directly to the HVAC system ductwork
      to reduce viruses, bacteria, and other contaminants in the ambient air and
      on surfaces while the HVAC fan is running. Patented ActivePure is an
      advanced surface and air purification technology. It has been proven to
      reduce up to 99.9% of many common airborne and surface contaminants.
      <br />
      <a href="https://www.airscrubberbyaerus.com/"
        >Read more from the source!</a
      >
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="air_scrubber.jpg"
      photoCaption="Installed in existing ductwork"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
</div>

<div class="article-content content-width">
  <SectionContainer bannerContent="DROP US A LINE!" bannerScreenSide="left">
    <RequestAQuote />
  </SectionContainer>
</div>

<style>
  .article-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .list-topic {
    font-size: 20px;
  }
  h3 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
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
  .final-paragraph {
    padding: 0 200px;
    margin-bottom: 50px;
    font-size: 20px;
  }
  a {
    text-decoration: underline;
    font-family: font-regular;
    font-size: 19px;
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
    .final-paragraph {
      padding: 0 0px;
    }
  }
</style>
