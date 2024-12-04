import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
// import { useState } from "react";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";

function App() {
  // const clearLocalStorage = () => {
  //   localStorage.removeItem("allThemes");
  // };
  // clearLocalStorage();
  const [colors, setColors] = useLocalStorageState("themecolors", {
    defaultValue: initialColors,
  });
  console.log("colors: ", colors);
  console.log("Initial Colors:", initialColors);

  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    "selectedTheme",
    { defaultValue: initialThemes[0] }
  );
  console.log("selected theme: ", selectedTheme);
  const [allThemes, setAllThemes] = useLocalStorageState("allThemes", {
    defaultValue: initialThemes,
  });
  console.log("all themes: ", allThemes);
  console.log("Initial Themes:", initialThemes);

  const addColor = (newColor) => {
    const newColorWithId = { id: nanoid(), ...newColor };
    setColors((prevColors) => [newColorWithId, ...prevColors]);
    setSelectedTheme((prevTheme) => ({
      ...prevTheme,
      colors: [newColorWithId, ...prevTheme.colors],
    }));
  };

  const deleteColor = (colorId) => {
    const remainingColors = colors.filter((color) => colorId !== color.id);
    setColors(remainingColors);
    setSelectedTheme((prevTheme) => ({
      ...prevTheme,
      colors: prevTheme.colors.filter((color) => color.id !== colorId),
    }));
  };

  const editColor = (colorId, changedColor) => {
    const changedColors = colors.map((color) =>
      color.id === colorId ? { ...color, ...changedColor } : color
    );
    setColors(changedColors);
    setSelectedTheme((prevTheme) => ({
      ...prevTheme,
      colors: prevTheme.colors.map((color) =>
        color.id === colorId ? { ...color, ...changedColor } : color
      ),
    }));
  };

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const theme = allThemes.find((theme) => theme.id === selectedId);
    if (theme) {
      setSelectedTheme(theme);
    }
  };

  const addTheme = () => {
    const newTheme = { id: nanoid(), name: "new Theme", colors: [] };
    setAllThemes((prevThemes) => [newTheme, ...prevThemes]);
    setSelectedTheme(newTheme);
  };

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
      <button onClick={addTheme} className="button--green">
        Add
      </button>
      <button>Edit</button>
      <button className="button--red">Remove</button>
      <ColorForm onSubmitColor={addColor} buttonText={"Add color"} />
      {selectedTheme.colors.length === 0 ? (
        <p>There are no colors, add some!</p>
      ) : (
        selectedTheme.colors.map((color) => {
          // console.log(color);
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
