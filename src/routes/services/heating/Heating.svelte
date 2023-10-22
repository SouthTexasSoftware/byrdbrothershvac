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
  <SectionContainer
    bannerContent="THE COLD FRONT IS HERE"
    bannerScreenSide="left"
  >
    <p class="section-content">
      When the chill of winter arrives or the mercury takes a plunge, there's
      nothing quite as reassuring as a reliable heating system. It's the heart
      of your home, the source of warmth and comfort on the coldest of days. At
      Byrd Brothers HVAC, we take pride in being your trusted partner in all
      things heating, offering a comprehensive suite of services designed to
      keep you cozy, regardless of the season.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="furnace-burners.jpg"
    photoCaption="Attic furnace burner flames"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="furnace-flame-sensor.png"
      photoCaption="Furnace flame sensor"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="HEATING INSTALLATION"
    bannerScreenSide="right"
  >
    <p class="section-content">
      Our services begin with the installation of cutting-edge heating systems
      that cater to your specific needs. Whether you're a homeowner seeking a
      new furnace or a business owner in need of a commercial heating solution,
      we've got you covered. Our installation services include:
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">New System Installation: </span> NWe
          can expertly install brand-new heating systems, ensuring energy efficiency
          and the latest technology to meet your comfort requirements.
        </li>
        <li>
          <span class="semibold list-topic">System Replacement: </span> If your old
          heating system is showing signs of age or inefficiency, we offer seamless
          replacements with top-of-the-line, energy-efficient models.
        </li>
        <li>
          <span class="semibold list-topic">Upgrades and Retrofits: </span> We specialize
          in enhancing existing heating systems with upgrades and retrofits, optimizing
          their performance and compatibility with modern technology.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="furnace-flame-sensor.png"
      photoCaption="Furnace flame sensor"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer bannerContent="HEATING REPAIRS" bannerScreenSide="left">
    <p class="section-content">
      We understand that heating system failures can happen when you least
      expect them. That's why we offer prompt and reliable repair services to
      restore your comfort. Our repair services include:
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic"
            >Troubleshooting and Diagnostics:
          </span> Our skilled technicians can quickly identify and diagnose issues,
          getting to the root of the problem.
        </li>
        <li>
          <span class="semibold list-topic">Component Repairs: </span> Whether it's
          a malfunctioning burner, igniter, thermostat, or motor, we have the expertise
          to repair or replace components as needed.
        </li>
        <li>
          <span class="semibold list-topic"
            >Gas Leak Detection and Repair
          </span> Gas leaks are a serious concern. If you detect a gas odor, our
          experts are ready to inspect and repair gas-powered heating systems to
          ensure safety.
        </li>
        <li>
          <span class="semibold list-topic">Heat Exchanger Repair: </span>We can
          address heat exchanger issues to prevent carbon monoxide leaks and
          ensure safe operation.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="furnace-heat-exchanger.jpg"
    photoCaption="Attic furnace heat exchanger"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="ruud-furnace.png"
      photoCaption="New furnace for inline install"
      backgroundSide="none"
    />
  {/if}
  <SectionContainer
    bannerContent="SCHEDULED MAINTENANCE"
    bannerScreenSide="right"
  >
    <p class="section-content">
      Preventive maintenance is the key to a trouble-free heating system. Our
      scheduled maintenance services include:
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Annual Tune-Ups: </span> We offer annual
          check-ups to ensure your heating system operates efficiently and to prevent
          unexpected breakdowns.
        </li>
        <li>
          <span class="semibold list-topic">Cleaning and Inspections: </span> Our
          technicians meticulously clean critical components and inspect the entire
          system for wear and tear.
        </li>
        <li>
          <span class="semibold list-topic">Filter Replacement: </span> We make sure
          your filters are replaced regularly to maintain indoor air quality and
          system efficiency.
        </li>
        <li>
          <span class="semibold list-topic">Safety Checks: </span>Verifying the
          safe operation of your heating system is a top priority, especially
          for gas-powered systems.
        </li>
      </ul>
    </div>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="ruud-furnace.png"
      photoCaption="New furnace for inline install"
      backgroundSide="none"
    />
  {/if}

  <p class="final-paragraph">
    <br /><br />
    We're not just in the business of heating; we're in the business of ensuring
    your year-round comfort. Whether you require heating system installation, repairs,
    maintenance, or emergency services, you can trust us to keep your home or business
    cozy and warm. Don't let heating issues disrupt your comfort –
    <a href="tel:+19794808444">call us today</a>, and experience warmth and
    comfort all year round.
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
