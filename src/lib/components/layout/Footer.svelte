<script lang="ts">
  let date = new Date();
  let copyrightYear = date.getFullYear();
  let stsPhotoFile = "sts-logo-no-icon.png";
  let mrcoolPhotoFile = "mrcool-logo.png";

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<footer>
  <button
    on:click={() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }}>Back to Top</button
  >
  <div class="info-row">
    <div class="contact">
      <p class="label">Contact Information</p>
      <div class="contact-info">
        <a
          href="https://www.google.com/maps/place/BYRD+BROTHERS+HVAC/@29.0417636,-95.7044471,17z/data=!3m1!4b1!4m6!3m5!1s0x2df28abd63014a9:0x592a1a3e5416ec91!8m2!3d29.0417589!4d-95.7018722!16s%2Fg%2F11pyc3j0jb?entry=ttu"
          >101 E 6th Street <br /> Sweeny, TX 77480</a
        >
        <a href="tel:+19794808444">(979) 480-8444</a>
      </div>
    </div>

    <div class="partners">
      <p class="label">Our Partners</p>

      <a href="https://www.ruud.com/products/hvac/"
        ><img
          src="//static-ruud.globalimageserver.com/_WP/img/header/logo.png"
          alt="Ruud Logo Background"
          class="footer-picture ruud"
          width=""
          height=""
        /></a
      >
      <a href="https://mrcool.com/"
        ><img
          class="footer-picture"
          src={getAssetSrc(mrcoolPhotoFile)}
          alt="MrCool Blue Logo"
        /></a
      >

      <a href="https://www.southtexas.software/">
        <img
          src={getAssetSrc(stsPhotoFile)}
          alt="South Texas Software, LLC"
          class="footer-picture"
        /></a
      >
    </div>
  </div>
  <p class="copyright">&copy; {copyrightYear} Byrd Brothers HVAC</p>
</footer>

<style>
  footer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1920px;
    padding: 0 10px;
    background-color: var(--banner-primary);
    height: 225px;
    margin-top: 50px;
  }
  button {
    font-family: font-semibold;
    text-decoration: underline;
    font-size: 14px;
    margin-bottom: 15px;
    margin-top: 5px;
  }
  .info-row {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    max-width: 1920px;
    margin-bottom: auto;
    /* transform: translate(6%); */
  }
  .contact,
  .partners {
    display: flex;
    flex-direction: column;
  }
  .partners {
    align-items: center;
  }
  .label {
    font-family: font-light;
    font-size: 20px;
    padding: 0;
  }
  .contact a,
  .partners a {
    font-family: font-light;
    font-size: 16px;
  }
  .contact-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }
  .footer-picture {
    width: 100px;
    margin-bottom: 10px;
  }
  .footer-picture.ruud {
    width: 75px;
    margin-bottom: -5px;
  }
  .copyright {
    font-family: font-light;
    font-size: 14px;
    margin-bottom: 5px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
    footer {
      margin: 0 auto;
    }
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    footer {
      height: auto;
    }
    .info-row {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .contact,
    .partners {
      margin-bottom: 25px;
      justify-content: center;
      align-items: center;
    }
    .footer-picture {
      width: 100px;
      margin-bottom: 10px;
    }
    .footer-picture.ruud {
      width: 80px;
      margin-bottom: -5px;
    }
  }
</style>
