import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";
import "./Components/Buttons/Buttons.css";

function App() {
  const [colors, setColors] = useLocalStorageState("themecolors", {
    defaultValue: initialColors,
  });
  // console.log(initialColors);
  const [selectedTheme, setSelectedTheme] = useState(initialThemes[0]);

  const addColor = (newColor) => {
    const newColorWithId = { id: nanoid(), ...newColor };
    setColors((prevColors) => [newColorWithId, ...prevColors]);
  };

  const deleteColor = (colorId) => {
    const remainingColors = colors.filter((color) => colorId !== color.id);
    setColors(remainingColors);
  };

  const editColor = (colorId, changedColor) => {
    const changedColors = colors.map((color) =>
      color.id === colorId ? { ...color, ...changedColor } : color
    );
    setColors(changedColors);
  };

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const theme = initialThemes.find((theme) => theme.id === selectedId);
    if (theme) {
      setSelectedTheme(theme);
    }
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <select onChange={handleChange} value={selectedTheme.id}>
        {initialThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <button className="button--green">Add</button>
      <button>Edit</button>
      <button className="button--red">Remove</button>

      <h2>Selected Theme: {selectedTheme.name}</h2>
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
