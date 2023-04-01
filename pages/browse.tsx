import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { switchTopPlaylistTag } from "@/utils/switchTopPlaylistTag";
import { mixColor } from "@/utils/mixColor";
import { TagCard } from "@/components/Card/TagCard";
import { Footer } from "@/layouts/footer";

interface CatListItem {
  category: number;
  hot: boolean;
  name: string;
  resourceCount: number;
  type: number;
}

interface playlistTag {
  playlist: string;
  color: string;
  imageUrl: string;
}

export default function Browse(allPlaylistTag: any) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  console.log("client address test", allPlaylistTag.clientAddress);

  return (
    <>
      <main className="mx-10 mt-6">
        <h2 className="text-gray-200 text-h2-normal">Browse All</h2>
        <section className="flex flex-wrap gap-5 mt-10 mb-16 gap">
          {allPlaylistTag.allPlaylistTag.map(
            (tag: playlistTag, index: number) => {
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

    // const colorRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/colorExtract?imageUrl=${playlistImage}`
    // );
    // const color = await colorRes.json();

    return {
      playlist: switchTopPlaylistTag(keyword.name),
      // color: mixColor("#1B1B1B", color.dominantColor),
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

  return {
    props: {
      allPlaylistTag,
      clientAddress: process.env.NEXT_PUBLIC_CLIENT_ADDRESS,
    },
  };
}
