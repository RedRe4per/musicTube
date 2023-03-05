import { NavPages } from "@/components/NavPages";

export const Nav = () => {
  return (
    <main className="w-[330px] bg-gray-800 h-[100vh] absolute">
      <NavPages />
      <section className="mt-[37px] ml-[40px] text-white-200 text-gray-200 mix-blend-hard-light">
        <span className="text-tag-normal uppercase">Your library</span>
        <ul className="text-h3-bold flex flex-col gap-[20px] mt-[17px]">
          <li>Made for you</li>
          <li>Recent player</li>
          <li>Albums</li>
          <li>Artists</li>
          <li>Local files</li>
          <li>Podcasts</li>
        </ul>
      </section>
    </main>
  );
};
