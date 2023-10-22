<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import FrontDesk from "./FrontDesk.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Front Desk | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Contact our front desk today and become part of the Byrd Brothers Family! Here to help schedule visits, general inquiries, and get you the information you need to make an informed decision."
  />
</svelte:head>
<ViewTitleBar title="Front Desk" />

<FrontDesk {mobile}/>

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
