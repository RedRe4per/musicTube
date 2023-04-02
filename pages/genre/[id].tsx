import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useRef } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { getSubTags } from "@/utils/getSubTags";
import { PlaylistCard } from "@/components/Card/PlaylistCard";
import { IPlaylist } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";

interface Props {
  id: string;
  data: DataItem[];
}

interface DataItem {
  playlist: {
    code: number;
    result: { playlistCount: number; playlists: IPlaylist[] };
  };
  tag: string;
}

export default function Genre(props: Props) {
  const { data, id } = props;
  const { setIsLoading } = useContext(BgColorContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const othersIndex = data.findIndex(
    (dataItem: DataItem) => dataItem.tag === "Others"
  );
  const othersTag = data.splice(othersIndex, 1)[0];
  data.push(othersTag);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    setIsLoading(false);
  }, [id]);

  return (
    <main className="mx-10 my-6 bg-gray-650">
      <h2 className="text-h2-normal text-gray-200 mb-16" ref={containerRef}>
        {id}
      </h2>

      <section className="flex flex-wrap gap-6 mt-8 mb-16">
        {data.map((dataItem: DataItem, index: number) => {
          return (
            dataItem?.playlist?.result?.playlists && (
              <section key={index}>
                <h4 className="text-h3-normal text-white-200">
                  {dataItem.tag}
                </h4>
                <section
                  className={`flex gap-6 mt-8 ${
                    dataItem.tag === "Others" ? "flex-wrap" : ""
                  }`}
                >
                  {dataItem.playlist.result.playlists.map(
                    (playlist: IPlaylist, index: number) => {
                      return (
                        <PlaylistCard
                          coverUrl={playlist.coverImgUrl}
                          playlistName={playlist.name}
                          playlistId={playlist.id}
                          tags={[id]}
                          key={index}
                        />
                      );
                    }
                  )}
                </section>
              </section>
            )
          );
        })}
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  if (!id || Array.isArray(id))
    return { props: { error: "No playlist id found" } };

  const decodedId = decodeURIComponent(id);
  const subTags = getSubTags(decodedId);

  async function fetchTagPlaylist(tag: string) {
    const randomInteger = Math.floor(Math.random() * 100000) + 1;

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/cloudsearch?limit=13&type=1000&keywords=${tag}&timestamp=${
        Date.now() - randomInteger
      }`
    );
    const playlistData = await response.json();

    return {
      tag: tag,
      playlist: playlistData,
    };
  }

  async function getGenrePlaylist(decodedId: string) {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/cloudsearch?limit=30&type=1000&keywords=${decodedId}&timestamp=${Date.now()}` //${decodedId}%20
    );
    const data = await response.json();
    return {
      tag: "Others",
      playlist: data,
    };
  }

  async function fetchAllPlaylist(subTags: string[]) {
    try {
      const promises = subTags.map((tag: string) => fetchTagPlaylist(tag));
      const results = await Promise.all([
        ...promises,
        getGenrePlaylist(decodedId as string),
      ]);
      return results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const allPlaylistTag = await fetchAllPlaylist(subTags)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error in fetchAllData:", error);
    });

  return { props: { data: allPlaylistTag, id: decodedId } };
}
