export type ShortcutKey = {
  keys: string[];
  action: () => void;
  description: string;
};

export type ShortcutContextTypes = {
  allShortcutKeys: ShortcutKey[];
  registerKey: (params: ShortcutKey) => void;
  deregisterKey: (keys: string[]) => void;
};
