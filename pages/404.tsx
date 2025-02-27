import Link from "next/link";
import { useContext, useEffect } from "react";
import { BgColorContext } from "@/contexts/BgColorContext";

export default function Custom404() {
  const { setIsLoading } = useContext(BgColorContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="hero h-[82vh] bg-gray-650">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not Found!</h1>
          <p className="py-6">
            Oops, it looks like the page you&apos;re looking for has gone
            missing!
          </p>
          <Link href={"/"}>
            <button className="btn btn-primary">Home Page</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
