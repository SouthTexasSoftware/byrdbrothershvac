<script lang="ts">
  import ViewTitleBar from "$lib/components/layout/ViewTitleBar.svelte";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";

  let displayCards = true;

  onMount(() => {
    displayCards = true;
  });

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<svelte:head>
  <title>Contact Us | Byrd Brothers HVAC</title>
  <meta
    name="description"
    content="Give our front desk a call today, or fill out our online quote request form! We are here to help you get comfortable."
  />
</svelte:head>

<ViewTitleBar title="Contact Us" />

<div class="card-container">
  {#if displayCards}
    <div class="service-card" in:fly={{ x: 50, duration: 500 }}>
      <a href="/contact/front_desk">
        <img
          src={getAssetSrc("home-page-owners.png")}
          alt="Talk to the front desk"
        />
      </a>
      <div class="card-info-block">
        <a href="/contact/front_desk"><h3 class="card-title">FRONT DESK</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          Whether you prefer to contact us by <a
            class="semibold"
            href="tel:+19794808444">phone</a
          >,
          <a class="semibold" href="mailto:office@byrdbros.com">email</a>, or
          prefer the personal touch of
          <a
            class="semibold"
            href="https://www.google.com/maps/place/BYRD+BROTHERS+HVAC/@29.0417635,-95.7067431,17z/data=!3m1!4b1!4m6!3m5!1s0x2df28abd63014a9:0x592a1a3e5416ec91!8m2!3d29.0417589!4d-95.7018722!16s%2Fg%2F11pyc3j0jb?entry=ttu"
            >stopping by our office</a
          >, we are here to make your experience as seamless and convenient as
          possible. Ready to assist with scheduling appointments, answering
          inquiries, and ensuring that you receive the information you need to
          make informed decisions about your HVAC needs. Your comfort and
          satisfaction are paramount, and Debbie is your first point of contact
          on your journey to a more comfortable, well-served home or business.
        </p>
      </div>
    </div>

    <div class="service-card" in:fly={{ x: 50, duration: 500, delay: 100 }}>
      <a href="/contact/quote_form">
        <img src={getAssetSrc("request-a-quote.png")} alt="Request A Quote" />
      </a>
      <div class="card-info-block">
        <a href="/contact/quote_form"><h3 class="card-title">QUOTE FORM</h3></a>
        <div class="card-title-underline" />
        <p class="card-description">
          Our user-friendly online quote request form is designed to simplify
          the process of obtaining HVAC services. It's a convenient and
          efficient way to provide us with essential details about your project,
          so we can better understand your needs and respond promptly. Just a
          few clicks, and you're on your way to a more comfortable space. We
          value your time and are committed to providing you with a quick,
          accurate, and tailored response to meet your HVAC requirements. Your
          comfort begins with your quote request, and we're here to make it a
          straightforward and hassle-free experience.
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
  .service-card {
    display: flex;
    width: 900px;
    border: 1px solid var(--input-border);
    border-radius: 15px;
    margin: 25px 0;
    padding: 10px;
    transition: all 0.3s ease;
  }
  .service-card:hover {
    border-color: var(--primary);
    transform: translateX(2px);
  }
  a img {
    min-width: 200px;
    height: 200px;
    border-radius: 15px;
  }
  .service-card a {
    margin: auto 0;
  }
  .card-info-block {
    padding: 5px 25px;
  }
  .card-title {
    font-family: font-regular;
    font-size: 24px;
  }
  .card-title-underline {
    width: 20px;
    height: 2px;
    background-color: var(--primary);
    border-radius: 2px;
    margin: 5px 0;
  }
  .card-description {
    font-family: font-regular;
    font-size: 18px;
  }
  .card-description a {
    text-decoration: underline;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
    .service-card {
      width: 545px;
      flex-direction: column;
    }
    .service-card a {
      margin: 0 auto;
    }
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .service-card {
      width: 90vw;
      flex-direction: column;
    }
    .service-card a {
      margin: 15px auto;
    }
    .card-description {
      text-align: justify;
    }
    a img {
      height: auto;
      max-width: 73vw;
    }
  }
</style>
