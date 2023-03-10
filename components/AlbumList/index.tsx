import { AlbumCard } from "@/components/Card/AlbumCard";

interface Props {
}

export const AlbumList = ({title, albumList}: any) => {
    return (
        <section className="ml-6 mt-6">
          <h2 className="text-h3-normal text-white-200">{title}</h2>
          <div className="mt-3 flex gap-6">
            {albumList.albumProducts.map((album: any)=>{
              return <AlbumCard key={album.albumId} albumUrl={album.coverUrl} albumName={album.albumName} artists={album.artistNames
}/>
            })}
          </div>
        </section>
    )

}