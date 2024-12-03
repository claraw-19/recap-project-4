import { ColorInput } from "../ColorInput/ColorInput";
import "./ColorForm.css";

export function ColorForm({ onSubmitColor, initialData, buttonText }) {
  const { role, hex, contrastText } = initialData || {
    role: "main color",
    hex: "#ffffff",
    contrastText: "#000000",
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form className="colorForm" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role:
        <br />
        <input
          className="colorInput"
          type="text"
          id="role"
          name="role"
          defaultValue={role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex:
        <br />
        <ColorInput id="hex" defaultValue={hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text:
        <br />
        <ColorInput id="contrastText" defaultValue={contrastText} />
      </label>
      <button>{buttonText}</button>
      <br />
    </form>
  );
}
