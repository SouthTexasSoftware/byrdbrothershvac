<script lang="ts">
  import { slide } from "svelte/transition";
  import DropdownButton from "./DropdownButton.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { BlogPost } from "$lib/stores";

  export let latestBlogs: BlogPost[] = [];

  let showMobileMenu = false;
  let mobileNavShowing = false;
  let triggerFanSpin = false;
  let startingAnimation = true;

  let openDropdown: string | null = null;
  let previousOpenDropdown: string | null = null;

  type NavItem = {
    label: string;
    href: string;
    key: string;
    subItems?: { label: string; href: string }[];
  };

  $: navItems = [
    { label: "HOME", href: "/", key: "home" },
    {
      label: "SERVICES",
      href: "/services",
      key: "services",
      subItems: [
        { label: "AIR CONDITIONING", href: "/services/air_conditioning" },
        { label: "HEATING", href: "/services/heating" },
        { label: "MAINTENANCE", href: "/services/maintenance_program" },
        { label: "INSULATION", href: "/services/insulation" },
        { label: "AIR QUALITY", href: "/services/air_quality" },
      ],
    },
    {
      label: "PRODUCTS",
      href: "/products",
      key: "products",
      subItems: [
        { label: "RUUD", href: "/products/ruud" },
        { label: "MRCOOL", href: "/products/mrcool" },
        { label: "GENERAC", href: "/products/generac" },
        { label: "AIR SCRUBBER", href: "/products/air_scrubber" },
        { label: "ATTIC TENT", href: "/products/attic_tent" },
      ],
    },
    {
      label: "BLOG",
      href: "/blog",
      key: "blog",
      subItems: latestBlogs.map((blog) => {
        
        return {
          label: blog.title.toUpperCase(),
          href: `/blog/${blog.slug}`,
        };
      }),
    },
    {
      label: "ABOUT",
      href: "/about",
      key: "about",
      subItems: [
        { label: "SERVICE AREA", href: "/about/service_area" },
        { label: "MEET THE TEAM", href: "/about/meet_team" },
        { label: "PARTNERS", href: "/about/partners" },
      ],
    },
    {
      label: "CONTACT",
      href: "/contact",
      key: "contact",
      subItems: [
        { label: "FRONT DESK", href: "/contact/front_desk" },
        { label: "QUOTE FORM", href: "/contact/quote_form" },
      ],
    },
  ] satisfies NavItem[];

  onMount(() => {
    setTimeout(() => {
      startingAnimation = false;
    }, 7000);
  });

  $: if (mobileNavShowing) {
    document.addEventListener("click", closeMobileMenu);
    document.addEventListener("scroll", closeMobileMenu);
  }

  $: if (!showMobileMenu) {
    document.removeEventListener("click", closeMobileMenu);
    document.removeEventListener("scroll", closeMobileMenu);
    mobileNavShowing = false;
    previousOpenDropdown = openDropdown;
    openDropdown = null;
  }

  function closeMobileMenu(event: Event) {
    if (event.type === "scroll") {
      showMobileMenu = false;
      return;
    }

    // Check if click was on dropdown button
    let target = event.target as HTMLElement;
    while (target && target !== document.body) {
      if (target.classList.contains("dropdown-button")) {
        return;
      }
      target = target.parentElement || document.body;
    }

    showMobileMenu = false;
  }

  function toggleDropdown(key: string) {
    openDropdown = openDropdown === key ? null : key;
  }

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
    if (showMobileMenu) {
      triggerFanSpin = true;
      setTimeout(() => (triggerFanSpin = false), 6500);
    }
  }

  function isActive(href: string): boolean {
    if (href === "/") return $page.url.pathname === "/";
    return $page.url.pathname.includes(href);
  }

  function handleIntroEnd() {
    mobileNavShowing = true;
    openDropdown = previousOpenDropdown;
  }
</script>

<button id="menu-button" on:click={toggleMobileMenu}>
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
      on:introend={handleIntroEnd}
    >
      {#each navItems as item}
        {#if item.subItems}
          <div class="link-container">
            <div class="main-link">
              <a
                href={item.href}
                class="mobile-nav-link"
                class:dropdown-showing={openDropdown === item.key}
                class:viewing={isActive(item.href)}
              >
                {item.label}
              </a>
              <button
                class="dropdown-button"
                on:click={() => toggleDropdown(item.key)}
                class:showing={openDropdown === item.key}
              >
                <DropdownButton />
              </button>
            </div>
            {#if openDropdown === item.key}
              <div class="sub-links" transition:slide>
                <div class="sub-bar" />
                {#each item.subItems as subItem}
                  <a
                    href={subItem.href}
                    class="mobile-nav-link sub"
                    class:viewing={isActive(subItem.href)}
                  >
                    {subItem.label}
                  </a>
                {/each}
                <div class="sub-bar" />
              </div>
            {/if}
          </div>
        {:else}
          <a
            href={item.href}
            class="mobile-nav-link"
            class:viewing={isActive(item.href)}
          >
            {item.label}
          </a>
        {/if}
      {/each}
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

  #fan.start,
  #fan.play-animation {
    animation-name: menu-open;
    animation-duration: 6s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    transform-origin: center;
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
    background-color: white;
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
    max-width: 220px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
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
