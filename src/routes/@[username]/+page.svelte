<script lang="ts">
  import Auth from "$lib/Auth.svelte";
  import { user } from "$lib/store";
  import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "$lib/firebase";

  export let data;

  async function editUsername() {
    let newUsername = prompt("New username");
    if (newUsername) {
      newUsername = newUsername.trim().toLocaleLowerCase().replaceAll(" ", "_");
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("username", "==", newUsername));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        alert("Username already taken");
        return;
      }

      const docRef = doc(db, "users", $user.uid);
      await updateDoc(docRef, {
        username: newUsername,
      });

      $user.username = newUsername;

      location.href = "/@" + newUsername;
    } else {
      alert("Invalid username");
    }
  }

  async function resetPoints() {
    const docRef = doc(db, "users", $user.uid);
    await updateDoc(docRef, {
      points: 0,
    });
    $user.points = 0;
    location.reload();
  }

  async function deleteAccount() {
    const docRef = doc(db, "users", $user.uid);
    await deleteDoc(docRef);
    $user.points = 0;
    $user.logged = false;
  }
</script>

<div class="parent">
  <header>
    <a href="/">Home</a>
    <Auth />
  </header>
  <div class="user-profile">
    {#if !data.user}
      <h1>User not found</h1>
    {:else}
      <div class="content">
        <img
          src={"https://source.boringavatars.com/beam/50/" + data.user.username}
          alt="Avatar"
        />
        <h1>@{data.user.username}</h1>
        <h2>
          {data.user.points}
          {data.user.points === 1 ? "banana" : "banans"}
        </h2>
        {#if $user.uid === data.user.uid}
          <button class="edit" on:click={editUsername}>Edit Username</button>
          <button class="reset" on:click={resetPoints}>Reset Points</button>
          <button class="delete" on:click={deleteAccount}>Delete Account</button
          >
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../variables";

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $headerHeight;

    a {
      color: black;
      text-decoration: none;
      background-color: $yellow;
      padding: 5px;
      border-radius: 3px;
    }
  }

  .parent {
    background-image: url("/banana-background.png");
    background-size: 200px;
    height: 100%;
  }

  .user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - $headerHeight);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 50px;
    border-radius: 10px;
    position: relative;
    width: 100%;
    max-width: 400px;

    img {
      position: absolute;
      top: 15px;
      left: 15px;
    }

    button {
      all: unset;
      background-color: $yellow;
      color: black;
      width: 100%;
      max-width: 200px;
      text-align: center;
      padding: 3px;
      border-radius: 3px;
      cursor: pointer;
      transition-duration: 0.2s;

      &:hover {
        scale: 1.1;
      }
    }

    .reset {
      background-color: #fe8d69;
    }

    .delete {
      background-color: #fb4e4e;
    }
  }
</style>
