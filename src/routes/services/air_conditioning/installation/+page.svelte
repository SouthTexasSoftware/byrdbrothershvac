<script lang="ts">
  import AcInstallation from "../ACInstallation.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Air Conditioning Installation in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="Full replacement or new install, find out all the reasons starting from NEW is a cool way to go."
  />
</svelte:head>
<AcInstallation {mobile} />

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
