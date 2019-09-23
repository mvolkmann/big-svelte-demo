import { writable } from "svelte/store";

export const busyStore = writable(false);

const MIN_TIME_TO_DISPLAY = 1000;

let busyCounter = 0;
let startTime;

export function taskEnd() {
  if (busyCounter > 0) busyCounter--;
  if (busyCounter === 0) {
    const timeDisplayed = Date.now() - startTime;
    // Wait to hide spinner until it has been
    // displayed for a minimum amount of time.
    const waitTime = Math.max(0, MIN_TIME_TO_DISPLAY - timeDisplayed);
    setTimeout(() => busyStore.set(false), waitTime);
  }
}

export function taskStart() {
  const alreadyBusy = busyCounter > 0;
  busyCounter++;
  if (!alreadyBusy) {
    // Wait a bit before showing spinner so
    // it never appears for short duration tasks.
    setTimeout(() => {
      startTime = Date.now();
      if (busyCounter > 0) busyStore.set(true);
    }, 500);
  }
}
