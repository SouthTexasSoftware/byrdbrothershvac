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
  <SectionContainer bannerContent="BREATHE EASY" bannerScreenSide="left">
    <p class="section-content">
      In the quest for a comfortable living or working environment, it's easy to
      overlook one of the critical factors – indoor air quality. The quality of
      the air we breathe has a profound impact on our well-being, and it's an
      area we are passionate about helping with. Learn more about the affect of
      air quality on the topics below!
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="ruud-air-filter-cartridge.png"
    photoCaption="Premium air filter cartridge"
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="maintenance-air-filter-stock.png"
      photoCaption="Installation of new air filter"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="AIR QUALITY MATTERS"
    bannerScreenSide="right"
  >
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Health and Well-Being: </span> Air quality
          services are not just about comfort; they're about safeguarding your health.
          Poor indoor air quality can lead to a range of health issues, from allergies
          and respiratory problems to more severe conditions. Professional air quality
          services ensure that your space remains a haven of health and well-being.
        </li>
        <li>
          <span class="semibold list-topic"
            >Allergen and Pollutant Removal:
          </span> Indoor air can be laden with allergens, dust, pollutants, and even
          microorganisms. Air quality services encompass air purification and filtration
          systems that capture and remove these contaminants, allowing you to breathe
          cleaner, healthier air.
        </li>
        <li>
          <span class="semibold list-topic"> Humidity Control: </span> Optimal indoor
          humidity levels are essential for your comfort and health. Air quality
          services may include humidification and dehumidification systems, maintaining
          the right balance to prevent dry air discomfort or mold growth due to excess
          moisture.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="maintenance-air-filter-stock.png"
      photoCaption="Installation of new air filter"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic"
            >Improved Sleep and Productivity:
          </span> Clean and properly humidified air can lead to better sleep quality
          and increased productivity. When you can breathe easily and comfortably,
          you're more likely to enjoy a restful night's sleep and maintain focus
          throughout the day.
        </li>
        <li>
          <span class="semibold list-topic">Odor Reduction: </span>
          Effective air quality solutions can eliminate unwanted odors, leaving your
          space smelling fresh and clean. Whether it's cooking odors or other unpleasant
          scents, air quality services can restore a pleasant ambiance.
        </li>
        <li>
          <span class="semibold list-topic">Enhanced HVAC Efficiency: </span> Air
          quality services can also boost the efficiency of your HVAC system. By
          keeping the system clean and free of dust and debris, it operates more
          smoothly, extending its lifespan and reducing energy consumption.
        </li>
        <li>
          <span class="semibold list-topic">Peace of Mind: </span> With professional
          air quality services, you gain peace of mind knowing that the air you and
          your loved ones breathe is safe, clean, and free of harmful contaminants.
          It's an investment in your family's well-being.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="air-quality-index.png"
    photoCaption="AQI chart"
    backgroundSide="none"
  />
  <SectionBreak />

  <p class="final-paragraph">
    In conclusion, air quality services are not a luxury but a fundamental
    necessity for a healthier, more comfortable life. They ensure that your home
    or workplace remains a place of safety and well-being, free from allergens,
    pollutants, and odors. Whether it's protecting your health, improving your
    sleep, or enhancing productivity, air quality services and proper
    maintenance are a crucial component of your comfort and overall quality of
    life.
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
