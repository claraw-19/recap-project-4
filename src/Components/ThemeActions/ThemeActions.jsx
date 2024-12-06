import { nanoid } from "nanoid";
import { useState } from "react";
import { ThemeForm } from "../ThemeForm/ThemeForm";

export function ThemeActions({
  setAllThemes,
  setSelectedTheme,
  selectedTheme,
  allThemes,
  initialThemes,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const addTheme = () => {
    const newTheme = {
      id: nanoid(),
      name: "new theme",
      colors: [],
    };
    setAllThemes((prevThemes) => [newTheme, ...prevThemes]);
    setSelectedTheme(newTheme);
  };

  const editThemeName = (newName) => {
    setSelectedTheme((prevTheme) => ({
      ...prevTheme,
      name: newName,
    }));
    setAllThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id ? { ...theme, name: newName } : theme
      )
    );
    setIsEditing(false);
  };

  const confirmDeleteTheme = () => {
    const remainingThemes = allThemes.filter(
      (theme) => theme.id !== selectedTheme.id
    );
    setAllThemes(remainingThemes);
    setSelectedTheme(() => remainingThemes[0] || initialThemes[0]);
    setIsConfirmingDelete(false);
  };

  const cancelDeleteTheme = () => {
    setIsConfirmingDelete(false);
  };

  const handleDeleteTheme = () => {
    // setIsEditing(false);
    setIsConfirmingDelete(true);
  };

  return (
    <>
      <button onClick={addTheme} className="button--green">
        Add
      </button>
      {isEditing ? (
        <>
          <p>New name:</p>
          <ThemeForm
            onSave={editThemeName}
            currentName={selectedTheme.name}
          ></ThemeForm>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className={
              selectedTheme.id === initialThemes[0].id ? "button--disabled" : ""
            }
            disabled={selectedTheme.id === initialThemes[0].id}
          >
            Edit
          </button>
        </>
      )}
      {isConfirmingDelete ? (
        <>
          <p>Remove?</p>
          <button onClick={confirmDeleteTheme} className="button--red">
            Yes
          </button>
          <button onClick={cancelDeleteTheme} className="button--green">
            No
          </button>
        </>
      ) : (
        <button
          onClick={handleDeleteTheme}
          className={
            selectedTheme.id === initialThemes[0].id
              ? "button--disabled"
              : "button--red"
          }
          disabled={selectedTheme.id === initialThemes[0].id}
        >
          Remove Theme
        </button>
      )}
    </>
  );
}
