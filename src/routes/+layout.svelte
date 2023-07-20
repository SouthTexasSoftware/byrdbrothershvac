<script lang="ts">
  import "$lib/global.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<Header />
<section id="page-content">
  <slot />
</section>
<Footer />

<style>
  #page-content {
    display: flex;
    position: relative;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
