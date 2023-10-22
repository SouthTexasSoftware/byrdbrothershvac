<script lang="ts">
  import AcInstallation from "../ACInstallation.svelte";
  import EmergencyHvac from "../EmergencyHVAC.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Emergency HVAC Services in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="Here to provide expert solutions, restore your comfort, and keep your home safe."
  />
</svelte:head>
<EmergencyHvac {mobile} />

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
