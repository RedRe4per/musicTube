import { AreaCode } from "@/interfaces/artist";

export const getAreaName = (areaCode: AreaCode) => {
  let areaName: string;

  switch (areaCode) {
    case "-1":
      areaName = "World";
      break;
    case "0":
      areaName = "Other Regions";
      break;
    case "7":
      areaName = "Chinese";
      break;
    case "8":
      areaName = "Japanese";
      break;
    case "16":
      areaName = "Korean";
      break;
    case "96":
      areaName = "European & North American";
      break;
  }
  return areaName;
};
