import { useState } from "react";
import { useEffect } from "react";

export function ThemeForm({ onSave, currentName }) {
  const [name, setName] = useState(currentName || "");

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} required />
      <button type="submit">Save</button>
    </form>
  );
}
