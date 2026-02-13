<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import { getBlogPostBySlug } from "$lib/components/blog/blogUtils";
  import BlogPostComponent from "$lib/components/blog/BlogPostComponent.svelte";
  import type { BlogPost } from "$lib/stores";
  import BlogSkeletonComponent from "$lib/components/blog/BlogSkeletonComponent.svelte";

  let screenWidth: number;

  let installationPost: BlogPost | null = null;
  let repairPost: BlogPost | null = null;
  let maintenancePost: BlogPost | null = null;
  let emergencyPost: BlogPost | null = null;

  onMount(async () => {
    try {
      installationPost = await getBlogPostBySlug(
        "air-conditioning-installation",
      );
      repairPost = await getBlogPostBySlug("air-conditioning-repair");
      maintenancePost = await getBlogPostBySlug("air-conditioning-maintenance");
      emergencyPost = await getBlogPostBySlug("emergency-hvac");
    } catch (err) {
      console.error("Error fetching blog post:", err);
    }
  });
</script>

<svelte:window bind:innerWidth={screenWidth} />
<svelte:head>
  <title
    >Air Conditioning Services in Brazoria County | Byrd Brothers HVAC</title
  >
  <meta
    name="description"
    content="We specialize in air conditioning installation, repair, and maintenance with a satisfaction guarantee."
  />
</svelte:head>

<ViewTitleBar title="Air Conditioning" />

<div class="content-width md:w-xl">
  <p class=" max-w-3xl">
    Byrd Brothers HVAC specializes in Air Conditioning Services in Brazoria
    County and Matagorda County of South Texas, with close proximity to <a
      href="/about/service_area/sweeny"
      class="paragraph-link">Sweeny</a
    >,
    <a href="/about/service_area/brazoria" class="paragraph-link">Brazoria</a>,
    and
    <a href="/about/service_area/lake_jackson" class="paragraph-link"
      >Lake Jackson</a
    >, TX.
    <br /><br />
    From new air conditioning installation and whole system replacement, to routine
    maintenance and emergency repairs, we are your local experts in keeping your
    home cool and comfortable. We pride ourselves in being a family-owned business
    that treats our customers like one of our own.
    <a href="/contact/quote_form" class="paragraph-link">Request a quote!</a>
    <br /><br />
  </p>
  <div class="flex flex-col items-center justify-center">
    Scroll down or click below to learn more about our AC services:
    <a href="/services/air_conditioning/installation">AC Installation</a>
    <a href="/services/air_conditioning/repair">AC Repair</a>
    <a href="/services/air_conditioning/maintenance">AC Maintenance</a>
    <a href="/services/air_conditioning/emergency">Emergency HVAC</a>
  </div>
</div>
<div class="divider-bar content-width" />

<div class="content-width max-w-2xl">
  {#if installationPost}
    <BlogPostComponent blogPost={installationPost} embeddedPost={true} />
  {:else}
    <div class="md:w-[1200px]">
      <BlogSkeletonComponent />
    </div>
  {/if}
  <div class="divider-bar content-width" />
  {#if repairPost}
    <BlogPostComponent blogPost={repairPost} embeddedPost={true} />
  {:else}
    <div class="md:w-[1200px]">
      <BlogSkeletonComponent />
    </div>
  {/if}
  <div class="divider-bar content-width" />
  {#if maintenancePost}
    <BlogPostComponent blogPost={maintenancePost} embeddedPost={true} />
  {:else}
    <div class="md:w-[1200px]">
      <BlogSkeletonComponent />
    </div>
  {/if}
  <div class="divider-bar content-width" />
  {#if emergencyPost}
    <BlogPostComponent blogPost={emergencyPost} embeddedPost={true} />
  {:else}
    <div class="md:w-[1200px]">
      <BlogSkeletonComponent />
    </div>
  {/if}
  <div class="divider-bar content-width" />
  <div class="article-content mx-auto max-w-2xl">
    <SectionContainer
      bannerContent="GET A QUOTE!"
      bannerScreenSide="left"
      bannerDescription="Free estimates for any size job."
    >
      <RequestAQuote />
    </SectionContainer>
  </div>
</div>

<style>
  .main-page-container {
    padding: 0 200px;
  }
  .main-page-content {
    font-size: 20px;
  }
  .link-container {
    display: flex;
    flex-direction: column;
  }
  a {
    font-size: 20px;
    text-decoration: underline;
  }
  .divider-bar {
    width: 50vw;
    max-width: 1920px;
    height: 2px;
    background-color: var(--light-text);
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .main-page-container {
      padding: 0;
    }
    .divider-bar {
      width: 90vw;
    }
  }
</style>
