import React from "react";
import { IAlbumSong } from "@/interfaces/albumSong";
import { AlbumCard } from "../Card/AlbumCard";

interface Props {
    hotSongs: IAlbumSong[];
  }

export const ArtistAlbums = React.memo(({ hotSongs }: Props) => {
    const artistAlbums = hotSongs.map((hotSong: IAlbumSong) => {
        return {
          albumName: hotSong.al.name,
          albumId: hotSong.al.id,
          albumUrl: hotSong.al.picUrl,
          artists: hotSong.ar.map((artist)=>{
            return artist.name
          }),
        };
      });
      console.log(artistAlbums, "result")
  return (
    <section className="mt-12 mx-8 mb-16">
      <p className="text-h3-bold text-gray-200 brightness-110 ml-2">
        Artist Albums
      </p>
      <section className="flex gap-2 lg:gap-4 flex-wrap mt-4">
        {
          artistAlbums.slice(0, 18).map((album) => {
            return <AlbumCard key={album.albumId} albumName={album.albumName} albumId={album.albumId} albumUrl={album.albumUrl} artists={album.artists}/>;
          })}
      </section>
    </section>
  );
});