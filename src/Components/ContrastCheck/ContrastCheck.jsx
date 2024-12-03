import { useEffect, useState } from "react";

export function ContrastCheck({ color }) {
  const [contrastValue, setContrastValue] = useState(null);

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
        // console.log("data: ", data);
        setContrastValue(data);
        // console.log(contrastValue);
      } catch (error) {
        console.error("Error fetching contrast data:", error);
      }
    }
    postFetch();
  }, [color]);

  return <p>{contrastValue ? contrastValue.overall : "Loading..."}</p>;
}
