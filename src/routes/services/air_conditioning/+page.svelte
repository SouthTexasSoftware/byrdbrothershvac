<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";
  import ACInstallation from "./ACInstallation.svelte";
  import AcRepair from "./ACRepair.svelte";
  import AcMaintenance from "./ACMaintenance.svelte";
  import EmergencyHvac from "./EmergencyHVAC.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Air Conditioning Services in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="We specialize in air conditioning installation, repair, and maintenance with a satisfaction guarantee."
  />
</svelte:head>

<ViewTitleBar title="Air Conditioning" />

<div class="main-page-container content-width">
  <p class="main-page-content">
    Byrd Brothers HVAC specializes in Air Conditioning Services in Brazoria
    County and Matagorda County of South Texas, with close proximity to Sweeny,
    Brazoria, and Lake Jackson, TX.
    <br /><br />
    From new air conditioning installation and whole system replacement, to routine
    maintenance and emergency repairs, we are your local experts in keeping your
    home cool and comfortable. We pride ourselves in being a family-owned business
    that treats our customers like one of our own. <a href="/contact/quote_form">Request a quote!</a>
    <br /><br />
    Scroll down or click below to learn more about our AC services:
  </p>
  <div class="link-container">
    <a href="/services/air_conditioning/installation">AC Installation</a>
    <a href="/services/air_conditioning/repair">AC Repair</a>
    <a href="/services/air_conditioning/maintenance">AC Maintenance</a>
    <a href="/services/air_conditioning/emergency">Emergency HVAC</a>
  </div>
</div>
<div class="divider-bar content-width" />

<ACInstallation {mobile}/>
<div class="divider-bar content-width" />
<AcRepair {mobile} />
<div class="divider-bar content-width" />
<AcMaintenance {mobile} />
<div class="divider-bar content-width" />
<EmergencyHvac {mobile} />

<div class="article-content content-width">
    <SectionContainer bannerContent="GET A QUOTE!" bannerScreenSide="left" bannerDescription="Free estimates for any size job.">
      <RequestAQuote />
    </SectionContainer>
</div>

<style>
  .main-page-container {
    padding: 0 200px;
  }
  .main-page-content {
    font-size: 20px;
  }
  .link-container {
    display: flex;
    flex-direction: column;
  }
  a {
    font-size: 20px;
    text-decoration: underline;
  }
  .divider-bar {
    width: 50vw;
    max-width: 1920px;
    height: 2px;
    background-color: var(--light-text);
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .main-page-container {
    padding: 0;
  }
  .divider-bar {
    width: 90vw;
  }
  }
</style>
