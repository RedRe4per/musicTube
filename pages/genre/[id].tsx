import { GetServerSidePropsContext } from "next";
import { PlaylistCard } from "@/components/Card/PlaylistCard";
import { IPlaylist } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";

interface Props { id: string; data: { code: number; result: {playlistCount: number; playlists: IPlaylist[]}}}

export default function Genre(props: Props) {
  const { data, id} = props;
  const playlists = data.result.playlists;

  return (<main className="mx-10 my-6">
    <h2 className="text-h3-normal text-gray-200">{id}</h2>
    <section className="flex flex-wrap gap-6 mt-8 mb-16">
      {playlists.map((playlist: IPlaylist, index: number) => {
        return (
          <PlaylistCard coverUrl={playlist.coverImgUrl} playlistName={playlist.name} playlistId={playlist.id} tags={[id]} key={index}/>
        )
      })}
    </section>
    <Footer />
  </main>);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_ADDRESS
    }/cloudsearch?limit=60&type=1000&keywords=${id}&timestamp=${
      Date.now()
    }`
  );
  const data = await response.json();
  return { props: {data: data, id: id}};
}
