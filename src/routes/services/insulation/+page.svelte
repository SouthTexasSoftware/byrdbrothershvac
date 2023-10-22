<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import Insulation from "./Insulation.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Insulation Services in Brazoria County | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Insulation is the gateway to year round comfort! Learn more about how we can improve the efficiency of your home or building."
  />
</svelte:head>
<ViewTitleBar title="Insulation" />

<Insulation {mobile} />

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
