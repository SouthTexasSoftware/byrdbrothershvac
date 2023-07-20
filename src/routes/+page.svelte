<script lang="ts">
  import bgPhoto from "$lib/photos/byrdbrothersbg.jpg";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";

  let pageMounted = false;
  let screenWidth = 0;

  $: mobile = screenWidth > 600 ? false : true;

  onMount(() => {
    pageMounted = true;
  });
</script>

<svelte:window bind:innerWidth={screenWidth} />
<div id="background-photo" style="background-image:url({bgPhoto});">
  {#if pageMounted}
    <h2 class="catchphrase" in:slide={{ duration: 1000, delay: 500 }}>
      IF YOU ARE IN THE <span class="emphasis">HEAT</span>,
      {#if mobile}
        <br />
      {/if}
      THEN WE NEED TO <span class="emphasis">MEET</span>!
    </h2>

    <div class="cta-container">
      <p>
        Specializing in AC installation, repair, maintenance, and insulation
        installation.
      </p>
      <div class="button-container">
        <a href="/services" in:fly={{ y: 50, duration: 1000, delay: 1500 }}
          >Services</a
        >
        <a
          href="tel:800-123-4567"
          in:fly={{ y: 50, duration: 1000, delay: 2000 }}>Call Now</a
        >
      </div>
    </div>
  {/if}
</div>

<style>
  #background-photo {
    width: 100%;
    height: 650px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: hsl(var(--n));
    position: relative;
    max-width: 1900px;
    color: hsl(var(--b1));
  }
  .catchphrase {
    text-align: center;
    font-size: 44px;
    font-family: font-bold-italic;
    margin-top: 25px;
  }
  .emphasis {
    font-family: font-bold-italic;
    color: hsl(var(--p));
    filter: brightness(0.95);
  }
  .cta-container {
    position: absolute;
    bottom: 50px;
    right: 30vw;
    display: flex;
    flex-direction: column;
    width: 340px;
  }
  .cta-container * {
    font-family: font-light;
    font-size: 20px;
  }
  .button-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .cta-container a {
    padding: 5px 40px;
    border: 1px solid hsl(var(--b1));
    transition: all 0.5s;
  }
  .cta-container a:hover {
    border: 1px solid hsl(var(--p));
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    #background-photo {
      height: 500px;
    }
    .catchphrase {
      width: 100%;
      font-size: 2em;
    }
    .cta-container {
      position: absolute;
      width: 340px;
      right: 10%;
      bottom: 40px;
    }
    .cta-container a {
      padding: 5px 25px;
    }
    .cta-container * {
      font-family: font-light;
      font-size: 20px;
    }
  }
</style>
