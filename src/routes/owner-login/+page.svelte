<script lang="ts">
  import { get } from "svelte/store";
  import { firebaseStore } from "$lib/stores"; // Adjust path if your stores are elsewhere
  import { addToast } from "$lib/stores/toastStore";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore"; // Add for Firestore check

  let mode: "login" | "signup" | "forgot" = "login";
  let email = "";
  let password = "";
  let signupCode = ""; // New field for signup restriction
  let interval: NodeJS.Timeout | undefined;

  //TODO: we modified the firestore rules set - test quote after tweaking the email notification to not go out in dev mode

  onMount(() => {
    checkFirebase();

    function checkFirebase() {
      const fb = get(firebaseStore);
      if (!fb) {
        // If not connected, set up polling
        interval = setInterval(() => {
          const fbCheck = get(firebaseStore);
          if (fbCheck) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000); // Check every 1 second
      }
    }
  });

  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  function validatePassword(pwd: string): string | null {
    if (pwd.length < 12) {
      return "Password must be at least 12 characters long.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must include at least one number.";
    }
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      return "Password must include at least one special character (e.g., !@#$%).";
    }
    return null;
  }

  async function handleSubmit() {
    const fb = get(firebaseStore);
    if (!fb || !fb.auth) {
      addToast(
        "Error",
        "Firebase not initialized. Please try again.",
        "failure",
      );
      return;
    }
    const auth = fb.auth;
    const db = fb.db; // For Firestore check

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        addToast("Success!", "Logged in successfully.", "success");
        goto("/admin"); // Redirect to your blog admin/dashboard after login
      } else if (mode === "signup") {
        const pwdError = validatePassword(password);
        if (pwdError) {
          throw new Error(pwdError);
        }
        // Check signup code against Firestore (assumes a doc at 'config/signupCodes' with a 'validCodes' array or similar)
        const codeDocRef = doc(db, "config/signupCodes");
        const codeDoc = await getDoc(codeDocRef);
        if (
          !codeDoc.exists() ||
          !codeDoc.data()?.validCodes?.includes(signupCode)
        ) {
          throw new Error("Invalid signup code.");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        addToast(
          "Success!",
          "Account created! Please Login.",
          "success",
        );
        // Optionally: await sendEmailVerification(auth.currentUser);
        // Optional: Delete the code after use for one-time invites
        // Implemented so the signup codes dont just sit in a readable firebase store...
        await updateDoc(codeDocRef, { validCodes: arrayRemove(signupCode) });

        switchMode("login"); // Switch back to login after signup
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        addToast(
          "Success!",
          "Password reset email sent! Check your inbox.",
          "success",
        );
        switchMode("login"); // Switch back to login after reset request
      }
    } catch (err: any) {
      console.error("Signup Error:", err.code, err.message, err.stack); // Add detailed logging
      let errorMessage = "An unexpected error occurred.";
      if (err.code) {
        switch (err.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/weak-password":
            errorMessage =
              "Password is too weak. Please choose a stronger one.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "This email is already in use.";
            break;
          case "auth/invalid-credential":
            errorMessage =
              "Invalid credentials. Please check your email and password.";
            break;
          case "permission-denied": // Handle Firestore permission errors
            errorMessage =
              "Insufficient permissions to access signup codes. Check Firestore rules.";
            break;
          default:
            errorMessage = `${err.message} (Code: ${err.code})`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      addToast("Error", errorMessage, "failure");
    }
  }

  function switchMode(newMode: typeof mode) {
    mode = newMode;
    password = ""; // Clear password for security
    signupCode = ""; // Clear code
  }
</script>

<div
  class="w-full max-w-md mx-auto mt-10 p-6 bg-[var(--bg)] rounded-lg shadow-lg min-h-[300px]"
>
  <!-- Added w-full for full width on mobile, min-h for consistent height -->
  <h1 class="text-2xl semibold mb-6 text-center text-[var(--primary)]">
    {mode === "login"
      ? "Owner Login"
      : mode === "signup"
        ? "Create Account"
        : "Forgot Password"}
  </h1>

  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-[var(--text)]"
        >Email (Username)</label
      >
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="mt-1 block w-full px-3 py-2 border border-[var(--input-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
      />
    </div>

    {#if mode === "signup"}
      <div>
        <label
          for="signupCode"
          class="block text-sm font-medium text-[var(--text)]"
          >Signup Code</label
        >
        <input
          id="signupCode"
          type="text"
          bind:value={signupCode}
          required
          class="mt-1 block w-full px-3 py-2 border border-[var(--input-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
        />
      </div>
    {/if}

    {#if mode !== "forgot"}
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-[var(--text)]">Password</label
        >
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          class="mt-1 block w-full px-3 py-2 border border-[var(--input-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
        />
        {#if mode === "signup"}
          <p class="mt-2 text-xs text-[var(--light-text)]">
            Password must be at least 12 characters long, include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character (e.g., !@#$%).
          </p>
        {/if}
      </div>
    {/if}

    <button
      type="submit"
      class="w-full py-2 px-4 bg-[var(--primary)] text-white font-semibold rounded-md shadow-sm hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
    >
      {mode === "login"
        ? "Login"
        : mode === "signup"
          ? "Create Account"
          : "Send Reset Email"}
    </button>
  </form>

  <div class="mt-6 text-center text-sm text-[var(--light-text)]">
    {#if mode === "login"}
      <a
        href="#"
        on:click|preventDefault={() => switchMode("signup")}
        class="text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >Create an account</a
      >
      <span class="mx-2">|</span>
      <a
        href="#"
        on:click|preventDefault={() => switchMode("forgot")}
        class="text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >Forgot password?</a
      >
    {:else if mode === "signup"}
      <a
        href="#"
        on:click|preventDefault={() => switchMode("login")}
        class="text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >Back to login</a
      >
    {:else if mode === "forgot"}
      <a
        href="#"
        on:click|preventDefault={() => switchMode("login")}
        class="text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >Back to login</a
      >
    {/if}
  </div>
</div>

<style>
  /* Add any custom CSS here if Tailwind doesn't cover it, e.g., for legacy components */
</style>
