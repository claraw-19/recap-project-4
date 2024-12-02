export function ColorForm(onSubmitColor) {
  const initialData = {
    role: "main color",
    hex: "ffffff",
    contrastText: "000000",
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role:
        <input type="text" id="role" name="role" value={initialData.role} />
      </label>
      <label htmlFor="hex">
        Hex:
        <input type="text" id="hex" name="hex" value={initialData.hex} />
      </label>
      <label htmlFor="contrastText">
        Contrast Text:
        <input
          type="text"
          id="contrastText"
          name="contrastText"
          value={initialData.contrastText}
        />
      </label>
      <button>Add Color</button>
    </form>
  );
}