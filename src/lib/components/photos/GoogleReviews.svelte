<script lang="ts">
  export let reviews: number = 121;

  export let rating: string = "5.0";
</script>

<div class="reviews-link-container">
  <a
    href="https://www.google.com/search?channel=fenc&client=firefox-b-1-d&q=byrd+brothers+hvac#lrd=0x2df28abd63014a9:0x592a1a3e5416ec91,1,,,,"
  >
    <svg
      width="450"
      height="30"
      viewBox="0 0 320 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 5 yellow stars (kept exactly from your original) -->
      <path
        d="M43 1.00003L45.2451 7.90986H52.5106L46.6327 12.1804L48.8779 19.0902L43 14.8197L37.1221 19.0902L39.3673 12.1804L33.4894 7.90986H40.7549L43 1.00003Z"
        fill="#FDD663"
      />
      <path
        d="M63 1.00003L65.2451 7.90986H72.5106L66.6327 12.1804L68.8779 19.0902L63 14.8197L57.1221 19.0902L59.3673 12.1804L53.4894 7.90986H60.7549L63 1.00003Z"
        fill="#FDD663"
      />
      <path
        d="M83 1.00003L85.2451 7.90986H92.5106L86.6327 12.1804L88.8779 19.0902L83 14.8197L77.1221 19.0902L79.3673 12.1804L73.4894 7.90986H80.7549L83 1.00003Z"
        fill="#FDD663"
      />
      <path
        d="M103 1.00003L105.245 7.90986H112.511L106.633 12.1804L108.878 19.0902L103 14.8197L97.1221 19.0902L99.3673 12.1804L93.4894 7.90986H100.755L103 1.00003Z"
        fill="#FDD663"
      />
      <path
        d="M123 1L125.245 7.90983H132.511L126.633 12.1803L128.878 19.0902L123 14.8197L117.122 19.0902L119.367 12.1803L113.489 7.90983H120.755L123 1Z"
        fill="#FDD663"
      />

      <!-- Dynamic rating (e.g., "5.0") -->
      <text
        x="5"
        y="18"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="semibold"
        font-size="18"
        fill="black"
      >
        {rating}
      </text>

      <!-- Dynamic review count (the "##" part) -->
      <text
        x="140"
        y="17"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="semibold"
        font-size="24"
        fill="black"
      >
        {reviews}
      </text>

      <!-- "Google Reviews" with "Google" in blue -->
      <text
        x="175"
        y="17"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14"
        fill="black"
      >
        <tspan fill="#8AB4F8">Google</tspan> Reviews
      </text>
    </svg>
  </a>
</div>

<style>
  .reviews-link-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  svg {
    width: 350px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    svg {
      width: 70vw;
    }
  }
</style>
