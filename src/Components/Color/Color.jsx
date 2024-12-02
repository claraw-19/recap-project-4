import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false);

  function handleDelete() {
    setIsConfirming(true);
  }

  function handleCancel() {
    setIsConfirming(false);
  }

  function confirmDelete() {
    onDelete(color.id);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {isConfirming ? (
        <>
          <p className="color-card-hightlight">Delete?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
