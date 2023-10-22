<script lang="ts">
  import "$lib/global.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/stores";
  import { connectToFirebase, connectAnalytics } from "$lib/helpers";
  import { dev } from "$app/environment";

  // connect to firebase to ensure we can take form submissions.
  onMount(() => {
    if (!$firebaseStore) {
      connectToFirebase().then((connectedBool) => {
        if (connectedBool) {
          console.log("Ready for form submissions!");

          // eventually shutoff for dev env
          if (!dev) {
            let analytics = connectAnalytics();
            console.log(analytics);
            firebaseStore.update((storeData) => {
              storeData.analytics = analytics;
              return storeData;
            });
          }
        } else {
          // throw error.
          // TODO: add flag to globalStore to deactivate the form and send error message/email to dev
        }
      });
    }
  });

  //TODO: add hook into analytics connection to utilize $velte app navigation to log 'screen_view' events..

  //TODO: add the banner slide in effect to be queued on page position

  //TODO: complete Form submission setup/link to firestore and email api..


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
