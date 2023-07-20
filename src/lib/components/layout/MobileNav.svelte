<script lang="ts">
  import { slide } from "svelte/transition";

  let showMobileMenu = false;
  let mobileMenuElement: HTMLElement;
  let mobileNavShowing = false;
  let clickListener = false;
  let scrollListener = false;

  $: if (mobileNavShowing) {
    document.addEventListener("click", closeMobileMenu);
    console.log(document.body);
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
  }

  function closeMobileMenu(event: Event) {
    if (!showMobileMenu) return;
    //if (mobileMenuElement.contains(event.target as Node)) return;

    showMobileMenu = false;
  }
</script>

<button
  id="menu-button"
  on:click={() => {
    showMobileMenu = !showMobileMenu;
  }}
>
  <svg
    width="30"
    height="30"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.125 18.8825C27.7025 19.04 28.1575 19.1975 28.525 19.39V19.075C28.525 14.91 26.18 11.2875 22.715 9.4675C22.6975 9.87 22.61 10.36 22.4525 10.92C25.2 12.53 27.055 15.4875 27.125 18.8825ZM22.0675 27.44C20.755 28.1225 19.2675 28.525 17.675 28.525C16.03 28.525 14.49 28.105 13.1425 27.37C12.74 27.79 12.3725 28.1225 12.04 28.35C13.685 29.3475 15.61 29.925 17.675 29.925C19.6875 29.925 21.5775 29.3825 23.1875 28.42C22.8375 28.1925 22.47 27.86 22.0675 27.44ZM12.565 11.13C12.4075 10.57 12.3025 10.0975 12.25 9.6775C9.0125 11.55 6.825 15.05 6.825 19.075V19.285C7.1925 19.11 7.665 18.97 8.225 18.83C8.3125 15.5925 10.01 12.775 12.565 11.13Z"
      fill="#FF7818"
    />
    <path
      d="M26.0225 29.26C25.13 29.26 24.2375 29.0325 23.415 28.56C22.0675 27.79 20.1075 25.34 17.57 21.2625C15.0325 25.3225 13.0725 27.79 11.725 28.56C9.2225 30.0125 6.0025 29.1375 4.55 26.635C3.85 25.4275 3.6575 24.01 4.025 22.645C4.3925 21.2975 5.25 20.16 6.475 19.46C7.7875 18.7075 10.7625 18.235 15.33 18.06H15.6625L15.505 17.7275C13.335 13.65 12.2325 10.7975 12.2325 9.27499C12.2325 6.38749 14.595 4.02499 17.4825 4.02499C20.37 4.02499 22.7325 6.38749 22.7325 9.27499C22.7325 10.78 21.6475 13.615 19.495 17.675L19.32 18.06L19.7925 18.0775C24.36 18.2525 27.3525 18.725 28.6475 19.4775C31.15 20.93 32.025 24.15 30.5725 26.6525C29.61 28.3325 27.8425 29.26 26.0225 29.26ZM17.57 20.2825L18.0075 21C20.4925 24.99 22.4 27.3875 23.66 28.1225C25.9175 29.4175 28.805 28.6475 30.1175 26.39C31.4125 24.1325 30.6425 21.245 28.385 19.9325C27.125 19.1975 24.1325 18.76 19.46 18.585L18.4275 18.515L18.8475 17.745C21.07 13.58 22.19 10.7275 22.19 9.27499C22.19 6.66749 20.0725 4.54999 17.465 4.54999C14.8575 4.54999 12.74 6.66749 12.74 9.27499C12.74 10.745 13.86 13.58 16.0825 17.745L16.5025 18.515L16.52 18.55L15.645 18.585C10.99 18.7425 7.98 19.1975 6.72 19.9325C5.635 20.5625 4.8475 21.5775 4.515 22.8025C4.1825 24.0275 4.3575 25.2875 4.9875 26.39C6.2825 28.6475 9.1875 29.4175 11.445 28.1225C12.705 27.3875 14.6125 24.99 17.0975 21L17.57 20.2825Z"
      fill="black"
    />
    <path
      d="M14.7 19.075C14.7 19.864 15.0134 20.6207 15.5714 21.1786C16.1293 21.7365 16.886 22.05 17.675 22.05C18.464 22.05 19.2207 21.7365 19.7786 21.1786C20.3366 20.6207 20.65 19.864 20.65 19.075C20.65 18.286 20.3366 17.5293 19.7786 16.9713C19.2207 16.4134 18.464 16.1 17.675 16.1C16.886 16.1 16.1293 16.4134 15.5714 16.9713C15.0134 17.5293 14.7 18.286 14.7 19.075Z"
      fill="#FF7818"
    />
    <path
      d="M17.675 22.3125C15.89 22.3125 14.4375 20.86 14.4375 19.075C14.4375 17.29 15.89 15.8375 17.675 15.8375C19.46 15.8375 20.9125 17.29 20.9125 19.075C20.9125 20.86 19.46 22.3125 17.675 22.3125ZM17.675 16.3625C16.1875 16.3625 14.9625 17.5875 14.9625 19.075C14.9625 20.5625 16.1875 21.7875 17.675 21.7875C19.1625 21.7875 20.3875 20.5625 20.3875 19.075C20.3875 17.5875 19.1625 16.3625 17.675 16.3625Z"
      fill="black"
    />
  </svg>
</button>

<nav>
  {#if showMobileMenu}
    <div
      class="mobile-nav-link-container"
      transition:slide
      on:introend={() => (mobileNavShowing = true)}
      bind:this={mobileMenuElement}
    >
      <a href="/services" class="mobile-nav-link">Services</a>
      <a href="/about" class="mobile-nav-link">About Us</a>
      <a href="/services/air_conditioning" class="mobile-nav-link"
        >Air Conditioning</a
      >
      <a href="/services/insulation" class="mobile-nav-link">Insulation</a>
      <a href="/contact" class="mobile-nav-link">Contact Us</a>
    </div>
  {/if}
</nav>

<style>
  #menu-button {
    margin-left: auto;
  }
  .mobile-nav-link {
    padding: 5px 25px;
    cursor: pointer;
  }
  .mobile-nav-link-container {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    height: 300px;
    position: absolute;
    right: 10px;
    top: 75px;
    justify-content: space-around;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 0px 2px grey;
    z-index: 105;
    background-color: hsl(var(--b1));
  }
</style>
