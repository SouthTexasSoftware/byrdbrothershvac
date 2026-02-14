<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Crepe } from "@milkdown/crepe";
  import { listenerCtx } from "@milkdown/plugin-listener";
  import "/node_modules/@milkdown/crepe/lib/theme/common/block-edit.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/code-mirror.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/cursor.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/image-block.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/latex.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/link-tooltip.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/list-item.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/placeholder.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/prosemirror.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/reset.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/style.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/table.css";
  import "/node_modules/@milkdown/crepe/lib/theme/common/toolbar.css";
  import "/node_modules/@milkdown/crepe/lib/theme/crepe/style.css";
  import { blogBuilderStore, firebaseStore } from "$lib/stores";
  import BlogPost from "$lib/components/blog/BlogPostComponent.svelte";
  import { get } from "svelte/store";
  import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
  } from "firebase/storage";
  import { addProcessingToast, addToast } from "$lib/stores/toastStore";
  import { ChevronsUpDown, PencilLine } from "lucide-svelte";
  import { slide } from "svelte/transition";

  let container: HTMLDivElement;
  let editor: Crepe;
  let contentExplainedOpen = false;

  let BLOG_TEMPLATE = `## A NEW TYPE OF COOL \[left]

Is your home, shop, or small business in need of a completely new cooling system? We are here to help. Whether it’s a full replacement or brand new install, our team of highly trained technicians is here for you from planning to completion. If you’re not sure what size, model, or type of air conditioner to install - we would love to have a conversation and make recommendations. \
\
There are many reasons why people choose to install a new air conditioner, I have highlighted some below.

![1.02](https://firebasestorage.googleapis.com/v0/b/byrd-brothers-hvac.appspot.com/o/blog-images%2Ftemplate-photos%2Fservicing-outdoor-unit-SQUARE.png?alt=media&token=6bcd3ff2-9b3f-4291-bce6-2d3a6895e372 "Unique photo caption \[right]")

<br />

![1.00](https://firebasestorage.googleapis.com/v0/b/byrd-brothers-hvac.appspot.com/o/blog-images%2Ftemplate-photos%2Fruud-outdoor-unit.png?alt=media&token=c331d3b5-dd8e-4670-8a01-0cced79e9ede "Latest model of home outdoor unit")

<br />

## WHY START FRESH? \[right]

* **Improved Energy Efficiency:** Newer air conditioning systems are typically more energy-efficient, leading to lower utility bills and reduced energy consumption.

* **Enhanced Cooling Performance:** New AC units can cool a space more effectively and maintain a consistent temperature, providing greater comfort.

* **Reduced Maintenance Costs:** Older units often require more frequent repairs and maintenance, which can be costly over time. A new AC system can lower maintenance expenses.

* **Better Indoor Air Quality:** Modern AC units come with improved air filtration systems, which can help remove allergens, dust, and pollutants, leading to better indoor air quality.

* **Quieter Operation:** Newer models are designed to operate more quietly, reducing noise disturbances in the home or workplace.

* **Smart Technology Integration:** Many new AC systems are compatible with smart home technology, allowing for remote control and energy-saving features.

##

* **Environmental Considerations:** Upgrading to a more efficient system can be environmentally responsible by reducing carbon emissions and energy consumption.

* **Improved Comfort:** New systems can provide better humidity control, even cooling, and more even distribution of air throughout the space.

* **Warranty Benefits:** New air conditioners often come with warranties that can provide peace of mind in case of unexpected issues.

- **Refrigerant Changes:** Some older AC units use refrigerants that are being phased out due to environmental concerns. Upgrading ensures compliance with newer, eco-friendly refrigerants.

- **Increased Property Value:** Installing a new AC system can enhance the value of a property, making it more attractive to potential buyers or renters.

![1.00](https://firebasestorage.googleapis.com/v0/b/byrd-brothers-hvac.appspot.com/o/blog-images%2Ftemplate-photos%2Fruud-air-handler.png?alt=media&token=cf6f4811-8903-4f6d-b65d-b44761a8d3f5 "Attic air handler for central AC")

![1.00](https://firebasestorage.googleapis.com/v0/b/byrd-brothers-hvac.appspot.com/o/blog-images%2Ftemplate-photos%2Fmrcool-outdoor-unit.jpg?alt=media&token=4ec8378f-90af-4bff-bc08-b4e4c3fc0da5 "High efficiency minisplit outdoor unit")

<br />

* **Personal Preference:** Sometimes, homeowners or businesses simply prefer the latest technology and features offered by new air conditioning units.

* **Old System Failure:** If an existing AC unit is failing or has frequent breakdowns, it may be more cost-effective to replace it with a new one.

* **Home Renovations:** During home renovations or additions, it might be necessary to install a new AC system to accommodate the increased space or layout changes.

* **Health Considerations:** Individuals with health concerns may benefit from the improved air quality and more consistent temperature control offered by newer units.

* **Utility Rebates and Incentives:** Many utility companies and government programs offer incentives or rebates for upgrading to energy-efficient air conditioning systems.

## \[full]

When considering installing a new air conditioner, it's important to assess your specific needs and budget. We are here to help you make an informed decision! [Call us today.](tel:+19794808444)`;

  if ($blogBuilderStore.content === "") {
    $blogBuilderStore.content = BLOG_TEMPLATE;
  }

  onMount(async () => {
    editor = new Crepe({
      root: container,
      features: {
        [Crepe.Feature.Cursor]: true,
        [Crepe.Feature.ListItem]: true,
        [Crepe.Feature.LinkTooltip]: true,
        [Crepe.Feature.ImageBlock]: true,
        [Crepe.Feature.BlockEdit]: true,
        [Crepe.Feature.Placeholder]: false,
        [Crepe.Feature.Toolbar]: true,
        [Crepe.Feature.CodeMirror]: false,
        [Crepe.Feature.Table]: false,
        [Crepe.Feature.Latex]: false,
      },
      featureConfigs: {
        [Crepe.Feature.BlockEdit]: {
          textGroup: {
            label: "Text Blocks",
            text: {
              label: "Normal Text",
            },
            h1: null,
            h2: {
              label: "Orange Section Heading",
            },
            h3: null,
            h4: null,
            h5: null,
            h6: null,
          },
          listGroup: {
            label: "Lists",
            bulletList: {
              label: "Bullet List",
            },
            orderedList: null,
            taskList: null,
          },
          advancedGroup: {
            label: "Advanced",
            image: {
              label: "Image",
            },
            codeBlock: null,
            table: null,
            math: null,
          },
        },
        [Crepe.Feature.ImageBlock]: {
          inlineUploadButton: "Upload Image",
          blockCaptionPlaceholderText: "Add image caption...",
          onUpload: async (file: File) => {
            // Handle file upload
            console.log("Uploading image:", file);
            const fb = get(firebaseStore);
            if (fb) {
              const storage = getStorage(fb.app);
              const storageRef = ref(
                storage,
                `blog-images/${$blogBuilderStore.id}/post/${file.name}`,
              );
              let uploadingToast = addProcessingToast("Uploading Photo...");
              try {
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);

                uploadingToast(true);
                return url;
              } catch (err: any) {
                uploadingToast(false);
                return "error";
              }
            }
            // If upload fails, return undefined
            return "error";
          },
        },
        [Crepe.Feature.Toolbar]: {},
      },
      defaultValue: $blogBuilderStore.content,
    });

    // ⬇️ THIS returns the underlying Milkdown editor
    const milkdown = await editor.create();

    // Now we can use Milkdown's listener
    milkdown.action((ctx) => {
      const listener = ctx.get(listenerCtx);

      listener.markdownUpdated((_, markdown) => {
        blogBuilderStore.update((state) => ({
          ...state,
          content: markdown,
        }));
      });
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });

  export function getMarkdown() {
    $blogBuilderStore.content = editor.getMarkdown();
  }
</script>

<div class="relative">
  <div class="grid gap-4">
    <div class="flex items-center">
      <PencilLine class="w-12 h-12 md:-ml-14 mr-2 hidden md:block" />
      <div class="collapse bg-base-100 border border-base-300">
        <button
          class="collapse-title font-bold text-xl w-full text-left flex justify-between items-center px-4"
          on:click={() => (contentExplainedOpen = !contentExplainedOpen)}
        >
          How to Build Your Content?
          <ChevronsUpDown class="w-6 h-6 ml-auto" />
        </button>
        {#if contentExplainedOpen}
          <div class="text-lg px-4 mb-6" transition:slide={{ duration: 300 }}>
            This post is pre-filled with an example layout so you can see how
            the editor renders content on the website.
            <br /><br />

            <strong class="text-lg font-semibold"
              >HOW POSTS ARE STRUCTURED</strong
            ><br />
            Every blog post is built using <em>blocks</em>. A block can be:
            <ul class="list-disc list-inside text-lg [&_li]:text-lg">
              <li>A Heading (large title text)</li>
              <li>Text content under a heading</li>
              <li>An Image</li>
              <li>A Divider (horizontal rule)</li>
            </ul>
            <br />

            On desktop, two blocks are displayed per row.<br />
            On mobile, blocks stack into a single column.
            <br /><br />

            <strong>Example Layout (Desktop Flow):</strong><br />
            Blocks fill from left to right and wrap automatically.
            <br /><br />
            If you create:
            <br />
            Heading + Text<br />
            Image<br />
            Image
            <br /><br />
            The second image may wrap into the left column depending on block order.
            The layout is based on flow — not fixed rows.
            <br /><br />

            <strong class="text-lg font-semibold"
              >IMPORTANT — MOBILE VIEW</strong
            ><br />
            On mobile, blocks are automatically reorganized to create a clean alternating
            pattern (text → image → text → image).
            <br /><br />
            For example:
            <br />
            If your desktop layout is:<br />
            Text Block<br />
            Image Block<br />
            Image Block<br />
            Text Block
            <br /><br />
            Mobile may rearrange this to:
            <br />
            Text<br />
            Image<br />
            Text<br />
            Image
            <br /><br />
            Because of this:
            <ul class="list-disc list-inside text-lg [&_li]:text-lg">
              <li>Block order matters</li>
              <li>Follow the example structure provided in new posts</li>
              <li>Always preview on your phone before publishing</li>
            </ul>
            Over 50% of visitors view posts on mobile.
            <br /><br />
            <strong class="text-lg font-semibold">CONTENT STYLING GUIDE</strong>
            <ul class="list-disc list-inside text-lg [&_li]:text-lg">
              <li>
                Add alignment tags at the <strong>end</strong> of headings or
                photo captions to adjust their styling/position:
                <br />
                <ul class="list-decimal list-inside ml-4">
                  <li>
                    Alignment Options - <strong
                      >[left] [right] [full] [none]
                    </strong>or just don't add anything
                  </li>
                  <li>
                    Example: <strong>House Remodel [left]</strong> This creates a
                    left-aligned heading in an orange banner.
                  </li>
                  <li>
                    Example: <strong>[right]</strong> This creates a right-aligned
                    section with no orange banner or text.
                  </li>
                </ul>
              </li>

              <li>
                To make an image clickable, add a link at the end of the
                caption:
                <br />
                <ul class="list-decimal list-inside ml-4">
                  <li>
                    Example:<strong
                      >Ruud Air Conditioner [left] (https://ruud.com)</strong
                    > - This wraps the entire image in a clickable link.
                  </li>
                </ul>
              </li>

              <li>
                As you move your cursor, a shadow box on the left will appear.
                Use the "+" button to add headings, images, lists, and dividers.
              </li>

              <li>
                Highlight text with your cursor and use the popup to make text <strong
                  >bold</strong
                >
                or <em>italic</em>.
              </li>
            </ul>

            <br />
            <button
              class="collapse-title font-bold text-xl w-full text-left flex justify-between items-center px-4"
              on:click={() => (contentExplainedOpen = !contentExplainedOpen)}
            >
              Click here to close this section.
              <ChevronsUpDown class="w-6 h-6 ml-auto" />
            </button>
          </div>
        {/if}
      </div>
    </div>
    <div class=" card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body p-4 space-y-2">
        <div class="flex items-center justify-between">
          <h2 class="card-title text-base">Text Editor</h2>
          <span class="badge badge-outline">STS, LLC</span>
        </div>

        <div
          bind:this={container}
          class="
        rounded-lg
        border border-base-300
        bg-base-100
        min-h-[300px]
        focus-within:ring-2
        focus-within:ring-primary
      "
        />
      </div>
    </div>
    <div class="text-center text-5xl font-semibold mt-12 mb-0">
      BLOG PREVIEW
    </div>
    <p class="text-center text-md font-regular italic -mt-4">
      Be sure to check it out on mobile before publishing!
    </p>
    <div class="col-span w-full h-full mt-12">
      <BlogPost blogPost={$blogBuilderStore} />
    </div>
  </div>
</div>

<style>
  :global(.milkdown .ProseMirror h2) {
    font-family: font-semibold !important;
  }
  :global(.milkdown .ProseMirror p) {
    font-family: font-regular !important;
    font-size: 1.125rem !important;
    line-height: 1.5rem !important;
  }
  :global(.milkdown .milkdown-image-block .caption-input) {
    font-family: font-regular !important;
    font-style: italic;
  }

  /* Constrain images in the editor */
  :global(.milkdown .image-wrapper img) {
    max-width: 21rem !important;
    max-height: 21rem !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain;
  }

  :global(.milkdown .editor) {
    padding: 0px 40px !important;
  }

  @media screen and (max-width: 768px) {
    :global(.milkdown .ProseMirror h2) {
      font-size: 1.25rem;
    }
    :global(.milkdown .ProseMirror p) {
      font-size: 1rem !important;
    }
    :global(.milkdown .editor) {
      padding: 0px 20px !important;
    }

    /* Smaller max size on mobile */
    :global(.milkdown .image-wrapper img) {
      max-width: 100% !important;
      max-height: 16rem !important;
    }
  }
</style>
