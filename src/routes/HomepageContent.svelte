<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import DropdownButton from "$lib/components/layout/DropdownButton.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import GoogleReviews from "$lib/components/photos/GoogleReviews.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let screenWidth: number;

  let mobile = false;
  let desktop = false;

  let showCitiesList = false;

  $: if (screenWidth < 600) {
    mobile = true;
    desktop = false;
  } else {
    desktop = true;
    mobile = false;
  }
</script>

<div class="homepage-content content-width">
  <h2 class="service-statement">
    Specializing in <a href="/services/air_conditioning/installation"
      >AC Installation</a
    >, <a href="/services/air_conditioning/repair">AC Repair</a>,
    {#if mobile}
      <br />
    {/if}
    <a href="/services/air_conditioning/maintenance">AC Maintenance</a>, and
    <a href="/services/insulation/installation">Insulation Installation</a>.
  </h2>
  <GoogleReviews />
  <SectionContainer
    bannerContent={"REQUEST A QUOTE!"}
    bannerScreenSide={"left"}
    bannerDescription={"Get an estimate for any size job."}
  >
    <RequestAQuote />
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename={"servicing-outdoor-unit-SQUARE.png"}
    backgroundSide={"right"}
    photoCaption={"A/C health check and tune-up services being performed"}
  />
  <SectionBreak />
  {#if desktop}
    <PhotoSingleBlock
      photoFilename={"new-outdoor-unit-SQUARE.png"}
      backgroundSide={"left"}
      photoCaption={"New A/C outdoor unit installed and running"}
    />
  {/if}

  <SectionContainer
    bannerContent={"COUNT ON COMFORT!"}
    bannerScreenSide="right"
  >
    <p class="section-content">
      Make sure you home stays <a class="warm" href="/services/heating">warm</a>
      in the winter and
      <a class="cool" href="/services/air_conditioning">cool</a>
      in the summer with Byrd Brothers HVAC. Family owned and operated, we stand
      by our work with a
      <span class="semibold">100% satisfaction guarantee</span>.
      <br />
      <br />
      <a class="primary" href="/about/meet_team">Meet The Team</a>! And see why
      we will treat you like family too.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename={"new-outdoor-unit-SQUARE.png"}
      backgroundSide={"left"}
      photoCaption={"New A/C outdoor unit installed and running"}
    />
  {/if}
  <SectionBreak />
  <SectionContainer bannerContent={"SERVICE AREAS"} bannerScreenSide="left">
    <p class="section-content">
      Based out of Sweeny, Texas we are uniquely positioned to provide services
      to <span class="semibold">Brazoria County</span> and
      <span class="semibold">Matagorda County</span>.
      <br />
      <br />
      Our main cities of operation include
      <a
        href="https://www.google.com/maps/place/Sweeny,+TX+77480/@29.0459123,-95.7114511,15z/data=!3m1!4b1!4m6!3m5!1s0x86404ced90bbbcc3:0x79de8e90552c333c!8m2!3d29.0388615!4d-95.6985608!16zL20vMF95c2g?entry=ttu"
        >Sweeny</a
      >,
      <a
        href="https://www.google.com/maps/place/Lake+Jackson,+TX/@29.048068,-95.5228312,12z/data=!3m1!4b1!4m6!3m5!1s0x864043c8e9ae4935:0x902bd953a5fb41c6!8m2!3d29.0338575!4d-95.4343859!16zL20vMF95cTE?entry=ttu"
        >Lake Jackson</a
      >, and
      <a
        href="https://www.google.com/maps/place/Brazoria,+TX+77422/@29.0484158,-95.585697,14z/data=!3m1!4b1!4m6!3m5!1s0x8640448d49ed7c07:0x65960dffa9a67dae!8m2!3d29.0444147!4d-95.5691126!16zL20vMF95bGs?entry=ttu"
        >Brazoria</a
      >.
      <br />
      <br />
    </p>
    <div class="service-area-list">
      <button class='cities-button' >All Areas We Service</button>
      <div class='breaker-bar'></div>
      <ul class='list-items'>
        <li>Angleton</li>
        <li>Bailey's Prairie</li>
        <li>Bay City</li>
        <li>Brazoria</li>
        <li>Caney</li>
        <li>Cedar Lake</li>
        <li>Cedar Lane</li>
        <li>Chenango</li>
        <li>Churchill</li>
        <li>Clute</li>
        <li>Damon</li>
        <li>Danbury</li>
        <li>Freeport</li>
        <li>Hawkinsville</li>
        <li>Holiday Lakes</li>
        <li>Jones Creek</li>
        <li>Lake Jackson</li>
        <li>Old Ocean</li>
        <li>Oyster Creek</li>
        <li>Quintana</li>
        <li>Richwood</li>
        <li>Sugar Valley</li>
        <li>Surfside Beach</li>
        <li>Sweeny</li>
        <li>Van Vleck</li>
        <li>West Columbia</li>
        <li>Wild Peach</li>
      </ul>
    </div>

    <div />
  </SectionContainer>
  <!-- TODO: Change this to use the GOOGLE MAPS API -->
  <img class='service-area-map' src="src/lib/photos/service-area-map.png" alt="Service Area Map">



</div>

<style>
  .homepage-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .service-statement {
    width: 100%;
    text-align: center;
    font-family: font-regular;
    margin-bottom: 15px;
    font-size: 20px;
  }
  .service-statement a {
    font-family: font-semibold;
    font-size: 20px;
    text-decoration: underline;
  }

  .section-content {
    font-family: font-regular;
    font-size: 20px;
    margin-top: 10px;
    padding: 0 20px;
  }
  .section-content a,
  .section-content span {
    font-family: font-semibold;
    font-size: 20px;
  }
  .section-content a.warm {
    color: var(--heating);
  }
  .section-content a.cool {
    color: var(--cooling);
  }
  .section-content a.primary {
    color: var(--primary);
    text-decoration: underline;
  }
  .cities-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-family: font-semibold;
    font-size: 20px;
    padding: 0 20px;
  }
  .breaker-bar {
    width: 10%;
    height: 3px;
    background-color: var(--primary);
    border-radius: 3px;
    margin: 8px 0;
    margin-left: 20px;
  }
  .list-items {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .list-items li {
    
    flex: 50%;
  }
  .service-area-map {
    width: 50%;
    height: 50%;
    margin-top: 40px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .homepage-content {
      flex-direction: column;
    }
    .service-statement {
      font-size: 4.5vw;
    }
    .service-statement a {
      font-size: 4.5vw;
    }
    .cities-button {
      width: 100%;
      
    }
    .service-area-map {
      margin-top: 0;
      width: 100%;
    }
    
  }
</style>
