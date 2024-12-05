import { useEffect, useState } from "react";
import "./ContrastCheck.css";

export function ContrastCheck({ color }) {
  const [contrastValue, setContrastValue] = useState(null);
  console.log("contrastValue:", contrastValue);
  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setContrastValue(data);
      } catch (error) {
        console.error("Error fetching contrast data:", error);
      }
    }
    postFetch();
  }, [color]);

  function getColor(value) {
    if (value === "Yup") {
      return "green";
    } else if (value === "Kinda") {
      return "yellow";
    } else {
      return "red";
    }
  }

  return (
    <p
      className="contrast-background"
      style={{
        color:
          contrastValue && contrastValue.overall
            ? getColor(contrastValue.overall)
            : "gray",
      }}
    >
      {contrastValue
        ? `Contrast Value: ${contrastValue.overall}`
        : "Loading..."}
    </p>
  );
}
