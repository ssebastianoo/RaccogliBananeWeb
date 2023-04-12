import { writable } from "svelte/store";

export const basket = writable<HTMLImageElement>();
export const points = writable<number>(0);
