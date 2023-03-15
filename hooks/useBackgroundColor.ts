import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useState } from "react";

export const useBackgroundColor = (imageUrl?: string) => {
  const { setBgColor } = useContext(BgColorContext);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const handleBackgroundColor = async () => {
    if (imageUrl === prevUrl) return;
    if (!imageUrl) {
      setBgColor("#1B1B1B");
      return;
    }
    setPrevUrl(imageUrl);

    console.log(imageUrl);
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://music-app-tan-xi.vercel.app"
        : "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/colorExtract?imageUrl=${imageUrl}`
    );
    const data = await response.json();
    console.log(data, "set bg color times");
    setBgColor(`rgba(${data.dominantColor})`);
  };

  return { handleBackgroundColor };
};
