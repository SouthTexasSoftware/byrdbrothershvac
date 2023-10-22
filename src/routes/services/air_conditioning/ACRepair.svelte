<script lang="ts">
  import RequestAQuote from "$lib/components/forms/RequestAQuote.svelte";
  import ArticleTitleBar from "$lib/components/layout/ArticleTitleBar.svelte";
  import SectionBreak from "$lib/components/layout/SectionBreak.svelte";
  import SectionContainer from "$lib/components/layout/SectionContainer.svelte";
  import PhotoSingleBlock from "$lib/components/photos/PhotoSingleBlock.svelte";

  export let mobile: boolean;
</script>

<ArticleTitleBar
  title="AIR CONDITIONING REPAIR"
  machineDate="2023-10-18"
  date="10/18/2023"
  articleOwner="Brady Byrd, Owner"
/>
<div class="article-content content-width">
  <SectionContainer bannerContent="REVIVING COMFORT" bannerScreenSide="left">
    <p class="section-content">
      In the throes of a blistering summer day, few things feel as essential as
      a reliable air conditioning system. It's your refuge from the elements,
      the sanctuary where you escape extreme temperatures and embrace comfort.
      But, what happens when this oasis of coolness begins to falter? This is
      where the art of air conditioning repair comes into play.
      <br /><br />
      Air conditioning repair is the unsung hero of home and workplace comfort. It's
      the skilled craft that breathes life back into your HVAC (Heating, Ventilation,
      and Air Conditioning) system when it's struggling to maintain the perfect indoor
      climate. When your AC unit or heating system starts to show signs of distress,
      the timely intervention of a skilled technician can make all the difference.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="repair-gauge-set-stock.jpg"
    photoCaption="Diagnosing a refrigerant issue for repair"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="double-outdoor-units-stock.png"
      photoCaption="Double outdoor units up and running"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="WHAT DOES REPAIR MEAN?"
    bannerScreenSide="right"
  >
    <p class="section-content">
      Air conditioning repair isn't just about fixing a malfunctioning system;
      it's about safeguarding your comfort, ensuring your energy efficiency, and
      extending the lifespan of your HVAC equipment. It's the service that
      revives your trusty companion, preventing the need for a costly
      replacement and putting an end to sleepless nights spent in uncomfortable
      conditions.
      <br /><br />
      But what exactly constitutes air conditioning repair? It's more than just patching
      up broken components. It's a comprehensive process that involves diagnosing
      issues, troubleshooting problems, replacing worn-out parts, and fine-tuning
      your system to peak performance. A well-executed repair ensures that your HVAC
      system operates at its best, preserving energy, lowering costs, and maintaining
      pristine indoor air quality.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="double-outdoor-units-stock.png"
      photoCaption="Double outdoor units up and running"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />
  <SectionContainer bannerContent="THE KEY BENEFITS" bannerScreenSide="left">
    <p class="section-content">
      The advantages of addressing air conditioning issues in a timely manner
      are numerous and far-reaching. Here are some compelling reasons to
      prioritize air conditioning repair:
    </p>
    <div class="section-content">
      <ul>
        <li>
          <span class="semibold list-topic">Enhanced Comfort: </span> A properly
          functioning system guarantees that your home or workspace remains comfortable
          year-round.
        </li>
        <li>
          <span class="semibold list-topic">Energy Savings: </span> Repaired systems
          operate efficiently, reducing energy consumption and the burden on your
          wallet.
        </li>
        <li>
          <span class="semibold list-topic">Extended Equipment Life: </span> Well-maintained
          and promptly repaired systems last longer, preventing premature replacements.
        </li>
        <li>
          <span class="semibold list-topic">Cost Savings: </span> Addressing minor
          issues early can prevent them from evolving into costly, major repairs.
        </li>
        <li>
          <span class="semibold list-topic">Peace of Mind: </span> With a reliable
          HVAC system, you can enjoy peace of mind, knowing you're prepared for any
          weather.
        </li>
      </ul>
    </div>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="mrcool-outdoor-unit.jpg"
    photoCaption="High efficiency minisplit outdoor unit"
    backgroundSide="none"
  />
  <SectionBreak />

  <p class="final-paragraph">
    We understand that your comfort and peace of mind are paramount. Our
    commitment to excellence in air conditioning repair is unwavering. We take
    pride in our skilled technicians, who possess years of experience and are
    equipped with the latest tools and techniques. When you choose us, you
    choose reliability, efficiency, and a dedication to restoring your HVAC
    system to its optimal performance. We're not just in the business of repair;
    we're in the business of restoring your comfort, reducing your energy costs,
    and extending the life of your HVAC system. Don't compromise on quality;
    choose Byrd Brothers HVAC for air conditioning repair, and experience the
    difference that expertise and commitment can make in your indoor
    environment.
    <a href="tel:+19794808444">Call us today</a>.
  </p>
  <SectionContainer bannerContent="GET A QUOTE!" bannerScreenSide="left" bannerDescription="Free estimates for any size job.">
    <RequestAQuote />
  </SectionContainer>
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
    font-family: font-regular;
    font-size: 20px;
    margin-bottom: 50px;
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
    .article-content {
      flex-direction: column;
    }
    .section-content {
      padding: 0;
    }
    .final-paragraph {
      padding: 0 0px;
    }
  }
</style>
