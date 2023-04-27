import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    params,
  };

  throw error(404, "Not found");
}
