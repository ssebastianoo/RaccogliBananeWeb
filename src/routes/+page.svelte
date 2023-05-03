<script lang="ts">
  import Basket from "$lib/Basket.svelte";
  import Bananas from "$lib/Bananas.svelte";
  import Points from "$lib/Points.svelte";
  import Auth from "$lib/Auth.svelte";
  import { user } from "$lib/store";
  import MetaTags from "$lib/MetaTags.svelte";

  let start = false;
</script>

<MetaTags />

{#if !start}
  <div class="intro">
    <header>
      {#if $user.logged}
        <p>You have {$user.points} {$user.points === 1 ? "point" : "points"}</p>
      {:else}
        <div />
      {/if}
      <Auth />
    </header>
    <div class="container">
      <div class="content">
        <h1>Raccogli Banane</h1>
        <div class="buttons">
          <button
            class="btn"
            on:click={() => {
              start = true;
            }}>Play</button
          >
          <a href="/leaderboard" class="btn">Leaderboard</a>
        </div>
      </div>
    </div>
    <footer><p>The Raccogli Banane Foundation • 2023</p></footer>
  </div>
{:else}
  <header>
    <Points />
    {#if $user.logged}
      <Auth />
    {:else}
      <div />
    {/if}
  </header>
  <div class="game">
    <Basket />
    <Bananas />
  </div>
{/if}

<style lang="scss">
  @import "../variables";

  .game {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    z-index: -1;
  }

  .intro {
    background-image: url("/banana-background.png");
    background-size: 200px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $headerHeight;

    p {
      font-size: 1.2em;
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 30px - $headerHeight * 2);

    .content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      h1 {
        font-size: 3em;
      }

      .buttons {
        display: flex;
        gap: 10px;

        button,
        a {
          width: 50%;
          font-size: 1.6em;
        }
      }
    }
  }

  footer {
    height: $headerHeight;
    display: grid;
    place-items: center;

    p {
      font-size: 0.9em;
      opacity: 0.7;
    }
  }
</style>
