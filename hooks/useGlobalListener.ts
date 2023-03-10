import { useEffect } from "react";

export const useGlobalListener = (
  isDragging: boolean,
  handleMouseMove: (e: MouseEvent) => void,
  handleMouseUp: () => void
) => {
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
};

export const removeGlobalListener = (
  handleMouseMove: (e: MouseEvent) => void,
  handleMouseUp: () => void
) => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};
