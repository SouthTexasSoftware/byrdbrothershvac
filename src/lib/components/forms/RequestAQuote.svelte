<script lang="ts">
  import { enhance } from "$app/forms";
  import SectionBanner from "../layout/SectionBanner.svelte";
  import SectionContainer from "../layout/SectionContainer.svelte";
</script>



  <form
    method="POST"
    name="request-a-quote"
    use:enhance={({ formData, cancel }) => {
      // submit form data to firebase for storage, and then on to server to send notification email

      for (const [key, value] of formData) {
        console.log(key, value);
      }

      cancel();
    }}
  >
    <input
      name="name"
      type="text"
      placeholder="Name*"
      required
      autocomplete="name"
    />

    <input name="phone" type="text" placeholder="Phone*" autocomplete="tel" />

    <input name="email" type="text" placeholder="Email*" autocomplete="email" />

    <input
      name="location"
      type="text"
      placeholder="Location*"
      autocomplete="on"
    />

    <textarea
      name="details"
      id="details"
      cols="30"
      rows="10"
      placeholder="Details

      Be as specific as possible!
      •  Service needed
      •  Urgency
      •  Etc.
      "
    />

    <button type="submit" class="send"> SEND </button>

    <p class="disclaimer">
      Information submitted is used for quotation purposes only. No data is
      shared or used in any other way.
    </p>
  </form>

<style>

  

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input,
  textarea {
    width: 47%;
    outline: none;
    border: 1px solid var(--input-border);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 1px;
  }
  input::placeholder {
    color: var(--light-text);
  }
  textarea {
    width: 100%;
  }

  button.send {
    border: 1px solid var(--neutral);
    width: 100%;
    height: 50px;
    font-size: 20px;
    margin: 5px;
  }
  /* TODO: on form validated, set button color to change with transition */

  .disclaimer {
    font-family: font-light;
    font-size: 12px;
    text-align: center;
    width: 100%;
    margin-top: -4px;
    padding: 0 25px;
  }

  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }

  /* Mobile */
  @media only screen and (max-width: 600px) {
    
    form {
      width: 90vw;
    }
    
    input,
    textarea {
      width: 100%;
      padding: 10px 20px;
    }
  }
</style>
