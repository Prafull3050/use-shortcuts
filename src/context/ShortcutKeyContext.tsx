import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ShortcutContextTypes, ShortcutKey } from "../types/types";

export const ShortcutKeyContext = createContext<ShortcutContextTypes | undefined>(
  undefined
);

export const ShorcutKeyProvider = ({ children }: { children: ReactNode }) => {
  const [allShortcutKeys, setAllShortcutKeys] = useState<ShortcutKey[]>([]);

  const registerKey = (params: ShortcutKey) => {
    setAllShortcutKeys((prev) => {
    const exists = prev.some(
      (k) => k.keys.join("+") === params.keys.join("+")
    );
    if (exists) return prev;

    return [...prev, params];
  });
  };

  const deregisterKey = (keys: string[]) => {
     setAllShortcutKeys((prev) =>
      prev.filter((k) => k?.keys.join("+") !== keys?.join("+"))
    );
  };

   useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      allShortcutKeys.forEach((shortcut) => {
        const keySet = shortcut.keys.map((k) => k.toUpperCase());

        const ctrlReq = keySet.includes("CTRL");
        const shiftReq = keySet.includes("SHIFT");
        const altReq = keySet.includes("ALT");
        const metaReq = keySet.includes("META") || keySet.includes("CMD");

        const mainKey = keySet[keySet.length - 1];

        if (
          (!ctrlReq || event.ctrlKey) &&
          (!shiftReq || event.shiftKey) &&
          (!altReq || event.altKey) &&
          (!metaReq || event.metaKey) &&
          event.key.toUpperCase() === mainKey
        ) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [allShortcutKeys]);

  return (
    <ShortcutKeyContext.Provider
      value={{
        allShortcutKeys,
        registerKey,
        deregisterKey,
      }}
    >
      {children}
    </ShortcutKeyContext.Provider>
  );
};
