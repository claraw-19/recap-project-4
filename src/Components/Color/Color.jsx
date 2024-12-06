import { useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";
import { useEffect } from "react";
import { ContrastCheck } from "../ContrastCheck/ContrastCheck";
import "../Buttons/Buttons.css";
// import useLocalStorageState from "use-local-storage-state";
// import { nanoid } from "nanoid";
// import { initialColors } from "../../lib/colors";

// export default function Color({ color, onDelete, onEdit }) {
export default function Color({
  color,
  setSelectedTheme,
  setAllThemes,
  colors,
  setColors,
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("Copy!");

  const deleteColor = (colorId) => {
    const remainingColors = colors.filter((color) => colorId !== color.id);
    setColors(remainingColors);

    setSelectedTheme((prevTheme) => {
      const updatedTheme = {
        ...prevTheme,
        colors: prevTheme.colors.filter((color) => color.id !== colorId),
      };
      setAllThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === updatedTheme.id ? updatedTheme : theme
        )
      );
      return updatedTheme;
    });
  };

  const editColor = (colorId, changedColor) => {
    const changedColors = colors.map((color) =>
      color.id === colorId ? { ...color, ...changedColor } : color
    );
    setColors(changedColors);

    setSelectedTheme((prevTheme) => {
      const updatedTheme = {
        ...prevTheme,
        colors: prevTheme.colors.map((color) =>
          color.id === colorId ? { ...color, ...changedColor } : color
        ),
      };
      setAllThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === updatedTheme.id ? updatedTheme : theme
        )
      );
      return updatedTheme;
    });
  };

  function handleChange(changedColor) {
    // onEdit(color.id, changedColor);
    editColor(color.id, changedColor);
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
          {/* <button className="button--red" onClick={() => onDelete(color.id)}>
           */}
          <button className="button--red" onClick={() => deleteColor(color.id)}>
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
