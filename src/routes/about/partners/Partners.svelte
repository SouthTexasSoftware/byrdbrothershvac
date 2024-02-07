<script lang="ts">
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
  <SectionContainer bannerContent="RUUD Pro Partner" bannerScreenSide="left">
    <p class="section-content">
      RUUD's decades of industry experience, innovation, and reputation for
      manufacturing high-performance heating and cooling systems align perfectly
      with our mission to provide our clients with top-tier solutions. Their
      state-of-the-art technology and reliability ensure that our customers
      receive efficient, dependable, and long-lasting HVAC products. This
      partnership enables us to offer a wide range of RUUD's cutting-edge
      equipment, from furnaces and air conditioners to heat pumps and more,
      allowing us to deliver superior comfort and energy efficiency to homes and
      businesses. Together with RUUD, we're dedicated to delivering the highest
      level of satisfaction and performance for our valued clients.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="ruud-pro-partner.png"
    photoCaption=""
    backgroundSide="none"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="mrcool-logo.png"
      photoCaption=""
      backgroundSide="none"
    />
  {/if}
  <SectionContainer bannerContent="MRCOOL" bannerScreenSide="right">
    <p class="section-content">
      We're thrilled to have joined forces with MRCOOL, a renowned leader in the
      HVAC industry, to offer cutting-edge mini-splits and heat pumps to our
      valued customers. The decision to partner with MRCOOL was driven by their
      unwavering commitment to innovation and delivering exceptional
      energy-efficient solutions. MRCOOL's mini-splits and heat pumps have
      consistently set industry standards for performance, reliability, and
      user-friendly technology. By integrating MRCOOL's high-quality products
      into our offerings, we're providing our clients with efficient, versatile,
      and eco-friendly HVAC solutions that are perfectly suited for a wide range
      of applications. This partnership reflects our shared dedication to
      creating comfortable, environmentally responsible spaces while ensuring
      our customers receive the best in modern HVAC technology.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="mrcool-logo.png"
      photoCaption=""
      backgroundSide="none"
    />
  {/if}
  <SectionBreak />
  <SectionContainer
    bannerContent="Generac Sales and Service"
    bannerScreenSide="left"
  >
    <p class="section-content">
      We're committed to providing comprehensive solutions for all your home
      comfort needs. That's why we're proud to announce our partnership with
      Generac, the leading name in home backup power solutions. Whether you're
      looking to safeguard your home against unexpected power outages or seeking
      reliable backup power for peace of mind, we've got you covered with our
      sales and service of Generac home electric generators. Call us today for a
      consultation. We can assess your power needs and recommend the right
      Generac generator to fit your home and lifestyle. Followed by professional
      installation, routine maintenance, and even emergency repairs. Let us help
      you keep your home comfortable no matter what happens!
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="generac-authorized-dealer-logo.png"
    photoCaption=""
    backgroundSide="none"
  />
  <SectionBreak />
  <p class="final-paragraph">
    It's important to note that our commitment extends beyond these
    partnerships. While we proudly offer RUUD and MRCOOL products, our team of
    expert technicians possesses the versatility and knowledge to work on any
    HVAC equipment, regardless of the brand. This means that, as your trusted
    HVAC partner, we're equipped to provide comprehensive services, from
    installation to maintenance and repairs, for a wide array of systems. Our
    mission is to deliver the highest level of satisfaction to our clients, no
    matter the make or model of their HVAC equipment, ensuring that their
    comfort and peace of mind are always our top priority.
  </p>
</div>

<style>
  .article-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .list-topic {
    font-size: 20px;
  }
  li {
    margin-bottom: 10px;
    position: relative;
    font-family: font-regular;
    font-size: 20px;
  }
  li::before {
    content: "";
    position: absolute;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: var(--banner-primary);
    left: -15px;
    top: 11px;
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
