<script lang="ts">
  import { onMount } from "svelte";
  import basketImage from "$lib/assets/basket.jpg";
  import { basket } from "./store";

  onMount(() => {
    document.addEventListener("mousemove", (e) => {
      const x = e.pageX - $basket.width / 2;

      if (x < 0) {
        $basket.style.left = 0 + "px";
        return;
      } else if (x > window.innerWidth - $basket.width) {
        $basket.style.left = window.innerWidth - $basket.width + "px";
        return;
      }

      $basket.style.left = x + "px";
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
