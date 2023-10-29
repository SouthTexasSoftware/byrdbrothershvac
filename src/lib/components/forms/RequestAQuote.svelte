<script lang="ts">
  import { firebaseStore } from "$lib/stores";
  import {
    collection,
    addDoc,
    Timestamp,
    DocumentReference,
    CollectionReference,
  } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import LoadingSpinner from "../layout/LoadingSpinner.svelte";
  import popupBg from "$lib/photos/form-popup-bg.png";
  import { fly, slide } from "svelte/transition";
  import { page } from "$app/stores";
  import { dev } from "$app/environment";
  import { logEvent } from "firebase/analytics";

  let formAvailable = false;
  let formCollection: CollectionReference;
  let formSubmitting = false;
  let formSubmitted = false;

  firebaseStore.subscribe((storeData) => {
    if (storeData) {
      formAvailable = true;
    }
  });

  $: if (formAvailable) {
    formCollection = collection($firebaseStore.db, "quote-forms");
  }

  let formInteractionCompleted = false;

  function formInteractionLogger() {
    if (formInteractionCompleted) return;
    if (!dev) {
      if ($firebaseStore.analytics) {
        logEvent($firebaseStore.analytics, "form_interaction");
      }
    }
    formInteractionCompleted = true;
  }

  function formSubmissionLogger() {
    if (!dev) {
      if ($firebaseStore.analytics) {
        logEvent($firebaseStore.analytics, "form_submitted");
      }
    }
  }
</script>

<div class="form-wrapper">
  <form
    class:disabled={!formAvailable}
    method="POST"
    name="request-a-quote"
    use:enhance={async ({ formElement, formData, cancel }) => {
      if (formSubmitting) {
        return;
      }
      // submit form data to firebase for storage, and then on to server to send notification email
      formSubmitting = true;

      let formObject = {};

      for (const [key, value] of formData) {
        //@ts-ignore
        formObject[key] = value;
      }

      const docRef = await addDoc(formCollection, formObject);

      // send to api endpoint
      let sendNotificationEmail = await fetch("/api/quote_request", {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let apiResponse = await sendNotificationEmail.json();

      if (apiResponse.error) {
        console.error(apiResponse.code);
        return;
      }

      cancel();

      formSubmissionLogger();
      
      formSubmitted = true;
      formSubmitting = false;
      formAvailable = false;

      setTimeout(() => {
        formSubmitted = false;
        formElement.reset();
        formAvailable = true;
      }, 8000);
    }}
  >
    <input
      name="name"
      type="text"
      placeholder="Name*"
      required
      autocomplete="name"
      on:click={formInteractionLogger}
    />

    <input
      name="phone"
      type="tel"
      placeholder="Phone*"
      autocomplete="tel-national"
      required
      on:click={formInteractionLogger}
    />

    <input
      name="email"
      type="email"
      placeholder="Email*"
      autocomplete="email"
      required
      on:click={formInteractionLogger}
    />

    <input
      name="location"
      type="text"
      placeholder="Location*"
      autocomplete="street-address"
      required
      on:click={formInteractionLogger}
    />

    <textarea
      name="details"
      id="details"
      cols="30"
      rows="10"
      on:click={formInteractionLogger}
      placeholder="Details

      Be as specific as possible!
      •  Service needed
      •  Urgency
      •  Etc.
      "
    />

    <button type="submit" class="send">
      {#if formSubmitting}
        <LoadingSpinner />
      {:else}
        SEND
      {/if}
    </button>

    <p class="disclaimer">
      Information submitted is used for quotation purposes only. No data is
      shared or used in any other way.
    </p>
  </form>
  {#if formSubmitted}
    <div
      class="submission-popup"
      style="background-image: url({popupBg})"
      transition:fly={{ y: 200, duration: 500 }}
    >
      <div class="popup-title">Thank You!</div>
      <p class="popup-content">Your request has been submitted.</p>
    </div>
  {/if}
</div>

<style>
  .form-wrapper {
    position: relative;
  }
  .submission-popup {
    width: 60%;
    height: 60%;
    border-radius: 15px;
    box-shadow: 0px 3px 6px grey;
    background-color: var(--bg);
    position: absolute;
    top: 15%;
    left: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-position: center;
    justify-content: space-between;
  }
  .popup-title {
    font-family: font-semibold;
    color: var(--font);
    font-size: 38px;
    color: var(--bg);
  }
  .popup-content {
    margin-top: 10%;
    color: var(--bg);
    margin-bottom: 5px;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  form.disabled *,
  form.disabled *::placeholder,
  form.disabled button {
    color: rgb(201, 201, 201);
    border-color: rgb(244, 244, 244);
    pointer-events: none;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    .submission-popup {
      width: 90%;
      left: 5%;
    }
  }
</style>
