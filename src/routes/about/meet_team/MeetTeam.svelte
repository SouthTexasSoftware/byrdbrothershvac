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
  <SectionContainer
    bannerContent="BRADY BYRD, OWNER"
    bannerScreenSide="left"
    bannerDescription="Certified HVAC Technician"
  >
    <p class="section-content">
      Brady is a co-owner and founder of Byrd Brothers HVAC. He attended
      Brazosport College and earned his Commercial HVAC Certificate in 2020.
      Represented by his bearded cartoon-likeness on our service vehicles, Brady
      is a well-known community member in Sweeny, TX.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="Brady Byrd - Owner, Certified Technician.png"
    photoCaption="Brady Byrd - Owner, Certified Technician"
    backgroundSide="right"
  />
  <SectionBreak />
  {#if !mobile}
    <PhotoSingleBlock
      photoFilename="Randy Byrd - Owner - Certified Technician.png"
      photoCaption="Randy Byrd - Owner, Certified Technician"
      backgroundSide="left"
    />
  {/if}
  <SectionContainer
    bannerContent="RANDY BYRD, OWNER"
    bannerScreenSide="right"
    bannerDescription="Certified HVAC Technician"
  >
    <p class="section-content">
      Randy is a co-owner and founder of Byrd Brothers HVAC. He attended
      Brazosport College and earned his Commercial HVAC Certificate in 2022.
      Shown in a suit and tie as his cartoon-likeness on our service vehicles,
      Randy is a well-known community member in Sweeny, TX.
    </p>
  </SectionContainer>
  {#if mobile}
    <PhotoSingleBlock
      photoFilename="Randy Byrd - Owner - Certified Technician.png"
      photoCaption="Randy Byrd - Owner, Certified Technician"
      backgroundSide="left"
    />
  {/if}
  <SectionBreak />

  <SectionContainer
    bannerContent="JORDAN BENAVIDES"
    bannerScreenSide="left"
    bannerDescription="Registered HVAC Technician"
  >
    <p class="section-content">
      Jordan's attention to detail, problem-solving skills, and friendly
      demeanor make him not just a trusted technician but also a reliable source
      of guidance for our clients. When he's not busy fine-tuning HVAC systems,
      you might find Jordan exploring the great outdoors, indulging in a new DIY
      project, or unwinding with a good book. Jordan embodies the spirit of
      excellence that our company stands for, and we're proud to have him as
      part of our team.
    </p>
  </SectionContainer>
  <PhotoSingleBlock
    photoFilename="Jordan Benavides Registered Technician.png"
    photoCaption="Jordan Benavides, Certified Technician"
    backgroundSide="right"
  />
  <SectionBreak />

  <SectionBreak />
  {#if !mobile}
  <PhotoSingleBlock
    photoFilename="Debbie Jenkins Office Manager.png"
    photoCaption="Debbie Jenkins, Office Manager"
    backgroundSide="right"
  />
  {/if}
  <SectionContainer
    bannerContent="DEBBIE JENKINS"
    bannerScreenSide="left"
    bannerDescription="Office Manager"
  >
    <p class="section-content">
      Meet Debbie, the organizational heartbeat of our small HVAC company. With
      a keen eye for detail, a passion for efficiency, and a warm, welcoming
      smile, Debbie is the linchpin that keeps our operations running
      seamlessly. As our Office Manager, she wears many hats, managing daily
      tasks from scheduling appointments and handling client inquiries to
      ensuring that paperwork flows smoothly. She's the friendly voice on the
      other end of the line, always ready to assist our valued clients and team
      members alike.
    </p>
  </SectionContainer>
  {#if mobile}
  <PhotoSingleBlock
    photoFilename="Debbie Jenkins Office Manager.png"
    photoCaption="Debbie Jenkins, Office Manager"
    backgroundSide="right"
  />
  {/if}
  <SectionBreak />

  <p class="final-paragraph">
    Parents, Ronnie and Windy Byrd, also help with the business. Ronnie, who has
    over 30 years of business management experience and Windy, who teaches business
    information management at Sweeny High School are ready to see them soar.
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
