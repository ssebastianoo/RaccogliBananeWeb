import { db } from "$lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: { username: string } }) {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("username", "==", params.username));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => doc.data());

  if (users.length === 0) {
    return {
      user: null,
    };
  } else {
    return {
      user: users[0],
    };

    // const querySnapshot = await getDocs(
    //   query(collection(db, "users"), orderBy("points", "desc"))
    // );
    // const users = querySnapshot.docs.map((doc) => doc.data());

    // return {
    //   users,
    // };
  }
}
