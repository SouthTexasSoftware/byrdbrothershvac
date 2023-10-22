<script lang="ts">
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
  <SectionContainer bannerContent="GATEWAY TO COMFORT" bannerScreenSide="left">
    <p class="section-content">
      When it comes to maintaining a comfortable home or business, it's not just
      about your heating and cooling systems; it's also about how well your
      property is insulated. We understand the pivotal role of insulation in
      ensuring year-round comfort and energy efficiency. Our attic and ducting
      insulation services are designed to transform your space into a haven of
      warmth in winter and coolness in summer.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="ducting-insulation-stock.png"
    photoCaption="Rolls of ducting insulation"
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="blown-in-insulation.jpg"
      photoCaption="Blown-in attic insulation"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer bannerContent="THE SILENT HERO" bannerScreenSide="right">
    <p class="section-content">
      In the quest for a comfortable living or working environment, it's easy to
      overlook one of the unsung heroes – insulation. Yet, this often hidden
      component is the linchpin of year-round comfort, energy efficiency, and
      sustainability for homes and buildings alike.
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Temperature Control: </span> Insulation
          is the primary defense against outdoor temperature extremes. During winter,
          it keeps the warmth inside and prevents cold air from infiltrating your
          space. In summer, it acts as a barrier, preventing excess heat from seeping
          in. This temperature control translates to consistent comfort and reduced
          reliance on heating and cooling systems, saving energy and lowering utility
          bills.
        </li>
        <li>
          <span class="semibold list-topic">Energy Efficiency: </span> Well-insulated
          structures are inherently more energy-efficient. They require less energy
          to maintain comfortable temperatures, resulting in reduced energy consumption
          and lower greenhouse gas emissions. This is not only beneficial for your
          wallet but also for the environment.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="blown-in-insulation.jpg"
      photoCaption="Blown-in attic insulation"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Cost Savings: </span> Lower energy bills
          are a direct outcome of effective insulation. With less heat transfer through
          walls, roofs, and floors, your HVAC system operates more efficiently, leading
          to substantial cost savings over time. It's an investment that pays for
          itself through reduced utility expenses.
        </li>
        <li>
          <span class="semibold list-topic">Improved Indoor Air Quality: </span>
          Insulation also contributes to indoor air quality. By sealing gaps and
          cracks, it prevents the infiltration of outdoor pollutants, dust, and allergens.
          This is especially critical for those with respiratory issues or allergies,
          as it ensures cleaner and healthier indoor air.
        </li>
        <li>
          <span class="semibold list-topic">Noise Reduction: </span> Insulation isn't
          just about temperature control; it's also a buffer against noise. Properly
          insulated homes and buildings enjoy enhanced soundproofing, reducing the
          intrusion of external noises and providing a quieter, more peaceful interior.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="fiberglass-batt-insulation.jpg"
    photoCaption="Fiberglass batt insulation rolls"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="insulation-r-value-graphic.jpg"
      photoCaption="Energy Star: R-Value recommendations"
      backgroundSide="none"
    />
  {/if}
  <SectionContainer>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Sustainability: </span> Effective insulation
          aligns with sustainable living. Reduced energy consumption means a smaller
          carbon footprint, contributing to a greener and more eco-friendly lifestyle.
          It's a way to reduce your environmental impact while enjoying comfort.
        </li>
        <li>
          <span class="semibold list-topic">Increased Property Value: </span> Insulated
          homes and buildings are more appealing to buyers and tenants. They provide
          superior comfort and cost savings, making them attractive options in the
          real estate market. This can enhance the value of your property and make
          it a wise investment.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="insulation-r-value-graphic.jpg"
      photoCaption="Energy Star: R-Value recommendations"
      backgroundSide="none"
    />
  {/if}

  <p class="final-paragraph">
    <br /><br />
    In conclusion, insulation isn't just an afterthought; it's an integral part of
    any comfortable and efficient living or working space. It's the silent hero that
    ensures year-round comfort, cost savings, and sustainability while preserving
    the quality of indoor air and soundproofing. By insulating your home or building,
    you're creating a space that not only feels better but also works smarter, reducing
    your environmental footprint and adding value to your property. It's an investment
    in comfort, savings, and a better quality of life.
    <a href="tel:+19794808444">Call us today</a> if you're ready to invest!
  </p>
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
