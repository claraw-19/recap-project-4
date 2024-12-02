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

  function handleDelete() {
    setIsConfirming(true);
  }

  function handleCancel() {
    setIsConfirming(false);
  }

  function confirmDelete() {
    onDelete(color.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(changedColor) {
    onEdit(color.id, changedColor);
    setIsEditing(false);
  }

  function handleCancelEdit() {
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
      {isConfirming ? (
        <>
          <p className="color-card-hightlight">Delete?</p>
          <button className="button--delete" onClick={confirmDelete}>
            Yes
          </button>
          <button className="button--not-delete" onClick={handleCancel}>
            No
          </button>
        </>
      ) : (
        <>
          <button className="button--delete" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      {isEditing && (
        <>
          <ColorForm
            initialData={color}
            onSubmitColor={handleChange}
            buttonText={"Change color"}
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}
    </div>
  );
}
