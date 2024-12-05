import { useState } from "react";

export function ThemeForm({ onSave }) {
  const [name, setName] = useState("");

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
