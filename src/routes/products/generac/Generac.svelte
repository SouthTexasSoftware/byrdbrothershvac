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
    bannerContent="DON'T GET LEFT IN THE COLD"
    bannerScreenSide="left"
  >
    <p class="section-content">
      <span class="semibold"
        >Ensure Winter Safety and Comfort with Generac Generators!</span
      >
      <br /><br />
      As winter approaches and temperatures drop, the last thing you want is to be
      caught off guard by a power outage. Keep your family, pets, and pipes warm
      with a
      <a class="paragraph-link" href="https://www.generac.com/all-products/generators"
        >Generac Generator</a
      > running your HVAC system! We are happy to partner with a high quality and
      affordable backup power solution provider.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="generac-authorized-dealer-logo.png"
    photoCaption="Heating, Cooling, & POWER!"
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="generac-by-home.jpg"
      photoCaption="Be Prepared and Show It!"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="THERE AT EVERY STEP"
    bannerScreenSide="right"
  >
    <div class="section-content">
      We can help answer all your questions & then execute!
      <ol>
        <li>
          <span class="semibold">Power Requirements: </span>What size generator
          do you really need?
        </li>
        <li>
          <span class="semibold">Unit Placement: </span>Where will your
          generator fit best? How will this affect fuel and electrical hookup
          costs?
        </li>
        <li>
          <span class="semibold">Auto vs Manual: </span>Looking for hands-off
          automatic start, or only run it when you need it?
        </li>
        <li>
          <span class="semibold">Service & Upkeep: </span>When does the oil get
          changed? What filters should I have on-hand?
        </li>
      </ol>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="generac-by-home.jpg"
      photoCaption="Be Prepared and Show It!"
      backgroundSide="left"
    />
  {/if}

  <p class="final-paragraph">
    <br />
    We hope to be your resource and guide to keeping your home comfortable during
    power outages. Let us give you a free estimate, or just call if you're curious!
    Contact us at
    <a href="tel:+19794808444">(979) 480-8444</a>. Stay ahead of the curve and
    ensure your home comfort with Byrd Brothers HVAC!
  </p>
</div>

<div class="article-content content-width">
  <SectionContainer bannerContent="GET POWERED UP!" bannerScreenSide="left">
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
