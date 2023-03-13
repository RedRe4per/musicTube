import { IMusicDetail } from "@/interfaces/music";

export const sortPlayList = (
  playList: IMusicDetail[],
  currentMusic: IMusicDetail | null
) => {
  const index = playList.findIndex((music) => {
    return music.id === currentMusic?.id;
  });

  if (index < 0 || !currentMusic) {
    return { playList: playList, inclusion: false };
  } else {
    const newPlayList: IMusicDetail[] = [];
    playList.forEach((music) => {
      if (music.id !== currentMusic?.id) newPlayList.push(music);
    });
    newPlayList.unshift(currentMusic);
    return { playList: newPlayList, inclusion: true };
  }
};
