<script lang="ts">
  import Auth from "$lib/Auth.svelte";
  import MetaTags from "$lib/MetaTags.svelte";

  export let data;
</script>

<MetaTags
  title="Bananas Leadeboard"
  description="Who gained more bananas? 🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌"
/>
<div class="parent">
  <header>
    <div />
    <Auth />
  </header>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="users">
      {#each data.users as user, index}
        <div class="user">
          <p>
            {index + 1}. <a href={"/@" + user.username}>@{user.username}</a>
          </p>
          <p>{user.points}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../variables";

  $maxWidth: 500px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $headerHeight;
  }

  .leaderboard {
    padding: 15px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    h2 {
      width: 100%;
      max-width: $maxWidth;
    }

    .users {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: $maxWidth;
      background-color: rgba(0, 0, 0, 0.352);
      border-radius: 12px;

      .user {
        display: flex;
        justify-content: space-between;
        padding: 15px;

        a {
          margin-left: 8px;
          font-size: 1.1em;
          color: unset;
          text-decoration: underline;
        }

        &:not(:last-child) {
          border-bottom: 1px solid $yellow;
        }
      }
    }
  }
</style>
