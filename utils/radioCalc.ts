export const getRatio = (musicPlayer: React.RefObject<HTMLAudioElement>) => {
  const radio = Math.round(
    musicPlayer.current?.currentTime && musicPlayer.current?.duration
      ? (100 * musicPlayer.current?.currentTime) / musicPlayer.current?.duration
      : 0
  );
  return radio;
};

export const getDraggingRatio = (
  e: React.MouseEvent<HTMLDivElement> | MouseEvent,
  progressBarRect: DOMRect
) => {
  const mouseX = e.clientX - progressBarRect.left;
  const progressWidth = progressBarRect.width;
  let newRatio = (mouseX / progressWidth) * 100;
  if (newRatio < 0.1) newRatio = 0.1;
  if (newRatio > 99.5) newRatio = 99.5;
  return newRatio;
};
