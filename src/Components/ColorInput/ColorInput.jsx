import { useState } from "react";

export function ColorInput({ id, value }) {
  const [inputValue, setInputValue] = useState(value);

  function handleColorChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={handleColorChange}
      />
      <input type="color" value={inputValue} onChange={handleColorChange} />
    </div>
  );
}
