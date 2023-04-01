import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { TagCard } from "@/components/Card/TagCard";
import { Footer } from "@/layouts/footer";
import { IPlaylistTag } from "@/interfaces/playlist";

interface CatListItem {
  category: number;
  hot: boolean;
  name: string;
  resourceCount: number;
  type: number;
}

export default function Browse(allPlaylistTag: any) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <main className="mx-10 mt-6">
        <h2 className="text-gray-200 text-h2-normal">Browse All</h2>
        <section className="flex flex-wrap gap-6 mt-10 mb-16 gap">
          {allPlaylistTag.allPlaylistTag.map(
            (tag: IPlaylistTag, index: number) => {
              return <TagCard key={index} playlistTag={tag} />;
            }
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const catListRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/playlist/catlist`
  );
  const catListData = await catListRes.json();
  const catList = catListData.sub;

  async function fetchPlaylist(keyword: CatListItem) {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_ADDRESS
      }/cloudsearch?type=1000&keywords=${keyword.name}&timestamp=${Date.now()}`
    );
    const playlistData = await response.json();
    const playlistImage = playlistData.result.playlists[0].coverImgUrl;

    const colorRes = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/colorExtract?imageUrl=${playlistImage}`
    );
    const color = await colorRes.json();

    console.log(
      "fetch Playlist:",
      switchTopPlaylistTag(keyword.name),
      color,
      playlistImage
    );

    return {
      playlist: switchTopPlaylistTag(keyword.name),
      color: color,
      imageUrl: playlistImage,
    };
  }

  async function fetchAllPlaylist(catList: CatListItem[]) {
    try {
      const promises = catList.map((keyword: CatListItem) =>
        fetchPlaylist(keyword)
      );
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const allPlaylistTag = await fetchAllPlaylist(catList)
    .then((data) => {
      console.log("All tag data:", data)
      return data;
    })
    .catch((error) => {
      console.error("Error in fetchAllData:", error);
    });

  console.log("allPlaylistTag:", allPlaylistTag);
  return {
    props: { allPlaylistTag },
  };
}
