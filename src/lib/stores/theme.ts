import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const initial = (): Theme => {
  if (!browser) return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const createTheme = () => {
  const { subscribe, set } = writable<Theme>(initial());

  const apply = (value: Theme) => {
    if (browser) {
      document.documentElement.classList.toggle("dark", value === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (e) {
        // Storage can be unavailable (private mode, blocked cookies) — the
        // toggle still works for the current page in that case.
      }
    }
    set(value);
  };

  return {
    subscribe,
    set: apply,
    toggle: () =>
      apply(
        browser && document.documentElement.classList.contains("dark")
          ? "light"
          : "dark"
      ),
  };
};

export const theme = createTheme();
