import type { NextApiRequest, NextApiResponse } from "next";
import Vibrant from "node-vibrant";
import sharp from "sharp";
import https from "https";

export const config = {
  runtime: "nodejs",
};

type ResponseType = {
  dominantColor: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { imageUrl } = req.query;

  const url = new URL(imageUrl as string);
  const protocol =  https;

  const buffer = await new Promise<Buffer>((resolve, reject) => {
    protocol.get(imageUrl as string, (response) => {
      const chunks: Uint8Array[] = [];

      response.on("data", (chunk) => {
        chunks.push(chunk);
      });

      response.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });

  const resizedBuffer = await sharp(buffer)
    .resize({ width: 500 })
    .toBuffer();

  const palette = await Vibrant.from(resizedBuffer).getPalette();
  const dominantColor = palette.Vibrant?.hex || null;

  res.status(200).json({ dominantColor });
}

