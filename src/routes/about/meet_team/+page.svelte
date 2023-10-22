<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import MeetTeam from "./MeetTeam.svelte";


  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Meet The Team | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Family owned and operated, meet our owners, technicians, and office personnel that will be assisting you today!"
  />
</svelte:head>
<ViewTitleBar title="Meet The Team" />

<MeetTeam {mobile} />

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
