import { useContext } from "react";
import { ShortcutKeyContext } from "../context/ShortcutKeyContext";

export const useShortcut = () => {
  const ctx = useContext(ShortcutKeyContext);

  if (!ctx) {
    throw new Error("useShortcut must be used inside <ShortcutProvider>");
  }

  return ctx;
};
