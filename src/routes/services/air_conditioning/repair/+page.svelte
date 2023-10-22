<script lang="ts">
  import AcRepair from "../ACRepair.svelte";
 
  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Air Conditioning Repair in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="Struggling to maintain indoor temperatures? Addressing the issues in a timely manner may pay dividends."
  />
</svelte:head>
<AcRepair {mobile} />


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
