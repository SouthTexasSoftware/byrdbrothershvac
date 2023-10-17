<script lang="ts">
  import LogoComponent from "$lib/logos/LogoComponent.svelte";
  import { onMount } from "svelte";
  import DesktopNav from "./DesktopNav.svelte";
  import MobileNav from "./MobileNav.svelte";

  let screenWidth: number;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<svelte:window bind:innerWidth={screenWidth} />
<header>
  {#if mounted}
    {#if screenWidth < 940}
      <a href="/" id="logo-and-link-home" aria-label='Homepage Link'>
        <LogoComponent height={45} />
      </a>
      <MobileNav height={45} />
    {:else}
      <a href="/" id="logo-and-link-home" aria-label='Homepage Link'>
        <LogoComponent height={60} />
      </a>
      <DesktopNav />
    {/if}
  {/if}
</header>


<style>
  header {
    display: flex;
    justify-content: space-between;
    max-width: 1920px;
    padding: 0 10px;
    border-bottom: 4px solid #ff7817;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
    header {
      margin: 0 auto;
    }
  }

  /* Mobile  */
  @media only screen and (max-width: 600px) {
    header {
      border-bottom: 3px solid #ff7817;
    }
  }
</style>
