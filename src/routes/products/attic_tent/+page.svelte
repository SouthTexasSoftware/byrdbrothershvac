<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import AtticTent from "./AtticTent.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Attic Tent Installation | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Looking for an inexpensive and quick way to improve your home's energy efficiency? Look no further! Seal off your conditioned home from that hot attic today."
  />
</svelte:head>
<ViewTitleBar title="Attic Door Tents" />

<AtticTent {mobile} />

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
