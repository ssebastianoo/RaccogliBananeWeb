import { db } from "$lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), orderBy("points", "desc"))
  );
  const users = querySnapshot.docs.map((doc) => doc.data());

  return {
    users,
  };
}
