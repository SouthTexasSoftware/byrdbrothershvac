<script lang="ts">
  import { slide } from "svelte/transition";
  import DropdownButton from "./DropdownButton.svelte";
  import { page } from "$app/stores";
  import { fix_and_destroy_block, onMount } from "svelte/internal";

  export let height: number;
  let width: number;
  let triggerFanSpin = false;
  let startingAnimation = true;

  onMount(() => {
    setTimeout(() => {
      startingAnimation = false;
    }, 7000);
  });

  if (!height) {
    height = 35;
    width = 35;
  } else {
    width = height;
  }

  let showMobileMenu = false;
  let mobileMenuElement: HTMLElement;
  let mobileNavShowing = false;
  let clickListener = false;
  let scrollListener = false;

  let dropdownState: { [key: string]: boolean } = {
    services: false,
    products: false,
    about: false,
    air_conditioning: false,
    insulation: false,
    contact: false,
  };

  let previousDropdownState: { [key: string]: boolean } = {
    services: false,
    products: false,
    about: false,
    air_conditioning: false,
    insulation: false,
    contact: false,
  };

  $: if (mobileNavShowing) {
    document.addEventListener("click", closeMobileMenu);
    console.log(document.body);
    console.log(closeMobileMenu);
    clickListener = true;
    document.addEventListener("scroll", closeMobileMenu);
    scrollListener = true;
  }
  $: if (!showMobileMenu) {
    if (clickListener) {
      document.removeEventListener("click", closeMobileMenu);
      clickListener = false;
    }
    if (scrollListener) {
      document.removeEventListener("scroll", closeMobileMenu);
      scrollListener = false;
    }
    mobileNavShowing = false;

    previousDropdownState = Object.assign({}, dropdownState);

    dropdownState = {
      services: false,
      products: false,
      about: false,
      air_conditioning: false,
      insulation: false,
      contact: false,
    };
  }

  function closeMobileMenu(event: Event) {
    if (event.type == "scroll") {
      showMobileMenu = false;
      return;
    }

    let subMenuChecker = false;
    let target = event.target as HTMLElement;
    while (!subMenuChecker) {
      console.log(target);
      if (target == document.body) {
        subMenuChecker = true;
        break;
      }
      if (target.classList.contains("dropdown-button")) {
        subMenuChecker = true;
        return;
      } else {
        target = target.parentElement || document.body;
      }
    }

    if (!showMobileMenu) return;
    //if (mobileMenuElement.contains(event.target as Node)) return;

    showMobileMenu = false;
  }

  function toggleSubMenuDropdowns(selection: string) {
    if (dropdownState[selection] == true) {
      dropdownState[selection] = false;
    } else {
      dropdownState[selection] = true;
    }

    Object.keys(dropdownState).forEach((key) => {
      if (key == selection) {
        return;
      }
      dropdownState[key] = false;
    });
  }
</script>

<button
  id="menu-button"
  on:click={() => {
    showMobileMenu = !showMobileMenu;
    if (showMobileMenu) {
      triggerFanSpin = true;
      setTimeout(() => (triggerFanSpin = false), 6500);
    }
  }}
