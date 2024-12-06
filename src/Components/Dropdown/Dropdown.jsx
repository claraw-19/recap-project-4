export function Dropdown({ selectedTheme, setSelectedTheme, allThemes }) {
  const handleChange = (event) => {
    const selectedId = event.target.value;
    const theme = allThemes.find((theme) => theme.id === selectedId);
    if (theme) {
      setSelectedTheme(theme);
    }
  };

  return (
    <select onChange={handleChange} value={selectedTheme.id}>
      {allThemes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
