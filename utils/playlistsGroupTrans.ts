import { IPlaylistList, IPlaylist } from "@/interfaces/playlist";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 50;

export const playlistsGroupTranslator0 = async (
  playlistsGroup: IPlaylistList
) => {
  try {
    playlistsGroup.playlists.map(async (playlist: IPlaylist) => {
      playlist.name = await translateToEng(playlist.name);
    });
    return playlistsGroup;
  } catch {
    return playlistsGroup;
  }
};

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
    )) as any;

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

/*
This method is temporarily deprecated. It often reports errors when deployed 
in Vercel. But it can solve the problem of some translation api sending limit.
*/
export const playlistsGroupTranslator2 = async (
  playlistsGroup: IPlaylistList
) => {
  try {
    const playlistsNameArray: string[] = [];
    playlistsGroup.playlists.map(async (playlist: IPlaylist) => {
      playlistsNameArray.push(playlist.name);
    });

    const combinedNameString = playlistsNameArray.join("|###|");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/textTranslator?originalText=${combinedNameString}`
    );
    const combinedTranslatedName = await res.json();

    const translatedNames = combinedTranslatedName.text.split("|###|");
    playlistsGroup.playlists.forEach((playlist: IPlaylist, index: number) => {
      playlist.name = translatedNames[index];
    });

    return playlistsGroup;
  } catch {
    return playlistsGroup;
  }
};
