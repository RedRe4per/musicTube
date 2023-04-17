import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";
import { TagCard } from "@/components/Card/TagCard";
import { Footer } from "@/layouts/footer";
import { IPlaylistTag } from "@/interfaces/playlist";
import { fetchAllPlaylist } from "@/utils/getBrowsePageData";

interface Props {
  allPlaylistTags: IPlaylistTag[];
}

export default function Browse(allPlaylistTags: Props) {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <main className="ml-10 mt-6">
        <h2 className="text-gray-200 text-h2-normal">Browse All</h2>
        <section className="flex flex-wrap gap-8 mt-10 mb-16 gap">
          {allPlaylistTags.allPlaylistTags
            .filter((tag: IPlaylistTag) => tag.status === "success")
            .map((tag: IPlaylistTag, index: number) => {
              return <TagCard key={index} playlistTag={tag} />;
            })}
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

  const allPlaylistTags = await fetchAllPlaylist(catList)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error in fetchAllData:", error);
    });

  return {
    props: { allPlaylistTags },
  };
}
