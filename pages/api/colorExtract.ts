import type { NextApiRequest, NextApiResponse } from "next";
import Vibrant from "node-vibrant";

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

  const palette = await Vibrant.from(imageUrl as string).getPalette();
  const dominantColor = palette.Vibrant?.hex || null;

  res.status(200).json({ dominantColor });
}
