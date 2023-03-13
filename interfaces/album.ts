export interface IAlbum {
    albumId: number;
    albumName: string;
    artistName: string
    artistNames: string[];
    coverUrl: string;
    price: number;
    saleNum: number;
}

export interface IAlbumList {
    albumProducts: IAlbum[];
    code: number;
    hasNextPage: boolean;
}