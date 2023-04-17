import { IPlaylistList, IPlaylist } from "@/interfaces/playlist";

export const playlistsGroupTranslator = async (
  playlistsGroup: IPlaylistList
) => {
  try {
    const playlistsNameArray: string[] = [];
    playlistsGroup.playlists.forEach((playlist: IPlaylist) => {
      playlistsNameArray.push(playlist.name);
    });
    const combinedNameString = playlistsNameArray.join("|$|");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/textTranslator?originalText=${combinedNameString}`
    );
    const combinedTranslatedName = await res.json();
    
    const translatedNames = combinedTranslatedName.text.split("|$|");
    playlistsGroup.playlists.forEach((playlist: IPlaylist, index: number) => {
      playlist.name = translatedNames[index];
    });
    return playlistsGroup;
  } catch {
    return playlistsGroup;
  }
};
