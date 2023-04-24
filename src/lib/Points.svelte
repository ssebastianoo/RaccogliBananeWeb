<script lang="ts">
  import { points } from "./store";
</script>

<div class="points">
  <input type="text" value={$points + " points"} readonly />
</div>

<style>
  .points {
    position: absolute;
    right: 0;
  }
</style>
