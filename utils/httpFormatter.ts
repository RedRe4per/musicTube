export const httpFormatter = (url: string | null) => {
  if (!url) return undefined;
  return url.replace("http", "https");
};
