<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";
  import bgPhoto from "$lib/photos/byrdbrothersbg.jpg";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";
  import HomepageContent from "./HomepageContent.svelte";
  import LinkCarousel from "./LinkCarousel.svelte";

  let pageMounted = false;
  let screenWidth = 0;

  $: mobile = screenWidth > 600 ? false : true;

  onMount(() => {
    pageMounted = true;
  });
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Byrd Brothers HVAC | Air Conditioning, Heating, and Insulation</title>
  <meta
    name="description"
    content="Air Conditioning, Heating, and Insulation company serving Brazoria County and Matagorda County. Installation, repair, and maintenance services provided."
  />
</svelte:head>
<div id="background-photo" style="background-image:url({bgPhoto});">
  {#if pageMounted}
    <h2 class="catchphrase" in:slide={{ duration: 1000, delay: 500 }}>
      IF YOU ARE IN THE <span class="emphasis">HEAT</span>,
      {#if mobile}
        <br />
      {/if}
      THEN WE NEED TO <span class="emphasis">MEET</span>!
    </h2>

    <div class="cta-container">
      <div class="button-container">
        <a href="/services">Services</a>
        <a href="tel:+19794808444">Call Now</a>
      </div>
    </div>
    <LinkCarousel />
  {/if}
</div>

<HomepageContent {screenWidth} />

<style>
  #background-photo {
    width: 100%;
    height: 650px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--neutral);
    position: relative;
    max-width: 1920px;
    color: hsl(var(--b1));
  }
  .catchphrase {
    text-align: center;
    font-size: 44px;
    font-family: font-bold-italic;
    margin-top: 25px;
    color: white;
  }
  .emphasis {
    font-family: font-bold-italic;
    color: var(--primary);
    filter: brightness(0.95);
    font-size: 44px;
  }
  .cta-container {
    position: absolute;
    bottom: 50px;
    right: 20vw;
    display: flex;
    flex-direction: column;
    width: 400px;
  }
  .cta-container * {
    font-family: font-light;
    font-size: 24px;
    color: white;
  }
  .button-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .cta-container a {
    padding: 5px 40px;
    border: 1px solid var(--bg);
    transition: all 0.5s;
  }
  .cta-container a:hover {
    border: 1px solid var(--primary);
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    #background-photo {
      height: 500px;
    }
    .catchphrase {
      width: 100%;
      font-size: 8vw;
    }
    .emphasis {
      font-size: inherit;
    }
    .cta-container {
      position: absolute;
      width: 70vw;
      right: 5vw;
      bottom: 40px;
      text-align: right;
    }
    .cta-container a {
      padding: 5px 25px;
      font-size: 5vw;
    }
    .cta-container * {
      font-family: font-light;
      font-size: 20px;
    }
  }
  /* Very Small / Zoomed in Screens */
  @media only screen and (max-width: 400px) {
    .cta-container {
      position: absolute;
      width: 100vw;
      right: 0;
      bottom: 40px;
      text-align: right;
    }
  }
</style>
