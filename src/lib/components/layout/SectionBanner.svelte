<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let content: String;
  export let mobileScreenSide: String;
  export let description: string | undefined = undefined;
  // export let animate: boolean;
  // export let animateDirection: String;

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted && content != "none"}
  <h2 class="banner {mobileScreenSide}">{content}</h2>
  {#if description}
    <p class="banner-description">{description}</p>
  {/if}
{/if}

<style>
  .banner {
    font-size: 22px;
    font-family: font-bold;
    width: 100%;
    text-align: center;
    background-color: var(--banner-primary);
    border-radius: 3px;
  }
  .banner-description {
    font-family: font-light;
    font-size: 16px;
    text-align: center;
    margin-bottom: 4px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .banner {
      width: auto;
      min-width: 350px;
    }
    .banner.left {
      text-align: left;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 14vw;
      transform: translateX(-9vw);
    }
    .banner.right {
      text-align: right;
      align-self: flex-end;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-right: 13vw;
      transform: translateX(9vw);
    }
    .banner-description {
      text-align: left;
      padding-left: 5vw;
      margin-bottom: 6px;
    }
  }
</style>
