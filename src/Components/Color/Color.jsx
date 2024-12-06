import { useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";
import { useEffect } from "react";
import { ContrastCheck } from "../ContrastCheck/ContrastCheck";
import "../Buttons/Buttons.css";

export default function Color({ color, onDelete, onEdit }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("Copy!");

  function handleChange(changedColor) {
    onEdit(color.id, changedColor);
    setIsEditing(false);
  }

  async function handleCopy(colorHex) {
    console.log(colorHex);
    await navigator.clipboard.writeText(colorHex);
    setConfirmationMessage("Copied successfully!");
  }

  useEffect(() => {
    if (confirmationMessage === "Copied successfully!") {
      const timeoutId = setTimeout(() => {
        setConfirmationMessage("Copy!");
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [confirmationMessage]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <>
        <button onClick={() => handleCopy(color.hex)}>
          {confirmationMessage}
        </button>
      </>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastCheck color={color}></ContrastCheck>
      <br />
      {isEditing ? (
        <>
          <ColorForm
            initialData={color}
            onSubmitColor={handleChange}
            buttonText={"Change color"}
          />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      {isConfirming ? (
        <>
          <p className="color-card-hightlight">Delete?</p>
          <button className="button--red" onClick={() => onDelete(color.id)}>
            Yes
          </button>
          <button
            className="button--green"
            onClick={() => setIsConfirming(false)}
          >
            No
          </button>
        </>
      ) : (
        <>
          <button className="button--red" onClick={() => setIsConfirming(true)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
