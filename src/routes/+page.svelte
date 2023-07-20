<script lang="ts">
  import bgPhoto from "$lib/photos/byrdbrothersbg.jpg";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";

  let pageMounted = false;
  onMount(() => {
    pageMounted = true;
  });
</script>

<div id="background-photo" style="background-image:url({bgPhoto});">
  {#if pageMounted}
    <h2 class="catchphrase" in:slide={{ duration: 500 }}>
      If you are in the <span class="emphasis">HEAT</span>, <br /> then we need
      to <span class="emphasis">MEET</span>!
    </h2>
  {/if}
</div>

<style>
  #background-photo {
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: hsl(var(--n));
    position: relative;
  }
  .catchphrase {
    color: hsl(var(--b1));
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 60%;
    font-size: 36px;
    font-family: font-regular;
  }
  .emphasis {
    font-family: font-bold;
    color: hsl(var(--p));
    filter: brightness(0.95);
  }
</style>
