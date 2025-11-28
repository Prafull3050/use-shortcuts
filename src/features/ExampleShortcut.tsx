import { useEffect, useState } from "react";
import { useShortcut } from "../hooks/useShortcut";

const ExampleShortcut = () => {
  const [colors, setColors] = useState(["", "", ""]);
  const { registerKey, deregisterKey, allShortcutKeys } = useShortcut();

  const handleChangeColor = (index: number, color: string) => {
    const updated = [...colors];
    updated[index] = color;
    setColors(updated);
  };

  useEffect(() => {
    registerKey({
      keys: ["ctrl", "a"],
      description: "Change color to red",
      action: () => handleChangeColor(0, "red"),
    });

    registerKey({
      keys: ["ctrl", "b"],
      description: "Change color to blue",
      action: () => handleChangeColor(1, "blue"),
    });

    registerKey({
      keys: ["ctrl", "c"],
      description: "Change color to green",
      action: () => handleChangeColor(2, "green"),
    });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        {colors.map((color, idx) => (
          <div
            key={idx}
            style={{
              height: 200,
              width: 200,
              border: "1px solid",
              backgroundColor: color,
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <p>Registered Shortcuts</p>
        {allShortcutKeys?.map((shortcut, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 10,
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <p>
              {shortcut.keys.join(" + ")} - {shortcut?.description}
            </p>
            <button
              style={{
                height: "fit-content",
              }}
              onClick={() => deregisterKey(shortcut.keys)}
            >
              Deregester
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleShortcut;
