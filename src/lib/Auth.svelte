<script lang="ts">
  import { user } from "./store";
  import { auth, db } from "./firebase";
  import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithCredential,
  } from "firebase/auth";
  import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    where,
    query,
  } from "firebase/firestore";
  import type { UserCredential } from "firebase/auth";

  import { onMount } from "svelte";

  let loaded = false;

  const provider = new GoogleAuthProvider();

  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  async function getUser(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists) return null;
    return docSnap.data();
  }

  async function createUser(uid: string, username: string) {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      uid: uid,
      points: 0,
      username: username,
    });
  }

  async function namePrompt(): Promise<string> {
    let end = false;
    let finalName: string = "";
    while (!end) {
      let newName = prompt("Please enter your username");
      if (!newName) {
        alert("Please enter a valid username");
        end = false;
      } else {
        newName = newName.trim().toLocaleLowerCase().replaceAll(" ", "_");
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("username", "==", newName));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          alert("Username already taken");
          end = false;
        } else {
          finalName = newName;
          end = true;
        }
      }
    }
    return finalName;
  }

  async function userChecks(
    result: UserCredential,
    createUserIfNull: boolean = true
  ) {
    const userData = await getUser(result.user.uid);

    if (!userData) {
      if (createUserIfNull) {
        let newName = await namePrompt();
        await createUser(result.user.uid, newName);
        $user.username = newName;
      } else {
        return null;
      }
    } else {
      $user.username = userData.username;
    }
    $user.logged = true;
    $user.uid = result.user.uid;
    $user.points = 0;
  }

  onMount(() => {
    const idToken = getCookie("idToken");

    if (idToken) {
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential)
        .then(async (result) => {
          await userChecks(result, false);
          loaded = true;
        })
        .catch(() => {
          loaded = true;
        });
    } else {
      loaded = true;
    }
  });

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          document.cookie = `idToken=${credential.idToken}; path=/; expires=Thu, 31 Dec 2037 23:59:59 GMT;`;
          await userChecks(result);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function logout() {
    $user = {
      logged: false,
      uid: "",
      username: "",
      points: 0,
    };
    document.cookie = `idToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  }
</script>

<div class="auth">
  {#if loaded}
    {#if $user.logged}
      <div class="avatar">
        <img
          src={"https://source.boringavatars.com/beam/50/" + $user.username}
          alt="Beam"
        />

        <div class="menu">
          <p>@{$user.username}</p>
          <a href={"/@" + $user.username}>Profile</a>
          <button on:click={logout}>Logout</button>
        </div>
      </div>
    {:else}
      <button class="btn" on:click={googleLogin}>Login</button>
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style lang="scss">
  @import "../variables";

  .auth {
    display: flex;
  }

  .btn {
    font-size: 0.9em;
    padding: 8px;
  }

  .avatar {
    display: inline-flex;

    img {
      height: $headerHeight;
    }

    &:hover {
      .menu {
        display: flex;
      }
    }

    .menu {
      position: absolute;
      display: none;
      gap: 5px;
      flex-direction: column;
      top: calc($headerHeight + 15px);
      background-color: rgba(0, 0, 0, 0.4);
      padding: 10px;
      transform-origin: right top;
      right: 30px;
      border-radius: 7px;

      p {
        opacity: 0.8;
      }

      a,
      button {
        all: unset;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
