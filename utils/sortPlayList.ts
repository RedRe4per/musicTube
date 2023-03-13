import { MusicDetail } from "@/interfaces/music";

export const sortPlayList = (
  playList: MusicDetail[],
  currentMusic: MusicDetail | null
) => {
  const index = playList.findIndex((music) => {
    return music.id === currentMusic?.id;
  });

  if (index < 0 || !currentMusic) {
    return { playList: playList, inclusion: false };
  } else {
    const newPlayList: MusicDetail[] = [];
    playList.forEach((music) => {
      if (music.id !== currentMusic?.id) newPlayList.push(music);
    });
    newPlayList.unshift(currentMusic);
    return { playList: newPlayList, inclusion: true };
  }
};
