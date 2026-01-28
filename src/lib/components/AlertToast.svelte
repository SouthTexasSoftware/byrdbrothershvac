<script lang="ts">
  import { toasts } from '$lib/stores/toastStore';

  type ToastType = 'success' | 'warning' | 'failure';

  function getTypeClasses(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'failure':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  }
</script>

<div class="fixed bottom-4 left-4 right-4 z-50 flex flex-col-reverse space-y-reverse space-y-2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-sm md:w-auto">
  {#each $toasts as toast (toast.id)}
    <div
      class="p-4 border-l-4 rounded-md shadow-md {getTypeClasses(toast.type)}"
      role="alert"
    >
      <h3 class="font-bold">{toast.title}</h3>
      <p>{toast.description}</p>
    </div>
  {/each}
</div>

<style>
  /* Custom CSS for animations or overrides; Tailwind handles most */
  div[role="alert"] {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); } /* Adjusted for bottom-up fade */
    to { opacity: 1; transform: translateY(0); }
  }
</style>