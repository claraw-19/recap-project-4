import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { ColorForm } from "./Components/ColorForm/ColorForm";

function App() {
  const [colors, setColors] = useState(initialColors);
  const addColor = (newColor) => {
    const newColorWithId = { id: nanoid(), ...newColor };
    setColors((prevColors) => [newColorWithId, ...prevColors]);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={addColor} />
      {colors.map((color) => {
        console.log(color);
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
