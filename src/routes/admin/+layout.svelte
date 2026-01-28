<script lang="ts">
  import { get } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import { firebaseStore } from "$lib/stores"; // Adjust path if needed
  import { goto } from "$app/navigation";
  import { addToast } from "$lib/stores/toastStore"; // Optional for errors
  import { signOut, type Auth } from "firebase/auth";
  import {
    LogOut,
    FileText,
    ClipboardList,
    ChevronDown,
    ChevronUp,
    MailQuestionIcon,
  } from "lucide-svelte"; // Import icons, added ChevronUp
  import { slide, fade } from "svelte/transition"; // For animations

  let loading = true;
  let interval: NodeJS.Timeout | undefined;
  let unsubscribe: (() => void) | undefined;
  let showMenu = false; // For mobile dropdown

  onMount(() => {
    checkFirebase();

    function checkFirebase() {
      const fb = get(firebaseStore);
      if (!fb || !fb.auth) {
        // Poll if not initialized
        interval = setInterval(() => {
          const fbCheck = get(firebaseStore);
          if (fbCheck && fbCheck.auth) {
            clearInterval(interval);
            interval = undefined;
            initAuthListener(fbCheck.auth);
          }
        }, 1000); // Check every 1 second
      } else {
        initAuthListener(fb.auth);
      }
    }

    function initAuthListener(auth: Auth) {
      unsubscribe = auth.onAuthStateChanged((user) => {
        loading = false;
        if (!user) {
          addToast(
            "Access Denied",
            "Please log in to access the admin area.",
            "failure",
          );
          goto("/owner-login");
        }
      });
    }
  });

  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
    if (unsubscribe) {
      unsubscribe();
    }
  });

  async function handleSignOut() {
    const fb = get(firebaseStore);
    if (fb && fb.auth) {
      try {
        await signOut(fb.auth);
        addToast("Success", "Signed out successfully.", "success");
        goto("/owner-login");
      } catch (err: any) {
        addToast("Error", err.message, "failure");
      }
    }
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  const getAssetSrc = (name: string) => {
    const path = `/src/lib/photos/${name}`;
    const modules = import.meta.glob("/src/lib/photos/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  };
</script>

<header class="bg-white border-b border-gray-200 shadow-sm flex flex-col">
  <div class="p-4 flex justify-between items-center md:px-6">
    <!-- Desktop View -->
    <div class="hidden md:flex items-center space-x-8">
      <img
        src={getAssetSrc("admin_access_logo.png")}
        alt="Admin Access"
        class="w-24"
      />
      <!-- Replace with your photo path; placeholder for now -->
      <nav class="flex space-x-4 items-center">
        <a
          href="/admin/blogs"
          class="flex items-center text-gray-700 hover:text-gray-900"
        >
          <FileText class="w-5 h-5 mr-2" />
          Blogs
        </a>
        <a
          href="/admin/requests"
          class="flex items-center text-gray-700 hover:text-gray-900"
        >
          <MailQuestionIcon class="w-5 h-5 mr-2" />
          Requests
        </a>
      </nav>
    </div>
    <div class="hidden md:flex items-center space-x-4">
      <button
        on:click={handleSignOut}
        class="text-gray-700 hover:text-gray-900"
        aria-label="Sign Out"
      >
        <LogOut class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile View Top Bar -->
    <div class="flex md:hidden w-full justify-center items-center">
      <img
        src={getAssetSrc("admin_access_logo.png")}
        alt="Admin Access"
        class="w-24"
      />
      <!-- Centered on mobile -->
    </div>
    <button
      on:click={toggleMenu}
      class="flex md:hidden absolute right-4 text-gray-700 hover:text-gray-900 transition-transform duration-300 {showMenu
        ? 'rotate-180'
        : ''}"
      aria-label="Menu"
    >
      {#if showMenu}
        <ChevronUp class="w-6 h-6" />
      {:else}
        <ChevronDown class="w-6 h-6" />
      {/if}
    </button>
  </div>

  {#if showMenu}
    <div
      class="md:hidden flex flex-col items-center space-y-4 bg-white border-t border-gray-200 p-4"
      transition:slide={{ duration: 300 }}
    >
      <a
        href="/admin/blogs"
        class="flex items-center text-gray-700 hover:text-gray-900"
        on:click={toggleMenu}
      >
        <FileText class="w-5 h-5 mr-2" />
        Blogs
      </a>
      <a
        href="/admin/requests"
        class="flex items-center text-gray-700 hover:text-gray-900"
        on:click={toggleMenu}
      >
        <MailQuestionIcon class="w-5 h-5 mr-2" />
        Requests
      </a>

      <button
        on:click={() => {
          handleSignOut();
          toggleMenu();
        }}
        class="flex items-center text-gray-700 hover:text-gray-900"
      >
        <LogOut class="w-5 h-5 mr-2" />
        Sign Out
      </button>
    </div>
  {/if}
</header>

<slot />
<!-- This renders the child page content -->
