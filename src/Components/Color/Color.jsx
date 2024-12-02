import { useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onEdit }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
