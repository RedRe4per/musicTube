import { useContext } from "react";
import { PlayerContext } from "@/contexts/PlayerContext";
import { SongList } from "@/components/Playlist/SongList";
import { Footer } from "@/layouts/footer";

export default function Queue() {
  const { musicListId, queueInfo } = useContext(PlayerContext);

  return (
    <main className="mt-8">
      <h3 className="text-h2-normal text-white-50 ml-20 mb-12">Queue</h3>
      {queueInfo.length > 0 ? (
        <SongList
          playlistSongs={queueInfo}
          playlistId={musicListId as number}
          currentPage={1}
        />
      ) : (
        <section className="text-h3-normal text-gray-200 italic ml-20 mb-20">
          <p>No music in play queue.</p>
        </section>
      )}
      <Footer />
    </main>
  );
}
