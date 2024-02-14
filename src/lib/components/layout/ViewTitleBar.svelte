<script lang="ts">

export let title: string;

</script>

<div class="title-container">
    <h1 class="page-title">{title}</h1>
    <div class="title-underline" />
  </div>

<style>
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .page-title {
    font-family: font-bold;
    font-size: 34px;
    color: black;
    text-align: center;
  }
  .title-underline {
    width: 100px;
    height: 2px;
    margin-top: 10px;
    background-color: var(--light-text);
  }
  /* UltraWide */
  @media only screen and (min-width: 1900px) {
  }
  /* Tablet */
  @media only screen and (max-width: 1200px) and (min-width: 600px) {
  }
  /* Mobile */
  @media only screen and (max-width: 600px) {
    .title-container {
        margin-top: 15px;
    }
    .page-title {
      padding: 0 20px;
  }
  }
</style>