<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import Heating from "./Heating.svelte";

  let screenWidth: number;

$: mobile = screenWidth > 600 ? false : true;

</script>


<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Heating Services in Brazoria County | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Heating system installation, repairs, maintenance, and everything in between. We can help you stay warm when the cold fronts hit."
  />
</svelte:head>
<ViewTitleBar title="Heating"></ViewTitleBar>

<Heating {mobile} />

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