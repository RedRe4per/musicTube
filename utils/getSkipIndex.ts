import { IMusicDetail } from "@/interfaces/music";

export const getSkipIndex = (currentMusic: IMusicDetail, forward: "last" | "next", playerList: IMusicDetail[]) => {
    const currentMusicIndex = playerList.findIndex(
      (element) => element.id === currentMusic?.id
    );

    let targetMusicIndex = currentMusicIndex;
    const skipForward: number = forward === "last" ? -1 : 1;

    for(let i = 0; i < playerList.length; i++){
      targetMusicIndex = currentMusicIndex + skipForward*(i+1);
      if(targetMusicIndex < 0) targetMusicIndex += playerList.length;
      if(targetMusicIndex > playerList.length - 1 ) targetMusicIndex -= playerList.length;
      if(!playerList[targetMusicIndex].url){
        continue;
      }else {
        break;
      }
    }
    return targetMusicIndex;
}