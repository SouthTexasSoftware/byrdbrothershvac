<script lang="ts">
  import "$lib/global.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/stores";
  import { connectToFirebase, connectAnalytics } from "$lib/helpers";
  import { dev } from "$app/environment";
  import { page } from "$app/stores";
  import AlertToast from "$lib/components/AlertToast.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  // connect to firebase to ensure we can take form submissions.
  onMount(() => {
    if (!$firebaseStore) {
      connectToFirebase().then((connectedBool) => {
        if (connectedBool) {
          // console.log("Ready for form submissions!");

          // eventually shutoff for dev env
          if (!dev) {
            let analytics = connectAnalytics();
            // console.log(analytics);
            firebaseStore.update((storeData) => {
              storeData.analytics = analytics;
              return storeData;
            });

            //tie the analytics into page navigation here.
          }
        } else {
          // throw error.
          // TODO: add flag to globalStore to deactivate the form and send error message/email to dev
        }
      });
    }
  });
</script>

<Header latestBlogs={data.latestBlogs} />
<section id="page-content">
  <slot />
</section>
<Footer />
<AlertToast />

<style>
  #page-content {
    display: flex;
    position: relative;
    flex-direction: column;
    min-height: 100vh;
    max-width: 1920px;
    overflow-x: hidden;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
    #page-content {
      margin: 0 auto;
    }
  }
</style>
