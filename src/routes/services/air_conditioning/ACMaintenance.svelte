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
  title="AIR CONDITIONING MAINTENANCE"
  machineDate="2023-10-18"
  date="10/18/2023"
  articleOwner="Randy Byrd, Owner"
/>
<div class="article-content content-width">
  <SectionContainer
    bannerContent="SECRET TO NON-STOP COOL"
    bannerScreenSide="left"
  >
    <p class="section-content">
      When the scorching heat of summer or the bitter chill of winter strikes,
      we all turn to our trusty air conditioning and heating systems to keep our
      homes comfortable and livable. But, have you ever stopped to consider the
      unsung heroes behind this comfort? That's right, your HVAC (Heating,
      Ventilation, and Air Conditioning) system!
      <br /><br />
      Your HVAC system is your faithful companion, tirelessly working to maintain
      the perfect indoor climate year-round. However, like all heroes, it too needs
      some tender loving care. This is where air conditioning maintenance comes into
      play.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="gauge-set-stock.jpg"
    photoCaption="Refrigerant gauge set used for tuning"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="technician-checking-outdoor-with-gauge-stock.jpg"
      photoCaption="Technician performing maintenance on condenser"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="WHY MAINTENANCE MATTERS"
    bannerScreenSide="right"
  >
    <p class="section-content">
      Air conditioning maintenance is not just a good idea; it's a crucial part
      of ensuring your comfort, saving you money, and extending the life of your
      HVAC system. It's the preventative care that keeps your system running at
      its best, preventing costly breakdowns and ensuring your energy bills
      don't skyrocket. In essence, it's your insurance policy against unexpected
      heating and cooling emergencies.
      <br /><br />
      But what does air conditioning maintenance entail? It's more than just changing
      the filter once in a while. It's a holistic approach to keeping your system
      in top shape. This includes cleaning, tuning, and inspecting various components,
      such as the evaporator and condenser coils, refrigerant levels, electrical
      connections, and more. A well-maintained system runs more efficiently, reduces
      energy consumption, and provides better indoor air quality.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="technician-checking-outdoor-with-gauge-stock.jpg"
      photoCaption="Technician performing maintenance on condenser"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer bannerContent="ALL THE BENEFITS" bannerScreenSide="left">
    <p class="section-content">
      The benefits of regular air conditioning maintenance go beyond mere
      comfort. Here are some compelling reasons to make it a priority:
      <br /><br />
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Energy Efficiency: </span> A well-maintained
          system uses less energy, lowering your utility bills and reducing your
          carbon footprint.
        </li>
        <li>
          <span class="semibold list-topic">Extended Lifespan: </span> Proper maintenance
          can add years to the life of your HVAC system, saving you the significant
          cost of premature replacement.
        </li>
        <li>
          <span class="semibold list-topic">Improved Air Quality: </span> Clean filters
          and well-maintained components mean cleaner, healthier air for you and
          your family.
        </li>
        <li>
          <span class="semibold list-topic">Prevent Breakdowns: </span> Nobody wants
          to endure a sweltering summer night or a freezing winter day without HVAC.
          Regular maintenance prevents unexpected system failures.
        </li>
        <li>
          <span class="semibold list-topic">Peace of Mind: </span> Knowing your HVAC
          system is in top condition gives you peace of mind, regardless of the weather
          outside.
        </li>
        <li>
          <span class="semibold list-topic">Preserve Warranties: </span> Many manufacturers
          require regular maintenance to keep warranties valid.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="maintenance-air-filter-stock.png"
    photoCaption="Installing a new air filter during maintenance"
    backgroundSide="right"
  />
  <SectionBreak />

  <p class="final-paragraph">
    So, whether you're a homeowner looking to save money and enhance your indoor
    comfort or a business owner seeking to create a pleasant working
    environment, air conditioning maintenance is the secret ingredient to
    success. Join us on this journey to unlock the full potential of your HVAC
    system and experience the joys of a perfectly controlled climate in your
    home or workplace.
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
