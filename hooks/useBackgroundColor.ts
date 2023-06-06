import { BgColorContext } from "@/contexts/BgColorContext";
import { useContext, useState } from "react";
import { convertToHttps } from "@/utils/convertToHttps";

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
      `/api/colorExtract?imageUrl=${convertToHttps(imageUrl)}`
    );
    const data = await response.json();
    setBgColor(data.dominantColor);
  };

  return { handleBackgroundColor };
};