>
  <svg
    id="fan"
    class:start={startingAnimation}
    class:play-animation={triggerFanSpin}
    width="35"
    height="35"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="27" cy="27" r="17" stroke="#FF7818" stroke-width="2" />
    <path
      d="M34.0054 15.4306C33.8253 16.0542 33.6538 16.6623 33.4875 17.2523C32.7821 19.7544 32.1688 21.93 31.372 23.5787C30.882 24.5928 30.3323 25.3848 29.6681 25.9229C29.0097 26.4563 28.2269 26.75 27.2457 26.75C25.3027 26.75 23.9647 25.5923 22.8638 23.5681C21.7579 21.5347 20.9274 18.6899 19.9858 15.4306C19.0575 12.2175 18.9391 8.39846 20.0265 5.39767C20.5691 3.90033 21.4083 2.61577 22.5874 1.70572C23.7643 0.797473 25.2953 0.25 27.2457 0.25C29.196 0.25 30.6938 0.797398 31.822 1.70279C32.9528 2.61023 33.7305 3.89203 34.2118 5.38903C35.1767 8.38974 34.9355 12.2114 34.0054 15.4306Z"
      fill="white"
      stroke="black"
      stroke-width="0.5"
    />
    <path
      d="M15.4306 20.0736C16.0542 20.2538 16.6623 20.4252 17.2523 20.5915C19.7544 21.2969 21.93 21.9103 23.5787 22.707C24.5928 23.1971 25.3848 23.7467 25.9229 24.411C26.4563 25.0693 26.75 25.8521 26.75 26.8334C26.75 28.7764 25.5923 30.1144 23.5681 31.2152C21.5347 32.3211 18.6899 33.1516 15.4306 34.0932C12.2175 35.0215 8.39846 35.1399 5.39767 34.0526C3.90033 33.51 2.61577 32.6707 1.70572 31.4916C0.797473 30.3148 0.25 28.7838 0.25 26.8334C0.25 24.883 0.797398 23.3852 1.70279 22.257C2.61023 21.1263 3.89203 20.3486 5.38903 19.8672C8.38974 18.9024 12.2114 19.1436 15.4306 20.0736Z"
      fill="white"
      stroke="black"
      stroke-width="0.5"
    />
    <path
      d="M20.0736 38.5694C20.2538 37.9458 20.4252 37.3377 20.5915 36.7477C21.2969 34.2456 21.9103 32.07 22.707 30.4213C23.1971 29.4072 23.7467 28.6152 24.411 28.0771C25.0693 27.5437 25.8521 27.25 26.8334 27.25C28.7764 27.25 30.1144 28.4077 31.2152 30.4319C32.3211 32.4653 33.1516 35.3101 34.0932 38.5694C35.0215 41.7825 35.1399 45.6015 34.0526 48.6023C33.51 50.0997 32.6707 51.3842 31.4916 52.2943C30.3148 53.2025 28.7838 53.75 26.8334 53.75C24.883 53.75 23.3852 53.2026 22.257 52.2972C21.1263 51.3898 20.3486 50.108 19.8672 48.611C18.9024 45.6103 19.1436 41.7886 20.0736 38.5694Z"
      fill="white"
      stroke="black"
      stroke-width="0.5"
    />
    <path
      d="M38.5694 34.0054C37.9458 33.8253 37.3377 33.6538 36.7477 33.4875C34.2456 32.7821 32.07 32.1688 30.4213 31.372C29.4072 30.882 28.6152 30.3323 28.0771 29.6681C27.5437 29.0097 27.25 28.2269 27.25 27.2457C27.25 25.3027 28.4077 23.9647 30.4319 22.8638C32.4653 21.7579 35.3101 20.9274 38.5694 19.9858C41.7825 19.0575 45.6015 18.9391 48.6023 20.0265C50.0997 20.5691 51.3842 21.4083 52.2943 22.5874C53.2025 23.7643 53.75 25.2953 53.75 27.2457C53.75 29.196 53.2026 30.6938 52.2972 31.822C51.3898 32.9528 50.108 33.7305 48.611 34.2118C45.6103 35.1767 41.7886 34.9355 38.5694 34.0054Z"
      fill="white"
      stroke="black"
      stroke-width="0.5"
    />
    <circle
      cx="27"
      cy="27"
      r="3.75"
      fill="#FF7818"
      stroke="black"
      stroke-width="0.5"
    />
  </svg>
</button>

