<script lang="ts">
  export let request: any;

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(); // Convert Unix seconds to date
  }
</script>

<div
  class="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-md transition-shadow"
>
  <h3 class="font-bold text-gray-900">{request.name}</h3>
  <p class="text-sm text-gray-600">Location: {request.location}</p>
  <p class="text-xs text-gray-500">
    Created: {formatTimestamp(request.created)}
  </p>
</div>
