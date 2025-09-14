<script lang="ts">
  import { page } from "$app/stores";
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";

  let displayCards = false;

  $: status = $page.status;

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
  {#if status === 403}
    <p class="error-message">Sorry! We're not available in your region.</p>
    <h3>
      Please give us a <a href="tel:+19794808444">call</a> if this is incorrect.
      <a href="tel:+19794808444">(979) 480-8444</a>
    </h3>
  {:else}
    <p class="error-message">We can't find that page right now.</p>
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
  {/if}
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
