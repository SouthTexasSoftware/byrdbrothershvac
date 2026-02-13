<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { firebaseStore } from "$lib/stores";
  import { addToast } from "$lib/stores/toastStore";
  import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
  } from "firebase/firestore";
  import type { Firestore, QueryDocumentSnapshot } from "firebase/firestore";
  import { goto } from "$app/navigation";
  import RequestCardSkeleton from "$lib/components/requests/RequestCardSkeleton.svelte";
  import RequestCard from "$lib/components/requests/RequestCard.svelte";

  interface QuoteRequest {
    id: string;
    name: string;
    location: string;
    created: number; // Unix timestamp (seconds)
  }

  let requests: QuoteRequest[] = [];
  let loading = true;
  let loadingMore = false;
  let hasMore = true;
  let lastDoc: QueryDocumentSnapshot | null = null;
  let db: Firestore | null = null;
  let unsubscribeStore: () => void;

  const pageSize = 10;

  onMount(() => {
    unsubscribeStore = firebaseStore.subscribe((fb) => {
      if (fb?.db) {
        db = fb.db;
        if (requests.length === 0) {
          loadRequests();
        }
      }
    });
  });

  async function loadRequests(isLoadMore = false) {
    if (!db) return;

    if (isLoadMore) loadingMore = true;
    else loading = true;

    try {
      let q = query(
        collection(db, "quote-forms-2"),
        orderBy("created", "desc"),
        limit(pageSize + 1),
      );

      if (isLoadMore && lastDoc) {
        q = query(
          collection(db, "quote-forms-2"),
          orderBy("created", "desc"),
          startAfter(lastDoc),
          limit(pageSize + 1),
        );
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      const fetchedMoreThanPage = docs.length > pageSize;
      if (fetchedMoreThanPage) {
        docs.pop();
      }
      hasMore = fetchedMoreThanPage;

      const newRequests = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as QuoteRequest[];

      if (isLoadMore) {
        requests = [...requests, ...newRequests];
      } else {
        requests = newRequests;
      }

      lastDoc = docs.length > 0 ? docs[docs.length - 1] : null;
    } catch (err: any) {
      console.error("Requests Fetch Error:", err);
      addToast(
        "Error",
        "Failed to load requests. Please try again.",
        "failure",
      );
    } finally {
      loading = false;
      loadingMore = false;
    }
  }

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  onDestroy(() => {
    if (unsubscribeStore) unsubscribeStore();
  });
</script>

<div class="p-6 max-w-7xl mx-auto">
  <h1 class="text-3xl font-bold text-gray-800 mb-8">All Quote Requests</h1>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each Array(pageSize) as _}
        <RequestCardSkeleton />
      {/each}
    </div>
  {:else if requests.length === 0}
    <div class="text-center py-20">
      <p class="text-xl text-gray-600">No quote requests yet.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each requests as request}
        <a href="/admin/requests/{request.id}">
          <RequestCard {request} />
        </a>
      {/each}

      {#if loadingMore}
        {#each Array(pageSize) as _}
          <RequestCardSkeleton />
        {/each}
      {/if}
    </div>

    {#if hasMore}
      <div class="flex justify-center mt-10">
        <button
          class="btn btn-primary"
          on:click={() => loadRequests(true)}
          disabled={loadingMore}
        >
          {#if loadingMore}
            Loading more...
          {:else}
            Load 10 more
          {/if}
        </button>
      </div>
    {/if}
  {/if}
</div>
