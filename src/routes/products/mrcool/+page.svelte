<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import MrCool from "./MrCool.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>MRCOOL Mini-splits & More! | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Ready for an air conditioned garage, shop, or new build home? We partnered with the biggest name in mini-split units, MRCOOL!"
  />
</svelte:head>
<ViewTitleBar title="MRCOOL ®" />

<MrCool {mobile} />

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
