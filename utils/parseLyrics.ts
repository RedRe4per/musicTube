export const parseLyrics = (rawData: string) => {
  const lines = rawData.split("\n");
  const parsedData = lines
    .map((line) => {
      const timestampMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/);
      if (timestampMatch) {
        const minutes = parseInt(timestampMatch[1], 10);
        const seconds = parseInt(timestampMatch[2], 10);
        const milliseconds = parseInt(timestampMatch[3], 10);
        const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
        const text = line.replace(timestampMatch[0], "").trim();
        return { time, text };
      }
      return null;
    })
    .filter((item) => item !== null);

  return parsedData;
};
