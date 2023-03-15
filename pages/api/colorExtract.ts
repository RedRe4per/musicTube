import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from "canvas";

type ResponseType = {
  dominantColor: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { imageUrl } = req.query;

  const img = await loadImage(imageUrl as string);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const colorCount: { [key: string]: number } = {};
  let maxCount = 0;
  let dominantColor: string | null = null;

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

  res.status(200).json({ dominantColor: dominantColor });
}
