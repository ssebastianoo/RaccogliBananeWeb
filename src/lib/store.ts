import { writable } from "svelte/store";

export const basket = writable<HTMLImageElement>();
export const points = writable<number>(0);
export const user = writable<{
  username: string;
  uid: string;
  logged: boolean;
  points: number;
}>({
  username: "",
  uid: "",
  logged: false,
  points: 0,
});
