<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import SectionBanner from "$lib/components/layout/SectionBanner.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import JustQuote from "./JustQuote.svelte";

  let screenWidth: number;

  $: mobile = screenWidth > 600 ? false : true;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title>Online Quote Form | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="The easiest way to get a quote! Fill out your contact info and the details of your HVAC situation. We will provide a free estimate!"
  />
</svelte:head>
<ViewTitleBar title="A Free Estimate" />

<JustQuote {mobile}/>

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
