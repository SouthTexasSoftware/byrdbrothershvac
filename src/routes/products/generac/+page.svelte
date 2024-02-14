<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import Generac from "./Generac.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Generac Home Generator | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="You can't heat or cool your home without power! We our an authorized sales and service partner with Generac. Click to learn more."
  />
</svelte:head>
<ViewTitleBar title="Generac Home Generators" />

<Generac {mobile} />

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
