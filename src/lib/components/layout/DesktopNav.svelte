<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  let hoverState = {
    home: false,
    services: false,
    products: false,
    about: false,
    air_conditioning: false,
    insulation: false,
    contact: false,
  };
</script>

<nav class="desktop-nav-container">
  <div
    class="link-container"
    on:mouseenter={() => (hoverState.home = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.home = false), 200);
    }}
  >
    <a
      href="/"
      class="desktop-nav-link"
      class:highlight={hoverState.home}
      class:viewing={$page.url.pathname == "/"}
    >
      HOME
    </a>
  </div>
  <div
    class="link-container"
    on:mouseenter={() => (hoverState.services = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.services = false), 200);
    }}
  >
    <a
      href="/services"
      class="desktop-nav-link"
      class:highlight={hoverState.services}
      class:viewing={$page.url.pathname.includes("/services")}
    >
      SERVICES
    </a>
    {#if hoverState.services}
      <div class="sub-menu" transition:fly={{ y: -10 }}>
        <a href="/services/air_conditioning" class="desktop-nav-link">
          AIR CONDITIONING
        </a>
        <a href="/services/heating" class="desktop-nav-link"> HEATING </a>
        <a href="/services/maintenance_program" class="desktop-nav-link">
          MAINTENANCE
        </a>
        <a href="/services/insulation" class="desktop-nav-link"> INSULATION </a>
        <a href="/services/air_quality" class="desktop-nav-link">
          AIR QUALITY
        </a>
      </div>
    {/if}
  </div>

  <div
    class="link-container"
    on:mouseenter={() => (hoverState.products = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.products = false), 200);
    }}
  >
    <a
      href="/products"
      class="desktop-nav-link"
      class:highlight={hoverState.products}
      class:viewing={$page.url.pathname.includes("/products")}
    >
      PRODUCTS
    </a>
    {#if hoverState.products}
      <div class="sub-menu" transition:fly={{ y: -10 }}>
        <a href="/products/ruud" class="desktop-nav-link"> RUUD </a>
        <a href="/products/mrcool" class="desktop-nav-link"> MRCOOL </a>
        <a href="/products/generac" class="desktop-nav-link"> GENERAC </a>
        <a href="/products/air_scrubber" class="desktop-nav-link">
          AIR SCRUBBER
        </a>
        <a href="/products/attic_tent" class="desktop-nav-link"> ATTIC TENT </a>
      </div>
    {/if}
  </div>

  <div
    class="link-container"
    on:mouseenter={() => (hoverState.air_conditioning = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.air_conditioning = false), 200);
    }}
  >
    <a
      href="/services/air_conditioning"
      class="desktop-nav-link"
      class:viewing={$page.url.pathname.includes("/services/air_conditioning")}
      class:highlight={hoverState.air_conditioning}>AIR CONDITIONING</a
    >
    {#if hoverState.air_conditioning}
      <div class="sub-menu" transition:fly={{ y: -10 }}>
        <a
          href="/services/air_conditioning/installation"
          class="desktop-nav-link"
        >
          AC INSTALLATION
        </a>
        <a href="/services/air_conditioning/repair" class="desktop-nav-link">
          AC REPAIR
        </a>
        <a
          href="/services/air_conditioning/maintenance"
          class="desktop-nav-link"
        >
          AC MAINTENANCE
        </a>
        <a href="/services/air_conditioning/emergency" class="desktop-nav-link">
          EMERGENCY HVAC
        </a>
      </div>
    {/if}
  </div>

  <div
    class="link-container"
    on:mouseenter={() => (hoverState.about = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.about = false), 200);
    }}
  >
    <a
      href="/about"
      class="desktop-nav-link"
      class:highlight={hoverState.about}
      class:viewing={$page.url.pathname.includes("/about")}>ABOUT</a
    >
    {#if hoverState.about}
      <div class="sub-menu" transition:fly={{ y: -10 }}>
        <a href="/about/service_area" class="desktop-nav-link">
          SERVICE AREA
        </a>
        <a href="/about/meet_team" class="desktop-nav-link"> MEET THE TEAM </a>
        <a href="/about/partners" class="desktop-nav-link"> PARTNERS </a>
        <!-- <a href="/about/financing" class="desktop-nav-link"> FINANCING </a> -->
      </div>
    {/if}
  </div>

  <div
    class="link-container"
    on:mouseenter={() => (hoverState.contact = true)}
    on:mouseleave={() => {
      setTimeout(() => (hoverState.contact = false), 200);
    }}
  >
    <a
      href="/contact"
      class="desktop-nav-link"
      class:highlight={hoverState.contact}
      class:viewing={$page.url.pathname.includes("/contact")}>CONTACT US</a
    >
    {#if hoverState.contact}
      <div class="sub-menu" transition:fly={{ y: -10 }}>
        <a href="/contact/front_desk" class="desktop-nav-link"> FRONT DESK </a>
        <a href="/contact/quote_form" class="desktop-nav-link"> QUOTE FORM </a>
      </div>
    {/if}
  </div>
</nav>

<style>
  .desktop-nav-container {
    display: flex;
    align-items: space-evenly;
  }
  .link-container {
    min-width: 100px;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
  }
  .desktop-nav-link {
    font-family: font-semibold;
    text-align: center;
    height: 100%;
    margin-top: 6px;
    margin-bottom: -3px;
    line-height: 278%;
    transition: 0.3s all ease;
    border-top: 3px solid transparent;
    font-size: 16px;
    padding: 0 25px;
    white-space: nowrap;
  }
  .desktop-nav-link:hover {
    border-top: 3px solid #ff7817;
  }
  .desktop-nav-link.highlight {
    color: var(--primary-dark);
  }
  .desktop-nav-link.viewing {
    text-decoration: underline;
    text-decoration-color: #ff7817;
    text-decoration-thickness: 1px;
  }
  .sub-menu {
    min-width: 100%;
    position: absolute;
    background-color: var(--bg);
    padding-bottom: 5px;
    font-family: font-semibold;
    font-size: 18px;
    text-align: center;
    z-index: 10;
    top: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    flex-direction: column;
  }
</style>
