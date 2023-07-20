<script lang="ts">
  import Logo from "$lib/photos/logo.png";
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
  <a href="/" id="logo-and-link-home">
    <img src={Logo} alt="logo" id="navbar-logo" />
  </a>
  {#if mounted}
    {#if screenWidth < 800}
      <MobileNav />
    {:else}
      <DesktopNav />
    {/if}
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    max-width: 1900px;
    margin: 0 10px;
  }
  #navbar-logo {
    height: 80px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
    header {
      margin: 0 auto;
    }
  }

  /* Mobile  */
  @media only screen and (max-width: 600px) {
    #navbar-logo {
      height: 50px;
    }
  }
</style>
