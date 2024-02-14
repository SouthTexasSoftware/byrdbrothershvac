<script lang="ts">
  import CityPage from "$lib/components/CityPage.svelte";
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Air Conditioning Services in Sweeny | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Let us welcome you to the Byrd Brothers Family! We install, repair, and service all varieties of HVAC equipment. Air Conditioning and Heating Services in Sweeny, TX."
  />
</svelte:head>
<ViewTitleBar title="AC Services in Sweeny, TX" />

<CityPage/>

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
