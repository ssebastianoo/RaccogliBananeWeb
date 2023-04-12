<script lang="ts">
  import { onMount } from "svelte";
  import basketImage from "$lib/assets/basket.jpg";
  import { basket } from "./store";

  onMount(() => {
    document.addEventListener("mousemove", (e) => {
      $basket.style.left = `calc(${e.pageX}px - ${
        $basket.width / 2
      }px)`;
    });
  });
</script>

<div class="cursor">
  <img
    class="basket"
    src={basketImage}
    bind:this={$basket}
    height="90px"
    alt="Basket"
  />
</div>

<style lang="scss">
  .cursor {
    min-height: calc(100vh - 40px);
    display: flex;
    align-items: flex-end;

    img {
      position: absolute;
    }
  }
</style>
