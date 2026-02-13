<script lang="ts">
  export let title: string;
  export let date: string;
  export let machineDate: string;
  export let articleOwner: string;
</script>

<div class="title-container mt4">
  <h1 class="article-title">{title}</h1>
  <div class="title-underline" />
  <p class="published-info">
    Last Updated: <time datetime={machineDate}>{date}</time> by {articleOwner}
  </p>
</div>

<style>
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .article-title {
    font-family: font-regular;
    font-size: 34px;
    color: black;
  }
  .title-underline {
    width: 150px;
    height: 3px;
    border-radius: 2px;
    margin-top: 10px;
    background-color: var(--primary);
  }
  .published-info,
  time {
    font-family: font-light;
    font-size: 13px;
    margin-top: 5px;
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .article-title {
      text-align: center;
    }
    .published-info {
      margin-bottom: 5px;
    }
  }
</style>
