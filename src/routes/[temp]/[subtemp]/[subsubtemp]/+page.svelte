<script lang="ts">
  import { page } from "$app/stores";
</script>

<h2>
  Sorry! <br> The {$page.params.temp}/{$page.params.subtemp}/{$page.params.subsubtemp} page is under construction.
</h2>

<style>
  h2 {
    width: 300px;
    margin: 25px auto;
    text-align: center;
  }

</style>
