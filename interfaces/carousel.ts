import { AreaCode } from "@/interfaces/artist";

export interface IBannerSong {
  name: string;
  id: number;
  image: string;
}

export interface IBanner {
  artistCover: string;
  artistId: number;
  artistName: string;
  artistAreaCode: AreaCode;
  artistAlias?: string[];
  bgColor: string;
  artistSongs: IBannerSong[];
}
