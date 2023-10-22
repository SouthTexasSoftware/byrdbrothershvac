<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;
</script>

<ArticleTitleBar
  title="EMERGENCY HVAC"
  machineDate="2023-10-16"
  date="10/16/2023"
  articleOwner="Randy Byrd, Owner"
/>
<div class="article-content content-width">
  <SectionContainer bannerContent="KEEPING YOUR COOL" bannerScreenSide="left">
    <p class="section-content">
      HVAC emergencies can strike at the most inconvenient times, whether it's
      the hottest day of summer or the coldest night of winter. The telltale
      signs are unmistakable: your air conditioner refusing to cool, your heater
      sputtering to life, or unusual sounds emanating from your HVAC unit. These
      situations can be not only uncomfortable but potentially hazardous,
      particularly in extreme weather conditions.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="frozen-evaporator-coil.jpg"
    photoCaption="Frozen evaporator coil in air handler"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="failed-capacitor.jpg"
      photoCaption="Failure of compressor capacitor"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="OUR PROMPT RESPONSE"
    bannerScreenSide="right"
  >
    <p class="section-content">
      In an HVAC emergency, every minute counts. Swift action is essential to
      prevent further damage, ensure your safety, and restore your indoor
      comfort. Delaying repairs can lead to increased energy bills, further
      system breakdowns, and the risk of costly, major repairs. That's where
      Byrd Brothers HVAC comes to the rescue.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="failed-capacitor.jpg"
      photoCaption="Failure of compressor capacitor"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer>
    <p class="section-content">
      We are equipped to handle a wide range of HVAC emergencies, including:
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Air Conditioning Failures: </span> Whether
          it's a refrigerant leak, a faulty compressor, or a broken thermostat, we
          can swiftly diagnose and repair your AC system.
        </li>
        <li>
          <span class="semibold list-topic">Heating System Malfunctions: </span>
          From pilot light issues to a malfunctioning furnace, our experts can restore
          your heat on chilly winter nights.
        </li>
        <li>
          <span class="semibold list-topic">Clogged or Frozen Pipes: </span> Burst
          pipes, frozen coils, or blocked ducts can disrupt your HVAC system. Our
          team can promptly address these issues.
        </li>
        <li>
          <span class="semibold list-topic">Electrical Problems: </span> Faulty wiring
          or electrical malfunctions in your HVAC system can be dangerous. We're
          here to resolve these issues safely.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="fan-motor-sketch.png"
    photoCaption="Failure point: outdoor fan motor"
    backgroundSide="none"
  />
  <SectionBreak />

  <p class="final-paragraph">
    In a heating or cooling emergency, you need a reliable partner by your side.
    We are here to provide expert solutions, restore your comfort, and keep your
    home safe. Don't compromise on your well-being; contact us anytime an HVAC
    emergency strikes. We're ready to keep you cool in the summer, warm in the
    winter, and comfortable year-round.
    <a href="tel:+19794808444">Call us today</a>.
  </p>
  <SectionContainer bannerContent="GET A QUOTE!" bannerScreenSide="left" bannerDescription="Free estimates for any size job.">
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
    font-family: font-regular;
    font-size: 20px;
    margin-bottom: 50px;
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
