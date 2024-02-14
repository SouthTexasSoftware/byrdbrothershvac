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
  <SectionContainer bannerContent="TIME TESTED" bannerScreenSide="left">
    <p class="section-content">
      RUUD has been a trusted name and brand since 1897 - <span class="semibold"
        >over 100 years expertise!
      </span>We choose to support RUUD and their products because they will do
      right by you and us. They offer a HUGE range of air conditioning and
      heating systems from heat pumps, gas furnaces, central AC, thermostats,
      and more! If you're thinking about replacing your existing air
      conditioner, or starting on a new building, let us walk you through a
      solution by RUUD. Check out the full list of their products at the
      <a  class="paragraph-link" href="https://www.ruud.com/products/hvac/">RUUD HVAC website.</a>
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="ruud-pro-partner.png"
    photoCaption=""
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="ruud-outdoor-unit.png"
      photoCaption="RUUD Air Conditioner"
      backgroundSide="none"
    />
  {/if}
  <SectionContainer bannerContent="WHAT TO EXPECT" bannerScreenSide="right">
    <div class="section-content">
      Let us help you make an educated decision! We are here to help, whether
      you choose RUUD or not.

      <ol>
        <br />
        <li>
          <span class="semibold">Capacity and Sizing: </span>We can determine
          the heating and cooling demands of your building. Too much cooling
          capacity and your unit starts and stops too frequently, which causes
          wear on the equipment. Too little capacity leaves you in a warm home
          on Texas' hottest days.
        </li>
        <li>
          <span class="semibold">Energy efficiency: </span>We want to deliver
          the most bang for your buck, not only for our service but for years to
          come. Selecting the most energy efficient unit within your budget is
          the only way we do it.
        </li>
        <li>
          <span class="semibold">Warranty: </span>Strong warranty coverage for
          equipment and installation is paramount. You pay for something to
          last, and it should. Sticking with a reputable brand and HVAC company
          for a proffessional service means that you are covered!
        </li>
      </ol>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="ruud-outdoor-unit.png"
      photoCaption="RUUD Air Conditioner"
      backgroundSide="none"
    />
  {/if}

  <p class="final-paragraph">
    <br /><br />
    If you're considering an upgrade, replacement, or new install -
    <a href="tel:+19794808444">give us a call</a>
    to see how RUUD compares! Stay ahead of the curve and ensure your home comfort
    with Byrd Brothers HVAC!
  </p>
</div>

<div class="article-content content-width">
  <SectionContainer bannerContent="HOW CAN WE HELP?" bannerScreenSide="left">
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
