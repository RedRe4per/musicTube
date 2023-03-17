import { NavPages } from "@/components/Nav/NavPages";
import { NavLibrary } from "@/components/Nav/NavLibrary";
import { NavPlaylist } from "@/components/Nav/NavPlaylist";

export const Nav = () => {
  return (
    <main className="w-[303px] bg-gray-800 h-[100vh] hidden lg:block">
      <NavPages />
      <NavLibrary />
      <NavPlaylist />
    </main>
  );
};
