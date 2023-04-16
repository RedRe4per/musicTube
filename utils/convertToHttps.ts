export const convertToHttps = (url: string) => {
  if (url === null || url === undefined) return undefined;
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};
