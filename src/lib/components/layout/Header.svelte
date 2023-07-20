<script lang="ts">
  import Logo from "$lib/photos/logo.png";
  import DesktopNav from "./DesktopNav.svelte";
  import MobileNav from "./MobileNav.svelte";

  let screenWidth: number;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<header>
  <!-- flex -->
  <a href="/" id="logo-and-link-home">
    <img src={Logo} alt="logo" id="navbar-logo" />
  </a>
  <!-- check screenwidth and show mobile or desktop navigation -->
  {#if screenWidth < 800}
    <MobileNav />
  {:else}
    <DesktopNav />
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 10px;
  }
  #navbar-logo {
    height: 80px;
  }
  /* Mobile styling */
  @media (max-width: 500px) {
    #navbar-logo {
      height: 50px;
    }
  }
</style>
