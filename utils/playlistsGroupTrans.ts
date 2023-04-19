import { IPlaylistList, IPlaylist } from "@/interfaces/playlist";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 50;

interface SettledResult {
  status: "fulfilled" | "rejected";
  value: string;
  reason: string;
}

export const playlistsGroupTranslator = async (
  playlistsGroup: IPlaylistList
) => {
  try {
    const translationPromises = playlistsGroup.playlists.map(
      (playlist: IPlaylist) => {
        return translateToEng(playlist.name);
      }
    );

    const settledResults = (await Promise.allSettled(
      translationPromises
    )) as SettledResult[];

    playlistsGroup.playlists.forEach((playlist: IPlaylist, index: number) => {
      if (settledResults[index].status === "fulfilled") {
        playlist.name = settledResults[index].value;
      } else {
        console.error(
          "Translation API request failed:",
          settledResults[index].reason
        );
      }
    });

    return playlistsGroup;
  } catch {
    return playlistsGroup;
  }
};

export const translateToEng = async (originalText: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/textTranslator?originalText=${originalText}`
    );
    const engText = await res.json();
    return engText.text;
  } catch {
    return originalText;
  }
};
