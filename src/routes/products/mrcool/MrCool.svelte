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
    bannerContent="COOL ANYWHERE & EVERYWHERE"
    bannerScreenSide="left"
  >
    <p class="section-content">
      Probably best known for their ductless mini-splits, we partnered with
      <a class="paragraph-link" href="https://mrcool.com/">MRCOOL</a> to offer high-efficiency and
      innovative HVAC products. Perfect for an air conditioned garage, air
      conditioned shop, air conditioned mancave, you name it! These products are
      easy to install and can get you <span class="cool">cool</span>
      fast! A small footprint and low power consumption give you a new world of options.
      <a href="tel:+19794808444">Give us a call</a> to discuss yours!
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="mrcool-indoor-outdoor.png"
    photoCaption="A complete system!"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="mrcool-mounted-outside.png"
      photoCaption="Install Anywhere!"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer bannerContent="LEARN MORE" bannerScreenSide="right">
    <div class="section-content">
      Let us help you get the right product for you!
      <ol>
        <li>
          <span class="semibold">Energy Consumption: </span>How much will it
          cost to run every month? We can help you find out!
        </li>
        <li>
          <span class="semibold">Temperature Control: </span>Most new units can
          be controlled directly from your smartphone! Cool the house down on
          your way home from the football game.
        </li>
        <li>
          <span class="semibold">Warranty: </span>One of the best in the
          industry. 5 Year Warranty is standard, with optional warranties
          available for peace of mind!
        </li>
        <li>
          <span class="semibold">Salty Air: </span>MRCOOL products are prepared
          for the Texas Gulf Coast with corrosion resistant condensors - built
          for our outdoor elements.
        </li>
      </ol>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="mrcool-mounted-outside.png"
      photoCaption="Install Anywhere!"
      backgroundSide="left"
    />
  {/if}
  <p class="final-paragraph">
    <br />
    Don't let space or budget stop you from staying cool in the Texas heat! To learn
    more, contact us at
    <a href="tel:+19794808444">(979) 480-8444</a>. Stay ahead of the curve and
    ensure your home comfort with Byrd Brothers HVAC!
  </p>
</div>

<div class="article-content content-width">
  <SectionContainer bannerContent="NEED A MINISPLIT?" bannerScreenSide="left">
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
