<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import Partners from "./Partners.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Our Partners | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="While we service any and all HVAC equipment, we have partnered with manufacturers to provide superior pricing and products!"
  />
</svelte:head>
<ViewTitleBar title="Our Partners" />

<Partners {mobile} />

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
