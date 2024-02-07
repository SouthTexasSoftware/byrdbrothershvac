<script lang="ts">
  import { page } from "$app/stores";
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let displayCards = false;

  onMount(() => {
    displayCards = true;
  });

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<svelte:head>
  <title>Error | Byrd Brothers HVAC</title>
</svelte:head>

<ViewTitleBar title="Something Went Wrong" />

<div class="error-container">
  {#if $page.error}
    <p class="error-message">Page Error: {$page.error.message}</p>
  {/if}
  <h3>But we're here to help!</h3>
  <img
    src={getAssetSrc("byrdbrothers-with-truck.png")}
    alt="The Byrd Brothers"
    class="footer-picture"
  />
  <div class="button-container">
    <a href="/">Site Home</a>
    <a href="/services">Our Services</a>
  </div>
</div>

<style>
  .error-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  h3 {
    font-size: 1.5rem;
    font-family: font-semibold;
  }
  img {
    border-radius: 10px;
  }
  .error-message {
    font-family: font-light;
    font-size: 0.8rem;
  }
  .button-container {
    display: flex;
    justify-content: space-evenly;
    width: 23rem;
    margin: 10px;
  }
  a {
    width: 7rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.774);
    color: white;
    font-family: font-semibold;
    border-radius: 4px;
    text-align: center;
  }
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
