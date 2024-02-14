<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import Ruud from "./Ruud.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>RUUD HVAC Products | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Proudly a RUUD Pro Partner! We stand by RUUD product performance, efficiency, affordability, and warranty! Click to learn more."
  />
</svelte:head>
<ViewTitleBar title="RUUD" />

<Ruud {mobile} />

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