<nav>
  {#if showMobileMenu}
    <div
      class="mobile-nav-link-container"
      transition:slide
      on:introend={() => {
        mobileNavShowing = true;
        dropdownState = Object.assign({}, previousDropdownState);
      }}
      bind:this={mobileMenuElement}
    >
      <a
        href="/"
        class="mobile-nav-link"
        class:viewing={$page.url.pathname == "/"}>HOME</a
      >
      <div class="link-container services">
        <div class="main-link">
          <a
            href="/services"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.services}
            class:viewing={$page.url.pathname.includes("/services")}
          >
            SERVICES</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("services")}
            class:showing={dropdownState.services}><DropdownButton /></button
          >
        </div>
        {#if dropdownState.services}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/services/air_conditioning"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/air_conditioning")}
            >
              AIR CONDITIONING
            </a>
            <a
              href="/services/heating"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/heating")}
            >
              HEATING
            </a>
            <a
              href="/services/maintenance_program"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/maintenance")}
            >
              MAINTENANCE
            </a>
            <a
              href="/services/insulation"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/insulation")}
            >
              INSULATION
            </a>
            <a
              href="/services/air_quality"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/air_quality")}
            >
              AIR QUALITY
            </a>
            <div class="sub-bar" />
          </div>
        {/if}
      </div>

      <div class="link-container products">
        <div class="main-link">
          <a
            href="/products"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.products}
            class:viewing={$page.url.pathname.includes("/products")}
          >
            PRODUCTS</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("products")}
            class:showing={dropdownState.products}><DropdownButton /></button
          >
        </div>
        {#if dropdownState.products}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/products/ruud"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/ruud")}
            >
              RUUD
            </a>
            <a
              href="/products/mrcool"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/mrcool")}
            >
              MRCOOL
            </a>
            <a
              href="/products/generac"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/generac")}
            >
              GENERAC
            </a>
            <a
              href="/products/air_scrubber"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/air_scrubber")}
            >
              AIR SCRUBBER
            </a>
            <a
              href="/products/attic_tent"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/attic_tent")}
            >
              ATTIC TENT
            </a>
            <div class="sub-bar" />
          </div>
        {/if}
      </div>

      <div class="link-container">
        <div class="main-link">
          <a
            href="/services/air_conditioning"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.air_conditioning}
            class:viewing={$page.url.pathname.includes(
              "/services/air_conditioning"
            )}
          >
            AIR CONDITIONING</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("air_conditioning")}
            class:showing={dropdownState.air_conditioning}
            ><DropdownButton /></button
          >
        </div>
        {#if dropdownState.air_conditioning}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/services/air_conditioning/installation"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes(
                "/air_conditioning/installation"
              )}
            >
              AC INSTALLATION
            </a>
            <a
              href="/services/air_conditioning/repair"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes(
                "/air_conditioning/repair"
              )}
            >
              AC REPAIR
            </a>
            <a
              href="/services/air_conditioning/maintenance"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes(
                "/air_conditioning/maintenance"
              )}
            >
              AC MAINTENANCE
            </a>
            <a
              href="/services/air_conditioning/emergency"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes(
                "/air_conditioning/emergency"
              )}
            >
              EMERGENCY HVAC
            </a>
            <div class="sub-bar" />
          </div>
        {/if}
      </div>

      <div class="link-container about">
        <div class="main-link">
          <a
            href="/about"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.about}
            class:viewing={$page.url.pathname.includes("/about")}
          >
            ABOUT</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("about")}
            class:showing={dropdownState.about}><DropdownButton /></button
          >
        </div>
        {#if dropdownState.about}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/about/service_area"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/service_area")}
            >
              SERVICE AREA
            </a>
            <a
              href="/about/meet_team"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/meet_team")}
            >
              MEET THE TEAM
            </a>
            <a
              href="/about/partners"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/partners")}
            >
              PARTNERS
            </a>
            <!-- <a
              href="/about/financing"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/financing")}
            >
              FINANCING
            </a> -->
            <div class="sub-bar" />
          </div>
        {/if}
      </div>

      <!-- <div class="link-container">
        <div class="main-link">
          <a
            href="/services/insulation"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.insulation}
            class:viewing={$page.url.pathname.includes("/services/insulation")}
          >
            INSULATION</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("insulation")}
            class:showing={dropdownState.insulation}><DropdownButton /></button
          >
        </div>
        {#if dropdownState.insulation}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/services/insulation/attic"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/insulation/attic")}
            >
              ATTIC
            </a>
            <a
              href="/services/insulation/ducting"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/insulation/ducting")}
            >
              DUCTING
            </a>

            <div class="sub-bar" />
          </div>
        {/if}
      </div> -->

      <div class="link-container">
        <div class="main-link">
          <a
            href="/contact"
            class="mobile-nav-link"
            class:dropdown-showing={dropdownState.contact}
            class:viewing={$page.url.pathname.includes("/contact")}
          >
            CONTACT</a
          >
          <button
            class="dropdown-button"
            on:click={() => toggleSubMenuDropdowns("contact")}
            class:showing={dropdownState.contact}><DropdownButton /></button
          >
        </div>
        {#if dropdownState.contact}
          <div class="sub-links" transition:slide>
            <div class="sub-bar" />
            <a
              href="/contact/front_desk"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/front_desk")}
            >
              FRONT DESK
            </a>
            <a
              href="/contact/quote_form"
              class="mobile-nav-link sub"
              class:viewing={$page.url.pathname.includes("/quote_form")}
            >
              QUOTE FORM
            </a>

            <div class="sub-bar" />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</nav>

<style>
  #menu-button {
    padding: 5px;
    margin-left: auto;
  }
  #fan {
    transform: rotate(30deg);
  }
  #fan.start {
    animation-name: start;
    animation-duration: 6s;
    animation-timing-function: ease;
    animation-iteration-count: 1;

    transform-origin: center;
  }

  #fan.play-animation {
    animation-name: menu-open;
    animation-duration: 6s;
    animation-timing-function: ease;
    animation-iteration-count: 1;

    transform-origin: center;
  }

  @keyframes start {
    0% {
      transform: rotate(30deg);
    }
    5% {
      transform: rotate(40deg);
    }
    10% {
      transform: rotate(35deg);
    }
    15% {
      transform: rotate(45deg);
    }
    20% {
      transform: rotate(40deg);
    }
    100% {
      transform: rotate(750deg);
    }
  }

  @keyframes menu-open {
    0% {
      transform: rotate(30deg);
    }
    5% {
      transform: rotate(40deg);
    }
    10% {
      transform: rotate(35deg);
    }
    15% {
      transform: rotate(45deg);
    }
    20% {
      transform: rotate(40deg);
    }
    100% {
      transform: rotate(750deg);
    }
  }

  .mobile-nav-link-container {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    position: absolute;
    right: 10px;
    top: 75px;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    padding: 10px 15px 10px 0px;
    box-shadow: 0px 0px 2px grey;
    z-index: 105;
    background-color: hsl(var(--b1));
    width: 270px;
  }
  .sub-bar {
    width: 200px;
    height: 2px;
    background-color: var(--input-border);
  }
  .link-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .mobile-nav-link {
    padding: 10px 25px;
    margin: 5px 0;
    cursor: pointer;
    font-family: font-semibold;
    color: var(--text);
    transition: all 0.3s;
    position: relative;
  }
  .mobile-nav-link.dropdown-showing {
    color: var(--primary);
  }
  .mobile-nav-link.viewing::after {
    content: "";
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: var(--banner-primary);
    bottom: 10px;
    left: 15%;
  }
  .mobile-nav-link.sub.viewing::after {
    bottom: 5px;
  }
  .mobile-nav-link.sub {
    padding: 5px 25px;
    font-size: 16px;
    font-family: font-regular;
  }
  .main-link {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .dropdown-button {
    padding: 10px;
    position: absolute;
    right: 0;
    top: 20%;
    transition: all 0.5s;
  }
  .dropdown-button.showing {
    transform: rotate(180deg);
  }
  .sub-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
