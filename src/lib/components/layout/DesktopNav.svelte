<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import type { BlogPost } from "$lib/stores";

  export let latestBlogs: BlogPost[] = [];

  type NavItem = {
    label: string;
    href: string;
    subItems?: { label: string; href: string }[];
  };

  let hoveredItem: string | null = null;
  let leaveTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = (item: string) => {
    if (leaveTimeout) clearTimeout(leaveTimeout);
    hoveredItem = item;
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      hoveredItem = null;
    }, 200);
  };

  $: navItems = [
    { label: "HOME", href: "/" },
    {
      label: "SERVICES",
      href: "/services",
      subItems: [
        { label: "AIR CONDITIONING", href: "/services/air_conditioning" },
        { label: "HEATING", href: "/services/heating" },
        { label: "MAINTENANCE", href: "/services/maintenance_program" },
        { label: "INSULATION", href: "/services/insulation" },
        { label: "AIR QUALITY", href: "/services/air_quality" },
      ],
    },
    {
      label: "PRODUCTS",
      href: "/products",
      subItems: [
        { label: "RUUD", href: "/products/ruud" },
        { label: "MRCOOL", href: "/products/mrcool" },
        { label: "GENERAC", href: "/products/generac" },
        { label: "AIR SCRUBBER", href: "/products/air_scrubber" },
        { label: "ATTIC TENT", href: "/products/attic_tent" },
      ],
    },
    {
      label: "FINANCING",
      href: "/financing",
    },
    {
      label: "BLOG",
      href: "/blog",
      subItems: latestBlogs.map((blog) => {
        return {
          label: blog.title.toUpperCase(),
          href: `/blog/${blog.slug}`,
        };
      }),
    },
    {
      label: "ABOUT",
      href: "/about",
      subItems: [
        { label: "SERVICE AREA", href: "/about/service_area" },
        { label: "MEET THE TEAM", href: "/about/meet_team" },
        { label: "PARTNERS", href: "/about/partners" },
      ],
    },
    {
      label: "CONTACT US",
      href: "/contact",
      subItems: [
        { label: "FRONT DESK", href: "/contact/front_desk" },
        { label: "QUOTE FORM", href: "/contact/quote_form" },
      ],
    },
  ] satisfies NavItem[];

  const isActive = (href: string): boolean => {
    if (href === "/") return $page.url.pathname === "/";
    return $page.url.pathname.includes(href);
  };
</script>

<nav class="desktop-nav-container">
  {#each navItems as item}
    <div
      class="link-container"
      on:mouseenter={() => handleMouseEnter(item.label)}
      on:mouseleave={handleMouseLeave}
      role="presentation"
    >
      <a
        href={item.href}
        class="desktop-nav-link"
        class:highlight={hoveredItem === item.label}
        class:viewing={isActive(item.href)}
        on:focus={() => handleMouseEnter(item.label)}
        on:blur={handleMouseLeave}
      >
        {item.label}
      </a>

      {#if item.subItems && hoveredItem === item.label}
        <div class="sub-menu" transition:fly={{ y: -10, duration: 200 }}>
          {#each item.subItems as subItem}
            <a href={subItem.href} class="desktop-nav-link">
              {subItem.label}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</nav>

<style>
  .desktop-nav-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .link-container {
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
  }

  .desktop-nav-link {
    font-family: font-semibold;
    text-align: center;
    height: 100%;
    margin-top: 6px;
    margin-bottom: -3px;
    line-height: 278%;
    transition: all 0.3s ease;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent; /* Add this */
    font-size: 16px;
    padding: 0 25px;
    white-space: nowrap;
  }

  .desktop-nav-link:hover {
    border-top: 3px solid #ff7817;
    border-bottom: 3px solid #ff7817;
  }

  .desktop-nav-link.highlight {
    color: var(--primary-dark);
  }

  .desktop-nav-link.viewing {
    text-decoration: underline;
    text-decoration-color: #ff7817;
    text-decoration-thickness: 1px;
  }

  .sub-menu {
    min-width: 100%;
    position: absolute;
    background-color: var(--bg);
    padding-bottom: 5px;
    font-family: font-semibold;
    font-size: 18px;
    text-align: center;
    z-index: 10;
    top: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .sub-menu .desktop-nav-link {
    max-width: 220px;
    white-space: normal; /* Override the nowrap */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    text-transform: uppercase;
    line-height: 1.4; /* Better line height for wrapped text */
    padding: 10px 20px;
  }
</style>
