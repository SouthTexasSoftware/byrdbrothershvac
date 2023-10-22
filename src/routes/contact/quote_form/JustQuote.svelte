<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;
</script>

<!-- <ArticleTitleBar
      title="AIR CONDITIONING INSTALLATION"
      machineDate="2023-10-16"
      date="10/16/2023"
      articleOwner="Brady Byrd, Owner"
    /> -->
<div class="article-content content-width">
  <SectionContainer bannerContent="QUOTE FORM" bannerScreenSide="left">
    <RequestAQuote />
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="byrdbrothers-with-truck.png"
    photoCaption="We are here to help!"
    backgroundSide="right"
  />
  <SectionBreak />

  <p class="final-paragraph">
    Our user-friendly online quote request form is designed to simplify the
    process of obtaining HVAC services. It's a convenient and efficient way to
    provide us with essential details about your project, so we can better
    understand your needs and respond promptly. Just a few clicks, and you're on
    your way to a more comfortable space. We value your time and are committed
    to providing you with a quick, accurate, and tailored response to meet your
    HVAC requirements. Your comfort begins with your quote request, and we're
    here to make it a straightforward and hassle-free experience.
  </p>
</div>

<style>
  .article-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .section-content {
    font-family: font-regular;
    font-size: 20px;
    margin-top: 10px;
    padding: 0 20px;
  }
  .final-paragraph {
    padding: 0 200px;
    margin-bottom: 50px;
    font-family: font-regular;
    font-size: 20px;
  }
  a {
    text-decoration: underline;
    font-family: font-regular;
    font-size: 19px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .section-content {
      padding: 0;
    }
    .article-content {
      flex-direction: column;
    }
    .final-paragraph {
      padding: 0 0px;
    }
  }
</style>
