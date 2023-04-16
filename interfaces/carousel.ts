export interface IBannerSong {
  name: string;
  id: number;
  image: string;
}

export interface IBanner {
  artistCover: string;
  artistId: number;
  artistName: string;
  artistAreaCode: "-1" | "0" | "7" | "8" | "16" | "96";
  artistAlias?: string[];
  bgColor: string;
  artistSongs: IBannerSong[];
}
