<script lang="ts">
  import { onMount } from "svelte";

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

<div class="emergency-card" class:visible={isVisible}>
  <div class="fan-background">
    <svg
      class="rotating-fan"
      width="120"
      height="120"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="27" cy="27" r="17" stroke="#FF7818" stroke-width="2" />
      <path
        d="M34.0054 15.4306C33.8253 16.0542 33.6538 16.6623 33.4875 17.2523C32.7821 19.7544 32.1688 21.93 31.372 23.5787C30.882 24.5928 30.3323 25.3848 29.6681 25.9229C29.0097 26.4563 28.2269 26.75 27.2457 26.75C25.3027 26.75 23.9647 25.5923 22.8638 23.5681C21.7579 21.5347 20.9274 18.6899 19.9858 15.4306C19.0575 12.2175 18.9391 8.39846 20.0265 5.39767C20.5691 3.90033 21.4083 2.61577 22.5874 1.70572C23.7643 0.797473 25.2953 0.25 27.2457 0.25C29.196 0.25 30.6938 0.797398 31.822 1.70279C32.9528 2.61023 33.7305 3.89203 34.2118 5.38903C35.1767 8.38974 34.9355 12.2114 34.0054 15.4306Z"
        fill="white"
        stroke="black"
        stroke-width="0.5"
      />
      <path
        d="M15.4306 20.0736C16.0542 20.2538 16.6623 20.4252 17.2523 20.5915C19.7544 21.2969 21.93 21.9103 23.5787 22.707C24.5928 23.1971 25.3848 23.7467 25.9229 24.411C26.4563 25.0693 26.75 25.8521 26.75 26.8334C26.75 28.7764 25.5923 30.1144 23.5681 31.2152C21.5347 32.3211 18.6899 33.1516 15.4306 34.0932C12.2175 35.0215 8.39846 35.1399 5.39767 34.0526C3.90033 33.51 2.61577 32.6707 1.70572 31.4916C0.797473 30.3148 0.25 28.7838 0.25 26.8334C0.25 24.883 0.797398 23.3852 1.70279 22.257C2.61023 21.1263 3.89203 20.3486 5.38903 19.8672C8.38974 18.9024 12.2114 19.1436 15.4306 20.0736Z"
        fill="white"
        stroke="black"
        stroke-width="0.5"
      />
      <path
        d="M20.0736 38.5694C20.2538 37.9458 20.4252 37.3377 20.5915 36.7477C21.2969 34.2456 21.9103 32.07 22.707 30.4213C23.1971 29.4072 23.7467 28.6152 24.411 28.0771C25.0693 27.5437 25.8521 27.25 26.8334 27.25C28.7764 27.25 30.1144 28.4077 31.2152 30.4319C32.3211 32.4653 33.1516 35.3101 34.0932 38.5694C35.0215 41.7825 35.1399 45.6015 34.0526 48.6023C33.51 50.0997 32.6707 51.3842 31.4916 52.2943C30.3148 53.2025 28.7838 53.75 26.8334 53.75C24.883 53.75 23.3852 53.2026 22.257 52.2972C21.1263 51.3898 20.3486 50.108 19.8672 48.611C18.9024 45.6103 19.1436 41.7886 20.0736 38.5694Z"
        fill="white"
        stroke="black"
        stroke-width="0.5"
      />
      <path
        d="M38.5694 34.0054C37.9458 33.8253 37.3377 33.6538 36.7477 33.4875C34.2456 32.7821 32.07 32.1688 30.4213 31.372C29.4072 30.882 28.6152 30.3323 28.0771 29.6681C27.5437 29.0097 27.25 28.2269 27.25 27.2457C27.25 25.3027 28.4077 23.9647 30.4319 22.8638C32.4653 21.7579 35.3101 20.9274 38.5694 19.9858C41.7825 19.0575 45.6015 18.9391 48.6023 20.0265C50.0997 20.5691 51.3842 21.4083 52.2943 22.5874C53.2025 23.7643 53.75 25.2953 53.75 27.2457C53.75 29.196 53.2026 30.6938 52.2972 31.822C51.3898 32.9528 50.108 33.7305 48.611 34.2118C45.6103 35.1767 41.7886 34.9355 38.5694 34.0054Z"
        fill="white"
        stroke="black"
        stroke-width="0.5"
      />
      <circle
        cx="27"
        cy="27"
        r="3.75"
        fill="#FF7818"
        stroke="black"
        stroke-width="0.5"
      />
    </svg>
  </div>

  <div class="content">
    <div class="phone-icon-wrapper">
      <svg
        class="phone-icon pulse"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          fill="#FF7818"
          stroke="#FF7818"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <h2 class="title">24/7 Emergency Service</h2>
    <p class="message">
      We're always here when you need us. Our phone is monitored and forwarded
      at all times.
    </p>
    <p class="cta">Don't wait—give us a call!</p>

    <a href="tel:+19794808444" class="phone-button">
      <span class="phone-number">(979) 480-8444</span>
    </a>
  </div>
</div>

<style>
  .emergency-card {
    position: relative;
    max-width: 400px;
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
    border-radius: 16px;
    padding: 40px 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .emergency-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fan-background {
    position: absolute;
    top: -30px;
    right: -30px;
    opacity: 0.08;
    pointer-events: none;
  }

  .rotating-fan {
    animation: rotate 20s linear infinite;
    transform-origin: center;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .phone-icon-wrapper {
    display: inline-block;
    margin-bottom: 20px;
  }

  .phone-icon {
    filter: drop-shadow(0 4px 8px rgba(255, 120, 24, 0.3));
  }

  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .title {
    font-family: font-semibold;
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
  }

  .message {
    font-family: font-regular;
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .cta {
    font-family: font-semibold;
    font-size: 18px;
    color: #ff7818;
    margin-bottom: 24px;
  }

  .phone-button {
    display: inline-block;
    background: linear-gradient(135deg, #ff7818 0%, #ff9547 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    text-decoration: none;
    font-family: font-semibold;
    font-size: 20px;
    box-shadow: 0 4px 15px rgba(255, 120, 24, 0.4);
    transition: all 0.3s ease;
  }

  .phone-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 120, 24, 0.5);
  }

  .phone-button:active {
    transform: translateY(0);
  }

  .phone-number {
    letter-spacing: 1px;
  }
</style>
