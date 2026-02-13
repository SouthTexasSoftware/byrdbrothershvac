<script lang="ts">
  import { get } from "svelte/store";
  import { firebaseStore } from "$lib/stores";
  import { addToast } from "$lib/stores/toastStore";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
  import { LockKeyhole } from "lucide-svelte";

  let mode: "login" | "signup" | "forgot" = "login";
  let email = "";
  let password = "";
  let signupCode = "";
  let interval: NodeJS.Timeout | undefined;
  let showPassword = false;

  onMount(() => {
    checkFirebase();

    function checkFirebase() {
      const fb = get(firebaseStore);
      if (!fb) {
        interval = setInterval(() => {
          const fbCheck = get(firebaseStore);
          if (fbCheck) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);
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
    const db = fb.db;

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        addToast("Success!", "Logged in successfully.", "success");
        goto("/admin");
      } else if (mode === "signup") {
        const pwdError = validatePassword(password);
        if (pwdError) {
          throw new Error(pwdError);
        }
        const codeDocRef = doc(db, "config/signupCodes");
        const codeDoc = await getDoc(codeDocRef);
        if (
          !codeDoc.exists() ||
          !codeDoc.data()?.validCodes?.includes(signupCode)
        ) {
          throw new Error("Invalid signup code.");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        addToast("Success!", "Account created! Please Login.", "success");
        await updateDoc(codeDocRef, { validCodes: arrayRemove(signupCode) });
        switchMode("login");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        addToast(
          "Success!",
          "Password reset email sent! Check your inbox.",
          "success",
        );
        setTimeout(() => {
          addToast(
            "Note!",
            "Please check your spam folder if you don't see the email.",
            "warning",
          );
        }, 2000);

        switchMode("login");
      }
    } catch (err: any) {
      console.error("Auth Error:", err.code, err.message, err.stack);
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
          case "permission-denied":
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
    password = "";
    signupCode = "";
  }
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <div class="card w-full max-w-md bg-base-100 shadow-2xl md:mb-48">
    <div class="card-body">
      <!-- Header with icon -->
      <div class="text-center mb-6">
        <div class="avatar placeholder mb-4">
          <div class="bg-primary text-primary-content rounded-full w-16">
            <LockKeyhole class="w-8 h-8" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-primary">
          {mode === "login"
            ? "Owner Login"
            : mode === "signup"
              ? "Create Account"
              : "Reset Password"}
        </h1>
        <p class="text-base-content/60 mt-2">
          {mode === "login"
            ? "Welcome back! Please login to continue."
            : mode === "signup"
              ? "Fill in the details to create your account."
              : "Enter your email to receive a password reset link."}
        </p>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <!-- Email Input -->
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text font-medium">Email</span>
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="you@example.com"
            class="input input-bordered w-full"
          />
        </div>

        <!-- Signup Code (only for signup) -->
        {#if mode === "signup"}
          <div class="form-control">
            <label class="label" for="signupCode">
              <span class="label-text font-medium">Signup Code</span>
            </label>
            <input
              id="signupCode"
              type="text"
              bind:value={signupCode}
              required
              placeholder="Enter your invitation code"
              class="input input-bordered w-full"
            />
          </div>
        {/if}

        <!-- Password Input (not for forgot password) -->
        {#if mode !== "forgot"}
          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text font-medium">Password</span>
            </label>
            <div class="relative">
              {#if showPassword}
                <input
                  id="password"
                  type="text"
                  bind:value={password}
                  required
                  placeholder="••••••••••••"
                  class="input input-bordered w-full pr-12"
                />
              {:else}
                <input
                  id="password"
                  type="password"
                  bind:value={password}
                  required
                  placeholder="••••••••••••"
                  class="input input-bordered w-full pr-12"
                />
              {/if}
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                on:click={() => (showPassword = !showPassword)}
              >
                {#if showPassword}
                  <!-- Eye slash icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                {:else}
                  <!-- Eye icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                {/if}
              </button>
            </div>

            {#if mode === "signup"}
              <label class="label">
                <span class="label-text-alt text-warning">
                  Password must be at least 12 characters with uppercase,
                  lowercase, number, and special character.
                </span>
              </label>
            {/if}
          </div>
        {/if}
        <!-- Submit Button -->
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary">
            {mode === "login"
              ? "Login"
              : mode === "signup"
                ? "Create Account"
                : "Send Reset Email"}
          </button>
          {#if mode === "forgot"}
            <p class="text-sm text-base-content/60 italic text-center mt-2">
              Check your spam folder if you don't see the email!
            </p>
          {/if}
        </div>
      </form>

      <!-- Mode Switch Links -->
      <div class="divider">OR</div>

      <div class="text-center space-y-2">
        {#if mode === "login"}
          <div
            class="flex flex-col sm:flex-row gap-2 justify-center items-center"
          >
            <button
              on:click={() => switchMode("signup")}
              class="link link-primary link-hover"
            >
              Create an account
            </button>
            <span class="hidden sm:inline text-base-content/40">|</span>
            <button
              on:click={() => switchMode("forgot")}
              class="link link-primary link-hover"
            >
              Forgot password?
            </button>
          </div>
        {:else}
          <button
            on:click={() => switchMode("login")}
            class="link link-primary link-hover"
          >
            ← Back to login
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
