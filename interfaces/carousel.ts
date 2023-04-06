export interface IBannerSong {
    name: string;
    id: number;
    image: string;
}

export interface IBanner {
    artistCover: string;
    artistId: number;
    artistName: string;
    artistSongs: IBannerSong[];
}