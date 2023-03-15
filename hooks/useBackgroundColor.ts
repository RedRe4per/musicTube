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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/colorExtract?imageUrl=${imageUrl}`
    );
    const data = await response.json();
    console.log(data.dominantColor, "set bg color times");
    setBgColor(`rgba(${data.dominantColor})`);
  };

  return { handleBackgroundColor };
};
