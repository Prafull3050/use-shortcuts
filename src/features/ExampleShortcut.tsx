import { useState } from "react";

const ExampleShortcut = () => {
  const [items, setItems] = useState([
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
  ]);

  const onRemove = (idx: number) => {
    const updated = [...items];
    delete updated[idx];
    setItems(updated);
  };

  return (
    <div>
      {items.map((item, idx) => (
        <input
          key={idx}
          type="text"
          value={item?.value}
          onClick={() => onRemove(idx)}
          onChange={(ev) => console.log(ev)}
        />
      ))}
    </div>
  );
};

export default ExampleShortcut;
