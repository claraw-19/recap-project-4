import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";
import { ThemeActions } from "./Components/ThemeActions/ThemeActions";
// import { ThemeForm } from "./Components/ThemeForm/ThemeForm";
// import { useState } from "react";

function App() {
  // const clearLocalStorage = () => {
  //   localStorage.removeItem("allThemes");
  // };
  // clearLocalStorage();
  const [colors, setColors] = useLocalStorageState("themecolors", {
    defaultValue: initialColors,
  });

  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    "selectedTheme",
    { defaultValue: initialThemes[0] }
  );

  const [allThemes, setAllThemes] = useLocalStorageState("allThemes", {
    defaultValue: initialThemes,
  });

  // const [isEditing, setIsEditing] = useState(false);

  // const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // const confirmDeleteTheme = () => {
  //   const remainingThemes = allThemes.filter(
  //     (theme) => theme.id !== selectedTheme.id
  //   );
  //   setAllThemes(remainingThemes);
  //   setSelectedTheme(() => remainingThemes[0] || initialThemes[0]);
  //   setIsConfirmingDelete(false);
  // };

  // const handleDeleteTheme = () => {
  //   // setIsEditing(false);
  //   setIsConfirmingDelete(true);
  // };

  // const setIsEditingTrue = () => {
  //   setIsConfirmingDelete(false);
  //   setIsEditing(true);
  // };

  // const cancelDeleteTheme = () => {
  //   setIsConfirmingDelete(false);
  // };

  const addColor = (newColor) => {
    const newColorWithId = { id: nanoid(), ...newColor };
    setColors((prevColors) => [newColorWithId, ...prevColors]);

    setSelectedTheme((prevTheme) => {
      const updatedTheme = {
        ...prevTheme,
        colors: [newColorWithId, ...prevTheme.colors],
      };
      setAllThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === updatedTheme.id ? updatedTheme : theme
        )
      );
      return updatedTheme;
    });
  };

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

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const theme = allThemes.find((theme) => theme.id === selectedId);
    if (theme) {
      setSelectedTheme(theme);
    }
  };

  // const addTheme = () => {
  //   const newTheme = {
  //     id: nanoid(),
  //     name: "new theme",
  //     colors: [],
  //   };
  //   setAllThemes((prevThemes) => [newTheme, ...prevThemes]);
  //   setSelectedTheme(newTheme);
  // };

  // const editThemeName = (newName) => {
  //   setSelectedTheme((prevTheme) => ({
  //     ...prevTheme,
  //     name: newName,
  //   }));
  //   setAllThemes((prevThemes) =>
  //     prevThemes.map((theme) =>
  //       theme.id === selectedTheme.id ? { ...theme, name: newName } : theme
  //     )
  //   );
  //   setIsEditing(false);
  // };

  return (
    <>
      <h1>Theme Creator</h1>
      <select onChange={handleChange} value={selectedTheme.id}>
        {allThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <ThemeActions
        setAllThemes={setAllThemes}
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
        allThemes={allThemes}
        initialThemes={initialThemes}
      />
      {/* <button onClick={addTheme} className="button--green">
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
      )} */}

      <ColorForm onSubmitColor={addColor} buttonText={"Add color"} />
      {selectedTheme.colors.length === 0 ? (
        <p>There are no colors, add some!</p>
      ) : (
        selectedTheme.colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDelete={() => deleteColor(color.id)}
              onEdit={editColor}
            />
          );
        })
      )}
    </>
  );
}

export default App;
