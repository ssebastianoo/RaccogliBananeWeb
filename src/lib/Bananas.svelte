<script lang="ts">
  import bananaImage from "$lib/assets/Banana.png";
  import { onMount } from "svelte";
  import { basket, points, user } from "./store";
  import { doc, updateDoc, increment } from "firebase/firestore";
  import { db } from "$lib/firebase";

  type Banana = {
    id: number;
    x: number;
    y: number;
    image: string;
    speed: number;
  };

  let bananaSize = {
    width: 52.0667,
    height: 40,
  };

  let bananas: Banana[] = [];
  let waitTime: number = 1000;
  let speed: number = 0.3;
  let end: boolean = false;

  async function setPoints() {
    if ($user.logged) {
      const ref = doc(db, "users", $user.uid);
      await updateDoc(ref, {
        points: increment($points),
      });
      $user.points += $points;
    }
  }

  function bananasCreator() {
    let banana: Banana = {
      id: Date.now(),
      x: Math.random() * (100 - (bananaSize.width * 100) / window.innerWidth),
      y: 0,
      image: bananaImage,
      speed,
    };
    bananas.push(banana);

    if (waitTime - 3 > 0) waitTime -= 3;

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
      banana.y += (banana.speed * window.innerHeight) / 100;
      speed += 0.0001;
    });
    bananas = bananas.filter((banana) => banana.y < window.innerHeight);

    if (!end) setTimeout(bananasPusher, 20);
    else {
      setPoints();
      bananas = [];
      alert("Game Over, you made " + $points + " points!");
      $points = 0;
      end = false;
      waitTime = 1000;
      speed = 0.3;
      setTimeout(bananasPusher, 20);
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
