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
  <SectionContainer bannerContent="GIVE US A CALL" bannerScreenSide="left">
    <p class="section-content">
      Whether you prefer to contact us by <a
        class="semibold"
        href="tel:+19794808444">phone</a
      >,
      <a class="semibold" href="mailto:office@byrdbros.com">email</a>, or prefer
      the personal touch of
      <a
        class="semibold"
        href="https://www.google.com/maps/place/BYRD+BROTHERS+HVAC/@29.0417635,-95.7067431,17z/data=!3m1!4b1!4m6!3m5!1s0x2df28abd63014a9:0x592a1a3e5416ec91!8m2!3d29.0417589!4d-95.7018722!16s%2Fg%2F11pyc3j0jb?entry=ttu"
        >stopping by our office</a
      >, we are here to make your experience as seamless and convenient as
      possible. Ready to assist with scheduling appointments, answering
      inquiries, and ensuring that you receive the information you need to make
      informed decisions about your HVAC needs. Your comfort and satisfaction
      are paramount, and Debbie is your first point of contact on your journey
      to a more comfortable, well-served home or business.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="Debbie Jenkins Office Manager.png"
    photoCaption="Office Manager - Debbie Jenkins"
    backgroundSide="right"
  />
  <SectionBreak />

  <p class="final-paragraph">
    Contacting us is the first step towards ensuring your indoor comfort and
    well-being. We understand that your HVAC system plays a critical role in
    your daily life, and any issues can disrupt your peace of mind. Whether you
    require installation, repairs, maintenance, or expert advice, reaching out
    to us is the key to reliable, efficient, and personalized solutions. Our
    team is here to provide professional guidance, exceptional service, and a
    swift response to your HVAC needs. Don't let heating or cooling issues go
    unaddressed; contact us today, and let us take care of your comfort, so you
    can focus on what matters most.
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
