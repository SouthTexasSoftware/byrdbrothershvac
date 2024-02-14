<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;

  export let include_quote_form = true;
</script>

<ArticleTitleBar
  title="AIR CONDITIONING INSTALLATION"
  machineDate="2023-10-16"
  date="10/16/2023"
  articleOwner="Brady Byrd, Owner"
/>
<div class="article-content content-width">
  <SectionContainer bannerContent="A NEW TYPE OF COOL" bannerScreenSide="left">
    <p class="section-content">
      Is your home, shop, or small business in need of a completely new cooling
      system? We are here to help. Whether it’s a full replacement or brand new
      install, our team of highly trained technicians is here for you from
      planning to completion. If you’re not sure what size, model, or type of
      air conditioner to install - we would love to have a conversation and make
      recommendations.
      <br /><br />
      There are many reasons why people choose to install a new air conditioner,
      I have highlighted some below.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="servicing-outdoor-unit-SQUARE.png"
    photoCaption="Byrd Brothers installing new air conditioner"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="ruud-outdoor-unit.png"
      photoCaption="Latest model of home outdoor unit"
      backgroundSide="none"
    />
  {/if}
  <SectionContainer bannerContent="WHY START FRESH?" bannerScreenSide="right">
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Improved Energy Efficiency: </span> Newer
          air conditioning systems are typically more energy-efficient, leading to
          lower utility bills and reduced energy consumption.
        </li>
        <li>
          <span class="semibold list-topic"
            >Enhanced Cooling Performance:
          </span> New AC units can cool a space more effectively and maintain a consistent
          temperature, providing greater comfort.
        </li>
        <li>
          <span class="semibold list-topic">Reduced Maintenance Costs: </span> Older
          units often require more frequent repairs and maintenance, which can be
          costly over time. A new AC system can lower maintenance expenses.
        </li>
        <li>
          <span class="semibold list-topic">Better Indoor Air Quality: </span> Modern
          AC units come with improved air filtration systems, which can help remove
          allergens, dust, and pollutants, leading to better indoor air quality.
        </li>
        <li>
          <span class="semibold list-topic">Quieter Operation: </span> Newer models
          are designed to operate more quietly, reducing noise disturbances in the
          home or workplace.
        </li>
        <li>
          <span class="semibold list-topic"
            >Smart Technology Integration:
          </span> Many new AC systems are compatible with smart home technology,
          allowing for remote control and energy-saving features.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="ruud-outdoor-unit.png"
      photoCaption="Latest model of home outdoor unit"
      backgroundSide="none"
    />
  {/if}
  <SectionBreak />
  <SectionContainer>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic"
            >Environmental Considerations:
          </span> Upgrading to a more efficient system can be environmentally responsible
          by reducing carbon emissions and energy consumption.
        </li>
        <li>
          <span class="semibold list-topic">Improved Comfort: </span> New systems
          can provide better humidity control, even cooling, and more even distribution
          of air throughout the space.
        </li>
        <li>
          <span class="semibold list-topic">Warranty Benefits: </span> New air conditioners
          often come with warranties that can provide peace of mind in case of unexpected
          issues.
        </li>
        <li>
          <span class="semibold list-topic">Refrigerant Changes: </span> Some older
          AC units use refrigerants that are being phased out due to environmental
          concerns. Upgrading ensures compliance with newer, eco-friendly refrigerants.
        </li>
        <li>
          <span class="semibold list-topic">Increased Property Value: </span> Installing
          a new AC system can enhance the value of a property, making it more attractive
          to potential buyers or renters.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="mrcool-outdoor-unit.jpg"
    photoCaption="High efficiency minisplit outdoor unit"
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="ruud-air-handler.png"
      photoCaption="Attic air handler for central AC"
      backgroundSide="none"
    />
  {/if}
  <SectionContainer>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Personal Preference: </span> Sometimes,
          homeowners or businesses simply prefer the latest technology and features
          offered by new air conditioning units.
        </li>
        <li>
          <span class="semibold list-topic">Old System Failure: </span> If an existing
          AC unit is failing or has frequent breakdowns, it may be more cost-effective
          to replace it with a new one.
        </li>
        <li>
          <span class="semibold list-topic">Home Renovations: </span> During home
          renovations or additions, it might be necessary to install a new AC system
          to accommodate the increased space or layout changes.
        </li>
        <li>
          <span class="semibold list-topic">Health Considerations: </span> Individuals
          with health concerns may benefit from the improved air quality and more
          consistent temperature control offered by newer units.
        </li>
        <li>
          <span class="semibold list-topic"
            >Utility Rebates and Incentives:
          </span> Many utility companies and government programs offer incentives
          or rebates for upgrading to energy-efficient air conditioning systems.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="ruud-air-handler.png"
      photoCaption="Attic air handler for central AC"
      backgroundSide="none"
    />
  {/if}
  <p class="final-paragraph">
    <br /><br />
    When considering installing a new air conditioner, it's important to assess your
    specific needs and budget. We are here to help you make an informed decision!
    <a href="tel:+19794808444">Call us today</a>.
  </p>
  {#if include_quote_form}
    <SectionContainer
      bannerContent="GET A QUOTE!"
      bannerScreenSide="left"
      bannerDescription="Free estimates for any size job."
    >
      <RequestAQuote />
    </SectionContainer>
  {/if}
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
    font-family: font-regular;
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
