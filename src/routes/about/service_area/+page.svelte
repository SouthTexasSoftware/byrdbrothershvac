<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import ServiceArea from "./ServiceArea.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Service Area | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Servicing Brazoria County and Matagorda County. Learn more about our homebase and area of operations."
  />
</svelte:head>
<ViewTitleBar title="Service Area" />

<ServiceArea {mobile} />

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
