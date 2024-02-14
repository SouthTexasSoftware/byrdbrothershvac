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
  <SectionContainer bannerContent="SIMPLE & EFFECTIVE" bannerScreenSide="left">
    <p class="section-content">
      <span class="semibold">Upfront Pricing:</span> $150 installed!
      
      <br /><br />
      Are you tired of feeling drafts and losing valuable energy through your attic
      access door? Say goodbye to wasted energy and hello to year-round comfort with
      this awesome product. An attic door tent is a simple yet effective solution
      to seal off your attic access and keep conditioned air where it belongs — in
      your home.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="attic-tent-personal-demo.png"
    photoCaption=""
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="attic-tent-insulator.png"
      photoCaption="Installed & Sealed Attic Tent"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer bannerContent="LEARN MORE" bannerScreenSide="right">
    <div class="section-content">
      <ol>
        <li>
          <span class="semibold">Seals Against Allergens and Dust: </span>It
          acts as a barrier, preventing attic dust and allergens from entering
          the home.
        </li>
        <li>
          <span class="semibold">Reflects Heat and Cold: </span>The insulator
          reflects heat and cold away from the attic door, maintaining
          consistent temperatures.
        </li>
        <li>
          <span class="semibold">Barrier Against Insects and Rodents: </span>It
          forms an effective shield, keeping unwanted pests out.
        </li>
        <li>
          <span class="semibold">Zero Operation Costs: </span>This attic
          stairway insulator requires no additional expenses to operate.
        </li>
      </ol>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="attic-tent-insulator.png"
      photoCaption="Installed & Sealed Attic Tent"
      backgroundSide="left"
    />
  {/if}
  <p class="final-paragraph">
    <br />
    Don't let the simple problems cost you in the long run! Contact us at
    <a href="tel:+19794808444">(979) 480-8444</a>. Stay ahead of the curve and
    ensure your home comfort with Byrd Brothers HVAC!
  </p>
</div>

<div class="article-content content-width">
  <SectionContainer bannerContent="SCHEDULE A VISIT!" bannerScreenSide="left">
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
