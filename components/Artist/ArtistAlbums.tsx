import React from "react";
import { IAlbumSong } from "@/interfaces/albumSong";
import { AlbumCard } from "../Card/AlbumCard";

interface Props {
  hotSongs: IAlbumSong[];
}

interface ArtistAlbum {
  albumUrl: string;
  albumName: string;
  artists: string[];
  albumId: number;
}

export const ArtistAlbums = React.memo(({ hotSongs }: Props) => {
  const artistAlbums: ArtistAlbum[] = [];
  hotSongs.forEach((hotSong: IAlbumSong) => {
    if (
      artistAlbums.findIndex(
        (artistAlbum: ArtistAlbum) => artistAlbum.albumId === hotSong.al.id
      ) < 0
    ) {
      artistAlbums.push({
        albumName: hotSong.al.name,
        albumId: hotSong.al.id,
        albumUrl: hotSong.al.picUrl,
        artists: hotSong.ar.map((artist) => {
          return artist.name;
        }),
      });
    }
  });

  return (
    <section className="mt-12 mx-8 mb-16">
      <p className="text-h3-bold text-gray-200 brightness-110 ml-2">
        Artist Albums
      </p>
      <section className="flex gap-2 lg:gap-4 flex-wrap mt-4">
        {artistAlbums.slice(0, 18).map((album: ArtistAlbum, index) => {
          return (
            <AlbumCard
              key={index}
              albumName={album.albumName}
              albumId={album.albumId}
              albumUrl={album.albumUrl}
              artists={album.artists}
            />
          );
        })}
      </section>
    </section>
  );
});
