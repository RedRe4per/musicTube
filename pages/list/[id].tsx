import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useRef } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { PlaylistCard } from "@/components/Card/PlaylistCard";
import { IPlaylist } from "@/interfaces/playlist";
import { Footer } from "@/layouts/footer";

export default function List(props: any) {
  const { type, list } = props.result;
  const { setIsLoading } = useContext(BgColorContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

  console.log(props, "props");

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    setIsLoading(false);
  }, []);

  return (
    <main className="mx-10 my-6 bg-gray-650">
      <h2 className="text-h2-normal text-gray-200 mb-16" ref={containerRef}>
        {}
      </h2>
      <section className="flex flex-wrap gap-6 mt-8 mb-16">
        {/* {data.map((dataItem: DataItem, index: number) => {
          return (
            dataItem?.playlist?.result?.playlists && (
              <section key={index}>
                <h4 className="text-h3-normal text-white-200">
                  {dataItem.tag}
                </h4>
                <section
                  className={`flex gap-6 mt-8 w-[421vw] sm:w-[310vw] md:w-[270vw] lg:w-[197vw] xl:w-[170vw] 2xl:w-[148vw] custom3xl:w-[135vw] ${
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
        })} */}
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, type } = context.query;
  let result;
  if (type === "playlist") {
    const playlistListResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/top/playlist/${
        id === "top" ? "highquality" : ""
      }?limit=50&timestamp=${Date.now()}`
    );
    const playlistList = await playlistListResponse.json();
    result = {
      type: `${id} playlist`,
      list: playlistList.playlists,
    };
  } else if (type === "album") {
    const albumResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/album/list/style?area=${id}&limit=50&timestamp=${Date.now()}`
    );
    const album = await albumResponse.json();
    result = {
      type: `${id} album`,
      list: album.albumProducts,
    };
  }

  return { props: { result } };
}
