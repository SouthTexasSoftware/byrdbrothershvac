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
    bannerContent="SPRING SPECIAL: $125"
    bannerScreenSide="left"
  >
    <p class="section-content">
      As spring blooms and temperatures begin to rise, it's crucial to ensure
      your air conditioning system is ready to keep you cool during the warmer
      months. With our Seasonal Maintenance Program, for just <span
        class="semibold cool">$125</span
      >, you'll receive comprehensive AC system maintenance performed by our
      skilled technicians. From cleaning coils to checking refrigerant levels
      and inspecting electrical components, we'll ensure your AC system operates
      at peak performance when you need it most.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="dual-ac-units-with-leaves.png"
    photoCaption="The Spring Warm Up"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="fall-leaves-ac-unit.png"
      photoCaption="Winter Prep Season"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer bannerContent="FALL SPECIAL: $99" bannerScreenSide="right">
    <p class="section-content">
      As the temperatures start to cool, it's time to shift focus to your
      heating system's reliability and efficiency. With our Seasonal Maintenance
      Program, enjoy peace of mind for just $99 with our thorough heating system
      maintenance service. Our technicians will conduct detailed inspections,
      perform necessary tune-ups, and ensure your furnace or heat pump is primed
      to keep you warm and comfortable throughout the chilly season.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="fall-leaves-ac-unit.png"
      photoCaption="Winter Prep Season"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <div>
    <h3 class="semibold">
      Benefits of Joining Our Seasonal Maintenance Program
    </h3>
    <ol>
      <li>
        Convenient annual maintenance appointments tailored to your schedule
      </li>
      <li>Priority service and scheduling for maintenance visits</li>
      <li>
        Regular inspections to catch potential issues early and prevent costly
        repairs
      </li>
      <li>Transparent pricing with no surprises</li>
      <li>
        Expert service from certified technicians dedicated to your comfort and
        satisfaction
      </li>
    </ol>
  </div>
  <p class="final-paragraph">
    <br /><br />
    Don't let seasonal HVAC maintenance slip your mind—join our Maintenance Program
    today and enjoy worry-free comfort year-round! To learn more, contact us at
    <a href="tel:+19794808444">(979) 480-8444</a>. Stay ahead of the curve and
    ensure your home comfort with Byrd Brothers HVAC!
  </p>
</div>

<div class="article-content content-width">
  <SectionContainer
    bannerContent="JOIN THE PROGRAM!"
    bannerScreenSide="left"
  >
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
