import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

export default function Home() {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <section>
        <section className="">liked songs page</section>
      </section>
    </>
  );
}
