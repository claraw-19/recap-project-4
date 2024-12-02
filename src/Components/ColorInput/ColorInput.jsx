import { useState } from "react";

export function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleColorChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleColorChange}
      />
      <input type="color" value={inputValue} onChange={handleColorChange} />
    </div>
  );
}