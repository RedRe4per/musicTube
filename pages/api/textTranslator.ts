import type { NextApiRequest, NextApiResponse } from "next";
const { translate } = require("bing-translate-api");
const EventEmitter = require('events');

const emitter = new EventEmitter()
emitter.setMaxListeners(40)

export const config = {
  runtime: "nodejs",
};

interface ResType {
  text: string;
  translation: string;
  userLang: string;
  correctedText: string;
  language: {
    to: string;
    from: string;
    score: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { originalText } = req.query;
  const result = await translate(originalText as string, null, "en")
    .then((res: ResType) => {
      return res.translation;
    })
    .catch((err: string) => {
      console.error(err);
      return originalText;
    });
  res.status(200).json({ text: result });
}
