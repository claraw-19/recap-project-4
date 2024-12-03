import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
// import { useState } from "react";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("themecolors", {
    defaultValue: initialColors,
  });
  console.log(initialColors);

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

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={addColor} buttonText={"Add color"} />
      {colors.length === 0 ? (
        <p>There are no colors, add some!</p>
      ) : (
        colors.map((color) => {
          console.log(color);
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
