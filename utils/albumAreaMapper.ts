import { AlbumArea } from "@/interfaces/album";

export const albumAreaMapper = (albumArea: AlbumArea) => {
    let albumAreaTitle: string;
    switch (albumArea) {
      case "Z_H":
        albumAreaTitle = "Chinese Recommended Albums";
        break;
      case "E_A":
        albumAreaTitle = "European & American Recommended Albums";
        break;
      case "JP":
        albumAreaTitle = "Japanese Recommended Albums";
        break;
      case "KR":
        albumAreaTitle = "Korean Recommended Albums";
        break;
    }
    return albumAreaTitle;
  };
  