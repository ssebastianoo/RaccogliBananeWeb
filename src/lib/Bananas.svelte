<script lang="ts">
  import bananaImage from "$lib/assets/banana.webp";
  import { onMount } from "svelte";
  import { basket, points } from "./store";

  type Banana = {
    id: number;
    x: number;
    y: number;
    image: string;
  };

  let bananaSize = {
    width: 52.0667,
    height: 40,
  };

  let bananas: Banana[] = [];
  let waitTime: number = 1000;
  let end: boolean = false;

  function bananasCreator() {
    let banana: Banana = {
      id: Date.now(),
      x: Math.random() * (100 - (bananaSize.width * 100) / window.innerWidth),
      y: 0,
      image: bananaImage,
    };
    bananas.push(banana);

    if (waitTime - 10 > 0) waitTime -= 10;

    if (!end) setTimeout(bananasCreator, waitTime);
  }

  function bananasPusher() {
    bananas.map((banana) => {
      if (banana.y + 40 > $basket.offsetTop) {
        if (
          banana.x + (bananaSize.width * 100) / window.innerWidth >
            ($basket.offsetLeft * 100) / window.innerWidth &&
          banana.x <
            (($basket.offsetLeft + $basket.clientWidth) * 100) /
              window.innerWidth
        ) {
          $points += 1;
          bananas = bananas.filter((b) => b.id !== banana.id);
        } else if (banana.y + 40 > $basket.offsetTop + $basket.clientHeight) {
          end = true;
        }
      }
      banana.y += (0.05 * window.innerHeight) / 100;
    });
    bananas = bananas.filter((banana) => banana.y < window.innerHeight);

    if (!end) requestAnimationFrame(bananasPusher);
    else {
      bananas = [];
      alert("Game Over, you made " + $points + " points!");
      $points = 0;
      end = false;
      waitTime = 1000;
      requestAnimationFrame(bananasPusher);
    }
  }

  onMount(() => {
    bananasCreator();
    bananasPusher();
  });
</script>

<div class="bananas">
  {#each bananas as banana}
    <img
      src={bananaImage}
      alt="Banana"
      style={`left: ${banana.x}%; top: ${banana.y}px`}
      height={bananaSize.height + "px"}
      width={bananaSize.width + "px"}
    />
  {/each}
</div>

<style>
  .bananas img {
    position: absolute;
  }
</style>
