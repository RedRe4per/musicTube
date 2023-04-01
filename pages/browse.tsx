import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { mixColor } from "@/utils/mixColor";

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

  console.log(allPlaylistTag);

  return (
    <>
      <main>
        <section>browse page</section>
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

    return {
      playlist: switchTopPlaylistTag(keyword.name),
      color: mixColor("#1B1B1B", color.dominantColor),
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
      return data;
    })
    .catch((error) => {
      console.error("Error in fetchAllData:", error);
    });

  return { props: { allPlaylistTag } };
}
