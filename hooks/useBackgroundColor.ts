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

    const data1 = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/colorExtract?imageUrl=${imageUrl}`
    );
    const data2 = data1.json();
    console.log(data2, "set bg color times");
    //setBgColor(`rgba(${dominantColor})`);
  };

  return { handleBackgroundColor };
};
