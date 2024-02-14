<script lang="ts">
  import LogoStandingOnly from "$lib/logos/LogoStandingOnly.svelte";
  import { AlertCircle } from "lucide-svelte";
</script>

<div class="desktop-statement">
  <LogoStandingOnly height={150} />
  <p class="desktop-verbiage">
    It's important to note that our commitment extends beyond our partnerships.
    While we proudly offer and support various products and brands, our team of
    expert technicians possesses the versatility and knowledge to <span
      class="semibold">work on any HVAC equipment, regardless of the brand</span
    >. This means that, as your trusted HVAC partner, we're equipped to provide
    comprehensive services for a wide array of systems. Our mission is to
    deliver the highest level of satisfaction to our clients, no matter the make
    or model of their HVAC equipment, ensuring that their comfort and peace of
    mind are always our top priority.
  </p>
</div>
<div class="mobile-statement">
  <AlertCircle color={"#ff78189b"} size={"60px"} />
  <p class="mobile-verbiage">
    We love our <a href="/about/partners" class="paragraph-link smol"
      >Partners</a
    >
    and <a href="/products" class="paragraph-link smol">Products</a> - but we
    install, service, and repair
    <span class="semibold">any HVAC equipment!</span>
  </p>
</div>

<style>
  .desktop-statement {
    display: flex;
    align-items: center;
  }
  .desktop-verbiage {
    width: 800px;
    margin: 20px 0;
    margin-left: 20px;
    border-left: 4px solid var(--banner-primary);
    padding-left: 40px;
  }
  .mobile-statement {
    display: none;
    align-items: center;
    width: 90vw;
    font-size: 16px;
    padding: 10px;
    padding-left: 20px;
    background-color: #ff781824;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgb(215, 215, 215);
  }
  .mobile-verbiage {
    border-left: 3px solid var(--banner-primary);

    padding-left: 20px;
    margin-left: 20px;
    color: black;
  }
  .smol {
    font-size: 17px;
  }
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
    .desktop-statement {
      display: none;
    }
    .mobile-statement {
      display: flex;
    }
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .desktop-statement {
      display: none;
    }
    .mobile-statement {
      display: flex;
    }
  }
</style>
