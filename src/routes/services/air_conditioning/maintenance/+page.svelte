<script lang="ts">
  import AcInstallation from "../ACInstallation.svelte";
  import AcMaintenance from "../ACMaintenance.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Air Conditioning Maintenance in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="The key to a happy and healthy home! Learn more about why routine maintenance saves you in the long run."
  />
</svelte:head>
<AcMaintenance {mobile} />

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
