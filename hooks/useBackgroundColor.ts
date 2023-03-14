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
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        throw new Error("Unable to load image.");
      };
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCount: { [key: string]: number } = {};
    let maxCount = 0;
    let dominantColor = null;
    if (!imageData) return "";
    for (let i = 0; i < imageData.length; i += 4) {
      const rgba = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]},${
        imageData[i + 3]
      }`;
      if (colorCount[rgba]) {
        colorCount[rgba]++;
      } else {
        colorCount[rgba] = 1;
      }
      if (colorCount[rgba] > maxCount) {
        maxCount = colorCount[rgba];
        dominantColor = rgba;
      }
    }
    console.log("set bg color times")
    setBgColor(`rgba(${dominantColor})`);
  };

  return { handleBackgroundColor };
};
