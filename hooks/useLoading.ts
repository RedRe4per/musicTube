import { useContext } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

export const useLoading = () => {
  const { setIsLoading } = useContext(BgColorContext);

  const handleLoading = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
    }, 6000);
  };

  return { handleLoading };
};
