<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import AirScrubber from "./AirScrubber.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>HVAC Maintenance in Brazoria County | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Spring and Fall HVAC Maintenance Program | Click to learn more about our special program pricing and let us make sure you're comfortable year round!"
  />
</svelte:head>
<ViewTitleBar title="HVAC Maintenance Program" />

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
