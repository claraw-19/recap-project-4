import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes";
import { ThemeActions } from "./Components/ThemeActions/ThemeActions";
import { Dropdown } from "./Components/Dropdown/Dropdown";
import { nanoid } from "nanoid";

function App() {
  // const clearLocalStorage = () => {
  //   localStorage.removeItem("allThemes");
  // };
  // clearLocalStorage();
  // const [colors, setColors] = useLocalStorageState("themecolors", {
  //   defaultValue: initialColors,
  // });

  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    "selectedTheme",
    { defaultValue: initialThemes[0] }
  );

  const [allThemes, setAllThemes] = useLocalStorageState("allThemes", {
    defaultValue: initialThemes,
  });

  const [colors, setColors] = useLocalStorageState("themecolors", {
    defaultValue: initialColors,
  });

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

  return (
    <>
      <h1>Theme Creator</h1>
      <Dropdown
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        allThemes={allThemes}
      />
      <ThemeActions
        setAllThemes={setAllThemes}
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
        allThemes={allThemes}
        initialThemes={initialThemes}
      />

      <ColorForm onSubmitColor={addColor} buttonText={"Add Theme"} />
      {selectedTheme.colors.length === 0 ? (
        <p>There are no colors, add some!</p>
      ) : (
        selectedTheme.colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              colors={colors}
              setColors={setColors}
              setAllThemes={setAllThemes}
              setSelectedTheme={setSelectedTheme}
            />
          );
        })
      )}
    </>
  );
}

export default App;
