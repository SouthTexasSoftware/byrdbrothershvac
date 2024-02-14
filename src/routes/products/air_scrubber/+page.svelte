<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import AirScrubber from "./AirScrubber.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Air Scrubber Installation | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Advanced air purification technology attaches directly to your existing ductwork. Click to learn more!"
  />
</svelte:head>
<ViewTitleBar title="Air Scrubber by Aerus®" />

<AirScrubber {mobile} />

<style>
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
  }
</style>
