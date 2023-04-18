import { IArtist } from "./artist";

export interface IAlbum {
  albumId: number;
  albumName: string;
  artistName: string;
  artistNames: string[];
  coverUrl: string;
  price: number;
  saleNum: number;
  id?: number;
}

export interface IAlbumList {
  albumProducts: IAlbum[];
  code: number;
  hasNextPage: boolean;
  title: string;
}

export interface IAlbumDetails {
  alias: string;
  artist: IArtist;
  artists: IArtist[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: string;
  companyId: number;
  copyrightId: number;
  description: string;
  id: number;
  info: {
    commentCount: number;
    liked: boolean;
    likedCount: number;
    resourceId: number;
    resourceType: number;
    shareCount: number;
    threadId: string;
  };
  mark: number;
  name: string;
  onSale: boolean;
  paid: boolean;
  pic: number;
  picId: number;
  picId_str: string;
  picUrl: string;
  publishTime: number;
  size: number;
  status: number;
  subType: string;
  tags: string;
  type: string;
}

export type AlbumArea = "Z_H" | "E_A" | "JP" | "KR";
