<!-- TagsModal.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let initialTags: string[] = [];
  export let visible: boolean = false; // Prop to control visibility from parent

  const dispatch = createEventDispatcher();

  interface TagGroup {
    category: string;
    tags: string[];
  }

  const tagGroups: TagGroup[] = [
    {
      category: "Core HVAC & Services",
      tags: [
        "HVAC",
        "AC",
        "Heating",
        "Cooling",
        "Furnace",
        "Repair",
        "Maintenance",
        "Installation",
        "Contractor",
        "Technician",
        "Service",
        "Replacement",
      ],
    },
    {
      category: "Components & Equipment",
      tags: [
        "Ductwork",
        "Ducts",
        "Vent",
        "Compressor",
        "Heatpump",
        "Boiler",
        "Thermostat",
        "Filter",
        "Refrigerant",
        "Handler",
        "Motor",
        "Capacitor",
        "Humidifier",
      ],
    },
    {
      category: "Efficiency & Air Quality",
      tags: [
        "Energy",
        "Green",
        "Air",
        "Ventilation",
        "Purifier",
        "Efficiency",
        "Indoor",
        "Eco",
      ],
    },
    {
      category: "Seasonal & Emergency",
      tags: [
        "Summer",
        "Winter",
        "Spring",
        "Fall",
        "Emergency",
        "Tune-up",
        "Inspection",
      ],
    },
    {
      category: "Topics & Solutions",
      tags: [
        "Troubleshooting",
        "Cleaning",
        "Fix",
        "Noise",
        "Safety",
        "Costs",
        "Budget",
        "Efficiency",
        "Tips",
      ],
    },
    {
      category: "Business & Local",
      tags: [
        "Residential",
        "Commercial",
        "Local",
        "Financing",
        "Warranty",
        "Estimates",
        "Sweeny",
        "Brazoria",
        "Lake Jackson",
      ],
    },
  ];

  let selectedTags = new Set<string>(initialTags);
  let customTags: string[] = [];
  let newCustomTag = "";

  onMount(() => {
    // Flatten static tags for checking
    const allStaticTags = new Set(tagGroups.flatMap((group) => group.tags));
    // Add initial tags not in static to custom
    customTags = initialTags.filter((tag) => !allStaticTags.has(tag));
  });

  function toggleTag(tag: string) {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
    } else {
      selectedTags.add(tag);
    }
    selectedTags = new Set(selectedTags); // Trigger reactivity
  }

  function addCustomTag() {
    if (newCustomTag.trim()) {
      const trimmed = newCustomTag.trim();
      if (!customTags.includes(trimmed)) {
        customTags = [...customTags, trimmed];
      }
      if (!selectedTags.has(trimmed)) {
        selectedTags.add(trimmed);
      }
      newCustomTag = "";
    }
  }

  function saveSelections() {
    dispatch("save", Array.from(selectedTags));
    visible = false;
  }

  function cancel() {
    dispatch("cancel");
    visible = false;
  }
</script>

<!-- DaisyUI Modal Structure -->
<input
  type="checkbox"
  id="tags-modal"
  class="modal-toggle"
  bind:checked={visible}
/>
<div class="modal" transition:fade={{ duration: 200 }}>
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg mb-4">Select Keywords/Tags</h3>

    {#each tagGroups as group}
      <div class="collapse collapse-arrow bg-base-200 mb-2">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">{group.category}</div>
        <div class="collapse-content">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            {#each group.tags as tag}
              <label class="cursor-pointer label">
                <input
                  type="checkbox"
                  checked={selectedTags.has(tag)}
                  on:change={() => toggleTag(tag)}
                  class="checkbox checkbox-primary"
                />
                <span class="label-text mr-auto ml-2">{tag}</span>
              </label>
            {/each}
          </div>
        </div>
      </div>
    {/each}

    <!-- Custom Tags Section -->
    <div class="mt-4">
      <h4 class="font-semibold mb-2">Custom Tags</h4>
      <div class="flex space-x-2 mb-2">
        <input
          bind:value={newCustomTag}
          class="input input-bordered flex-1"
          placeholder="New custom tag"
        />
        <button on:click={addCustomTag} class="btn btn-primary">Add</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
        {#each customTags as tag}
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              checked={selectedTags.has(tag)}
              on:change={() => toggleTag(tag)}
              class="checkbox checkbox-primary"
            />
            <span class="label-text mr-auto ml-2">{tag}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="modal-action">
      <button on:click={cancel} class="btn">Cancel</button>
      <button on:click={saveSelections} class="btn btn-primary">Save</button>
    </div>
  </div>
</div>
